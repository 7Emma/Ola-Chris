// src/App.jsx

import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Cart from "./pages/Cart";
import { useCart } from "./context/CartContext";
import { useAuth } from './context/AuthContext'; // N'oubliez pas d'importer useAuth

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  // Utilisez le hook useCart pour obtenir l'état du panier
  const { isOpen: isCartOpen, toggleCart } = useCart(); // 'isOpen' et 'toggleCart' viennent du contexte
  const { loading } = useAuth(); // Obtenez l'état de chargement de l'AuthContext

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleSearchSubmit = (value) => {
    setSearchTerm(value);
  };

  // Si l'application est encore en cours de chargement (ex: vérification de l'auth),
  // affichez un indicateur de chargement et ne rendez PAS la Navbar ni le reste.
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-2xl text-blue-500">
        Chargement de l'application...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Navbar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
        // Les props liées au panier ne sont plus passées ici car Navbar utilise useCart()
      />
      <AppRoutes
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        // Les props liées au panier ne sont plus passées ici car AppRoutes utilise useCart()
      />
      <Footer />
      {/* Le composant Cart est rendu conditionnellement par son propre état isOpen */}
      {isCartOpen && (
        <Cart /> /* Cart.jsx gère sa visibilité via useCart().isOpen */
      )}
    </BrowserRouter>
  );
}

export default App;