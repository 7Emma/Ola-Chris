import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import AppContext from "./routes/AppRoutes";
import Navbar from "./components/Header";
import Footer from "./components/Footer";

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
      <AppContext onAddToCart={addToCart} />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
