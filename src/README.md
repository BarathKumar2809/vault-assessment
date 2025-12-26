# 📦 Source Code Structure

## Overview

This directory contains the application source code organized using **professional, enterprise-grade architecture patterns**.

## 📂 Quick Directory Reference

```
src/
├── core/           → Application core & configuration
├── features/       → Feature modules (domain-specific)
├── shared/         → Shared resources (cross-cutting)
├── assets/         → Static files
├── main.tsx        → Entry point
└── index.css       → Base styles
```

## 🎯 Key Principles

### 1. Feature-Based Architecture
Each feature is **self-contained** and independent:
- `auth/` - Authentication & vault unlocking
- `home/` - Landing page
- `vault/` - Password vault management

### 2. Shared Resources
Common code used across features:
- `components/` - Reusable UI components
- `services/` - Business logic (crypto, storage)
- `utils/` - Helper functions
- `hooks/` - Custom React hooks
- `types/` - TypeScript definitions
- `styles/` - Global styling

### 3. Clean Imports
Each module exports through `index.ts` for clean imports.

## 📚 Learn More

See [FOLDER_STRUCTURE.md](../../FOLDER_STRUCTURE.md) for comprehensive documentation on the architecture, design principles, and detailed folder structure.

---

**Built with React + TypeScript + Vite** ⚡

