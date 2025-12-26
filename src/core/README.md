# 🎯 Core

This folder contains the **application core** - foundational setup and configuration.

## 📂 Structure

```
core/
├── App.tsx           # Root application component
├── App.css           # Global app styles
├── config/           # Application configuration
│   ├── constants.ts  # Constants and settings
│   ├── environment.ts # Environment config
│   ├── index.ts      # Exports
│   └── README.md     # Documentation
└── README.md         # This file
```

## 🎯 Purpose

The **core** folder contains:
- Application bootstrap and setup
- Global configuration
- Root-level components
- Environment handling

## 📄 Key Files

### **`App.tsx`**
The root React component that:
- Sets up application state
- Manages authentication flow
- Handles routing between features
- Integrates all major features

**Key Responsibilities:**
- ✅ State management (vault lock/unlock)
- ✅ Route orchestration (home → auth → vault)
- ✅ Global event handlers (auto-lock timer)
- ✅ Feature integration

### **`config/`**
Configuration module containing:
- Application constants
- Environment variables
- Feature flags
- Browser capability checks

See [config/README.md](./config/README.md) for details.

## 🏗️ Architecture

```
┌─────────────────────────────────┐
│          App.tsx (Core)         │
├─────────────────────────────────┤
│  ┌──────┐  ┌──────┐  ┌──────┐  │
│  │ Home │  │ Auth │  │Vault │  │ ← Features
│  └──────┘  └──────┘  └──────┘  │
│         ↓        ↓        ↓     │
│     ┌────────────────────┐      │
│     │   Shared Services  │      │ ← Shared
│     └────────────────────┘      │
└─────────────────────────────────┘
```

## 🎨 App.tsx Flow

### **State Management**
```typescript
// Global state
const [isLocked, setIsLocked] = useState(true);
const [masterKey, setMasterKey] = useState<CryptoKey | null>(null);
const [secrets, setSecrets] = useState<Secret[]>([]);
const [showHomePage, setShowHomePage] = useState(true);
```

### **Navigation Flow**
```
HomePage → UnlockScreen → VaultDashboard
   ↓            ↓              ↓
Get Started  Authenticate   Manage
```

### **Key Functions**
- `handleUnlock()` - Authenticate and decrypt vault
- `handleLock()` - Lock vault and clear sensitive data
- `handleAddSecret()` - Add new secret
- `handleUpdateSecret()` - Update existing secret
- `handleDeleteSecret()` - Remove secret

## ⚙️ Configuration Usage

### **Import Constants**
```typescript
import { 
  INACTIVITY_TIMEOUT,
  MIN_PASSWORD_LENGTH,
  TOAST_DURATION 
} from './config';
```

### **Check Environment**
```typescript
import { ENV, BROWSER_SUPPORT } from './config';

if (ENV.IS_DEV) {
  console.log('Development mode');
}

if (!BROWSER_SUPPORT.hasCrypto) {
  alert('Browser not supported');
}
```

## 🚀 Initialization

### **App Startup Sequence**
1. **Check vault existence** (`vaultExists()`)
2. **Set initial state** (locked/first-time)
3. **Skip homepage** if vault exists
4. **Setup auto-lock timer**
5. **Render appropriate screen**

### **Code Example**
```typescript
useEffect(() => {
  const hasVault = vaultExists();
  setIsFirstTime(!hasVault);
  
  if (hasVault) {
    setShowHomePage(false);
  }
}, []);
```

## 🔐 Security Features

### **Auto-Lock Timer**
Automatically locks vault after inactivity:
```typescript
useEffect(() => {
  if (isLocked) return;
  
  const resetTimer = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(handleLock, INACTIVITY_TIMEOUT);
  };
  
  // Listen for user activity
  events.forEach(event => {
    window.addEventListener(event, resetTimer);
  });
  
  return () => {
    // Cleanup
  };
}, [isLocked]);
```

### **Memory Cleanup**
Sensitive data cleared on lock:
```typescript
const handleLock = () => {
  setIsLocked(true);
  setMasterKey(null);    // Clear encryption key
  setSecrets([]);        // Clear decrypted secrets
  setSalt(null);         // Clear salt
};
```

## 📊 Data Flow

```
User Action → App.tsx Handler → Service Layer → Storage
     ↓              ↓                ↓             ↓
  Button      handleAddSecret()   encrypt()   localStorage
```

### **Example: Adding a Secret**
```
1. User fills SecretForm
2. Form calls onAddSecret()
3. App.tsx creates Secret object
4. Calls saveSecrets()
5. Encrypts all secrets
6. Saves to localStorage
7. Updates state
8. Shows toast notification
```

## 🎯 Best Practices

### **DO:**
✅ Keep App.tsx focused on orchestration  
✅ Delegate business logic to services  
✅ Use configuration constants  
✅ Clear sensitive data on lock  
✅ Handle errors gracefully  

### **DON'T:**
❌ Put business logic in App.tsx  
❌ Hard-code configuration values  
❌ Store unencrypted sensitive data  
❌ Skip error handling  
❌ Ignore browser compatibility  

## 🧪 Testing Considerations

When testing the core:
- Mock crypto services
- Test state transitions
- Verify memory cleanup
- Check auto-lock behavior
- Validate error handling

## 📝 Adding New Core Features

1. **Assess if it belongs in core**
   - Is it app-level concern?
   - Or feature-specific? (use `features/`)

2. **Add to appropriate location**
   - Global state → `App.tsx`
   - Configuration → `config/`
   - Utilities → `shared/utils/`

3. **Update documentation**

## 🔄 Lifecycle

```
App Mount
    ↓
Initialize State
    ↓
Check Vault Existence
    ↓
Show HomePage/UnlockScreen
    ↓
User Authenticates
    ↓
Decrypt & Load Secrets
    ↓
Show VaultDashboard
    ↓
Setup Auto-Lock
    ↓
User Activity
    ↓
Lock on Inactivity/Manual
    ↓
Clear Sensitive Data
    ↓
Back to UnlockScreen
```

---

**The core is the heart of your application!** 🎯✨

For configuration details, see [config/README.md](./config/README.md)

