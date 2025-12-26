// Security & Encryption
export const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes auto-lock
export const PBKDF2_ITERATIONS = 100_000; // OWASP recommended
export const KEY_LENGTH = 256;
export const SALT_LENGTH = 16;
export const IV_LENGTH = 12;

// Storage
export const VAULT_STORAGE_KEY = 'secure_vault_data';
export const PREFERENCES_STORAGE_KEY = 'vault_preferences';
export const VAULT_VERSION = 1;

// UI & UX
export const TOAST_DURATION = 3000;
export const CLIPBOARD_CLEAR_TIMEOUT = 3000;
export const SEARCH_DEBOUNCE_DELAY = 300;
export const PASSWORD_STRENGTH_DELAY = 100;

// Password Requirements
export const MIN_PASSWORD_LENGTH = 6;
export const MAX_PASSWORD_LENGTH = 128;
export const PASSWORD_HISTORY_LIMIT = 5;

// Password Generator
export const PASSWORD_GENERATOR_DEFAULTS = {
  length: 16,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
} as const;

export const PASSWORD_GENERATOR_LIMITS = {
  minLength: 4,
  maxLength: 128,
} as const;

// Categories
export const SECRET_CATEGORIES = [
  'login',
  'credit-card',
  'secure-note',
  'other',
] as const;

export const CATEGORY_LABELS: Record<string, string> = {
  login: '🔑 Login',
  'credit-card': '💳 Credit Card',
  'secure-note': '📝 Secure Note',
  other: '📌 Other',
};

// Animation
export const ANIMATION_DURATION = 200;
export const MODAL_ANIMATION_DURATION = 300;

// Validation
export const WEAK_PASSWORD_PATTERNS = [
  '12345',
  'password',
  'qwerty',
  'abcde',
  'admin',
  'letmein',
  'welcome',
  'monkey',
  '111111',
  'iloveyou',
] as const;

export const URL_REGEX = /^https?:\/\/.+/i;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Feature Flags
export const FEATURE_FLAGS = {
  enableAutoLock: true,
  enablePasswordHistory: true,
  enableFavorites: true,
  enableCategories: true,
  enableTags: true,
  enableSearch: true,
  enablePasswordGenerator: true,
  enableClipboardAutoClear: true,
} as const;

// App Info
export const DEBUG_MODE = import.meta.env.DEV;
export const APP_VERSION = '1.0.0';
export const APP_NAME = 'Secure Vault';
export const APP_DESCRIPTION = 'Secure password manager with client-side encryption';
