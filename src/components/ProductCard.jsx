// ProductCard.jsx
import React from 'react';
import { ShoppingCart, Plus, Minus, Heart } from 'lucide-react';

const ProductCard = ({ product, onAddToCart, onUpdateQuantity, quantityInCart = 0, onToggleWishlist, isWishlisted }) => {
  const isInStock = product.stock > 0;
  const isLowStock = product.stock <= 5 && product.stock > 0;

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
        <p className="text-green-600 font-bold text-lg mb-1">{product.price} FCFA</p>

        <p className="text-sm mb-2">
          {isInStock ? (
            <span className={isLowStock ? 'text-orange-500' : 'text-green-500'}>
              {isLowStock ? 'Stock faible' : 'En stock'} ({product.stock})
            </span>
          ) : (
            <span className="text-red-500">Rupture de stock</span>
          )}
        </p>
      </div>

      <div className="flex items-center justify-between mt-4">
        {quantityInCart > 0 ? (
          <div className="flex items-center gap-2">
            <button onClick={() => onUpdateQuantity(product.id, quantityInCart - 1)} className="p-1 border rounded">
              <Minus size={16} />
            </button>
            <span>{quantityInCart}</span>
            <button onClick={() => onUpdateQuantity(product.id, quantityInCart + 1)} disabled={quantityInCart >= product.stock} className="p-1 border rounded">
              <Plus size={16} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            <ShoppingCart size={16} /> Ajouter
          </button>
        )}

        <button
          onClick={() => onToggleWishlist(product.id)}
          className={`p-2 rounded-full ${isWishlisted ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-600'}`}
        >
          <Heart size={18} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
