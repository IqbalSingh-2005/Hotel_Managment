# Firebase Setup Guide

This document explains how to set up Firebase for the Hotel Management System.

## Prerequisites

- A Google account
- Access to Firebase Console (https://console.firebase.google.com)

## Setup Instructions

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add Project"
3. Use project ID: `gen-lang-client-0114691969` (or create a new one)
4. Follow the setup wizard

### 2. Enable Authentication

1. In your Firebase project, go to **Authentication** → **Sign-in method**
2. Enable **Email/Password** authentication
3. Enable **Google** authentication
   - You'll need to configure OAuth consent screen
   - Use the provided client ID: `554284144835-p0cqu2v4rgons89hdtr1jppg07ru1nph.apps.googleusercontent.com`

### 3. Create Firestore Database

1. Go to **Firestore Database** in your Firebase project
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location close to your users

### 4. Configure Firebase in Your App

The Firebase configuration is already set up in `src/config/firebase.js`. You'll need to update it with your actual Firebase project credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

To find these values:
1. Go to Project Settings (gear icon) → General
2. Scroll down to "Your apps"
3. Click on the web app (</>) icon
4. Copy the config values

### 5. Set Up Security Rules

In Firestore, go to **Rules** tab and use these rules for development:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can read/write their own data
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Bookings collection - users can read/write their own bookings
    match /bookings/{bookingId} {
      allow read: if request.auth != null && 
                     (resource.data.userId == request.auth.uid || 
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true);
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
                               (resource.data.userId == request.auth.uid ||
                                get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true);
    }
    
    // Rooms collection - everyone can read, only admins can write
    match /rooms/{roomId} {
      allow read: if true;
      allow write: if request.auth != null && 
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
    
    // Reviews collection
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
                               (resource.data.userId == request.auth.uid ||
                                get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true);
    }
  }
}
```

### 6. Initialize Sample Data

To populate your database with sample rooms, open the browser console on your running app and execute:

```javascript
import { initializeRooms } from './services/initData';
initializeRooms();
```

Or add this temporarily to your `main.jsx`:

```javascript
import { initializeRooms } from './services/initData';

// Call once to initialize
// initializeRooms();
```

## Database Structure

### Collections

#### 1. **users**
```javascript
{
  uid: string,
  name: string,
  email: string,
  phone: string,
  photoURL: string | null,
  createdAt: timestamp,
  updatedAt: timestamp,
  isAdmin: boolean (optional)
}
```

#### 2. **bookings**
```javascript
{
  id: string,
  userId: string,
  roomId: string,
  roomName: string,
  roomImage: string,
  checkIn: string,
  checkOut: string,
  guests: number,
  totalPrice: number,
  status: "confirmed" | "pending" | "cancelled",
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### 3. **rooms**
```javascript
{
  id: string,
  name: string,
  type: string,
  price: number,
  rating: number,
  image: string,
  maxGuests: number,
  amenities: string[],
  description: string,
  available: boolean,
  size: string
}
```

#### 4. **reviews**
```javascript
{
  id: string,
  roomId: string,
  userId: string,
  rating: number,
  comment: string,
  createdAt: timestamp
}
```

## Google OAuth Configuration

The Google OAuth client credentials are already configured in the app:

- **Client ID**: `554284144835-p0cqu2v4rgons89hdtr1jppg07ru1nph.apps.googleusercontent.com`
- **Project ID**: `gen-lang-client-0114691969`

### Setting up OAuth Consent Screen

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your project (or create one with the same project ID)
3. Navigate to "APIs & Services" → "OAuth consent screen"
4. Configure the consent screen:
   - User Type: External
   - App name: Hotel Management System
   - User support email: Your email
   - Developer contact: Your email
5. Add scopes: `email`, `profile`
6. Add test users if in testing mode

### Authorized Domains

Make sure to add these domains in Firebase Authentication settings:
- `localhost` (for development)
- Your production domain

## Features Implemented

### Authentication
- ✅ Email/Password Sign Up
- ✅ Email/Password Login
- ✅ Google Sign-In (OAuth 2.0)
- ✅ Session persistence
- ✅ User profile management

### Database Operations
- ✅ Create, Read, Update, Delete bookings
- ✅ Fetch available rooms with filters
- ✅ User profile updates
- ✅ Reviews system

## Testing

### Test User Login
1. Go to http://localhost:5173/login
2. Either:
   - Create a new account with email/password
   - Click "Sign in with Google"

### Test Booking Flow
1. Navigate to the Booking page
2. Search for available rooms
3. Select a room and make a booking
4. Check "My Bookings" to see your reservations

## Troubleshooting

### Firebase Not Initialized Error
- Make sure you've updated `src/config/firebase.js` with your actual Firebase config

### Google Sign-In Not Working
- Check that Google authentication is enabled in Firebase Console
- Verify authorized domains include your domain
- Check browser console for specific error messages

### Firestore Permission Denied
- Verify Firestore security rules are properly set
- Make sure user is authenticated before making requests

## Environment Variables (Optional)

For production, consider using environment variables:

Create a `.env` file:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Then update `firebase.js`:
```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

## Production Deployment

Before deploying to production:

1. Update Firestore security rules to be more restrictive
2. Add your production domain to Firebase authorized domains
3. Use environment variables for sensitive config
4. Enable App Check for additional security
5. Set up Firebase Hosting (optional)

## Support

For issues or questions:
- Check Firebase documentation: https://firebase.google.com/docs
- Review Firebase Console logs
- Check browser developer console for errors
