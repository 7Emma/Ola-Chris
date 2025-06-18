import { useState, useEffect } from "react";
import { Search, ShoppingCart, Menu, X, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import Cart from "../pages/Cart";

function Navbar({
  // Props pour la recherche
  searchTerm = "",
  onSearchChange,
  onSearchSubmit,

  // Props pour le panier
  cartItems = [],
  onCartClick,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  isCartOpen = false,
  onCloseCart,

  // Props optionnelles
  showSearchBar = true,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchTerm);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Mise à jour du compteur de panier
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(total);
  }, [cartItems]);

  // Synchronisation de la recherche locale avec les props
  useEffect(() => {
    setLocalSearchQuery(searchTerm);
  }, [searchTerm]);

  // Gestion de la recherche
  const handleSearchChange = (value) => {
    setLocalSearchQuery(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();

    // Si on n'est pas sur la page produits, y naviguer
    if (window.location.pathname !== "/products") {
      navigate("/products");
    }

    // Exécuter la recherche
    if (onSearchSubmit) {
      onSearchSubmit(localSearchQuery);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit(e);
    }
  };

  // Gestion du clic sur le panier
  const handleCartClick = () => {
    if (onCartClick) {
      onCartClick();
    }
  };

  return (
    <>
      <nav className="bg-white shadow-lg border-b-4 border-gradient-to-r from-blue-500 to-green-500 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                src={Logo}
                className="h-12 w-auto"
                alt="Logo OlaChris Market"
              />
            </Link>

            {/* Barre de recherche - Desktop */}
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
                À propos
              </Link>
              <Link
                to="/contact"
                className="text-blue-700 hover:text-green-600 font-medium transition-colors hover:underline"
              >
                Contact
              </Link>
              <Link
                to="/products"
                className="text-blue-700 hover:text-green-600 font-medium transition-colors hover:underline"
              >
                Produits
              </Link>
              <Link
                to="/offer"
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-1.5 rounded-full font-semibold hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Acheter
              </Link>

              {/* Bouton Panier avec compteur */}
              <button
                className="relative p-2 text-blue-700 hover:text-green-600 transition-colors duration-200"
                onClick={handleCartClick}
                title={`Panier (${cartCount} article${
                  cartCount !== 1 ? "s" : ""
                })`}
              >
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </button>

              {/* Bouton Utilisateur */}
              <button className="p-2 text-blue-700 hover:text-green-600 transition-colors duration-200">
                <User size={24} />
              </button>
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
              {/* Barre de recherche mobile */}
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

              {/* Navigation mobile */}
              <div className="space-y-3">
                <Link
                  to="/"
                  className="block text-blue-700 hover:text-green-600 font-medium py-2 transition-colors"
                  onClick={toggleMenu}
                >
                  Accueil
                </Link>
                <Link
                  to="/about"
                  className="block text-blue-700 hover:text-green-600 font-medium py-2 transition-colors"
                  onClick={toggleMenu}
                >
                  À propos
                </Link>
                <Link
                  to="/contact"
                  className="block text-blue-700 hover:text-green-600 font-medium py-2 transition-colors"
                  onClick={toggleMenu}
                >
                  Contact
                </Link>
                <Link
                  to="/products"
                  className="block text-blue-700 hover:text-green-600 font-medium py-2 transition-colors"
                  onClick={toggleMenu}
                >
                  Produits
                </Link>
              </div>

              {/* Actions mobiles */}
              <div className="space-y-3 pt-4 border-t border-blue-100">
                <Link
                  to="/products"
                  className="block w-full bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-full text-center font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-200"
                  onClick={toggleMenu}
                >
                  Acheter
                </Link>

                <div className="flex justify-center space-x-6">
                  {/* Panier mobile */}
                  <button
                    className="relative p-2 text-blue-700 hover:text-green-600 transition-colors duration-200"
                    onClick={() => {
                      handleCartClick();
                      toggleMenu();
                    }}
                    title={`Panier (${cartCount} article${
                      cartCount !== 1 ? "s" : ""
                    })`}
                  >
                    <ShoppingCart size={24} />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartCount > 99 ? "99+" : cartCount}
                      </span>
                    )}
                  </button>

                  {/* Utilisateur mobile */}
                  <button
                    className="p-2 text-blue-700 hover:text-green-600 transition-colors duration-200"
                    onClick={toggleMenu}
                  >
                    <User size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Modal Panier */}
      {isCartOpen && (
        <Cart
          cartItems={cartItems}
          onUpdateQuantity={onUpdateQuantity}
          onRemoveItem={onRemoveItem}
          onClearCart={onClearCart}
          isOpen={isCartOpen}
          onClose={onCloseCart}
        />
      )}
    </>
  );
}

export default Navbar;
