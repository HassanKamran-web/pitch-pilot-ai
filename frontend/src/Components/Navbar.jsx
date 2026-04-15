import React, { useState } from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-slate-800 bg-slate-950">
      <nav className="h-20 max-w-7xl mx-auto px-4 flex items-center justify-between">

    
        <div className="flex items-center gap-3">
          <img className="w-10" src="./favicon.png" alt="logo" />
          <h1 className="text-white font-bold text-lg">PitchPilot</h1>
        </div>

        
        <ul className="hidden md:flex items-center gap-8 text-white font-medium">
          <a href="#feature" className="cursor-pointer hover:text-gray-300 transition">
            Features
          </a>
          <a href="#howitsworks" className="cursor-pointer hover:text-gray-300 transition">
            How it Works
          </a>
          <a href="#pricing" className="cursor-pointer hover:text-gray-300 transition">
            Pricing
          </a>

          <Link to="/login">
            <li className="cursor-pointer hover:text-gray-300 transition">
              Login
            </li>
          </Link>

          <Link to="/register">
            <button className="px-4 py-2 rounded-md cursor-pointer bg-orange-500 hover:bg-orange-600 transition">
              Get Started
            </button>
          </Link>
        </ul>

        
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </nav>

    
      {menuOpen && (
        <div className="md:hidden bg-slate-950 border-t border-slate-800 px-6 py-4 space-y-4 text-white">
          <p className="cursor-pointer hover:text-gray-300">Features</p>
          <p className="cursor-pointer hover:text-gray-300">Pricing</p>

          <Link to="/login" onClick={() => setMenuOpen(false)}>
            <p className="hover:text-gray-300">Login</p>
          </Link>

          <Link to="/register" onClick={() => setMenuOpen(false)}>
            <button className="w-full mt-2 px-4 py-2 cursor-pointer rounded-md bg-orange-500 hover:bg-orange-600 transition">
              Get Started
            </button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;