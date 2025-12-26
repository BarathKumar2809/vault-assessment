import { describe, it, expect } from 'vitest';
import {
  generateSalt,
  deriveKey,
  encrypt,
  decrypt,
  verifyPassword,
  rekeyVault,
} from '../cryptoService';

describe('cryptoService', () => {
  it('encrypts and decrypts a string', async () => {
    const password = 'test-password-123';
    const salt = generateSalt();
    const key = await deriveKey(password, salt);

    const plaintext = JSON.stringify([{ id: '1', name: 'example', secret: 's' }]);
    const encrypted = await encrypt(plaintext, key, salt);

    const decrypted = await decrypt(encrypted, key);
    expect(decrypted).toBe(plaintext);
  });

  it('verifyPassword succeeds for correct password and fails for wrong one', async () => {
    const password = 'verify-pass-321';
    const salt = generateSalt();
    const key = await deriveKey(password, salt);
    const vaultData = JSON.stringify([{ foo: 'bar' }]);
    const encrypted = await encrypt(vaultData, key, salt);

    const ok = await verifyPassword(password, encrypted);
    expect(ok).toBe(true);

    const bad = await verifyPassword('incorrect', encrypted);
    expect(bad).toBe(false);
  });

  it('rekeyVault produces a vault decryptable with the new password and not with the old one', async () => {
    const oldPassword = 'old-pass-1';
    const newPassword = 'new-pass-2';

    const secrets = [{ id: 'a', value: 'secret-value' }];

    // Rekey to new password
    const { newKey, encryptedVault } = await rekeyVault(secrets, newPassword);

    // decrypt with newKey
    const decrypted = await decrypt(encryptedVault, newKey);
    expect(JSON.parse(decrypted)).toEqual(secrets);

    // try derive old key and ensure it cannot decrypt the new vault
    const oldSalt = generateSalt();
    const oldKey = await deriveKey(oldPassword, oldSalt);
    let threw = false;
    try {
      await decrypt(encryptedVault, oldKey);
    } catch (e) {
      threw = true;
    }
    expect(threw).toBe(true);
  });
});
