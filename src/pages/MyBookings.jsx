import { useState } from "react";
import { Background } from "../components/Background";
import { Calendar, MapPin, Users, Clock, XCircle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

// Mock booking data
const mockBookings = [
  {
    id: 1,
    roomName: "Deluxe Suite",
    roomImage: "/Rooms/Rooms_1.jpg",
    checkIn: "2026-03-15",
    checkOut: "2026-03-18",
    guests: 2,
    totalPrice: 897,
    status: "confirmed",
    bookingDate: "2026-02-10",
    bookingId: "BK-2026-001"
  },
  {
    id: 2,
    roomName: "Family Suite",
    roomImage: "/Rooms/Rooms_3.jpg",
    checkIn: "2026-04-20",
    checkOut: "2026-04-25",
    guests: 4,
    totalPrice: 1995,
    status: "confirmed",
    bookingDate: "2026-02-12",
    bookingId: "BK-2026-002"
  },
  {
    id: 3,
    roomName: "Premium Suite",
    roomImage: "/Rooms/Rooms_4.jpg",
    checkIn: "2026-02-25",
    checkOut: "2026-02-28",
    guests: 2,
    totalPrice: 1497,
    status: "pending",
    bookingDate: "2026-02-14",
    bookingId: "BK-2026-003"
  }
];

export const MyBookings = () => {
  const [bookings, setBookings] = useState(mockBookings);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleCancelClick = (booking) => {
    setSelectedBooking(booking);
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    setBookings(bookings.map(b => 
      b.id === selectedBooking.id ? { ...b, status: 'cancelled' } : b
    ));
    setShowCancelModal(false);
    setSelectedBooking(null);
  };

  const getStatusBadge = (status) => {
    const styles = {
      confirmed: "bg-green-500/20 text-green-300 border-green-500/30",
      pending: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
      cancelled: "bg-red-500/20 text-red-300 border-red-500/30"
    };

    const icons = {
      confirmed: <CheckCircle className="w-4 h-4" />,
      pending: <Clock className="w-4 h-4" />,
      cancelled: <XCircle className="w-4 h-4" />
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm border flex items-center gap-1 ${styles[status]}`}>
        {icons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const canCancel = (checkInDate) => {
    const checkIn = new Date(checkInDate);
    const now = new Date();
    const hoursUntilCheckIn = (checkIn - now) / (1000 * 60 * 60);
    return hoursUntilCheckIn > 24;
  };

  return (
    <Background>
      <div className="min-h-screen px-4 md:px-8 py-12 mt-28 md:mt-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 cinzel-decorative-regular">
              My Bookings
            </h1>
            <p className="text-gray-300 lora-sans">View and manage your upcoming reservations</p>
          </div>

          {/* Bookings List */}
          <div className="space-y-6">
            {bookings.filter(b => b.status !== 'cancelled').map((booking) => (
              <div
                key={booking.id}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl hover:shadow-white/10 transition-all duration-300"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
                  {/* Room Image */}
                  <div className="md:col-span-1">
                    <img
                      src={booking.roomImage}
                      alt={booking.roomName}
                      className="w-full h-48 md:h-full object-cover rounded-xl"
                      onError={(e) => {
                        e.target.src = '/Others/image.png';
                      }}
                    />
                  </div>

                  {/* Booking Details */}
                  <div className="md:col-span-2 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">{booking.roomName}</h3>
                        <p className="text-gray-400 text-sm">Booking ID: {booking.bookingId}</p>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-start gap-2 text-gray-300">
                        <Calendar className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-white">Check-in</p>
                          <p>{new Date(booking.checkIn).toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 text-gray-300">
                        <Calendar className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-white">Check-out</p>
                          <p>{new Date(booking.checkOut).toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-gray-300">
                        <Users className="w-5 h-5" />
                        <span>{booking.guests} Guests</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-300">
                        <Clock className="w-5 h-5" />
                        <span>
                          {Math.ceil((new Date(booking.checkOut) - new Date(booking.checkIn)) / (1000 * 60 * 60 * 24))} Nights
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/20">
                      <p className="text-gray-400 text-sm">
                        Booked on {new Date(booking.bookingDate).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Price & Actions */}
                  <div className="md:col-span-1 flex flex-col justify-between">
                    <div className="text-center mb-4">
                      <p className="text-gray-400 text-sm mb-1">Total Price</p>
                      <p className="text-3xl font-bold text-white">${booking.totalPrice}</p>
                    </div>

                    <div className="space-y-3">
                      <Link
                        to={`/booking/${booking.id}`}
                        className="block w-full py-3 bg-white/5 border border-white/20 text-white rounded-xl 
                                 text-center hover:bg-white/10 transition-all duration-300"
                      >
                        View Details
                      </Link>
                      {booking.status === 'confirmed' && canCancel(booking.checkIn) && (
                        <button
                          onClick={() => handleCancelClick(booking)}
                          className="w-full py-3 bg-red-500/20 border border-red-500/30 text-red-300 rounded-xl 
                                   hover:bg-red-500/30 transition-all duration-300"
                        >
                          Cancel Booking
                        </button>
                      )}
                      {booking.status === 'confirmed' && !canCancel(booking.checkIn) && (
                        <p className="text-center text-gray-400 text-xs">
                          Cannot cancel within 24h of check-in
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Bookings Message */}
          {bookings.filter(b => b.status !== 'cancelled').length === 0 && (
            <div className="text-center py-12">
              <p className="text-white text-xl mb-4">No active bookings</p>
              <p className="text-gray-400 mb-6">Start planning your next getaway!</p>
              <Link
                to="/booking"
                className="inline-block px-6 py-3 bg-gradient-to-r from-white/20 to-white/10 border border-white/30 
                         text-white rounded-xl hover:from-white hover:to-gray-100 hover:text-black 
                         transition-all duration-300"
              >
                Browse Rooms
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">Cancel Booking?</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to cancel your booking for <strong>{selectedBooking.roomName}</strong>? 
              This action cannot be undone.
            </p>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
              <p className="text-yellow-300 text-sm">
                ⚠️ Cancellation is free for bookings made more than 24 hours before check-in. 
                Your refund will be processed within 5-7 business days.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 py-3 bg-white/5 border border-white/20 text-white rounded-xl 
                         hover:bg-white/10 transition-all duration-300"
              >
                Keep Booking
              </button>
              <button
                onClick={confirmCancel}
                className="flex-1 py-3 bg-red-500/20 border border-red-500/30 text-red-300 rounded-xl 
                         hover:bg-red-500/30 transition-all duration-300"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Background>
  );
};
