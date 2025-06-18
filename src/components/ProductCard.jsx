import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Star, Heart } from 'lucide-react';

const ProductCard = ({ product, onAddToCart, onUpdateQuantity, cartQuantity = 0 }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = () => {
    if (cartQuantity === 0) {
      onAddToCart(product);
    }
  };

  const handleIncrement = () => {
    onUpdateQuantity(product.id, cartQuantity + 1);
  };

  const handleDecrement = () => {
    if (cartQuantity > 1) {
      onUpdateQuantity(product.id, cartQuantity - 1);
    } else {
      onUpdateQuantity(product.id, 0);
    }
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Image Container */}
      <div className="relative group">
        <div className="aspect-square bg-gray-100 overflow-hidden">
          {!imageLoaded && (
            <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="w-16 h-16 bg-gray-300 rounded"></div>
            </div>
          )}
          <img
            src={product.image || '/api/placeholder/300/300'}
            alt={product.name}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.target.src = '/api/placeholder/300/300';
              setImageLoaded(true);
            }}
          />
        </div>
        
        {/* Wishlist Button */}
        <button
          onClick={toggleWishlist}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200"
        >
          <Heart 
            size={18} 
            className={`${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
          />
        </button>

        {/* Promotion Badge */}
        {product.discount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            -{product.discount}%
          </div>
        )}

        {/* Stock Status */}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute bottom-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Plus que {product.stock} en stock
          </div>
        )}
        
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">Rupture de stock</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
          {product.category}
        </span>

        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 mt-1 mb-2 line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={`${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">
              ({product.reviewCount || 0})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold text-gray-900">
            {product.price.toFixed(2)} €
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-gray-500 line-through">
              {product.originalPrice.toFixed(2)} €
            </span>
          )}
        </div>

        {/* Unit Info */}
        {product.unit && (
          <p className="text-xs text-gray-500 mb-3">
            Prix au {product.unit}: {(product.price / (product.quantity || 1)).toFixed(2)} €
          </p>
        )}

        {/* Add to Cart Section */}
        <div className="space-y-2">
          {cartQuantity === 0 ? (
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium transition-all duration-200 ${
                product.stock === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700 active:scale-95'
              }`}
            >
              <ShoppingCart size={18} />
              Ajouter au panier
            </button>
          ) : (
            <div className="flex items-center justify-between bg-green-50 rounded-lg p-1">
              <button
                onClick={handleDecrement}
                className="p-2 rounded-lg bg-white text-green-600 hover:bg-gray-50 transition-colors"
              >
                <Minus size={16} />
              </button>
              
              <span className="font-semibold text-green-700 min-w-[3ch] text-center">
                {cartQuantity}
              </span>
              
              <button
                onClick={handleIncrement}
                disabled={cartQuantity >= product.stock}
                className={`p-2 rounded-lg transition-colors ${
                  cartQuantity >= product.stock
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-green-600 hover:bg-gray-50'
                }`}
              >
                <Plus size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;