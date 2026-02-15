import { useEffect, useState } from "react";
import { Background } from "../components/Background";
import { Navbar } from "../components/Navbar";
import { Home_Background } from "../components/Home/Home_Background";
import { Link } from "react-router-dom";

export const Home = () => {
  const [animateText, setAnimateText] = useState(false);

  useEffect(() => {
    let navType = "navigate";

    try {
      const navEntries = performance.getEntriesByType("navigation");
      if (navEntries && navEntries.length > 0) {
        navType = navEntries[0].type; // "reload" | "navigate" | "back_forward"
      } else if (performance.navigation) {
        // Fallback for older browsers
        navType = performance.navigation.type === 1 ? "reload" : "navigate";
      }
    } catch {
      // Fallback in case performance API fails
      navType = "navigate";
    }

    const isReload = navType === "reload";
    const hasSeenHome = sessionStorage.getItem("seenHome");

    const delay = !hasSeenHome || isReload ? 900 : 600;

    const timer = setTimeout(() => {
      setAnimateText(true);
      sessionStorage.setItem("seenHome", "true");
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Background>
      <Home_Background>
        <Navbar />

        <h1 className="mt-60 md:mt-80 text-4xl md:text-5xl text-white drop-shadow-md text-center leading-tight">
          <div
            className={`lora-sans transition-all duration-700 ${
              animateText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            Welcome
          </div>
          <div
            className={`text-white text-4xl md:text-5xl lora-sans transition-all duration-700 delay-200 ${
              animateText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            to
          </div>
          <div
            className={`text-6xl md:text-7xl cinzel-decorative-regular transition-all duration-700 delay-500 ${
              animateText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <span className="bg-gradient-to-r from-[#ffffff] via-[#a7a7a7] to-[#ffffff] 
                   bg-clip-text text-transparent 
                   bg-[length:200%_200%] animate-text-gradient">
              The Hotel
            </span>
          </div>
        </h1>

        <p
          className={`text-base md:text-xl text-center font-extralight text-white max-w-2xl mx-auto mb-6 px-4 py-2 rounded-3xl transition-all duration-700 delay-700 ${
            animateText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          Welcome to our premium hotel booking platform — where comfort meets luxury.
          Whether you're planning a romantic getaway, a family vacation, or a business trip,
          we have the perfect stay waiting for you.
        </p>

        <div className="text-center mt-4">
          <Link
            to="/booking"
            className={`mt-6 inline-block bg-white/10 border border-white text-white px-8 py-3 rounded-full text-lg tracking-wide
              font-light uppercase transition-all duration-700 delay-1000 ease-in-out hover:bg-white hover:text-black
              hover:shadow-[0_12px_35px_rgba(0,0,0,1)] backdrop-opacity-40-md ${
                animateText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
          >
            Book Now
          </Link>
        </div>
      </Home_Background>
    </Background>
  );
};
