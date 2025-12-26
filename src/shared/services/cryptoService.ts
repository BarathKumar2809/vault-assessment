import type { EncryptedVault } from '../types';

const PBKDF2_ITERATIONS = 150000; // Increased iteration count for brute force protection
const KEY_LENGTH = 256;
const SALT_LENGTH = 16;
const IV_LENGTH = 12;

export function generateSalt(): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
}

export function generateIV(): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(IV_LENGTH));
}

export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

// Convert master password into encryption key using PBKDF2
export async function deriveKey(
  password: string,
  salt: Uint8Array
): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const passwordBytes = encoder.encode(password);

  const passwordKey = await crypto.subtle.importKey(
    'raw',
    passwordBytes,
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  );

  const derivedKey = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt as BufferSource,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256',
    },
    passwordKey,
    { name: 'AES-GCM', length: KEY_LENGTH },
    false, // Key stays in memory only
    ['encrypt', 'decrypt']
  );

  return derivedKey;
}

// Encrypt secrets before storing them
export async function encrypt(
  data: string,
  key: CryptoKey,
  salt: Uint8Array
): Promise<EncryptedVault> {
  const encoder = new TextEncoder();
  const dataBytes = encoder.encode(data);

  const iv = generateIV();

  const encryptedData = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv as BufferSource,
    },
    key,
    dataBytes
  );

  return {
    salt: arrayBufferToBase64(salt.buffer as ArrayBuffer),
    iv: arrayBufferToBase64(iv.buffer as ArrayBuffer),
    data: arrayBufferToBase64(encryptedData),
    version: 1,
  };
}

// Decrypt stored vault data
export async function decrypt(
  encryptedVault: EncryptedVault,
  key: CryptoKey
): Promise<string> {
  try {
    const iv = new Uint8Array(base64ToArrayBuffer(encryptedVault.iv));
    const encryptedData = new Uint8Array(base64ToArrayBuffer(encryptedVault.data));

    const decryptedData = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv as BufferSource,
      },
      key,
      encryptedData as BufferSource
    );

    const decoder = new TextDecoder();
    return decoder.decode(decryptedData);
  } catch (error) {
    throw new Error('Failed to decrypt vault. Wrong password or corrupted data.');
  }
}

// Check if password is correct without revealing vault contents
export async function verifyPassword(
  password: string,
  encryptedVault: EncryptedVault
): Promise<boolean> {
  try {
    const salt = new Uint8Array(base64ToArrayBuffer(encryptedVault.salt));
    const key = await deriveKey(password, salt);
    await decrypt(encryptedVault, key);
    return true;
  } catch {
    return false;
  }
}

// Rekey (change master password): derive a new key from `newPassword` and
// re-encrypt the provided plaintext secrets. Returns the new CryptoKey and
// an EncryptedVault object ready to persist via storageService.saveVault.
export async function rekeyVault(
  plaintextSecrets: unknown[],
  newPassword: string
): Promise<{ newKey: CryptoKey; encryptedVault: EncryptedVault }> {
  const newSalt = generateSalt();
  const key = await deriveKey(newPassword, newSalt);
  const vaultData = JSON.stringify(plaintextSecrets);
  const encryptedVault = await encrypt(vaultData, key, newSalt);
  return { newKey: key, encryptedVault };
}
