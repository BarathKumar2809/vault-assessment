import { useState } from 'react';
import { generatePassword, calculateStrength, getDefaultOptions } from '../../utils/passwordGenerator';
import type { PasswordOptions } from '../../types';
import './PasswordGenerator.css';

interface PasswordGeneratorProps {
  onInsert?: (password: string) => void;
  standalone?: boolean;
}

function PasswordGenerator({ onInsert, standalone = false }: PasswordGeneratorProps) {
  const [options, setOptions] = useState<PasswordOptions>(getDefaultOptions());
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const password = generatePassword(options);
    setGeneratedPassword(password);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!generatedPassword) return;
    try {
      await navigator.clipboard.writeText(generatedPassword);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy password:', error);
    }
  };

  const handleInsert = () => {
    if (onInsert && generatedPassword) {
      onInsert(generatedPassword);
    }
  };

  const updateOption = (key: keyof PasswordOptions, value: boolean | number) => {
    setOptions({ ...options, [key]: value });
  };

  const strength = generatedPassword ? calculateStrength(generatedPassword) : null;

  return (
    <div className={`password-generator ${standalone ? 'standalone' : ''}`}>
      {standalone && <h3>Password Generator</h3>}

      <div className="generator-controls">
        <div className="length-control">
          <label>
            Length: <span className="length-value">{options.length}</span>
          </label>
          <input
            type="range"
            min="8"
            max="64"
            value={options.length}
            onChange={(e) => updateOption('length', parseInt(e.target.value))}
          />
        </div>

        <div className="option-checkboxes">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={options.uppercase}
              onChange={(e) => updateOption('uppercase', e.target.checked)}
            />
            <span>Uppercase (A-Z)</span>
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={options.lowercase}
              onChange={(e) => updateOption('lowercase', e.target.checked)}
            />
            <span>Lowercase (a-z)</span>
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={options.numbers}
              onChange={(e) => updateOption('numbers', e.target.checked)}
            />
            <span>Numbers (0-9)</span>
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={options.symbols}
              onChange={(e) => updateOption('symbols', e.target.checked)}
            />
            <span>Symbols (!@#$...)</span>
          </label>
        </div>
      </div>

      {generatedPassword && (
        <div className="generated-password-section">
          <div className="password-display">
            <code>{generatedPassword}</code>
            {strength && (
              <span className={`strength-badge strength-${strength}`}>
                {strength}
              </span>
            )}
          </div>
          <div className="password-actions">
            <button className="action-button copy-btn" onClick={handleCopy}>
              {copied ? (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  Copy
                </>
              )}
            </button>
            {onInsert && (
              <button className="action-button insert-btn" onClick={handleInsert}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
                Insert
              </button>
            )}
          </div>
        </div>
      )}

      <button className="generate-button" onClick={handleGenerate}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="23 4 23 10 17 10"></polyline>
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
        </svg>
        Generate Password
      </button>
    </div>
  );
}

export default PasswordGenerator;

