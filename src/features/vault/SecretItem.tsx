import { useState } from 'react';
import type { Secret, NotificationType } from '../../shared/types';
import { formatDate } from './utils/secretDisplay';
import { copyToClipboard } from '../../shared/utils/clipboard';
import './SecretItem.css';

interface SecretItemProps {
  secret: Secret;
  onDelete: (id: string) => void;
  onEdit: (secret: Secret) => void;
  showToast: (message: string, type: NotificationType) => void;
}

function SecretItem({ secret, onDelete, onEdit, showToast }: SecretItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (text: string, field: string) => {
    const success = await copyToClipboard(text, 3000);
    if (success) {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
      showToast(`${field} copied to clipboard`, 'success');
    }
  };

  const handleDelete = () => {
    onDelete(secret.id);
    setShowDeleteConfirm(false);
  };

  return (
    <div className={`secret-item ${isExpanded ? 'expanded' : ''}`}>
      <div className="secret-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="secret-summary">
          <div className="secret-info">
            <div className="secret-name">{secret.name}</div>
            <div className="secret-meta">
              {secret.username}
            </div>
          </div>
        </div>

        <div className="secret-actions">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(secret);
            }}
            className="edit-btn"
            title="Edit secret"
            aria-label={`Edit ${secret.name}`}
          >
            Edit
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowDeleteConfirm(true);
            }}
            className="delete-btn"
            title="Delete secret"
            aria-label={`Delete ${secret.name}`}
          >
            Delete
          </button>
        </div>

        <div className="expand-toggle">
          {isExpanded ? 'Collapse' : 'Expand'}
        </div>
      </div>

      {isExpanded && (
        <div className="secret-details">
          <div className="detail-row">
            <label>Username:</label>
            <div className="detail-value">
              <span>{secret.username}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy(secret.username, 'Username');
                }}
                className={`copy-btn ${copiedField === 'Username' ? 'copied' : ''}`}
                title="Copy username"
                aria-label={`Copy username for ${secret.name}`}
              >
                {copiedField === 'Username' ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          <div className="detail-row">
            <label>Password:</label>
            <div className="detail-value">
              <span className={showPassword ? '' : 'password-hidden'}>
                {showPassword ? secret.password : '••••••••'}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPassword(!showPassword);
                }}
                className="toggle-password-btn"
                title={showPassword ? 'Hide password' : 'Show password'}
                aria-label={showPassword ? `Hide password for ${secret.name}` : `Show password for ${secret.name}`}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy(secret.password, 'Password');
                }}
                className={`copy-btn ${copiedField === 'Password' ? 'copied' : ''}`}
                title="Copy password"
                aria-label={`Copy password for ${secret.name}`}
              >
                {copiedField === 'Password' ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          {secret.notes && (
            <div className="detail-row">
              <label>Notes:</label>
              <div className="detail-value notes">
                {secret.notes}
              </div>
            </div>
          )}

          <div className="detail-row">
            <label>Tags:</label>
            <div className="detail-value">
              {secret.tags && secret.tags.length > 0 ? (
                <div className="tags">
                  {secret.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="no-tags">No tags</span>
              )}
            </div>
          </div>

          <div className="secret-metadata">
            <div className="metadata-item">
              <span className="metadata-label">Created:</span>
              <span className="metadata-value">{formatDate(secret.createdAt)}</span>
            </div>
            {secret.updatedAt !== secret.createdAt && (
              <div className="metadata-item">
                <span className="metadata-label">Updated:</span>
                <span className="metadata-value">{formatDate(secret.updatedAt)}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="delete-confirm">
          <p>Are you sure you want to delete this secret?</p>
          <div className="delete-confirm-buttons">
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="cancel-btn"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="confirm-delete-btn"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SecretItem;