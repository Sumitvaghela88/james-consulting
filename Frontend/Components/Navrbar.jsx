import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { User } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },  
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Plans & Pricing", path: "/plans" },
    { name: "Tools & Tips", path: "/tools" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="bg-[#1a4d6f] text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6 lg:px-8">
        
        {/* Logo */}
        <div className="text-xl font-normal tracking-wider">
          <NavLink to="/" className="hover:opacity-80 transition-opacity">
            JAMES CONSULTING
          </NavLink>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center space-x-8">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-light transition-colors duration-200 ${
                  isActive ? "text-white" : "text-white/90 hover:text-white"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Login Button - Desktop */}
        <div className="hidden lg:flex items-center">
          <NavLink
            to="/login"
            className="flex items-center gap-2 bg-transparent border-0 text-white/90 hover:text-white transition-colors duration-200"
          >
            <User className="w-5 h-5" />
            <span className="text-sm font-light">Log In</span>
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#163d57] border-t border-white/10">
          <nav className="flex flex-col px-6 py-4 space-y-3">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-sm py-2 transition-colors duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-white/90 hover:text-white"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}\
            
            <NavLink
              to="/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors duration-200 py-2 text-sm"
            >
              <User className="w-5 h-5" />
              <span>Log In</span>
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
