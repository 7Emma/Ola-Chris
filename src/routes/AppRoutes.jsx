// src/routes/AppRoutes.jsx
import { Routes, Route, useNavigate, Navigate } from "react-router-dom"; // Importez Navigate
import { useEffect } from "react";
import Home from "../pages/Home";
import About from "../pages/About";
import Products from "../pages/Products";
import ProductsDetails from "../components/futures/ProductsDetails";
import Contact from "../pages/Contact";
import Offer from "../pages/Offer";
import PaymentForm from "../assets/kkiapay/PayementForm";
import Login from "../pages/users/Login";
import Checkout from "../components/futures/CheckOut";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import Register from "../pages/users/Register";
import SupermarketProfile from "../pages/users/Profile";
import AdminDashboard from "../pages/AdminDashboard"; // Importez le tableau de bord admin

// Composant utilitaire pour la redirection vers la connexion
function RedirectToLogin() {
  const navigate = useNavigate();
  useEffect(() => {
    alert("Vous devez être connecté pour accéder à cette page.");
    navigate("/login");
  }, [navigate]);
  return null;
}

// Composant de route privée pour les utilisateurs authentifiés
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-6rem)] text-2xl text-blue-500">
        Chargement de l'authentification...
      </div>
    );
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Composant de route privée pour les administrateurs
const AdminRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-6rem)] text-2xl text-blue-500">
        Chargement des permissions...
      </div>
    );

  if (!isAuthenticated) {
    // Si non authentifié, rediriger vers la page de connexion
    return <Navigate to="/login" replace />;
  }

  // Si authentifié mais pas admin, rediriger vers l'accueil et alerter
  if (user && user.role !== "admin") {
    alert(
      "Accès non autorisé : Vous n'avez pas les permissions d'administrateur."
    );
    return <Navigate to="/" replace />;
  }

  // Si authentifié et admin, rendre les enfants
  return children;
};

function AppRoutes({ searchTerm, onSearchChange }) {
  const { isAuthenticated, loading, user } = useAuth(); // Obtenez l'utilisateur pour vérifier le rôle
  const { addToCart, updateCartQuantity, cartItems } = useCart();

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
            cartItems={cartItems}
            onAddToCart={addToCart}
            onUpdateCartQuantity={updateCartQuantity}
          />
        }
      />
      <Route
        path="/details/:productId" // Assurez-vous d'avoir un paramètre d'ID si nécessaire
        element={<ProductsDetails onAddToCart={addToCart} />}
      />
      <Route path="/contact" element={<Contact />} />
      <Route path="/offer" element={<Offer />} />
      <Route path="/pay" element={<PaymentForm />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Route protégée pour le profil utilisateur */}
      <Route
        path="/profile/*" // Utilisez /* pour les sous-routes du profil
        element={
          <PrivateRoute>
            <SupermarketProfile />
          </PrivateRoute>
        }
      />

      {/* Route protégée pour le tableau de bord administrateur */}
      <Route
        path="/admin/*" // Utilisez /* pour les sous-routes de l'admin
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      {/* Route protégée pour le paiement */}
      <Route
        path="/checkout"
        element={isAuthenticated ? <Checkout /> : <RedirectToLogin />}
      />

      {/* Page de succès de paiement */}
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
                onClick={() => useNavigate("/")} // Correction ici, utilisez navigate()
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
