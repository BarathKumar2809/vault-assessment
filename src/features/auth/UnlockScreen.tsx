import { useState, useMemo } from 'react';
import { ResetVaultConfirm } from './components/ResetVaultConfirm';
import './UnlockScreen.css';

type PasswordStrength = 'weak' | 'medium' | 'strong';

interface PasswordCheck {
  isStrong: boolean;
  message: string;
  strength: PasswordStrength;
}

interface UnlockScreenProps {
  onUnlock: (password: string) => Promise<boolean>;
  isFirstTime: boolean;
}

function checkPasswordStrength(password: string): PasswordCheck {
  if (password.length < 6) {
    return {
      isStrong: false,
      message: 'Password must be at least 6 characters long',
      strength: 'weak',
    };
  }

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  const missingRequirements = [];
  if (!hasUppercase) missingRequirements.push('uppercase letter');
  if (!hasLowercase) missingRequirements.push('lowercase letter');
  if (!hasNumber) missingRequirements.push('number');
  if (!hasSpecial) missingRequirements.push('special character');

  if (missingRequirements.length > 0) {
    return {
      isStrong: false,
      message: `Password needs: ${missingRequirements.join(', ')}`,
      strength: 'weak',
    };
  }

  // Check for common weak patterns
  if (password.length < 8) {
    return {
      isStrong: false,
      message: 'Password should be at least 8 characters for better security',
      strength: 'medium',
    };
  }

  return {
    isStrong: true,
    message: 'Strong password!',
    strength: 'strong',
  };
}

function UnlockScreen({ onUnlock, isFirstTime }: UnlockScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const passwordCheck = useMemo(() => checkPasswordStrength(password), [password]);
  const isValidForFirstTime = passwordCheck.isStrong && password === confirmPassword;
  const isValidForUnlock = password.length > 0;

  const getStrengthColor = (strength: PasswordStrength) => {
    switch (strength) {
      case 'weak': return '#ff4444';
      case 'medium': return '#ffaa00';
      case 'strong': return '#44aa44';
      default: return '#666';
    }
  };

  const getStrengthWidth = (strength: PasswordStrength) => {
    switch (strength) {
      case 'weak': return '33%';
      case 'medium': return '66%';
      case 'strong': return '100%';
      default: return '0%';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation for first-time setup
    if (isFirstTime) {
      if (!isValidForFirstTime) {
        setError(passwordCheck.message || 'Please check your password requirements');
        return;
      }
    }

    // Validation for existing vault
    if (!isFirstTime && !isValidForUnlock) {
      setError('Please enter your master password');
      return;
    }

    setIsLoading(true);
    try {
      const success = await onUnlock(password);
      if (!success) {
        setError('Incorrect password. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    window.location.reload(); // Simple reset - reload the app
  };

  return (
    <>
      <div className="unlock-screen">
        <div className="unlock-container">
          <div className="unlock-header">
            <h1>{isFirstTime ? 'Create Master Password' : 'Unlock Vault'}</h1>
            <p className="subtitle">
              {isFirstTime
                ? 'Choose a strong master password to secure your vault'
                : 'Enter your master password to access your secrets'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="unlock-form">
            <div className="form-group">
              <label htmlFor="password">Master Password</label>
              <div className="password-input-wrapper">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter master password"
                  disabled={isLoading}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="toggle-password"
                  disabled={isLoading}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {isFirstTime && (
              <>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div className="password-input-wrapper">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm master password"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="toggle-password"
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                <div className="password-strength">
                  <div className="strength-bar">
                    <div
                      className="strength-fill"
                      style={{
                        width: getStrengthWidth(passwordCheck.strength),
                        backgroundColor: getStrengthColor(passwordCheck.strength),
                      }}
                    />
                  </div>
                  <span className="strength-text" style={{ color: getStrengthColor(passwordCheck.strength) }}>
                    {passwordCheck.message}
                  </span>
                </div>
              </>
            )}

            {error && <div className="error-message">{error}</div>}

            <button
              type="submit"
              disabled={isLoading || (isFirstTime ? !isValidForFirstTime : !isValidForUnlock)}
              className="unlock-button"
            >
              {isLoading ? 'Processing...' : (isFirstTime ? 'Create Vault' : 'Unlock Vault')}
            </button>
          </form>

          {!isFirstTime && (
            <div className="unlock-footer">
              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                className="reset-link"
                aria-label="Reset vault"
                disabled={isLoading}
              >
                Reset vault
              </button>
            </div>
          )}
        </div>
      </div>

      {showResetConfirm && (
        <ResetVaultConfirm
          onClose={() => setShowResetConfirm(false)}
          onReset={handleReset}
        />
      )}
    </>
  );
}

export default UnlockScreen;