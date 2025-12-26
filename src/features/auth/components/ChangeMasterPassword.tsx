import React, { useEffect, useRef, useState } from 'react';
import { rekeyVault } from '../../../shared/services/cryptoService';
import { saveVault } from '../../../shared/services/storageService';
import type { Secret } from '../../../shared/types';

interface ChangeMasterPasswordProps {
  secrets: Secret[];
  onClose: () => void;
  onPasswordChanged: (newKey: CryptoKey) => void;
}

export default function ChangeMasterPassword({ secrets, onClose, onPasswordChanged }: ChangeMasterPasswordProps) {
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);
    if (!newPass) return setError('Enter a new password');
    if (newPass !== confirm) return setError('Passwords do not match');

    try {
      setLoading(true);
      const { newKey, encryptedVault } = await rekeyVault(secrets, newPass);
      // persist new encrypted vault
      saveVault(encryptedVault);
      onPasswordChanged(newKey);
      onClose();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Rekey failed', err);
      setError('Failed to change password. Try again.');
    } finally {
      setLoading(false);
      setNewPass('');
      setConfirm('');
    }
  };

  return (
    <div className="reset-confirm-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="reset-confirm-modal" onClick={stopPropagation}>
        <h3>Change Master Password</h3>
        <p>Enter a new master password to re-encrypt your vault. This will replace the current password.</p>

        <form onSubmit={handleSubmit} className="unlock-form">
          <div className="form-group">
            <label htmlFor="new-password">New Password</label>
            <div className="password-input-wrapper">
              <input
                id="new-password"
                ref={inputRef}
                type={showNewPass ? 'text' : 'password'}
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="Enter new master password"
                disabled={loading}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowNewPass(!showNewPass)}
                disabled={loading}
                aria-label={showNewPass ? 'Hide password' : 'Show password'}
              >
                {showNewPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="password-input-wrapper">
              <input
                id="confirm-password"
                type={showConfirmPass ? 'text' : 'password'}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Confirm new password"
                disabled={loading}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                disabled={loading}
                aria-label={showConfirmPass ? 'Hide password' : 'Show password'}
              >
                {showConfirmPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="reset-confirm-buttons" style={{ marginTop: 12 }}>
            <button
              type="button"
              onClick={onClose}
              className="cancel-button"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="reset-button"
              disabled={loading}
            >
              {loading ? 'Updating…' : 'Change Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
