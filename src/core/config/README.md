# ⚙️ Configuration

This folder contains **application-wide configuration** and constants.

## 📂 Files

### **`constants.ts`**
Centralized configuration values used throughout the application.

**Categories:**
- 🔒 Security & Encryption settings
- 💾 Storage configuration
- 🎨 UI/UX settings
- 🔑 Password requirements
- 🎲 Password generator defaults
- 🏷️ Categories and labels
- ✨ Feature flags

**Usage:**
```typescript
import { INACTIVITY_TIMEOUT, MIN_PASSWORD_LENGTH } from '@/core/config';

// Use in your code
setTimeout(handleLock, INACTIVITY_TIMEOUT);
```

### **`environment.ts`**
Environment-specific configuration and browser capability checks.

**Includes:**
- Environment mode (dev/prod)
- Browser support detection
- Runtime configuration
- Validation functions

**Usage:**
```typescript
import { ENV, BROWSER_SUPPORT, validateBrowserSupport } from '@/core/config';

// Check environment
if (ENV.IS_DEV) {
  console.log('Development mode');
}

// Validate browser
validateBrowserSupport();
```

## 🎯 Why Configuration Files?

### **Benefits:**
✅ **Single Source of Truth** - Change once, apply everywhere  
✅ **Type Safety** - TypeScript constants prevent typos  
✅ **Easy Maintenance** - All settings in one place  
✅ **Documentation** - Comments explain each setting  
✅ **Testing** - Easy to mock/override in tests  

### **Example:**

**❌ Without Constants:**
```typescript
// Scattered throughout codebase
setTimeout(lock, 300000);  // What is 300000?
if (password.length < 6) // Why 6?
```

**✅ With Constants:**
```typescript
// Clear and documented
import { INACTIVITY_TIMEOUT, MIN_PASSWORD_LENGTH } from '@/core/config';

setTimeout(lock, INACTIVITY_TIMEOUT);  // 5 minutes - clear!
if (password.length < MIN_PASSWORD_LENGTH) // Documented requirement
```

## 📝 Adding New Constants

1. **Add to `constants.ts`:**
```typescript
/**
 * Your constant description
 * @default value
 */
export const YOUR_CONSTANT = value;
```

2. **Group logically** with related constants

3. **Document thoroughly** with JSDoc comments

4. **Export** via `index.ts` (automatic)

## 🔐 Security Best Practices

### **DO:**
✅ Use constants for sensitive values  
✅ Document security implications  
✅ Use `as const` for immutable values  
✅ Validate environment on app start  

### **DON'T:**
❌ Store API keys here (use `.env`)  
❌ Commit secrets to version control  
❌ Use weak default values  
❌ Make security constants configurable  

## 🎛️ Feature Flags

Control feature availability via `FEATURE_FLAGS`:

```typescript
import { FEATURE_FLAGS } from '@/core/config';

if (FEATURE_FLAGS.enableAutoLock) {
  // Enable auto-lock feature
}
```

**Usage:**
- Enable/disable features without code changes
- A/B testing
- Gradual rollouts
- Emergency feature toggles

## 📊 Configuration Categories

| Category | Purpose | Examples |
|----------|---------|----------|
| **Security** | Crypto & auth settings | Key length, iterations |
| **Storage** | Data persistence | localStorage keys |
| **UI/UX** | User experience | Toast duration, debounce |
| **Validation** | Input rules | Min/max lengths, regex |
| **Features** | Enable/disable | Feature flags |

## 🚀 Best Practices

1. **Keep it organized** - Group related constants
2. **Document everything** - Future you will thank you
3. **Use TypeScript** - `as const` for type safety
4. **Don't over-configure** - Not everything needs a constant
5. **Review regularly** - Remove unused constants

---

**Centralized configuration = Maintainable code!** ⚙️✨

