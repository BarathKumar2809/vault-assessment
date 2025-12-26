import React, { useEffect, useRef } from 'react';
import { deleteVault } from '../../../shared/services/storageService';

interface ResetVaultConfirmProps {
  onClose: () => void;
  onReset: () => void;
}

export function ResetVaultConfirm({ onClose, onReset }: ResetVaultConfirmProps) {
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    cancelRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleReset = async () => {
    try {
      await deleteVault();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to reset vault', err);
    } finally {
      onReset();
      onClose();
    }
  };

  const handleOverlayClick = () => onClose();
  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div
      className="reset-confirm-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reset-vault-title"
      onClick={handleOverlayClick}
    >
      <div className="reset-confirm-modal" onClick={stopPropagation}>
        <h3 id="reset-vault-title">Reset Vault</h3>
        <p>This will permanently delete all your secrets. This action cannot be undone.</p>
        <div className="reset-confirm-buttons">
          <button
            ref={cancelRef}
            type="button"
            onClick={onClose}
            className="cancel-button"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="reset-button"
          >
            Delete Everything
          </button>
        </div>
      </div>
    </div>
  );
}