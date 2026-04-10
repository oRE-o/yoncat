// src/components/Navbar.tsx
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // ✨ Active state: mint/teal color + glow
  const navLinkStyle = ({ isActive }: { isActive: boolean }) =>
    `relative px-2 py-1 text-sm font-medium transition-all duration-300
     ${
       isActive
         ? "text-emerald-400 font-bold drop-shadow-[0_0_8px_rgba(62,201,167,0.6)]"
         : "text-gray-400 hover:text-emerald-300"
     }`;

  return (
    <>
      {/* Navbar Container
          - border-emerald-500/30: mint/teal border
          - shadow: mint glow
      */}
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 
                    w-[90%] md:w-auto md:min-w-[700px] max-w-5xl
                    flex items-center justify-between px-6 py-3
                    rounded-full border border-emerald-500/30
                    bg-black/70 backdrop-blur-md
                    shadow-[0_0_20px_rgba(62,201,167,0.15)]
                    transition-all duration-300 ${
                      scrolled ? "bg-black/90" : ""
                    }`}
      >
        {/* Logo Section */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-emerald-500/20">
            <span className="text-lg">🐱</span>
          </div>

          <span className="text-xl font-bold tracking-wide text-white font-montserrat group-hover:text-emerald-100 transition-colors">
            yon.cat
          </span>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 ml-auto">
          <NavLink to="/" className={navLinkStyle}>
            Home
          </NavLink>
          <NavLink to="/about" className={navLinkStyle}>
            About
          </NavLink>
          <NavLink to="/projects" className={navLinkStyle}>
            Projects
          </NavLink>
          <NavLink to="/contact" className={navLinkStyle}>
            Contact
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300 hover:text-emerald-400 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed top-24 left-1/2 -translate-x-1/2 w-[90%] z-40 
                    bg-[#0a0a0a]/95 backdrop-blur-xl border border-emerald-500/20 rounded-2xl 
                    overflow-hidden transition-all duration-300 ease-in-out origin-top shadow-2xl shadow-emerald-900/20
                    ${
                      isOpen
                        ? "opacity-100 scale-100 max-h-[300px]"
                        : "opacity-0 scale-95 max-h-0 pointer-events-none"
                    }`}
      >
        <div className="flex flex-col items-center gap-6 py-8">
          <NavLink
            to="/"
            className="text-lg text-gray-300 hover:text-emerald-400 font-medium"
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="text-lg text-gray-300 hover:text-emerald-400 font-medium"
          >
            About
          </NavLink>
          <NavLink
            to="/projects"
            className="text-lg text-gray-300 hover:text-emerald-400 font-medium"
          >
            Projects
          </NavLink>
          <NavLink
            to="/contact"
            className="text-lg text-gray-300 hover:text-emerald-400 font-medium"
          >
            Contact
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Navbar;
