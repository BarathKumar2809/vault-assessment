import type { PasswordOptions, PasswordStrength } from '../types';

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

// Generate secure random password
export function generatePassword(options: PasswordOptions): string {
  let charset = '';
  if (options.uppercase) charset += UPPERCASE;
  if (options.lowercase) charset += LOWERCASE;
  if (options.numbers) charset += NUMBERS;
  if (options.symbols) charset += SYMBOLS;

  if (charset.length === 0) {
    charset = LOWERCASE + NUMBERS;
  }

  const password: string[] = [];
  const randomValues = new Uint32Array(options.length);
  crypto.getRandomValues(randomValues);

  for (let i = 0; i < options.length; i++) {
    const randomIndex = randomValues[i] % charset.length;
    password.push(charset[randomIndex]);
  }

  return password.join('');
}

// Calculate password strength
export function calculateStrength(password: string): PasswordStrength {
  if (password.length === 0) return 'weak';

  let score = 0;

  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;

  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;

  if (score <= 2) return 'weak';
  if (score <= 4) return 'medium';
  if (score <= 5) return 'strong';
  return 'very-strong';
}

export function getDefaultOptions(): PasswordOptions {
  return {
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  };
}
