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
│
├── 🗄️ State Management
│ └── stores/
│
└── 🔥 Third-party Integration
└── lib/
