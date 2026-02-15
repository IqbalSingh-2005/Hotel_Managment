/**
 * Sample data initialization script
 * This file contains sample data for the hotel management system
 * Run this once to populate your Firebase database with initial data
 * 
 * NOTE: The image paths below reference files in the public/Rooms directory.
 * If these images don't exist, the application will fall back to room-placeholder.svg
 */

import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";

// Sample room data
// NOTE: These images should exist in public/Rooms/ or will fall back to placeholder
export const sampleRooms = [
  {
    name: "Deluxe Suite",
    type: "Deluxe",
    price: 299,
    rating: 4.8,
    image: "/Rooms/Room_1.jpg",
    maxGuests: 2,
    amenities: ["WiFi", "TV", "Mini Bar", "King Bed", "Ocean View", "Balcony"],
    description: "Luxurious deluxe suite with ocean view and premium amenities",
    available: true,
    size: "450 sq ft"
  },
  {
    name: "Executive Room",
    type: "Executive",
    price: 399,
    rating: 4.9,
    image: "/Rooms/Room_2.jpg",
    maxGuests: 2,
    amenities: ["WiFi", "TV", "Work Desk", "King Bed", "City View", "Coffee Maker"],
    description: "Perfect for business travelers with workspace and premium facilities",
    available: true,
    size: "500 sq ft"
  },
  {
    name: "Family Suite",
    type: "Family",
    price: 499,
    rating: 4.7,
    image: "/Rooms/Room_3.jpg",
    maxGuests: 4,
    amenities: ["WiFi", "TV", "2 Bedrooms", "Kitchen", "Living Area", "Balcony"],
    description: "Spacious family suite with separate bedrooms and living area",
    available: true,
    size: "750 sq ft"
  },
  {
    name: "Premium Suite",
    type: "Premium",
    price: 599,
    rating: 5.0,
    image: "/Rooms/Room_1.jpg",
    maxGuests: 2,
    amenities: ["WiFi", "TV", "Jacuzzi", "King Bed", "Ocean View", "Butler Service"],
    description: "Ultimate luxury with jacuzzi, ocean view, and butler service",
    available: true,
    size: "650 sq ft"
  },
  {
    name: "Standard Room",
    type: "Standard",
    price: 149,
    rating: 4.5,
    image: "/Rooms/Room_2.jpg",
    maxGuests: 2,
    amenities: ["WiFi", "TV", "Queen Bed", "City View"],
    description: "Comfortable standard room with essential amenities",
    available: true,
    size: "300 sq ft"
  },
  {
    name: "Honeymoon Suite",
    type: "Honeymoon",
    price: 799,
    rating: 5.0,
    image: "/Rooms/Room_3.jpg",
    maxGuests: 2,
    amenities: ["WiFi", "TV", "Jacuzzi", "King Bed", "Ocean View", "Champagne", "Rose Petals"],
    description: "Romantic honeymoon suite with special amenities for couples",
    available: true,
    size: "600 sq ft"
  }
];

/**
 * Initialize database with sample rooms
 * Call this function once to populate the database
 */
export const initializeRooms = async () => {
  try {
    const roomsRef = collection(db, "rooms");
    
    for (const room of sampleRooms) {
      await addDoc(roomsRef, room);
      console.log(`Added room: ${room.name}`);
    }
    
    console.log("All sample rooms added successfully!");
    return { success: true };
  } catch (error) {
    console.error("Error initializing rooms:", error);
    return { success: false, error: error.message };
  }
};

// Note: You can call initializeRooms() from the browser console to populate the database
// Example: import { initializeRooms } from './services/initData'; initializeRooms();
