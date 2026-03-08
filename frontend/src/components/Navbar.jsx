import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { navItems } from "../assets/dummydata";
import { FaOpencart } from "react-icons/fa";
import { useCart } from "../CartContext/CartContext.jsx";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { cart } = useCart();

  const totalQuantity = cart.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-base-100 border-b border-base-200 transition-all duration-500 ${
        scrolled ? "shadow-md py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-4 md:text-xs">
        <div className="flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center">
            <div className="relative group">
              <div className="absolute -inset-3 rounded-full opacity-0 blur-xl group-hover:opacity-30 transition-opacity bg-primary"></div>

              <div className="relative flex items-center">
                <img
                  src={logo}
                  alt="Logo"
                  className="h-8 w-8 rounded-full z-10"
                />

                <div className="ml-2">
                  <h1 className="text-xl font-bold text-primary">
                    BOOKMEDIA
                  </h1>

                  <div className="h-0.5 w-full bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
                </div>
              </div>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className="relative group px-5 py-3.5 rounded-lg transition-all duration-300 overflow-hidden hover:bg-base-200"
                >
                  <div className="relative z-10 flex items-center">

                    <div className="relative">
                      <item.icon
                        className={`relative h-5 w-5 transition-colors duration-300 z-10 ${
                          isActive
                            ? "text-primary"
                            : "text-base-content group-hover:text-primary"
                        }`}
                      />
                    </div>

                    <span
                      className={`ml-2 transition-colors duration-300 ${
                        isActive
                          ? "text-primary font-medium"
                          : "text-base-content group-hover:text-primary"
                      }`}
                    >
                      {item.name}
                    </span>

                    {isActive && (
                      <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary"></span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* RIGHT SIDE CART */}
          <div className="hidden md:flex items-center space-x-5">
            <Link to="/cart" className="relative group">
              <div className="relative">
                <FaOpencart className="relative h-6 w-6 text-base-content group-hover:text-primary transition-colors duration-300 z-10" />

                {totalQuantity > 0 && (
                  <span className="absolute top-[-10px] right-[-10px] flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white rounded-full bg-primary">
                    {totalQuantity}
                  </span>
                )}
              </div>
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;