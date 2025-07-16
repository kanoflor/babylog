# 👶 Babylog

**Babylog** is a minimal baby care log app designed for parents to record and share their baby’s daily activities—such as feeding, diaper changes, and sleep.

This MVP version allows users to sign up with email/password, and record simple logs under key categories.

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Expo CLI**: `npm install -g @expo/cli`

For mobile development:

- **iOS**: Xcode (macOS only)
- **Android**: Android Studio with SDK

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd babylog
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

### Running the App

Start the development server:

```bash
npm start
# or
yarn start
```

3. **Firebase Setup**
   
   This app uses Firebase for authentication and Firestore database. You'll need to:
   
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password provider)
   - Create a Firestore database
   - Add your Firebase configuration to the project (check `lib/firebase.ts`)

### Alternative Run Commands

```bash
# Run directly on Android
npm run android

# Run directly on iOS (macOS only)
npm run ios
```

---


**Key Technologies:**

- **Expo Router**: Navigation
- **React Query**: Server state management
- **Zustand**: Local state management
- **Firebase**: Authentication + Firestore real-time database
- **AsyncStorage**: Persistent local storage

---

## 🏛 Architecture Overview

babylog/
├── 📱 UI Layer (Expo Router)
│ └── app/ # File-based routing
│
├── 🧩 Feature Modules (Domain-driven)
│ ├── auth/
│ └── logs/
│ ├── api/
│ ├── components/
│ ├── config/
│ └── hooks/
│
├── 🗄️ State Management
│ └── stores/
│
└── 🔥 Third-party Integration
└── lib/

---
