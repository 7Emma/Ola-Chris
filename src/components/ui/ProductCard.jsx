// src/components/ui/ProductCard.jsx
import React from "react";
import { ShoppingCart, Plus, Minus, Heart } from "lucide-react";
import { useAuth } from "../../context/AuthContext"; // Importer le hook useAuth

const ProductCard = ({
  product,
  onAddToCart,
  onUpdateQuantity,
  cartQuantity = 0,
}) => {
  const isInStock = product.stock > 0;
  const isLowStock = product.stock <= 5 && product.stock > 0;

  // Utiliser le contexte d'authentification pour les favoris
  const { isProductFavorite, handleToggleFavorite } = useAuth();
  const isWishlisted = isProductFavorite(product._id); // Vérifier si ce produit est favori

  const handleHeartClick = (e) => {
    e.stopPropagation(); // Empêche l'ouverture des détails du produit lors du clic sur le cœur
    handleToggleFavorite(product._id); // Basculer l'état favori du produit
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition duration-300 flex flex-col justify-between">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />

      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{product.categoryName}</p>
        <p className="text-green-600 font-bold text-lg mb-1">
          {product.price} FCFA
        </p>

        <p className="text-sm mb-2">
          {isInStock ? (
            <span className={isLowStock ? "text-orange-500" : "text-green-500"}>
              {isLowStock ? "Stock faible" : "En stock"} ({product.stock})
            </span>
          ) : (
            <span className="text-red-500">Rupture de stock</span>
          )}
        </p>
      </div>

      <div className="flex items-center justify-between mt-4">
        {cartQuantity > 0 ? (
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onUpdateQuantity(product._id, cartQuantity - 1);
              }}
              className="p-1 border rounded"
            >
              <Minus size={16} />
            </button>
            <span>{cartQuantity}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onUpdateQuantity(product._id, cartQuantity + 1);
              }}
              disabled={cartQuantity >= product.stock}
              className="p-1 border rounded"
            >
              <Plus size={16} />
            </button>
          </div>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            <ShoppingCart size={16} /> Ajouter
          </button>
        )}

        {/* Bouton cœur pour la wishlist */}
        <button
          onClick={handleHeartClick}
          className={`p-2 rounded-full ${
            isWishlisted
              ? "bg-red-100 text-red-500"
              : "bg-gray-100 text-gray-600"
          }`}
          aria-label={
            isWishlisted ? "Retirer des favoris" : "Ajouter aux favoris"
          }
        >
          <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />{" "}
          {/* Couleur de remplissage si favori */}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
