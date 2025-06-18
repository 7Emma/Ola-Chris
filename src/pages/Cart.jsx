import React, { useState } from "react";
import {
  ShoppingCart,
  Plus,
  Minus,
  X,
  Trash2,
  ShoppingBag,
  CreditCard,
} from "lucide-react";

const Cart = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  isOpen,
  onClose,
}) => {
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);

  // Calculs du panier
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = subtotal > 50 ? 0 : 4.99;
  const promoDiscount = appliedPromo ? subtotal * 0.1 : 0; // 10% de réduction
  const total = subtotal + deliveryFee - promoDiscount;

  const handlePromoCode = () => {
    if (promoCode.toLowerCase() === "welcome10") {
      setAppliedPromo({ code: "WELCOME10", discount: 0.1 });
    } else {
      alert("Code promo invalide");
    }
  };

  const handleIncrement = (productId) => {
    const item = cartItems.find((item) => item.id === productId);
    if (item && item.quantity < item.stock) {
      onUpdateQuantity(productId, item.quantity + 1);
    }
  };

  const handleDecrement = (productId) => {
    const item = cartItems.find((item) => item.id === productId);
    if (item && item.quantity > 1) {
      onUpdateQuantity(productId, item.quantity - 1);
    } else {
      onRemoveItem(productId);
    }
  };

  const handleCheckout = () => {
    alert("Redirection vers la page de paiement...");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Cart Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <ShoppingCart className="text-green-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-900">
              Mon Panier ({cartItems.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            /* Empty Cart */
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <ShoppingBag size={64} className="text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Votre panier est vide
              </h3>
              <p className="text-gray-500 mb-6">
                Ajoutez des produits pour commencer vos achats
              </p>
              <button
                onClick={onClose}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Continuer mes achats
              </button>
            </div>
          ) : (
            /* Cart Items */
            <div className="p-4 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-gray-50 rounded-lg p-4"
                >
                  {/* Product Image */}
                  <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image || "/api/placeholder/64/64"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-500 mb-2">
                      {item.price.toFixed(2)} € / unité
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center bg-white rounded-lg">
                        <button
                          onClick={() => handleDecrement(item.id)}
                          className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-3 py-2 font-medium min-w-[3ch] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleIncrement(item.id)}
                          disabled={item.quantity >= item.stock}
                          className={`p-2 transition-colors ${
                            item.quantity >= item.stock
                              ? "text-gray-300 cursor-not-allowed"
                              : "text-gray-500 hover:text-green-500"
                          }`}
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {(item.price * item.quantity).toFixed(2)} €
                    </p>
                    {item.quantity >= item.stock && (
                      <p className="text-xs text-orange-500 mt-1">
                        Stock limité
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {/* Clear Cart Button */}
              {cartItems.length > 0 && (
                <button
                  onClick={onClearCart}
                  className="w-full py-2 text-sm text-red-600 hover:text-red-700 transition-colors"
                >
                  Vider le panier
                </button>
              )}
            </div>
          )}
        </div>

        {/* Cart Summary */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-4 space-y-4">
            {/* Promo Code */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Code promo"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  onClick={handlePromoCode}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Appliquer
                </button>
              </div>
              {appliedPromo && (
                <div className="flex items-center justify-between text-sm text-green-600">
                  <span>Code {appliedPromo.code} appliqué</span>
                  <button
                    onClick={() => setAppliedPromo(null)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Price Summary */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span>{subtotal.toFixed(2)} €</span>
              </div>

              <div className="flex justify-between">
                <span>Livraison</span>
                <span className={deliveryFee === 0 ? "text-green-600" : ""}>
                  {deliveryFee === 0
                    ? "Gratuite"
                    : `${deliveryFee.toFixed(2)} €`}
                </span>
              </div>

              {subtotal < 50 && (
                <p className="text-xs text-gray-500">
                  Livraison gratuite dès 50€ d'achat
                </p>
              )}

              {appliedPromo && (
                <div className="flex justify-between text-green-600">
                  <span>Réduction ({appliedPromo.code})</span>
                  <span>-{promoDiscount.toFixed(2)} €</span>
                </div>
              )}

              <div className="flex justify-between font-semibold text-lg border-t pt-2">
                <span>Total</span>
                <span>{total.toFixed(2)} €</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <CreditCard size={20} />
              Passer commande
            </button>

            {/* Continue Shopping */}
            <button
              onClick={onClose}
              className="w-full text-gray-600 py-2 text-sm hover:text-gray-800 transition-colors"
            >
              Continuer mes achats
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
