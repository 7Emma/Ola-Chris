// src/components/Panier.jsx (ou src/pages/Panier.jsx)
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

const Panier = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  isOpen,
  onClose,
}) => {
  const [promoCode, setPromoCode] = useState("");

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="w-full max-w-md bg-white shadow-xl h-full flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <ShoppingCart /> Panier
          </h2>
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Votre panier est vide.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 border-b pb-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.price} €</p>
                  <div className="flex items-center mt-1">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="px-2"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="px-2"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-red-500"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-4 border-t space-y-3">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>{totalPrice.toFixed(2)} €</span>
            </div>

            <input
              type="text"
              placeholder="Code promo"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />

            <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded flex items-center justify-center gap-2">
              <CreditCard size={18} />
              Passer à la caisse
            </button>

            <button
              onClick={onClearCart}
              className="w-full text-red-600 hover:underline mt-2 flex items-center justify-center gap-2"
            >
              <Trash2 size={18} />
              Vider le panier
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Panier;
