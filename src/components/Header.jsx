import { useState } from "react";
import { Search, ShoppingCart, Menu, X, User } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white shadow-lg border-b-4 border-gradient-to-r from-blue-500 to-green-500">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <img src={Logo} className="h-12 w-auto" alt="Logo" />
          </Link>

          {/* Recherche - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Rechercher des produits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-2 border-2 border-blue-200 rounded-full focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-200 transition-all duration-200"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-green-500 text-white p-2 rounded-full hover:from-blue-600 hover:to-green-600 transition-all duration-200">
                <Search size={18} />
              </button>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className="text-blue-700 hover:text-green-600 font-medium transition-colors hover:underline"
            >
              Accueil
            </Link>
            <Link
              to="/about"
              className="text-blue-700 hover:text-green-600 font-medium transition-colors hover:underline"
            >
              About
            </Link>
            <Link
                to="/contact"
                className="block text-blue-700 hover:text-green-600 font-medium py-2"
              >
                Contact
              </Link>
            <Link
              to="/categories"
              className="text-blue-700 hover:text-green-600 font-medium transition-colors hover:underline"
            >
              Catégories
            </Link>
            

            <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-1.5 rounded-full font-semibold hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg">
              Acheter
            </button>

            <button className="relative p-2 text-blue-700 hover:text-green-600 transition-colors duration-200">
              <ShoppingCart size={24} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>

            <button className="p-2 text-blue-700 hover:text-green-600 transition-colors duration-200">
              <User size={24} />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-blue-700 hover:text-green-600"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-blue-100">
          <div className="px-4 pt-4 pb-6 space-y-4">
            {/* Recherche - Mobile */}
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher des produits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-2 border-2 border-blue-200 rounded-full focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-200"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-green-500 text-white p-2 rounded-full">
                <Search size={16} />
              </button>
            </div>

            {/* Liens - Mobile */}
            <div className="space-y-3">
              <Link
                to="/"
                className="block text-blue-700 hover:text-green-600 font-medium py-2"
              >
                Accueil
              </Link>
              <Link
                to="/offer"
                className="block text-blue-700 hover:text-green-600 font-medium py-2"
              >
                Offres
              </Link>
              <Link
                to="/contact"
                className="block text-blue-700 hover:text-green-600 font-medium py-2"
              >
                Contact
              </Link>
              <Link
                to="/categories"
                className="block text-blue-700 hover:text-green-600 font-medium py-2"
              >
                Catégories
              </Link>
              
            </div>

            {/* Boutons - Mobile */}
            <div className="space-y-3 pt-4 border-t border-blue-100">
              <button className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-200">
                Acheter
              </button>
              <div className="flex justify-center space-x-6">
                <button className="relative p-2 text-blue-700">
                  <ShoppingCart size={24} />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    3
                  </span>
                </button>
                <button className="p-2 text-blue-700">
                  <User size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
