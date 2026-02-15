import { useState } from "react";
import { Background } from "../components/Background";
import { Search, Calendar, Users, Star, Wifi, Car, Coffee, Dumbbell, MapPin, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

// Mock room data
const mockRooms = [
  {
    id: 1,
    name: "Deluxe Suite",
    image: "/Rooms/Rooms_1.jpg",
    price: 299,
    rating: 4.8,
    reviews: 124,
    capacity: 2,
    size: "450 sq ft",
    amenities: ["WiFi", "Parking", "Breakfast", "Gym"],
    description: "Spacious suite with panoramic city views"
  },
  {
    id: 2,
    name: "Executive Room",
    image: "/Rooms/Rooms_2.jpg",
    price: 199,
    rating: 4.6,
    reviews: 89,
    capacity: 2,
    size: "350 sq ft",
    amenities: ["WiFi", "Parking", "Breakfast"],
    description: "Modern room perfect for business travelers"
  },
  {
    id: 3,
    name: "Family Suite",
    image: "/Rooms/Rooms_3.jpg",
    price: 399,
    rating: 4.9,
    reviews: 156,
    capacity: 4,
    size: "600 sq ft",
    amenities: ["WiFi", "Parking", "Breakfast", "Gym"],
    description: "Spacious accommodation for families"
  },
  {
    id: 4,
    name: "Premium Suite",
    image: "/Rooms/Rooms_4.jpg",
    price: 499,
    rating: 5.0,
    reviews: 78,
    capacity: 2,
    size: "550 sq ft",
    amenities: ["WiFi", "Parking", "Breakfast", "Gym"],
    description: "Luxury suite with private balcony"
  },
  {
    id: 5,
    name: "Standard Room",
    image: "/Rooms/Rooms_5.jpg",
    price: 149,
    rating: 4.4,
    reviews: 203,
    capacity: 2,
    size: "300 sq ft",
    amenities: ["WiFi", "Breakfast"],
    description: "Comfortable room with essential amenities"
  },
  {
    id: 6,
    name: "Honeymoon Suite",
    image: "/Rooms/Rooms_6.jpg",
    price: 599,
    rating: 5.0,
    reviews: 92,
    capacity: 2,
    size: "700 sq ft",
    amenities: ["WiFi", "Parking", "Breakfast", "Gym"],
    description: "Romantic suite with jacuzzi and champagne"
  }
];

export const SearchRooms = () => {
  const [filters, setFilters] = useState({
    searchTerm: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    minPrice: 0,
    maxPrice: 1000,
    rating: 0,
    amenities: []
  });

  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("recommended");

  const amenityIcons = {
    WiFi: <Wifi className="w-4 h-4" />,
    Parking: <Car className="w-4 h-4" />,
    Breakfast: <Coffee className="w-4 h-4" />,
    Gym: <Dumbbell className="w-4 h-4" />
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const toggleAmenity = (amenity) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity];
    setFilters({ ...filters, amenities: newAmenities });
  };

  // Filter and sort rooms
  const filteredRooms = mockRooms
    .filter(room => {
      const matchesSearch = room.name.toLowerCase().includes(filters.searchTerm.toLowerCase());
      const matchesPrice = room.price >= filters.minPrice && room.price <= filters.maxPrice;
      const matchesRating = room.rating >= filters.rating;
      const matchesGuests = room.capacity >= filters.guests;
      const matchesAmenities = filters.amenities.length === 0 || 
        filters.amenities.every(a => room.amenities.includes(a));
      
      return matchesSearch && matchesPrice && matchesRating && matchesGuests && matchesAmenities;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // recommended
    });

  return (
    <Background>
      <div className="min-h-screen px-4 md:px-8 pb-12 pt-32 sm:pt-36 md:pt-40 lg:pt-44">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 cinzel-decorative-regular">
            Find Your Perfect Room
          </h1>
          <p className="text-gray-300 lora-sans">
            Discover luxury accommodations tailored to your needs
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search rooms..."
                  value={filters.searchTerm}
                  onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 
                           focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>

              {/* Check-in Date */}
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  value={filters.checkIn}
                  onChange={(e) => handleFilterChange("checkIn", e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white 
                           focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>

              {/* Check-out Date */}
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  value={filters.checkOut}
                  onChange={(e) => handleFilterChange("checkOut", e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white 
                           focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>

              {/* Guests */}
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={filters.guests}
                  onChange={(e) => handleFilterChange("guests", parseInt(e.target.value))}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white 
                           focus:outline-none focus:ring-2 focus:ring-white/30 appearance-none cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num} className="bg-gray-800">
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="mt-4 text-white hover:text-gray-300 transition-colors flex items-center"
            >
              <ChevronDown className={`w-5 h-5 mr-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              {showFilters ? 'Hide' : 'Show'} Advanced Filters
            </button>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-white/20 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Price Range */}
                <div>
                  <label className="block text-white text-sm mb-3">
                    Price Range: ${filters.minPrice} - ${filters.maxPrice}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="50"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange("maxPrice", parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Minimum Rating */}
                <div>
                  <label className="block text-white text-sm mb-3">
                    Minimum Rating: {filters.rating > 0 ? `${filters.rating}+` : 'Any'}
                  </label>
                  <div className="flex gap-2">
                    {[0, 3, 4, 4.5].map(rating => (
                      <button
                        key={rating}
                        onClick={() => handleFilterChange("rating", rating)}
                        className={`px-4 py-2 rounded-lg transition-all ${
                          filters.rating === rating
                            ? 'bg-white text-black'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        {rating > 0 ? `${rating}+` : 'Any'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <label className="block text-white text-sm mb-3">Amenities</label>
                  <div className="flex flex-wrap gap-2">
                    {['WiFi', 'Parking', 'Breakfast', 'Gym'].map(amenity => (
                      <button
                        key={amenity}
                        onClick={() => toggleAmenity(amenity)}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                          filters.amenities.includes(amenity)
                            ? 'bg-white text-black'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        {amenityIcons[amenity]}
                        {amenity}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Header */}
        <div className="max-w-7xl mx-auto mb-6 flex justify-between items-center">
          <p className="text-white">
            <span className="font-semibold">{filteredRooms.length}</span> rooms available
          </p>
          <div className="flex items-center gap-2">
            <label className="text-white text-sm">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white 
                       focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer"
            >
              <option value="recommended" className="bg-gray-800">Recommended</option>
              <option value="price-low" className="bg-gray-800">Price: Low to High</option>
              <option value="price-high" className="bg-gray-800">Price: High to Low</option>
              <option value="rating" className="bg-gray-800">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Room Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden 
                       shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-105"
            >
              {/* Room Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/Others/image.png';
                  }}
                />
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full">
                  <span className="text-white font-semibold">${room.price}/night</span>
                </div>
              </div>

              {/* Room Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{room.name}</h3>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="ml-1 text-white font-semibold">{room.rating}</span>
                  </div>
                  <span className="text-gray-400 text-sm">({room.reviews} reviews)</span>
                </div>

                <p className="text-gray-300 text-sm mb-4">{room.description}</p>

                {/* Room Info */}
                <div className="flex items-center gap-4 text-sm text-gray-300 mb-4">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{room.capacity} guests</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{room.size}</span>
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {room.amenities.slice(0, 4).map((amenity) => (
                    <span
                      key={amenity}
                      className="px-2 py-1 bg-white/5 border border-white/20 rounded-lg text-xs text-white flex items-center gap-1"
                    >
                      {amenityIcons[amenity]}
                      {amenity}
                    </span>
                  ))}
                </div>

                {/* Book Button */}
                <Link
                  to={`/room/${room.id}`}
                  className="block w-full py-3 bg-gradient-to-r from-white/20 to-white/10 border border-white/30 
                           text-white rounded-xl text-center font-light tracking-wide uppercase transition-all duration-300 
                           hover:from-white hover:to-gray-100 hover:text-black"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredRooms.length === 0 && (
          <div className="max-w-7xl mx-auto text-center py-12">
            <p className="text-white text-xl mb-4">No rooms found matching your criteria</p>
            <p className="text-gray-400 mb-6">Try adjusting your filters or search term</p>
            <button
              onClick={() => setFilters({
                searchTerm: "",
                checkIn: "",
                checkOut: "",
                guests: 1,
                minPrice: 0,
                maxPrice: 1000,
                rating: 0,
                amenities: []
              })}
              className="px-6 py-3 bg-white/20 border border-white/30 text-white rounded-xl 
                       hover:bg-white hover:text-black transition-all duration-300"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </Background>
  );
};
