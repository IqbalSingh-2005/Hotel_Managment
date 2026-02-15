# API Quick Reference Guide

## 🚀 Quick Start

This Hotel Management System's APIs are implemented using Firebase. All API functions are located in `src/services/firebase.service.js` and authentication APIs are in `src/contexts/AuthContext.jsx`.

---

## 📍 Where APIs Are Implemented

### 1. **Firebase Configuration**
   - **Location:** `src/config/firebase.js`
   - **Purpose:** Initialize Firebase services
   - **Exports:** `auth`, `db`, `googleProvider`

### 2. **Database APIs (CRUD Operations)**
   - **Location:** `src/services/firebase.service.js`
   - **APIs:**
     - Bookings API (6 functions)
     - Rooms API (3 functions)
     - User Profile API (2 functions)
     - Reviews API (2 functions)

### 3. **Authentication APIs**
   - **Location:** `src/contexts/AuthContext.jsx`
   - **APIs:**
     - `login()` - Email/password login
     - `signup()` - User registration
     - `signInWithGoogle()` - Google OAuth
     - `logout()` - Sign out

### 4. **Sample Data**
   - **Location:** `src/services/initData.js`
   - **Purpose:** Initialize database with sample rooms

---

## 📚 API Categories

### Bookings (6 APIs)
```javascript
import { 
  createBooking,
  getUserBookings,
  getBooking,
  updateBooking,
  cancelBooking,
  deleteBooking 
} from '../services/firebase.service';
```

### Rooms (3 APIs)
```javascript
import { 
  getAllRooms,
  getAvailableRooms,
  getRoom 
} from '../services/firebase.service';
```

### User Profile (2 APIs)
```javascript
import { 
  updateUserProfile,
  getUserProfile 
} from '../services/firebase.service';
```

### Reviews (2 APIs)
```javascript
import { 
  addReview,
  getRoomReviews 
} from '../services/firebase.service';
```

### Authentication (4 APIs)
```javascript
import { useAuth } from '../contexts/AuthContext';

const { 
  login, 
  signup, 
  signInWithGoogle, 
  logout 
} = useAuth();
```

---

## 🔗 Firestore Collections

The APIs interact with these Firestore collections:

1. **`users`** - User profiles and account information
2. **`bookings`** - Room reservations and booking details
3. **`rooms`** - Hotel rooms with pricing and availability
4. **`reviews`** - User reviews for rooms

---

## 💡 Common Usage Patterns

### Create a Booking
```javascript
const result = await createBooking(user.uid, {
  roomId: 'room123',
  roomName: 'Deluxe Suite',
  checkIn: '2024-03-01',
  checkOut: '2024-03-05',
  guests: 2,
  totalPrice: 800
});
```

### Get User's Bookings
```javascript
const result = await getUserBookings(user.uid);
if (result.success) {
  console.log(result.bookings);
}
```

### Search Rooms
```javascript
const result = await getAvailableRooms({
  minPrice: 100,
  maxPrice: 500,
  guests: 2,
  type: 'Deluxe'
});
```

### Google Sign-In
```javascript
const { signInWithGoogle } = useAuth();
const result = await signInWithGoogle();
```

---

## 📖 Full Documentation

For complete API documentation with all parameters, return types, and detailed examples, see:
- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Complete API reference
- **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)** - Firebase setup guide
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Feature overview

---

## 🛠️ Tech Stack

- **Backend:** Firebase
- **Database:** Cloud Firestore
- **Authentication:** Firebase Authentication + Google OAuth
- **SDK:** Firebase JavaScript SDK v10.x

---

## 🔒 Environment Setup

Required environment variables (see `.env.example`):
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

**Need Help?** Check the full documentation in API_DOCUMENTATION.md
