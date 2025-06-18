// src/App.jsx

import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import AppContext from "./routes/AppRoutes";
import Navbar from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";

function App() {
  // États globaux pour la recherche et le panier
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Gestion de la recherche
  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleSearchSubmit = (value) => {
    // Dans votre Navbar, handleSearchSubmit déclenche déjà la navigation si nécessaire.
    // Cette fonction ici se contente de mettre à jour le searchTerm global.
    setSearchTerm(value);
  };

  // Gestion du panier
  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      updateCartQuantity(product.id, existingItem.quantity + 1);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  return (
    <BrowserRouter>
      {/* Navbar reçoit toutes les props nécessaires */}
      <Navbar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
        cartItems={cartItems}
        onCartClick={handleCartClick}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        isCartOpen={isCartOpen}
        onCloseCart={handleCloseCart}
        showSearchBar={true}
      />
      {/* AppContext recoit searchTerm et onSearchChange */}
      <AppContext
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onAddToCart={addToCart}
        onUpdateCartQuantity={updateCartQuantity}
        cartItems={cartItems}
      />
      <Footer />
      {/* La modale Panier est gérée par l'état isCartOpen dans App.jsx */}
      {isCartOpen && (
        <Cart
          cartItems={cartItems}
          onUpdateQuantity={updateCartQuantity}
          onRemoveItem={removeFromCart}
          onClearCart={clearCart}
          isOpen={isCartOpen}
          onClose={handleCloseCart}
        />
      )}
    </BrowserRouter>
  );
}

export default App;