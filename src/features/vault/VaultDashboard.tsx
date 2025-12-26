import { useState, useRef, useMemo } from 'react';
import type { Secret, NotificationType } from '../../shared/types';
import SecretForm from './SecretForm';
import SearchBar from '../../shared/components/ui/SearchBar';
import SecretItem from './SecretItem';
import './VaultDashboard.css';

interface VaultDashboardProps {
  secrets: Secret[];
  onAddSecret: (secret: Omit<Secret, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdateSecret: (id: string, secret: Omit<Secret, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onDeleteSecret: (id: string) => void;
  onLock: () => void;
  onGoHome: () => void;
  onChangePassword?: () => void;
  showToast: (message: string, type: NotificationType) => void;
}

function VaultDashboard({
  secrets,
  onAddSecret,
  onUpdateSecret,
  onDeleteSecret,
  onLock,
  onGoHome,
  onChangePassword,
  showToast,
}: VaultDashboardProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingSecret, setEditingSecret] = useState<Secret | undefined>(undefined);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSecrets = useMemo(() => {
    let filtered = [...secrets];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (secret) =>
          secret.name.toLowerCase().includes(query) ||
          secret.username.toLowerCase().includes(query) ||
          (secret.notes && secret.notes.toLowerCase().includes(query)) ||
          (secret.tags && secret.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }

    // Sort by name
    filtered.sort((a, b) => a.name.localeCompare(b.name));

    return filtered;
  }, [secrets, searchQuery]);

  const handleAddClick = () => {
    setEditingSecret(undefined);
    setShowForm(true);
  };

  const handleEditClick = (secret: Secret) => {
    setEditingSecret(secret);
    setShowForm(true);
  };

  const handleFormSave = (secretData: Omit<Secret, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingSecret) {
      onUpdateSecret(editingSecret.id, secretData);
    } else {
      onAddSecret(secretData);
    }
    setShowForm(false);
    setEditingSecret(undefined);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingSecret(undefined);
  };

  return (
    <div className="vault-dashboard">
      <div className="vault-header">
        <div className="vault-title">
          <h1>Secure Vault</h1>
          <span className="vault-stats">{secrets.length} secrets</span>
        </div>

        <div className="vault-actions">
          <button
            onClick={handleAddClick}
            className="add-secret-btn"
            aria-label="Add new secret"
          >
            ➕ Add Secret
          </button>

          <button
            onClick={() => onChangePassword?.()}
            className="change-password-btn"
            title="Change master password"
            aria-label="Change master password"
          >
            Change Password
          </button>

          <button
            onClick={onLock}
            className="lock-btn"
            title="Lock vault"
            aria-label="Lock vault"
          >
            🔒 Lock
          </button>

          <button
            onClick={onGoHome}
            className="home-btn"
            title="Go to home"
            aria-label="Go to home page"
          >
            🏠 Home
          </button>
        </div>
      </div>

      <div className="vault-controls">
        <SearchBar
          onSearch={setSearchQuery}
          placeholder="Search secrets..."
          searchInputRef={searchInputRef}
        />

        <div className="filters">
        </div>
      </div>

      {filteredSecrets.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔐</div>
          <h3>No secrets found</h3>
          <p>Try adjusting your search or filters, or add a new secret.</p>
        </div>
      ) : (
        <div className="secrets-list">
          {filteredSecrets.map((secret) => (
            <SecretItem
              key={secret.id}
              secret={secret}
              onEdit={handleEditClick}
              onDelete={onDeleteSecret}
              showToast={showToast}
            />
          ))}
        </div>
      )}

      {showForm && (
        <SecretForm
          secret={editingSecret}
          onSave={handleFormSave}
          onCancel={handleFormCancel}
        />
      )}
    </div>
  );
}

export default VaultDashboard;

