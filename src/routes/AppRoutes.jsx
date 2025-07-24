// src/routes/AppRoutes.jsx
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react"; // Importez useEffect
import Home from "../pages/Home";
import About from "../pages/About";
import Products from "../pages/Products";
import ProductsDetails from "../components/futures/ProductsDetails";
import Contact from "../pages/Contact";
import Offer from "../pages/Offer";
import PaymentForm from "../assets/kkiapay/PayementForm"; // Assurez-vous que ce composant existe
import Login from "../pages/users/Login"; // Importez la page de connexion
import Checkout from "../components/futures/CheckOut"; // Importez la page de paiement
import { useAuth } from "../context/AuthContext"; // Importez useAuth
import { useCart } from "../context/CartContext"; // Importez useCart
import Register from "../pages/users/Register";
import SupermarketProfile from "../pages/users/Profile";

// Composant utilitaire pour la redirection
function RedirectToLogin() {
  const navigate = useNavigate();
  useEffect(() => {
    alert("Vous devez être connecté pour passer à l'achat.");
    navigate("/login");
  }, [navigate]);
  return null;
}

function AppRoutes({
  searchTerm,
  onSearchChange,
  // onAddToCart, // Plus besoin de passer ces props ici, ils viennent du contexte
  // onUpdateCartQuantity,
  // cartItems,
}) {
  const { isAuthenticated, loading } = useAuth(); // Obtenez l'état d'authentification et le statut de chargement
  const { addToCart, updateCartQuantity, cartItems } = useCart(); // Obtenez les fonctions et l'état du panier via useCart

  // Si l'état de chargement est vrai, on peut afficher un loader ou rien du tout
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-6rem)] text-2xl text-blue-500">
        Chargement de l'application...
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home onAddToCart={addToCart} />} />
      <Route path="/about" element={<About />} />
      <Route
        path="/products"
        element={
          <Products
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
            cartItems={cartItems} // cartItems est maintenant du contexte
            onAddToCart={addToCart} // addToCart est maintenant du contexte
            onUpdateCartQuantity={updateCartQuantity} // updateCartQuantity est maintenant du contexte
          />
        }
      />
      <Route
        path="/details"
        element={<ProductsDetails onAddToCart={addToCart} />} // addToCart est du contexte
      />
      <Route path="/contact" element={<Contact />} />
      <Route path="/offer" element={<Offer />} />
      <Route path="/pay" element={<PaymentForm />} />
      <Route path="/profile" element={<SupermarketProfile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Route protégée pour le paiement */}
      <Route
        path="/checkout"
        element={isAuthenticated ? <Checkout /> : <RedirectToLogin />}
      />
      {/* Vous pouvez ajouter une page de succès de paiement */}
      <Route
        path="/success-payment"
        element={
          <div className="flex justify-center items-center min-h-[calc(100vh-6rem)] bg-green-50">
            <div className="bg-white p-8 rounded-lg shadow-xl text-center">
              <h2 className="text-3xl font-bold text-green-600 mb-4">
                Paiement Réussi !
              </h2>
              <p className="text-gray-700">
                Merci pour votre commande. Un email de confirmation a été
                envoyé.
              </p>
              <button
                onClick={() => navigate("/")}
                className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                Retour à l'accueil
              </button>
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
