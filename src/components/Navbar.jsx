import { Menu, CircleUserRound, User } from "lucide-react";
import { Ham_Menu } from "./Ham_Menu";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Hotel_logo from "./Icons/Hotel_logo";
import { useAuth } from "../contexts/AuthContext";

export const Navbar = ({ dropIn }) => {
  const location = useLocation();
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <>
      {/* Sidebar should be here to stay outside animation */}
      <Ham_Menu isOpen={isMenuOpen} onClose={() => setisMenuOpen(false)} />

      <div
        className={`fixed top-0 left-0 w-full z-40 transition-transform-opacity duration-700 ease-out
    ${dropIn ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-20 opacity-0 pointer-events-none"}`}
      >
        <div className="w-full bg-white/10 backdrop-blur-xl border-b border-white/20 py-2 sm:py-3 relative z-10">
          {/* Login/Profile Icon */}
          {isAuthenticated ? (
            <Link
              to="/profile"
              className="absolute top-3 sm:top-4 md:top-5 right-2 sm:right-4 md:right-8 flex flex-col items-center cursor-pointer group"
            >
              <User
                strokeWidth={1.5}
                className="text-white group-hover:text-gray-300 transition-colors duration-200 w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11"
              />
              <span className="text-xs sm:text-sm text-white group-hover:text-gray-300 transition-colors duration-200">
                Profile
              </span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="absolute top-3 sm:top-4 md:top-5 right-2 sm:right-4 md:right-8 flex flex-col items-center cursor-pointer group"
            >
              <CircleUserRound
                strokeWidth={1}
                className="text-white group-hover:text-gray-300 transition-colors duration-200 w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11"
              />
              <span className="text-xs sm:text-sm text-white group-hover:text-gray-300 transition-colors duration-200">
                Login
              </span>
            </Link>
          )}

          {/* Hamburger Icon */}
          <div className="absolute top-4 sm:top-5 md:top-6 left-2 sm:left-4 md:left-8 flex flex-col items-center cursor-pointer group">
            <Menu
              strokeWidth={1}
              onClick={() => setisMenuOpen(true)}
              className="text-white group-hover:text-gray-300 transition-colors duration-200 w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11"
            />
          </div>

          {/* Logo */}
          <div className="max-w-7xl mx-auto flex justify-center mt-1 sm:mt-2">
            <Link to="/">
              <Hotel_logo className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 animate-text-gradient cursor-pointer" />
            </Link>
          </div>

          <div className="w-full">
            <hr className="border-t border-white/20 my-1" />
          </div>

          {/* Navigation Links */}
          <nav className="mt-2 flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 text-white text-xs sm:text-sm md:text-lg lg:text-xl font-extralight px-2">
            {["home", "rooms", "restaurant", "Gym", "events", "contact"].map((section) => {
              const isActive = location.pathname === (section === "home" ? "/" : `/${section}`);
              return (
                <Link
                  key={section}
                  to={section === "home" ? "/" : `/${section}`}
                  className={`relative capitalize px-1 sm:px-2 pb-1
                    after:content-[''] after:absolute after:left-0 after:-bottom-[9.5px]
                    after:h-[1.5px] after:w-full after:bg-white after:rounded-full
                    ${
                      isActive
                        ? "after:opacity-100"
                        : "after:opacity-0 hover:after:opacity-60"
                    }
                    after:transition-opacity after:duration-300
                  `}
                >
                  {section}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};
