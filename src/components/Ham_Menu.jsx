import { X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const Ham_Menu = ({ isOpen, onClose }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onClose();
    navigate("/");
  };

  return (
    <>
      {/* Optional: backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-4/5 sm:w-3/5 md:w-2/5 lg:w-1/4 xl:w-1/5 
          bg-[#1f1f1f]/90 backdrop-blur-md text-white 
          z-50 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          overflow-y-auto`}
      >
        {/* Header */}
        <div className="relative px-4 py-4 border-b border-white/30">
          {/* Close Icon */}
          <X
            className="absolute top-4 right-4 w-6 h-6 cursor-pointer hover:text-gray-300 transition-colors"
            onClick={onClose}
          />

          {isAuthenticated ? (
            /* Logged In: Show Avatar + Name */
            <div className="flex flex-col items-center gap-2 mt-2">
              <img
                src="/Others/image.png"
                alt="Profile"
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-white/30 object-cover"
              />
              <span className="text-xl sm:text-2xl font-semibold">Hi,</span>
              <span className="-mt-2 text-xl sm:text-2xl font-semibold truncate max-w-full px-2">
                {user?.name || "Guest"}
              </span>
            </div>
          ) : (
            /* Logged Out: Show Login/Signup Options */
            <div className="flex flex-col items-center gap-3 mt-8 mb-4">
              <h3 className="text-xl sm:text-2xl font-semibold mb-2">Welcome!</h3>
              <Link
                to="/login"
                onClick={onClose}
                className="w-full max-w-[200px] py-2.5 px-4 bg-white text-black rounded-lg text-center font-medium hover:bg-gray-200 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={onClose}
                className="w-full max-w-[200px] py-2.5 px-4 border border-white text-white rounded-lg text-center font-medium hover:bg-white/10 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Sidebar Links */}
        <div className="flex flex-col py-6 px-6 gap-3 md:gap-4 text-base md:text-lg font-extralight">
          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                onClick={onClose}
                className="hover:text-gray-300 transition-colors py-2 px-2 rounded hover:bg-white/5"
              >
                Profile
              </Link>
              <Link
                to="#"
                onClick={onClose}
                className="hover:text-gray-300 transition-colors py-2 px-2 rounded hover:bg-white/5"
              >
                Food Orders
              </Link>
              <Link
                to="/my-bookings"
                onClick={onClose}
                className="hover:text-gray-300 transition-colors py-2 px-2 rounded hover:bg-white/5"
              >
                My Bookings
              </Link>
              <Link
                to="#"
                onClick={onClose}
                className="hover:text-gray-300 transition-colors py-2 px-2 rounded hover:bg-white/5"
              >
                Payments
              </Link>
              <Link
                to="#"
                onClick={onClose}
                className="hover:text-gray-300 transition-colors py-2 px-2 rounded hover:bg-white/5"
              >
                Booking History
              </Link>
              <Link
                to="#"
                onClick={onClose}
                className="hover:text-gray-300 transition-colors py-2 px-2 rounded hover:bg-white/5"
              >
                Service Requests
              </Link>
              <Link
                to="#"
                onClick={onClose}
                className="hover:text-gray-300 transition-colors py-2 px-2 rounded hover:bg-white/5"
              >
                Support
              </Link>
              <Link
                to="#"
                onClick={onClose}
                className="hover:text-gray-300 transition-colors py-2 px-2 rounded hover:bg-white/5"
              >
                Change Password
              </Link>
              <button
                onClick={handleLogout}
                className="text-left hover:text-gray-300 transition-colors py-2 px-2 rounded hover:bg-white/5"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/"
                onClick={onClose}
                className="hover:text-gray-300 transition-colors py-2 px-2 rounded hover:bg-white/5"
              >
                Home
              </Link>
              <Link
                to="/rooms"
                onClick={onClose}
                className="hover:text-gray-300 transition-colors py-2 px-2 rounded hover:bg-white/5"
              >
                Rooms
              </Link>
              <Link
                to="/restaurant"
                onClick={onClose}
                className="hover:text-gray-300 transition-colors py-2 px-2 rounded hover:bg-white/5"
              >
                Restaurant
              </Link>
              <Link
                to="/gym"
                onClick={onClose}
                className="hover:text-gray-300 transition-colors py-2 px-2 rounded hover:bg-white/5"
              >
                Gym
              </Link>
              <Link
                to="/events"
                onClick={onClose}
                className="hover:text-gray-300 transition-colors py-2 px-2 rounded hover:bg-white/5"
              >
                Events
              </Link>
              <Link
                to="/contact"
                onClick={onClose}
                className="hover:text-gray-300 transition-colors py-2 px-2 rounded hover:bg-white/5"
              >
                Contact
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};
