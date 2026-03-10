import { sampleRooms } from "./initData";

// ==================== STORAGE KEYS ====================

const ROOMS_KEY = "hotel_rooms";
const BOOKINGS_KEY = "hotel_bookings";
const USERS_KEY = "hotel_users";
const REVIEWS_KEY = "hotel_reviews";

// ==================== HELPERS ====================

const generateId = () => crypto.randomUUID();

const readStore = (key, defaultValue = []) => {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(defaultValue));
  } catch {
    return defaultValue;
  }
};

const writeStore = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

/** Ensure rooms are seeded into localStorage on first use */
const ensureRooms = () => {
  const rooms = readStore(ROOMS_KEY);
  if (rooms.length === 0) {
    const seeded = sampleRooms.map((r) => ({ ...r, id: generateId() }));
    writeStore(ROOMS_KEY, seeded);
    return seeded;
  }
  return rooms;
};

// ==================== BOOKINGS ====================

/**
 * Create a new booking
 */
export const createBooking = async (userId, bookingData) => {
  try {
    const bookings = readStore(BOOKINGS_KEY);
    const newBooking = {
      ...bookingData,
      id: generateId(),
      userId,
      status: "confirmed",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    writeStore(BOOKINGS_KEY, [...bookings, newBooking]);
    return { success: true, id: newBooking.id };
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
    const bookings = readStore(BOOKINGS_KEY);
    const userBookings = bookings
      .filter((b) => b.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return { success: true, bookings: userBookings };
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
    const bookings = readStore(BOOKINGS_KEY);
    const booking = bookings.find((b) => b.id === bookingId);
    if (booking) {
      return { success: true, booking };
    }
    return { success: false, error: "Booking not found" };
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
    const bookings = readStore(BOOKINGS_KEY);
    const updated = bookings.map((b) =>
      b.id === bookingId
        ? { ...b, ...updates, updatedAt: new Date().toISOString() }
        : b
    );
    writeStore(BOOKINGS_KEY, updated);
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
  return updateBooking(bookingId, { status: "cancelled" });
};

/**
 * Delete a booking (hard delete)
 */
export const deleteBooking = async (bookingId) => {
  try {
    const bookings = readStore(BOOKINGS_KEY);
    writeStore(
      BOOKINGS_KEY,
      bookings.filter((b) => b.id !== bookingId)
    );
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
    const rooms = ensureRooms();
    return { success: true, rooms };
  } catch (error) {
    console.error("Error getting rooms:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Get available rooms based on filters
 */
export const getAvailableRooms = async (filters = {}) => {
  try {
    let rooms = ensureRooms();

    if (filters.minPrice !== undefined) {
      rooms = rooms.filter((r) => r.price >= filters.minPrice);
    }
    if (filters.maxPrice !== undefined) {
      rooms = rooms.filter((r) => r.price <= filters.maxPrice);
    }
    if (filters.type) {
      rooms = rooms.filter((r) => r.type === filters.type);
    }
    if (filters.guests) {
      rooms = rooms.filter((r) => r.maxGuests >= filters.guests);
    }
    if (filters.available !== undefined) {
      rooms = rooms.filter((r) => r.available === filters.available);
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
    const rooms = ensureRooms();
    const room = rooms.find((r) => r.id === roomId);
    if (room) {
      return { success: true, room };
    }
    return { success: false, error: "Room not found" };
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
    const users = readStore(USERS_KEY);
    const updated = users.map((u) =>
      u.uid === userId
        ? { ...u, ...profileData, updatedAt: new Date().toISOString() }
        : u
    );
    writeStore(USERS_KEY, updated);
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
    const users = readStore(USERS_KEY);
    const user = users.find((u) => u.uid === userId);
    if (user) {
    const { passwordHash: _hash, ...profile } = user;
      return { success: true, profile };
    }
    return { success: false, error: "User not found" };
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
    const reviews = readStore(REVIEWS_KEY);
    const newReview = {
      ...reviewData,
      id: generateId(),
      roomId,
      userId,
      createdAt: new Date().toISOString(),
    };
    writeStore(REVIEWS_KEY, [...reviews, newReview]);
    return { success: true, id: newReview.id };
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
    const reviews = readStore(REVIEWS_KEY);
    const roomReviews = reviews
      .filter((r) => r.roomId === roomId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return { success: true, reviews: roomReviews };
  } catch (error) {
    console.error("Error getting reviews:", error);
    return { success: false, error: error.message };
  }
};
