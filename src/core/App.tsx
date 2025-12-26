import { useState, useEffect } from 'react';
import type { Secret } from '../shared/types';
import {
  deriveKey,
  encrypt,
  decrypt,
  generateSalt,
  base64ToArrayBuffer,
} from '../shared/services/cryptoService';
import { saveVault, loadVault, vaultExists } from '../shared/services/storageService';
import { useToast } from '../shared/hooks/useToast';
import HomePage from '../features/home/HomePage';
import UnlockScreen from '../features/auth/UnlockScreen';
import VaultDashboard from '../features/vault/VaultDashboard';
import ChangeMasterPassword from '../features/auth/components/ChangeMasterPassword';
import ToastContainer from '../shared/components/ui/ToastContainer';
import { INACTIVITY_TIMEOUT } from './config';
import './App.css';

function App() {
  const [showHomePage, setShowHomePage] = useState(true);
  const [isLocked, setIsLocked] = useState(true);
  const [masterKey, setMasterKey] = useState<CryptoKey | null>(null);
  const [secrets, setSecrets] = useState<Secret[]>([]);
  const [salt, setSalt] = useState<Uint8Array | null>(null);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  
  const { toasts, showToast, dismissToast } = useToast();

  // Check if user already has a vault
  useEffect(() => {
    const hasVault = vaultExists();
    setIsFirstTime(!hasVault);
    if (hasVault) {
      setShowHomePage(false); // Skip intro if they have a vault
    }
  }, []);

  // Auto-lock after period of inactivity for security
  useEffect(() => {
    if (isLocked) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        handleLock();
        showToast('Vault auto-locked due to inactivity', 'info');
      }, INACTIVITY_TIMEOUT);
    };

    // Listen for user activity
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    events.forEach(event => {
      window.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      events.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [isLocked]);

  // Handle both first-time setup and returning user unlock
  const handleUnlock = async (password: string): Promise<boolean> => {
    try {
      if (isFirstTime) {
        // First time - create new vault with this password
        const newSalt = generateSalt();
        const key = await deriveKey(password, newSalt);

        const emptyVaultData = JSON.stringify([]);
        const encryptedVault = await encrypt(emptyVaultData, key, newSalt);
        saveVault(encryptedVault);

        setSalt(newSalt);
        setMasterKey(key);
        setSecrets([]);
        setIsLocked(false);
        setIsFirstTime(false);
        return true;
      } else {
        // Returning user - try to decrypt existing vault
        const encryptedVault = loadVault();
        if (!encryptedVault) {
          throw new Error('Vault not found');
        }

        const vaultSalt = new Uint8Array(base64ToArrayBuffer(encryptedVault.salt));
        const key = await deriveKey(password, vaultSalt);

        try {
          const decryptedData = await decrypt(encryptedVault, key);
          const loadedSecrets = JSON.parse(decryptedData) as Secret[];

          setSalt(vaultSalt);
          setMasterKey(key);
          setSecrets(loadedSecrets);
          setIsLocked(false);
          return true;
        } catch (error) {
          // Password was wrong or data is corrupted
          return false;
        }
      }
    } catch (error) {
      console.error('Unlock error:', error);
      return false;
    }
  };

  // Clear sensitive data from memory when locking
  const handleLock = () => {
    setIsLocked(true);
    setMasterKey(null);
    setSecrets([]);
    setSalt(null);
    setIsFirstTime(!vaultExists());
  };

  // Encrypt and save secrets to localStorage
  const saveSecrets = async (updatedSecrets: Secret[]) => {
    if (!masterKey || !salt) return;

    try {
      const vaultData = JSON.stringify(updatedSecrets);
      const encryptedVault = await encrypt(vaultData, masterKey, salt);
      saveVault(encryptedVault);
      setSecrets(updatedSecrets);
      return true;
    } catch (error) {
      console.error('Failed to save secrets:', error);
      showToast('Failed to save changes. Please try again.', 'error');
      return false;
    }
  };

  // Create a new secret entry
  const handleAddSecret = async (
    secretData: Omit<Secret, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    const newSecret: Secret = {
      ...secretData,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const updatedSecrets = [...secrets, newSecret];
    const success = await saveSecrets(updatedSecrets);
    if (success) {
      showToast('Secret added successfully!', 'success');
    }
  };

  // Update existing secret
  const handleUpdateSecret = async (
    id: string,
    secretData: Omit<Secret, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    const updatedSecrets = secrets.map((secret) =>
      secret.id === id
        ? {
            ...secretData,
            id: secret.id,
            createdAt: secret.createdAt,
            updatedAt: Date.now(),
            // Keep password history if password changed
            passwordHistory: secret.password !== secretData.password
              ? [
                  ...(secret.passwordHistory || []),
                  { password: secret.password, changedAt: secret.updatedAt }
                ].slice(-5) // Keep last 5 passwords
              : secret.passwordHistory,
          }
        : secret
    );

    const success = await saveSecrets(updatedSecrets);
    if (success) {
      showToast('Secret updated successfully!', 'success');
    }
  };

  // Remove a secret
  const handleDeleteSecret = async (id: string) => {
    const updatedSecrets = secrets.filter((secret) => secret.id !== id);
    const success = await saveSecrets(updatedSecrets);
    if (success) {
      showToast('Secret deleted successfully!', 'success');
    }
  };

  // Start the vault setup process
  const handleGetStarted = () => {
    setShowHomePage(false);
  };

  // Go back to home (locks vault for security)
  const handleGoHome = () => {
    handleLock();
    setShowHomePage(true);
    showToast('Vault locked for security', 'info');
  };

  const handleOpenChangePassword = () => setShowChangePassword(true);

  const handlePasswordChanged = (newKey: CryptoKey) => {
    setMasterKey(newKey);
    showToast('Master password updated', 'success');
    setShowChangePassword(false);
  };

  return (
    <div className="app">
      {showHomePage ? (
        <HomePage onGetStarted={handleGetStarted} />
      ) : isLocked ? (
        <UnlockScreen onUnlock={handleUnlock} isFirstTime={isFirstTime} />
      ) : (
        <VaultDashboard
          secrets={secrets}
          onAddSecret={handleAddSecret}
          onUpdateSecret={handleUpdateSecret}
          onDeleteSecret={handleDeleteSecret}
          onLock={handleLock}
          onGoHome={handleGoHome}
          onChangePassword={handleOpenChangePassword}
          showToast={showToast}
        />
      )}
      {showChangePassword && (
        <ChangeMasterPassword
          secrets={secrets}
          onClose={() => setShowChangePassword(false)}
          onPasswordChanged={handlePasswordChanged}
        />
      )}
      
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default App;
