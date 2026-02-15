import { Menu, CircleUserRound } from "lucide-react";
import { Ham_Menu } from "./Ham_Menu";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Hotel_logo from "./Icons/Hotel_logo";

export const Navbar = ({ dropIn }) => {
  const location = useLocation();
  const [isMenuOpen, setisMenuOpen] = useState(false);

  return (
    <>
      {/* Sidebar should be here to stay outside animation */}
      <Ham_Menu isOpen={isMenuOpen} onClose={() => setisMenuOpen(false)} />

      <div
  className={`fixed top-0 left-0 w-full z-40 transition-transform-opacity duration-700 ease-out
    ${dropIn ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-20 opacity-0 pointer-events-none"}`}
>

        <div className="w-full bg-white/10 backdrop-blur-xl border-b border-white/20 py-2 relative z-10">
          {/* Login Icon */}
          <Link to="/login" className="absolute top-3 md:top-4 right-2 sm:right-6 md:right-8 flex flex-col items-center cursor-pointer group">
            <CircleUserRound
              strokeWidth={1}
              className="text-white group-hover:text-gray-900 transition-colors duration-200 w-8 h-8 sm:w-20 sm:h-20 md:w-12 md:h-12"
            />
            <span className="text-white group-hover:text-gray-900 transition-colors duration-200">
              Login
            </span>
          </Link>

          {/* Hamburger Icon */}
          <div className="absolute top-5 md:top-7 left-2 sm:left-6 md:left-8 flex flex-col items-center cursor-pointer group">
            <Menu
              strokeWidth={1}
              onClick={() => setisMenuOpen(true)}
              className="text-white group-hover:text-gray-900 transition-colors duration-200 w-8 h-8 sm:w-20 sm:h-20 md:w-12 md:h-12"
            />
          </div>

          {/* Logo */}
          <div className="max-w-7xl -mt-2 md:mx-auto md:mt-2 flex justify-center">
            <Link to='/' >
            <Hotel_logo 
            className="w-20 h-20 md:w-24 md:h-24 animate-text-gradient cursor-pointer" />
          </Link>
          </div>

          <div className="w-full -mt-3">
            <hr className="border-t border-white/20 my-1" />
          </div>

          {/* Navigation Links */}
          <nav className="mt-2 flex flex-wrap justify-center gap-3 sm:gap-6 md:gap-8 text-white text-sm sm:text-lg md:text-xl font-extralight">
            {["home", "rooms", "restaurant", "Gym", "events", "contact"].map((section) => {
              const isActive = location.pathname === (section === "home" ? "/" : `/${section}`);
              return (
                <Link
                  key={section}
                  to={section === "home" ? "/" : `/${section}`}
                  className={`relative capitalize px-0.5 pb-1
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
