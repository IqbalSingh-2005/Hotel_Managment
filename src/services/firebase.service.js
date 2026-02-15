import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy,
  serverTimestamp
} from "firebase/firestore";
import { db } from "../config/firebase";

// ==================== BOOKINGS ====================

/**
 * Create a new booking
 */
export const createBooking = async (userId, bookingData) => {
  try {
    const bookingsRef = collection(db, "bookings");
    const docRef = await addDoc(bookingsRef, {
      ...bookingData,
      userId,
      status: "confirmed",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error creating booking:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Get all bookings for a user
 */
export const getUserBookings = async (userId) => {
  try {
    const bookingsRef = collection(db, "bookings");
    const q = query(
      bookingsRef, 
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    const bookings = [];
    querySnapshot.forEach((doc) => {
      bookings.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, bookings };
  } catch (error) {
    console.error("Error getting bookings:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Get a specific booking by ID
 */
export const getBooking = async (bookingId) => {
  try {
    const bookingRef = doc(db, "bookings", bookingId);
    const bookingSnap = await getDoc(bookingRef);
    if (bookingSnap.exists()) {
      return { success: true, booking: { id: bookingSnap.id, ...bookingSnap.data() } };
    } else {
      return { success: false, error: "Booking not found" };
    }
  } catch (error) {
    console.error("Error getting booking:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Update a booking
 */
export const updateBooking = async (bookingId, updates) => {
  try {
    const bookingRef = doc(db, "bookings", bookingId);
    await updateDoc(bookingRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating booking:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Cancel a booking
 */
export const cancelBooking = async (bookingId) => {
  try {
    const bookingRef = doc(db, "bookings", bookingId);
    await updateDoc(bookingRef, {
      status: "cancelled",
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error("Error cancelling booking:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Delete a booking (hard delete)
 */
export const deleteBooking = async (bookingId) => {
  try {
    await deleteDoc(doc(db, "bookings", bookingId));
    return { success: true };
  } catch (error) {
    console.error("Error deleting booking:", error);
    return { success: false, error: error.message };
  }
};

// ==================== ROOMS ====================

/**
 * Get all rooms
 */
export const getAllRooms = async () => {
  try {
    const roomsRef = collection(db, "rooms");
    const querySnapshot = await getDocs(roomsRef);
    const rooms = [];
    querySnapshot.forEach((doc) => {
      rooms.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, rooms };
  } catch (error) {
    console.error("Error getting rooms:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Get available rooms based on filters
 * Note: Firestore has limitations on compound queries, so we fetch all rooms
 * and filter in memory. For production with large datasets, consider:
 * 1. Using Algolia or Elasticsearch for advanced filtering
 * 2. Implementing pagination
 * 3. Creating composite indexes for specific filter combinations
 */
export const getAvailableRooms = async (filters = {}) => {
  try {
    const roomsRef = collection(db, "rooms");
    
    // Build query with basic filters if applicable
    let q = roomsRef;
    
    // For simple single-field queries, use Firestore where clauses
    // For complex multi-field queries, fetch and filter in memory
    
    const querySnapshot = await getDocs(q);
    let rooms = [];
    querySnapshot.forEach((doc) => {
      rooms.push({ id: doc.id, ...doc.data() });
    });

    // Apply client-side filters for complex queries
    if (filters.minPrice !== undefined) {
      rooms = rooms.filter(room => room.price >= filters.minPrice);
    }
    if (filters.maxPrice !== undefined) {
      rooms = rooms.filter(room => room.price <= filters.maxPrice);
    }
    if (filters.type) {
      rooms = rooms.filter(room => room.type === filters.type);
    }
    if (filters.guests) {
      rooms = rooms.filter(room => room.maxGuests >= filters.guests);
    }
    if (filters.available !== undefined) {
      rooms = rooms.filter(room => room.available === filters.available);
    }

    return { success: true, rooms };
  } catch (error) {
    console.error("Error getting available rooms:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Get a specific room by ID
 */
export const getRoom = async (roomId) => {
  try {
    const roomRef = doc(db, "rooms", roomId);
    const roomSnap = await getDoc(roomRef);
    if (roomSnap.exists()) {
      return { success: true, room: { id: roomSnap.id, ...roomSnap.data() } };
    } else {
      return { success: false, error: "Room not found" };
    }
  } catch (error) {
    console.error("Error getting room:", error);
    return { success: false, error: error.message };
  }
};

// ==================== USER PROFILE ====================

/**
 * Update user profile
 */
export const updateUserProfile = async (userId, profileData) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      ...profileData,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Get user profile
 */
export const getUserProfile = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return { success: true, profile: userSnap.data() };
    } else {
      return { success: false, error: "User not found" };
    }
  } catch (error) {
    console.error("Error getting profile:", error);
    return { success: false, error: error.message };
  }
};

// ==================== REVIEWS ====================

/**
 * Add a review for a room
 */
export const addReview = async (roomId, userId, reviewData) => {
  try {
    const reviewsRef = collection(db, "reviews");
    const docRef = await addDoc(reviewsRef, {
      ...reviewData,
      roomId,
      userId,
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding review:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Get reviews for a room
 */
export const getRoomReviews = async (roomId) => {
  try {
    const reviewsRef = collection(db, "reviews");
    const q = query(
      reviewsRef, 
      where("roomId", "==", roomId),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    const reviews = [];
    querySnapshot.forEach((doc) => {
      reviews.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, reviews };
  } catch (error) {
    console.error("Error getting reviews:", error);
    return { success: false, error: error.message };
  }
};
