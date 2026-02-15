import { Background } from "../components/Background";
import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Events_Background } from "../components/Events/Events_Background";
import { Link } from "react-router-dom";

export const Events = () => {
   const [animateText, setAnimateText] = useState(false);
  
    useEffect(() => {
      const timeout = setTimeout(() => {
        setAnimateText(true); // Trigger animation after 1 second
      }, 500); // adjust timing here (in milliseconds)
  
      return () => clearTimeout(timeout);
    }, []);
  
    return (

    <Background>
      <Events_Background>
        <Navbar />
        
        <h1 className="mt-48 sm:mt-56 md:mt-64 lg:mt-72 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-md text-center leading-tight px-4">
            <div
                className={`lora-sans transition-all duration-700 ${
                animateText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
            >
                Experience the Elegance of
            </div>

            <div
                className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl cinzel-decorative-regular transition-all duration-700 delay-500 ${
                animateText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                }`}
            >
                <span className="bg-gradient-to-r from-white via-gray-400 to-white 
                    bg-clip-text text-transparent 
                    bg-[length:200%_200%] animate-text-gradient">
                Events
                </span>
            </div>
            </h1>

            <p
            className={`text-sm sm:text-base md:text-lg lg:text-xl text-center font-extralight text-white max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto mb-6 px-4 py-2 rounded-3xl transition-all duration-700 delay-700 ${
                animateText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
            >
            From glamorous New Year galas and seasonal gourmet nights to intimate jazz evenings and cultural showcases, 
            our hotel curates unforgettable events all year round. Relive the charm of past soirées or stay tuned for upcoming luxury experiences.
            </p>

            <div className="text-center mt-4">
            <Link
                to="/gallery"
                className={`mt-6 inline-block bg-white/10 border border-white text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-base sm:text-lg tracking-wide
                font-light uppercase transition-all duration-700 delay-1000 ease-in-out hover:bg-white hover:text-black
                hover:shadow-[0_12px_35px_rgba(0,0,0,1)] backdrop-opacity-40-md ${
                    animateText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
            >
                Future Events
            </Link>
            </div>


                
      </Events_Background>
    </Background>
  );
};