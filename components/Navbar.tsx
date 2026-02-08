
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onLogin: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-[100] px-4 md:px-6 py-4 border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo - Updated to Amatic SC Bold */}
        <div className="flex items-center gap-1 cursor-pointer" onClick={() => window.location.reload()}>
          <span className="text-3xl md:text-4xl font-bold font-logo tracking-wide text-bumble-dark">A-Line</span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={onLogin}
            className="px-4 md:px-6 py-2 md:py-2.5 bg-bumble-dark text-white rounded-full text-xs md:text-sm font-bold hover:bg-gray-800 transition-all"
          >
            Dashboard
          </button>
          <button 
            className="lg:hidden p-2 text-bumble-dark"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-6 flex flex-col gap-6 shadow-xl animate-in slide-in-from-top duration-300">
          <button onClick={onLogin} className="w-full py-4 bg-bumble-dark text-white rounded-2xl font-bold">
            Dashboard
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
