# 📦 Assets

This folder contains **static assets** used throughout the application.

## 📂 Contents

### **Images & Icons**
- `logo.svg` - Application logo (used in navbar, favicon, etc.)
- Add more images here as needed

### **Usage**

```typescript
import logo from '@/assets/logo.svg';

function Header() {
  return <img src={logo} alt="Vault Logo" />;
}
```

## 📝 Guidelines

### **What to Put Here:**
✅ Images (PNG, JPG, SVG)  
✅ Icons and logos  
✅ Fonts (if not using CDN)  
✅ Videos  
✅ PDFs and documents  
✅ Any static media files  

### **What NOT to Put Here:**
❌ Code/Components (use `components/`)  
❌ Styles (use `shared/styles/`)  
❌ Types (use `shared/types/`)  
❌ Configuration (use `core/config/`)  

## 🎨 Naming Conventions

- Use **kebab-case**: `logo-dark.svg`, `user-avatar.png`
- Be descriptive: `vault-icon-32x32.png` instead of `icon.png`
- Group by type: `icons/`, `images/`, `fonts/`

## 📐 Best Practices

1. **Optimize images** before adding (use ImageOptim, TinyPNG, etc.)
2. **Use SVG** for logos and icons when possible
3. **Provide multiple sizes** for raster images if needed
4. **Use descriptive names** to avoid confusion

---

**Keep assets organized and optimized!** 🚀

