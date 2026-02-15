# API Implementation Documentation

## Overview
This Hotel Management System uses **Firebase** as the backend with **Firestore** for the database and **Firebase Authentication** for user management. The APIs are implemented as JavaScript modules that interact with Firebase services.

## 📁 API Implementation Locations

### 1. Firebase Configuration
**File:** `src/config/firebase.js`

This file initializes Firebase and exports the necessary services:
- **Firebase Auth** (`auth`)
- **Firestore Database** (`db`)
- **Google Auth Provider** (`googleProvider`)

**Key Features:**
- Environment variable validation
- Firebase SDK initialization
- Google OAuth configuration

**Example:**
```javascript
import { auth, db, googleProvider } from '../config/firebase';
```

---

### 2. Database Service Layer
**File:** `src/services/firebase.service.js`

This is the main API service layer containing all CRUD operations for the application.

#### 📋 Bookings API

##### **createBooking(userId, bookingData)**
- **Purpose:** Create a new hotel room booking
- **Parameters:**
  - `userId` (string): User ID
  - `bookingData` (object): Booking details (roomId, roomName, checkIn, checkOut, guests, totalPrice)
- **Returns:** `{ success: boolean, id?: string, error?: string }`
- **Firestore Collection:** `bookings`

##### **getUserBookings(userId)**
- **Purpose:** Get all bookings for a specific user
- **Parameters:**
  - `userId` (string): User ID
- **Returns:** `{ success: boolean, bookings?: array, error?: string }`
- **Firestore Collection:** `bookings`
- **Query:** Filtered by userId, ordered by createdAt (descending)

##### **getBooking(bookingId)**
- **Purpose:** Get a specific booking by ID
- **Parameters:**
  - `bookingId` (string): Booking document ID
- **Returns:** `{ success: boolean, booking?: object, error?: string }`

##### **updateBooking(bookingId, updates)**
- **Purpose:** Update booking details
- **Parameters:**
  - `bookingId` (string): Booking document ID
  - `updates` (object): Fields to update
- **Returns:** `{ success: boolean, error?: string }`

##### **cancelBooking(bookingId)**
- **Purpose:** Cancel a booking (sets status to "cancelled")
- **Parameters:**
  - `bookingId` (string): Booking document ID
- **Returns:** `{ success: boolean, error?: string }`

##### **deleteBooking(bookingId)**
- **Purpose:** Permanently delete a booking
- **Parameters:**
  - `bookingId` (string): Booking document ID
- **Returns:** `{ success: boolean, error?: string }`

---

#### 🏨 Rooms API

##### **getAllRooms()**
- **Purpose:** Fetch all available rooms
- **Parameters:** None
- **Returns:** `{ success: boolean, rooms?: array, error?: string }`
- **Firestore Collection:** `rooms`

##### **getAvailableRooms(filters)**
- **Purpose:** Get rooms based on filter criteria
- **Parameters:**
  - `filters` (object): Optional filters
    - `minPrice` (number): Minimum price
    - `maxPrice` (number): Maximum price
    - `type` (string): Room type
    - `guests` (number): Number of guests
    - `available` (boolean): Availability status
- **Returns:** `{ success: boolean, rooms?: array, error?: string }`
- **Note:** Uses client-side filtering for complex queries

##### **getRoom(roomId)**
- **Purpose:** Get specific room details
- **Parameters:**
  - `roomId` (string): Room document ID
- **Returns:** `{ success: boolean, room?: object, error?: string }`

---

#### 👤 User Profile API

##### **updateUserProfile(userId, profileData)**
- **Purpose:** Update user profile information
- **Parameters:**
  - `userId` (string): User ID
  - `profileData` (object): Profile fields to update (name, phone, etc.)
- **Returns:** `{ success: boolean, error?: string }`
- **Firestore Collection:** `users`

##### **getUserProfile(userId)**
- **Purpose:** Get user profile data
- **Parameters:**
  - `userId` (string): User ID
- **Returns:** `{ success: boolean, profile?: object, error?: string }`

---

#### ⭐ Reviews API

##### **addReview(roomId, userId, reviewData)**
- **Purpose:** Add a review for a room
- **Parameters:**
  - `roomId` (string): Room document ID
  - `userId` (string): User ID
  - `reviewData` (object): Review content (rating, comment)
- **Returns:** `{ success: boolean, id?: string, error?: string }`
- **Firestore Collection:** `reviews`

##### **getRoomReviews(roomId)**
- **Purpose:** Get all reviews for a specific room
- **Parameters:**
  - `roomId` (string): Room document ID
- **Returns:** `{ success: boolean, reviews?: array, error?: string }`
- **Query:** Filtered by roomId, ordered by createdAt (descending)

---

### 3. Authentication API
**File:** `src/contexts/AuthContext.jsx`

The AuthContext provides authentication functionality throughout the application.

#### Authentication Methods

##### **login(email, password)**
- **Purpose:** Sign in with email and password
- **Parameters:**
  - `email` (string): User email
  - `password` (string): User password
- **Returns:** `{ success: boolean, user?: object, error?: string }`
- **Firebase Method:** `signInWithEmailAndPassword()`

##### **signup(email, password, name, phone)**
- **Purpose:** Create a new user account
- **Parameters:**
  - `email` (string): User email
  - `password` (string): User password
  - `name` (string): User full name
  - `phone` (string): User phone number
- **Returns:** `{ success: boolean, user?: object, error?: string }`
- **Firebase Methods:** 
  - `createUserWithEmailAndPassword()`
  - `updateProfile()`
  - Creates user document in Firestore `users` collection

##### **signInWithGoogle()**
- **Purpose:** Sign in with Google OAuth
- **Parameters:** None
- **Returns:** `{ success: boolean, user?: object, error?: string }`
- **Firebase Method:** `signInWithPopup()` with GoogleAuthProvider
- **Auto-creates user profile** in Firestore if it doesn't exist

##### **logout()**
- **Purpose:** Sign out the current user
- **Parameters:** None
- **Returns:** Promise
- **Firebase Method:** `signOut()`

---

### 4. Sample Data Initialization
**File:** `src/services/initData.js`

This file contains functions to populate the database with sample data for development and testing.

---

## 🗄️ Database Schema

### Collections

#### **users** Collection
```javascript
{
  uid: string,              // Firebase Auth user ID
  name: string,             // User's full name
  email: string,            // User's email
  phone: string,            // User's phone number
  photoURL: string | null,  // Profile picture URL
  createdAt: Timestamp,     // Account creation timestamp
  updatedAt: Timestamp,     // Last profile update
  isAdmin: boolean          // Admin flag (optional)
}
```

#### **bookings** Collection
```javascript
{
  userId: string,           // Reference to users collection
  roomId: string,           // Reference to rooms collection
  roomName: string,         // Room name (denormalized)
  roomImage: string,        // Room image URL (denormalized)
  checkIn: string,          // Check-in date (ISO format)
  checkOut: string,         // Check-out date (ISO format)
  guests: number,           // Number of guests
  totalPrice: number,       // Total booking price
  status: string,           // "confirmed" | "pending" | "cancelled"
  createdAt: Timestamp,     // Booking creation timestamp
  updatedAt: Timestamp      // Last update timestamp
}
```

#### **rooms** Collection
```javascript
{
  name: string,             // Room name
  type: string,             // Room type (Deluxe, Executive, etc.)
  price: number,            // Price per night
  rating: number,           // Room rating (0-5)
  image: string,            // Room image URL
  maxGuests: number,        // Maximum number of guests
  amenities: string[],      // List of amenities
  description: string,      // Room description
  available: boolean,       // Availability status
  size: string              // Room size (e.g., "450 sq ft")
}
```

#### **reviews** Collection
```javascript
{
  roomId: string,           // Reference to rooms collection
  userId: string,           // Reference to users collection
  rating: number,           // Rating (1-5)
  comment: string,          // Review comment
  createdAt: Timestamp      // Review creation timestamp
}
```

---

## 🔌 How to Use the APIs

### Example: Creating a Booking

```javascript
import { createBooking } from '../services/firebase.service';
import { useAuth } from '../contexts/AuthContext';

function BookingComponent() {
  const { user } = useAuth();
  
  const handleBooking = async () => {
    const bookingData = {
      roomId: 'room123',
      roomName: 'Deluxe Suite',
      roomImage: '/images/deluxe.jpg',
      checkIn: '2024-03-01',
      checkOut: '2024-03-05',
      guests: 2,
      totalPrice: 800
    };
    
    const result = await createBooking(user.uid, bookingData);
    
    if (result.success) {
      console.log('Booking created with ID:', result.id);
    } else {
      console.error('Error:', result.error);
    }
  };
  
  return <button onClick={handleBooking}>Book Now</button>;
}
```

### Example: Fetching User Bookings

```javascript
import { getUserBookings } from '../services/firebase.service';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';

function MyBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  
  useEffect(() => {
    const fetchBookings = async () => {
      const result = await getUserBookings(user.uid);
      if (result.success) {
        setBookings(result.bookings);
      }
    };
    
    fetchBookings();
  }, [user.uid]);
  
  return (
    <div>
      {bookings.map(booking => (
        <div key={booking.id}>
          <h3>{booking.roomName}</h3>
          <p>Check-in: {booking.checkIn}</p>
          <p>Status: {booking.status}</p>
        </div>
      ))}
    </div>
  );
}
```

### Example: Google Sign-In

```javascript
import { useAuth } from '../contexts/AuthContext';

function LoginPage() {
  const { signInWithGoogle } = useAuth();
  
  const handleGoogleSignIn = async () => {
    const result = await signInWithGoogle();
    if (result.success) {
      console.log('Signed in as:', result.user.email);
    } else {
      console.error('Error:', result.error);
    }
  };
  
  return (
    <button onClick={handleGoogleSignIn}>
      Sign in with Google
    </button>
  );
}
```

---

## 🔒 Security

### Firebase Security Rules
The application requires proper Firestore security rules to protect data. See `FIREBASE_SETUP.md` for recommended security rules.

### Environment Variables
All Firebase credentials are stored in environment variables:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

---

## 📚 Additional Resources

- **Setup Guide:** `FIREBASE_SETUP.md` - Complete Firebase setup instructions
- **Implementation Summary:** `IMPLEMENTATION_SUMMARY.md` - Overview of all implemented features
- **Environment Template:** `.env.example` - Template for environment variables

---

## 🛠️ Technology Stack

- **Backend Service:** Firebase
- **Database:** Cloud Firestore (NoSQL)
- **Authentication:** Firebase Authentication
- **OAuth Provider:** Google OAuth 2.0
- **Client SDK:** Firebase JavaScript SDK v10.x

---

## 📝 Notes

1. **Client-Side Filtering:** Complex queries with multiple filters are performed client-side due to Firestore query limitations. For production with large datasets, consider using Algolia or Elasticsearch.

2. **Error Handling:** All API functions return a consistent response format with `success` and `error` fields for easy error handling.

3. **Server Timestamps:** All timestamps use Firebase `serverTimestamp()` to ensure consistency across different client timezones.

4. **Denormalization:** Some data (like `roomName` and `roomImage` in bookings) is denormalized for performance optimization.

---

**Last Updated:** February 2024  
**Version:** 1.0.0
