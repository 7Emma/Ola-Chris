// src/components/Header.jsx (Votre Navbar)
import { useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  User,
  LogOut,
  LogIn,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

function Navbar({
  searchTerm = "",
  onSearchChange,
  onSearchSubmit,
  showSearchBar = true,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchTerm);
  const navigate = useNavigate();
  const location = useLocation(); // Pour détecter la page actuelle

  // Utilisez les hooks des contextes
  const { isAuthenticated, user, logout } = useAuth();
  const { items: cartItems, toggleCart, itemCount } = useCart();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    setLocalSearchQuery(searchTerm);
  }, [searchTerm]);

  const handleSearchChange = (value) => {
    setLocalSearchQuery(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (window.location.pathname !== "/products") {
      navigate("/products");
    }
    if (onSearchSubmit) {
      onSearchSubmit(localSearchQuery);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit(e);
    }
  };

  const handleCartClick = () => {
    toggleCart();
  };

  const handleUserClick = () => {
    if (isAuthenticated) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Fonction pour vérifier si un lien est actif
  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  // Classes pour les liens avec effets actifs
  const getLinkClasses = (path) => {
    const baseClasses = "text-blue-700 hover:text-green-600 font-medium transition-all duration-200 relative";
    const activeClasses = "text-green-600 font-bold";
    const hoverClasses = "hover:underline hover:scale-105";
    
    if (isActiveLink(path)) {
      return `${baseClasses} ${activeClasses}`;
    }
    return `${baseClasses} ${hoverClasses}`;
  };

  // Classes pour l'icône utilisateur avec background actif
  const getUserIconClasses = () => {
    const baseClasses = "p-2 transition-all duration-300 rounded-full flex items-center";
    if (isActiveLink("/profile")) {
      return `${baseClasses} bg-gradient-to-r from-blue-100 to-green-100 text-green-600 shadow-md transform scale-105`;
    }
    return `${baseClasses} text-blue-700 hover:text-green-600 hover:bg-blue-50`;
  };

  return (
    <>
      <nav className="bg-white shadow-lg border-b-4 border-gradient-to-r from-blue-500 to-green-500 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-14">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                src={Logo}
                className="h-12 w-auto"
                alt="Logo OlaChris Market"
              />
            </Link>

            {showSearchBar && (
              <div className="hidden md:flex flex-1 max-w-lg mx-8">
                <form onSubmit={handleSearchSubmit} className="relative w-full">
                  <input
                    type="text"
                    placeholder="Rechercher des produits..."
                    value={localSearchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full pl-4 pr-12 py-2 border-2 border-blue-200 rounded-full focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-green-500 text-white p-2 rounded-full hover:from-blue-600 hover:to-green-600 transition-all duration-200"
                  >
                    <Search size={18} />
                  </button>
                </form>
              </div>
            )}

            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/"
                className={getLinkClasses("/")}
              >
                Accueil
                {isActiveLink("/") && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-green-500 transform scale-x-100 transition-transform duration-300"></span>
                )}
              </Link>
              
              <Link
                to="/about"
                className={getLinkClasses("/about")}
              >
                À propos
                {isActiveLink("/about") && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-green-500 transform scale-x-100 transition-transform duration-300"></span>
                )}
              </Link>
              
              <Link
                to="/contact"
                className={getLinkClasses("/contact")}
              >
                Contact
                {isActiveLink("/contact") && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-green-500 transform scale-x-100 transition-transform duration-300"></span>
                )}
              </Link>
              
              <Link
                to="/products"
                className={getLinkClasses("/products")}
              >
                Produits
                {isActiveLink("/products") && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-green-500 transform scale-x-100 transition-transform duration-300"></span>
                )}
              </Link>
              
              <Link
                to="/products"
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-1.5 rounded-full font-semibold hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Acheter
              </Link>

              {/* Bouton Panier avec compteur */}
              <button
                className="relative p-2 text-blue-700 hover:text-green-600 transition-colors duration-200 rounded-full hover:bg-blue-50"
                onClick={handleCartClick}
                title={`Panier (${itemCount} article${
                  itemCount !== 1 ? "s" : ""
                })`}
              >
                <ShoppingCart size={24} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </button>

              {/* Bouton Utilisateur / Connexion / Déconnexion */}
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className={getUserIconClasses()}
                    title={`Profil - ${user.name || user.email}`}
                  >
                    <User size={24} />
                    {user.name && (
                      <span className="ml-2 font-medium">
                        {user.name.split(" ")[0]}
                      </span>
                    )}
                  </Link>
                  <button
                    className="p-2 text-red-500 hover:text-red-700 transition-colors duration-200 rounded-full hover:bg-red-50"
                    title="Déconnexion"
                    onClick={handleLogout}
                  >
                    <LogOut size={24} />
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className={`p-2 transition-all duration-300 rounded-full flex items-center ${
                    isActiveLink("/login") 
                      ? "bg-gradient-to-r from-blue-100 to-green-100 text-green-600 shadow-md transform scale-105" 
                      : "text-blue-700 hover:text-green-600 hover:bg-blue-50"
                  }`}
                  title="Se connecter"
                >
                  <LogIn size={24} />
                  <span className="ml-2 font-medium">Connexion</span>
                </Link>
              )}
            </div>

            {/* Menu mobile toggle */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-blue-700 hover:text-green-600 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-blue-100 shadow-lg">
            <div className="px-4 pt-4 pb-6 space-y-4">
              {showSearchBar && (
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher des produits..."
                    value={localSearchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full pl-4 pr-12 py-2 border-2 border-blue-200 rounded-full focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-200"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-green-500 text-white p-2 rounded-full"
                  >
                    <Search size={16} />
                  </button>
                </form>
              )}

              <div className="space-y-3">
                <Link
                  to="/"
                  className={`block font-medium py-2 transition-all duration-200 px-3 rounded-lg ${
                    isActiveLink("/") 
                      ? "text-green-600 font-bold bg-gradient-to-r from-blue-50 to-green-50 border-l-4 border-green-500" 
                      : "text-blue-700 hover:text-green-600 hover:bg-blue-50"
                  }`}
                  onClick={toggleMenu}
                >
                  Accueil
                </Link>
                
                <Link
                  to="/about"
                  className={`block font-medium py-2 transition-all duration-200 px-3 rounded-lg ${
                    isActiveLink("/about") 
                      ? "text-green-600 font-bold bg-gradient-to-r from-blue-50 to-green-50 border-l-4 border-green-500" 
                      : "text-blue-700 hover:text-green-600 hover:bg-blue-50"
                  }`}
                  onClick={toggleMenu}
                >
                  À propos
                </Link>
                
                <Link
                  to="/contact"
                  className={`block font-medium py-2 transition-all duration-200 px-3 rounded-lg ${
                    isActiveLink("/contact") 
                      ? "text-green-600 font-bold bg-gradient-to-r from-blue-50 to-green-50 border-l-4 border-green-500" 
                      : "text-blue-700 hover:text-green-600 hover:bg-blue-50"
                  }`}
                  onClick={toggleMenu}
                >
                  Contact
                </Link>
                
                <Link
                  to="/products"
                  className={`block font-medium py-2 transition-all duration-200 px-3 rounded-lg ${
                    isActiveLink("/products") 
                      ? "text-green-600 font-bold bg-gradient-to-r from-blue-50 to-green-50 border-l-4 border-green-500" 
                      : "text-blue-700 hover:text-green-600 hover:bg-blue-50"
                  }`}
                  onClick={toggleMenu}
                >
                  Produits
                </Link>
              </div>

              <div className="space-y-3 pt-4 border-t border-blue-100">
                <Link
                  to="/products"
                  className="block w-full bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-full text-center font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-200"
                  onClick={toggleMenu}
                >
                  Acheter
                </Link>

                <div className="flex justify-center space-x-6">
                  <button
                    className="relative p-2 text-blue-700 hover:text-green-600 transition-colors duration-200 rounded-full hover:bg-blue-50"
                    onClick={() => {
                      handleCartClick();
                      toggleMenu();
                    }}
                    title={`Panier (${itemCount} article${
                      itemCount !== 1 ? "s" : ""
                    })`}
                  >
                    <ShoppingCart size={24} />
                    {itemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {itemCount > 99 ? "99+" : itemCount}
                      </span>
                    )}
                  </button>

                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/profile"
                        className={`p-2 transition-all duration-300 rounded-full ${
                          isActiveLink("/profile") 
                            ? "bg-gradient-to-r from-blue-100 to-green-100 text-green-600 shadow-md transform scale-105" 
                            : "text-blue-700 hover:text-green-600 hover:bg-blue-50"
                        }`}
                        onClick={toggleMenu}
                        title={`Profil - ${user.name || user.email}`}
                      >
                        <User size={24} />
                      </Link>
                      <button
                        className="p-2 text-red-500 hover:text-red-700 transition-colors duration-200 rounded-full hover:bg-red-50"
                        onClick={() => {
                          handleLogout();
                          toggleMenu();
                        }}
                        title="Déconnexion"
                      >
                        <LogOut size={24} />
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className={`p-2 transition-all duration-300 rounded-full ${
                        isActiveLink("/login") 
                          ? "bg-gradient-to-r from-blue-100 to-green-100 text-green-600 shadow-md transform scale-105" 
                          : "text-blue-700 hover:text-green-600 hover:bg-blue-50"
                      }`}
                      onClick={toggleMenu}
                      title="Se connecter"
                    >
                      <LogIn size={24} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;