// src/pages/Checkout.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; // Pour accéder au panier
import { useAuth } from '../../context/AuthContext'; // Pour afficher les infos utilisateur si besoin

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth(); // Pour afficher les infos de l'utilisateur connecté
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const handleProceedToPayment = () => {
    // Ici, vous intégreriez votre logique de paiement réelle (ex: Kkiapay)
    // Pour l'instant, nous allons simuler le succès et vider le panier
    alert(`Procédure de paiement pour ${totalAmount} € lancée !`);
    clearCart(); // Vider le panier après "paiement"
    navigate('/success-payment'); // Rediriger vers une page de confirmation
  };

  if (!isAuthenticated) {
    // Cette vérification est redondante si AppRoutes protège déjà la route,
    // mais elle peut servir de fallback ou pour un message plus spécifique.
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-6rem)] bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-xl text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Accès Refusé</h2>
          <p className="text-gray-700">Vous devez être connecté pour accéder à la page de paiement.</p>
          <button
            onClick={() => navigate('/login')}
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Se connecter
          </button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-6rem)] bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-xl text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Votre panier est vide</h2>
          <p className="text-gray-700">Ajoutez des articles pour passer à l'achat.</p>
          <button
            onClick={() => navigate('/products')}
            className="mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Voir les produits
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-6rem)] bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
          Finaliser votre commande
        </h1>

        {isAuthenticated && user && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Vos informations</h3>
            <p className="text-gray-700">
              Connecté en tant que: <span className="font-medium">{user.name || user.email}</span>
            </p>
            <p className="text-gray-700">Email: <span className="font-medium">{user.email}</span></p>
          </div>
        )}

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Articles du panier</h3>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md shadow-sm">
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold text-gray-900">{(item.price * item.quantity).toFixed(2)} €</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-6 mt-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Total à payer:</h2>
          <span className="text-3xl font-extrabold text-blue-600">{totalAmount} €</span>
        </div>

        <button
          onClick={handleProceedToPayment}
          className="mt-8 w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-lg text-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Procéder au paiement
        </button>
      </div>
    </div>
  );
}

export default Checkout;