import { Background } from "../components/Background";
import { useEffect,useState } from "react";
import { Navbar } from "../components/Navbar";
import { Restaurant_Background } from "../components/Restaurant/Restaurant_Background";
import { Link } from "react-router-dom";

export const Restaurant = () => {
   const [animateText, setAnimateText] = useState(false);
  
    useEffect(() => {
      const timeout = setTimeout(() => {
        setAnimateText(true); // Trigger animation after 1 second
      }, 500); // adjust timing here (in milliseconds)
  
      return () => clearTimeout(timeout);
    }, []);
  
    return (

    <Background>
      <Restaurant_Background>
        <Navbar />
        
        <h1 className="mt-48 sm:mt-56 md:mt-64 lg:mt-72 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-md text-center leading-tight px-4">
          <div
            className={`lora-sans transition-opacity-transform duration-700 ${
              animateText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            Dine in Style at
          </div>
          
          <div
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl cinzel-decorative-regular transition-all duration-700 delay-500 ${
              animateText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <span className="bg-gradient-to-r from-[#ffffff] via-[#a7a7a7] to-[#ffffff] 
                   bg-clip-text text-transparent 
                   bg-[length:200%_200%] animate-text-gradient">
              Our Signature Restaurant
            </span>
          </div>
          <div
            className={`text-white text-[2px] lora-sans transition-opacity-transform duration-700 delay-500 ${
              animateText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            For AASHIYA
          </div>
          
        </h1>

        <p
          className={`text-sm sm:text-base md:text-lg lg:text-xl text-center font-extralight text-white max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto mb-6 px-4 py-2 rounded-3xl transition-opacity-transform duration-700 delay-700 ${
            animateText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          Savor gourmet dishes crafted with passion, where modern flair meets timeless recipes.
          From handcrafted appetizers to decadent desserts, each meal is an experience — curated in
          an ambiance of elegance and warmth.
        </p>

        <div className="text-center mt-4">
          <Link
            to="/booking"
            className={`mt-6 inline-block bg-white/10 border border-white text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-base sm:text-lg tracking-wide
              font-light uppercase transition-opacity-transform duration-700 delay-1000 ease-in-out hover:bg-white hover:text-black
              hover:shadow-[0_12px_35px_rgba(0,0,0,1)] backdrop-opacity-40-md ${
                animateText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
          >
            Reserve a Table
          </Link>
        </div>
                
      </Restaurant_Background>
    </Background>
  );
};