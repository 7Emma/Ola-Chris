// src/App.jsx

import { BrowserRouter, useLocation } from "react-router-dom";
import { useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Cart from "./pages/Cart";
import { useCart } from "./context/CartContext";
import { useAuth } from "./context/AuthContext"; // N'oubliez pas d'importer useAuth

function AppLayout({
  searchTerm,
  handleSearchChange,
  handleSearchSubmit,
  isCartOpen,
}) {
  const location = useLocation();
  const hideHeaderFooter = ["/login", "/register"].includes(location.pathname);

  return (
    <>
      {!hideHeaderFooter && (
        <Navbar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
        />
      )}
      <AppRoutes searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      {!hideHeaderFooter && <Footer />}
      {!hideHeaderFooter && isCartOpen && <Cart />}
    </>
  );
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const { isOpen: isCartOpen } = useCart();
  const { loading } = useAuth();

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleSearchSubmit = (value) => {
    setSearchTerm(value);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-2xl text-blue-500">
        Chargement de l'application...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <AppLayout
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        handleSearchSubmit={handleSearchSubmit}
        isCartOpen={isCartOpen}
      />
    </BrowserRouter>
  );
}

export default App;
