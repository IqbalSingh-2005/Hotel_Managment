# API Implementation Map

## Visual Overview of API Locations

```
Hotel_Managment/
│
├── 📁 src/
│   │
│   ├── 📁 config/
│   │   └── 🔥 firebase.js ..................... [Firebase Initialization]
│   │       ├── exports: auth
│   │       ├── exports: db  
│   │       └── exports: googleProvider
│   │
│   ├── 📁 contexts/
│   │   └── 🔐 AuthContext.jsx ................. [Authentication APIs]
│   │       ├── login(email, password)
│   │       ├── signup(email, password, name, phone)
│   │       ├── signInWithGoogle()
│   │       └── logout()
│   │
│   └── 📁 services/
│       ├── 🗄️ firebase.service.js ............ [Database CRUD APIs]
│       │   │
│       │   ├── 📋 Bookings (6 APIs)
│       │   │   ├── createBooking()
│       │   │   ├── getUserBookings()
│       │   │   ├── getBooking()
│       │   │   ├── updateBooking()
│       │   │   ├── cancelBooking()
│       │   │   └── deleteBooking()
│       │   │
│       │   ├── 🏨 Rooms (3 APIs)
│       │   │   ├── getAllRooms()
│       │   │   ├── getAvailableRooms()
│       │   │   └── getRoom()
│       │   │
│       │   ├── 👤 User Profile (2 APIs)
│       │   │   ├── updateUserProfile()
│       │   │   └── getUserProfile()
│       │   │
│       │   └── ⭐ Reviews (2 APIs)
│       │       ├── addReview()
│       │       └── getRoomReviews()
│       │
│       └── 📊 initData.js ..................... [Sample Data]
│           └── initializeRooms()
│
└── 📚 Documentation/
    ├── API_DOCUMENTATION.md ................... [Complete API Reference]
    ├── API_QUICK_REFERENCE.md ................. [Quick Lookup Guide]
    ├── FIREBASE_SETUP.md ...................... [Firebase Setup Instructions]
    └── README.md .............................. [Project Overview]
```

---

## 🎯 Quick Access

### Need Firebase Setup?
➜ See `FIREBASE_SETUP.md`

### Need API Details?
➜ See `API_DOCUMENTATION.md`

### Need Quick Reference?
➜ See `API_QUICK_REFERENCE.md`

### Need Implementation Overview?
➜ See `IMPLEMENTATION_SUMMARY.md`

---

## 📊 API Statistics

- **Total API Functions:** 17
- **Authentication APIs:** 4
- **Database APIs:** 13
- **Firestore Collections:** 4 (users, bookings, rooms, reviews)
- **Backend:** Firebase (Cloud Firestore + Firebase Auth)

---

## 🔍 Find Specific API

| What You Need | Where to Look |
|---------------|---------------|
| Create booking | `src/services/firebase.service.js` → `createBooking()` |
| Get user bookings | `src/services/firebase.service.js` → `getUserBookings()` |
| Search rooms | `src/services/firebase.service.js` → `getAvailableRooms()` |
| Update profile | `src/services/firebase.service.js` → `updateUserProfile()` |
| Login with email | `src/contexts/AuthContext.jsx` → `login()` |
| Login with Google | `src/contexts/AuthContext.jsx` → `signInWithGoogle()` |
| Add review | `src/services/firebase.service.js` → `addReview()` |

---

## 💻 Import Examples

### Import Database APIs
```javascript
import { 
  createBooking, 
  getAllRooms, 
  updateUserProfile 
} from './services/firebase.service';
```

### Import Authentication
```javascript
import { useAuth } from './contexts/AuthContext';
```

### Import Firebase Config
```javascript
import { auth, db, googleProvider } from './config/firebase';
```

---

## 🚀 Getting Started

1. **Set up Firebase** → Follow `FIREBASE_SETUP.md`
2. **Configure Environment** → Copy `.env.example` to `.env`
3. **Read API Docs** → Check `API_DOCUMENTATION.md`
4. **Start Development** → Run `npm run dev`

---

**Last Updated:** February 15, 2026  
**Version:** 1.0.0
