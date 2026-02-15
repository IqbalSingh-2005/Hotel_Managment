import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration using the provided Google OAuth credentials
const firebaseConfig = {
  apiKey: "AIzaSyBOGxH5p9C8KqFJjZn3nYzHVL8K7qY1234", // This will be set up with a proper Firebase project
  authDomain: "gen-lang-client-0114691969.firebaseapp.com",
  projectId: "gen-lang-client-0114691969",
  storageBucket: "gen-lang-client-0114691969.appspot.com",
  messagingSenderId: "554284144835",
  appId: "1:554284144835:web:abc123def456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Google Auth Provider with the provided client ID
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  client_id: "554284144835-p0cqu2v4rgons89hdtr1jppg07ru1nph.apps.googleusercontent.com"
});

export default app;
