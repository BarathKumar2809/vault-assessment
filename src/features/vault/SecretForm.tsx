import { useState, useEffect } from 'react';
import type { Secret } from '../../shared/types';
import PasswordGenerator from '../../shared/components/forms/PasswordGenerator';
import './SecretForm.css';

interface SecretFormProps {
  secret?: Secret;
  onSave: (secret: Omit<Secret, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

function SecretForm({ secret, onSave, onCancel }: SecretFormProps) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [showGenerator, setShowGenerator] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fill form with existing data when editing
  useEffect(() => {
    if (secret) {
      setName(secret.name);
      setUsername(secret.username);
      setPassword(secret.password);
      setNotes(secret.notes || '');
      setTags(secret.tags?.join(', ') || '');
    } else {
      // Reset form for new secret
      setName('');
      setUsername('');
      setPassword('');
      setNotes('');
      setTags('');
      setErrors({});
    }
  }, [secret]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // Parse tags from comma-separated string
    const tagArray = tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    onSave({
      name: name.trim(),
      username: username.trim(),
      password,
      notes: notes.trim() || undefined,
      tags: tagArray.length > 0 ? tagArray : undefined,
      passwordHistory: secret?.passwordHistory,
    });
  };

  const handleInsertPassword = (generatedPassword: string) => {
    setPassword(generatedPassword);
    setShowGenerator(false);
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{secret ? 'Edit Secret' : 'Add New Secret'}</h2>
          <button className="close-button" onClick={onCancel} type="button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="secret-form">
          <div className="form-field">
            <label htmlFor="name">
              Name <span className="required">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Gmail Account"
              autoFocus
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="username">
              Username <span className="required">*</span>
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g., user@example.com"
            />
            {errors.username && <span className="field-error">{errors.username}</span>}
          </div>

          <div className="form-field">
            <div className="field-header">
              <label htmlFor="password">
                Password <span className="required">*</span>
              </label>
              <button
                type="button"
                className="generator-toggle"
                onClick={() => setShowGenerator(!showGenerator)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                {showGenerator ? 'Hide' : 'Generate'}
              </button>
            </div>
            <div className="password-input-wrapper">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a strong password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          {showGenerator && (
            <div className="generator-section">
              <PasswordGenerator onInsert={handleInsertPassword} />
            </div>
          )}

          <div className="form-field">
            <label htmlFor="tags">Tags (optional)</label>
            <input
              id="tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="work, personal, important (comma-separated)"
            />
          </div>

          <div className="form-field">
            <label htmlFor="notes">Notes (optional)</label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional information..."
              rows={4}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="save-button">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
              {secret ? 'Update Secret' : 'Save Secret'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SecretForm;

