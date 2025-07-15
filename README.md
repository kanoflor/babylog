# 👶 Babylog

**Babylog** is a minimal baby care log app designed for parents to record and share their baby’s daily activities—such as feeding, diaper changes, and sleep.

This MVP version allows users to sign up with email/password, and record simple logs under key categories.

---

## 🏛 Architecture Overview

babylog/
├── 📱 UI Layer (Expo Router)
│ └── app/ # File-based routing
│
├── 🧩 Feature Modules (Domain-driven)
│ ├── auth/
│ └── logs/
│    ├── api/
│    ├── components/
│    ├── config/
│    └── hooks/
│
├── 🗄️ State Management
│ └── stores/
│
└── 🔥 Third-party Integration
  └── lib/

**Key Technologies:**
- **Expo Router**: Navigation
- **React Query**: Server state management
- **Zustand**: Local state management
- **Firebase**: Authentication + Firestore real-time database
- **AsyncStorage**: Persistent local storage