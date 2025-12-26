
 // Core data types and interfaces
 

// Main secret entry structure
export interface Secret {
  id: string;
  name: string;
  username: string;
  password: string;
  notes?: string;
  tags?: string[];                 // Tags for flexible categorization
  passwordHistory?: PasswordHistoryEntry[];  // Track password changes
  createdAt: number;
  updatedAt: number;
}

// Track old passwords for security auditing
export interface PasswordHistoryEntry {
  password: string;
  changedAt: number;
}

// How encrypted data is stored in localStorage
export interface EncryptedVault {
  salt: string;        // Base64 encoded salt for PBKDF2
  iv: string;          // Base64 encoded initialization vector for AES-GCM
  data: string;        // Encrypted secrets as base64 string
  version: number;     // Schema version for future migrations
}

// Current app state
export interface VaultState {
  secrets: Secret[];
  isLocked: boolean;
  masterKey: CryptoKey | null;
}

// Password generator settings
export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

// Password strength levels
export type PasswordStrength = 'weak' | 'medium' | 'strong' | 'very-strong';

// Notification types for user feedback
export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number;
}
