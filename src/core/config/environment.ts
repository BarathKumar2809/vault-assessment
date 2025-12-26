// Environment config and browser checks

export const ENV = {
  MODE: import.meta.env.MODE as 'development' | 'production' | 'test',
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
  BASE_URL: import.meta.env.BASE_URL,
} as const;

export const BROWSER_SUPPORT = {
  hasCrypto: typeof crypto !== 'undefined' && 
             typeof crypto.subtle !== 'undefined',

  hasLocalStorage: (() => {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  })(),

  hasClipboard: typeof navigator !== 'undefined' && 
                typeof navigator.clipboard !== 'undefined',
} as const;

export const RUNTIME_CONFIG = {
  maxSecrets: 1000,
  enablePerformanceMonitoring: ENV.IS_DEV,
  enableErrorReporting: ENV.IS_PROD,
  logLevel: ENV.IS_DEV ? 'debug' : 'error',
} as const;

// Validate browser has required features
export function validateBrowserSupport(): void {
  const issues: string[] = [];

  if (!BROWSER_SUPPORT.hasCrypto) {
    issues.push('Web Crypto API is not supported');
  }

  if (!BROWSER_SUPPORT.hasLocalStorage) {
    issues.push('localStorage is not available');
  }

  if (issues.length > 0) {
    throw new Error(
      `Browser compatibility issues detected:\n${issues.join('\n')}`
    );
  }
}

// Dev only , log env info
export function logEnvironmentInfo(): void {
  if (!ENV.IS_DEV) return;

  console.group('🔧 Environment Information');
  console.log('Mode:', ENV.MODE);
  console.log('Base URL:', ENV.BASE_URL);
  console.log('Web Crypto API:', BROWSER_SUPPORT.hasCrypto ? '✅' : '❌');
  console.log('LocalStorage:', BROWSER_SUPPORT.hasLocalStorage ? '✅' : '❌');
  console.log('Clipboard API:', BROWSER_SUPPORT.hasClipboard ? '✅' : '❌');
  console.groupEnd();
}

