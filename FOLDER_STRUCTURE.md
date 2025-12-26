# 📁 Folder Structure

This project follows a **professional, scalable architecture** based on industry best practices.

## 🏗️ Architecture Overview

```
src/
├── core/                    # Core application setup
│   ├── App.tsx             # Root application component
│   ├── App.css             # Global app styles
│   └── config/             # App-level configuration
│
├── features/                # Feature-based modules (domain logic)
│   ├── auth/               # Authentication & unlock
│   │   ├── UnlockScreen.tsx
│   │   ├── UnlockScreen.css
│   │   └── index.ts        # Feature exports
│   │
│   ├── home/               # Homepage/landing
│   │   ├── HomePage.tsx
│   │   ├── HomePage.css
│   │   └── index.ts
│   │
│   └── vault/              # Vault management
│       ├── VaultDashboard.tsx
│       ├── SecretItem.tsx
│       ├── SecretForm.tsx
│       ├── *.css
│       └── index.ts
│
├── shared/                  # Shared resources (cross-cutting concerns)
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Basic UI elements (Toast, SearchBar, etc.)
│   │   │   ├── Toast.tsx
│   │   │   ├── ToastContainer.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   └── index.ts
│   │   │
│   │   └── forms/         # Form-specific components
│   │       ├── PasswordGenerator.tsx
│   │       └── index.ts
│   │
│   ├── hooks/             # Custom React hooks
│   │   ├── useToast.ts
│   │   └── index.ts
│   │
│   ├── services/          # Business logic & external services
│   │   ├── cryptoService.ts     # Web Crypto API operations
│   │   ├── storageService.ts    # localStorage management
│   │   └── index.ts
│   │
│   ├── utils/             # Helper functions
│   │   ├── clipboard.ts
│   │   ├── passwordGenerator.ts
│   │   └── index.ts
│   │
│   ├── types/             # TypeScript types & interfaces
│   │   └── index.ts
│   │
│   └── styles/            # Global styles
│       ├── variables.css   # CSS custom properties
│       └── global.css      # Global styling
│
├── assets/                 # Static assets (images, icons, etc.)
│
├── main.tsx               # Application entry point
└── index.css              # Base styles

```

## 📋 Design Principles

### 1. **Feature-Based Organization**
- Each feature is self-contained in its own folder
- Makes it easy to find, modify, or remove features
- Scales well as the application grows

### 2. **Separation of Concerns**
- **Features**: Business logic and domain-specific code
- **Shared**: Reusable code used across features
- **Core**: Application-level setup and configuration

### 3. **Atomic Design Principles**
- UI components organized by complexity
- **ui/**: Basic, reusable components (atoms/molecules)
- **forms/**: Form-specific components (molecules/organisms)

### 4. **Clear Import Paths**
- Each module has an `index.ts` for clean exports
- Enables barrel exports: `import { Toast } from '@/shared/components/ui'`
- Makes refactoring easier

### 5. **Scalability**
- Easy to add new features without touching existing code
- Can add sub-features within feature folders
- Can split large features into smaller ones

## 🎯 Benefits

✅ **Easy Navigation**: Find code quickly by feature or concern  
✅ **Maintainable**: Changes isolated to specific modules  
✅ **Testable**: Each module can be tested independently  
✅ **Scalable**: Grows cleanly as features are added  
✅ **Readable**: Clear hierarchy and naming conventions  
✅ **Professional**: Follows industry-standard patterns  

## 📝 Naming Conventions

- **Folders**: lowercase, dash-separated (e.g., `password-generator`)
- **Components**: PascalCase (e.g., `VaultDashboard.tsx`)
- **Utilities**: camelCase (e.g., `passwordGenerator.ts`)
- **Types**: PascalCase (e.g., `Secret`, `NotificationType`)
- **CSS**: Matches component name (e.g., `VaultDashboard.css`)

## 🔄 Import Examples

### Before (Flat Structure)
```typescript
import Toast from '../../components/Toast';
import { encrypt } from '../../services/cryptoService';
import type { Secret } from '../../types';
```

### After (Organized Structure)
```typescript
import { Toast } from '@/shared/components/ui';
import { encrypt } from '@/shared/services';
import type { Secret } from '@/shared/types';
```

## 🚀 Adding New Features

1. Create new folder in `features/`
2. Add components, styles, and logic
3. Create `index.ts` for exports
4. Import from other features as needed

Example:
```
features/
└── settings/
    ├── SettingsPage.tsx
    ├── SettingsPage.css
    ├── components/
    │   ├── ThemeToggle.tsx
    │   └── SecuritySettings.tsx
    └── index.ts
```

## 📚 Resources

- [Feature-Sliced Design](https://feature-sliced.design/)
- [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)
- [React Folder Structure Best Practices](https://reactjs.org/docs/faq-structure.html)

---

**This structure is designed to scale from small projects to enterprise applications.** 🏗️✨

