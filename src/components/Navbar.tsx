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

  // ✨ Active 상태: 레드-핑크 컬러 + 핑크빛 그림자
  const navLinkStyle = ({ isActive }: { isActive: boolean }) =>
    `relative px-2 py-1 text-sm font-medium transition-all duration-300
     ${
       isActive
         ? "text-red-400 font-bold drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]"
         : "text-gray-400 hover:text-red-300"
     }`;

  return (
    <>
      {/* 🚀 Navbar Container 
          - border-red-500/30: 붉은 테두리
          - shadow: 핑크빛 은은한 그림자
      */}
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 
                    w-[90%] md:w-auto md:min-w-[700px] max-w-5xl
                    flex items-center justify-between px-6 py-3
                    rounded-full border border-red-500/30
                    bg-black/70 backdrop-blur-md
                    shadow-[0_0_20px_rgba(244,63,94,0.15)]
                    transition-all duration-300 ${
                      scrolled ? "bg-black/90" : ""
                    }`}
      >
        {/* Logo Section */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-8 h-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-full group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-red-500/20">
            <span className="text-lg"></span>
          </div>

          <span className="text-xl font-bold tracking-wide text-white font-montserrat group-hover:text-pink-100 transition-colors">
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
          className="md:hidden text-gray-300 hover:text-red-400 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed top-24 left-1/2 -translate-x-1/2 w-[90%] z-40 
                    bg-[#0a0a0a]/95 backdrop-blur-xl border border-red-500/20 rounded-2xl 
                    overflow-hidden transition-all duration-300 ease-in-out origin-top shadow-2xl shadow-red-900/20
                    ${
                      isOpen
                        ? "opacity-100 scale-100 max-h-[300px]"
                        : "opacity-0 scale-95 max-h-0 pointer-events-none"
                    }`}
      >
        <div className="flex flex-col items-center gap-6 py-8">
          <NavLink
            to="/"
            className="text-lg text-gray-300 hover:text-red-400 font-medium"
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="text-lg text-gray-300 hover:text-red-400 font-medium"
          >
            About
          </NavLink>
          <NavLink
            to="/projects"
            className="text-lg text-gray-300 hover:text-red-400 font-medium"
          >
            Projects
          </NavLink>
          <NavLink
            to="/contact"
            className="text-lg text-gray-300 hover:text-red-400 font-medium"
          >
            Contact
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Navbar;
