import { useState, useEffect } from 'react';
import './App.css';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SplashScreen } from "./components/SplashScreen/SplashScreen.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { Home } from "./pages/Home";
import { Rooms } from "./pages/Rooms";
import { Restaurant } from "./pages/Restaurant";
import { Gym } from "./pages/Gym";
import { Events } from "./pages/Events";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { ForgotPassword } from "./pages/ForgotPassword";
import { SearchRooms } from "./pages/SearchRooms";

function App() {
  const [splashDone, setSplashDone] = useState(false);
  const [dropNavbar, setDropNavbar] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDropNavbar(true); // Trigger Navbar drop
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Splash Screen */}
      {!splashDone && <SplashScreen onFinish={() => setSplashDone(true)} />}

      <div className={`${!splashDone ? 'pointer-events-none select-none overflow-hidden' : ''}`}>
        {/* Router wraps everything that needs useLocation */}
        <Router>
          {/* ✅ Navbar is now inside Router */}
          <Navbar dropIn={dropNavbar} />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/rooms' element={<Rooms />} />
            <Route path='/Restaurant' element={<Restaurant />} />
            <Route path='/Gym' element={<Gym />} />
            <Route path='/events' element={<Events />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/booking' element={<SearchRooms />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
