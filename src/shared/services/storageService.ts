import type { EncryptedVault } from '../types';

const VAULT_KEY = 'secure_vault_data';

// Save encrypted vault to localStorage (never plaintext)
export function saveVault(encryptedVault: EncryptedVault): void {
  try {
    const data = JSON.stringify(encryptedVault);
    localStorage.setItem(VAULT_KEY, data);
  } catch (error) {
    throw new Error('Failed to save vault to storage. Storage may be full.');
  }
}

// Load encrypted vault from localStorage
export function loadVault(): EncryptedVault | null {
  try {
    const data = localStorage.getItem(VAULT_KEY);
    if (!data) {
      return null;
    }
    return JSON.parse(data) as EncryptedVault;
  } catch (error) {
    throw new Error('Failed to load vault from storage. Data may be corrupted.');
  }
}

export function vaultExists(): boolean {
  return localStorage.getItem(VAULT_KEY) !== null;
}

// Delete vault - cannot be undone!
export function deleteVault(): void {
  localStorage.removeItem(VAULT_KEY);
}

// Get vault size in bytes (for debugging)
export function getVaultSize(): number {
  const data = localStorage.getItem(VAULT_KEY);
  if (!data) {
    return 0;
  }
  return data.length * 2; // UTF-16 approximation
}
