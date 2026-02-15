import { X } from "lucide-react";
import { Link } from "react-router-dom";

export const Ham_Menu = ({ isOpen, onClose }) => {
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
        className={`fixed top-0 left-0 h-full w-4/6 md:w-1/3 xl:w-1/6 
          bg-[#1f1f1f]/70 backdrop-blur-md text-white 
          z-50 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="relative px-4 py-4 border-b border-white/30">
          {/* Close Icon */}
          <X
            className="absolute top-4 right-4 w-6 h-6 cursor-pointer hover:text-gray-300"
            onClick={onClose}
          />

          {/* Avatar + Name */}
          <div className="flex flex-col items-center gap-2 mt-2">
            <img
              src="/Others/image.png"
              alt="Profile"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/30"
            />
            <span className="-mr-2 text-2xl md:text-3xl font-semibold">Hi,</span>
            <span className="-mr-2 -mt-2 text-2xl md:text-3xl font-semibold">Iqbal Singh</span>
          </div>
        </div>

        {/* Sidebar Links */}
        <div className="flex flex-col py-6 px-6 gap-4 md:gap-6 text-base sm:text-lg md:text-xl font-extralight">
          <Link to="/profile" className="hover:text-gray-300">
            Profile
          </Link>
          <Link to="#" className="hover:text-gray-300">
            Food orders
          </Link>
          <Link to="/my-bookings" className="hover:text-gray-300">
            My Bookings
          </Link>
          <Link to="#" className="hover:text-gray-300">
            Payments
          </Link>
          <Link to="#" className="hover:text-gray-300">
            Booking History
          </Link>
          <Link to="#" className="hover:text-gray-300">
            Service Requests
          </Link>
          <Link to="#" className="hover:text-gray-300">
            Support
          </Link>
          <Link to="#" className="hover:text-gray-300">
            Change Password
          </Link>
          <Link to="/login" className="hover:text-gray-300">
            Logout
          </Link>
        </div>
      </div>
    </>
  );
};
