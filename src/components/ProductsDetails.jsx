import React, { useState } from 'react';
import { X, Plus, Minus, Star, Heart, ShoppingCart, Info, Leaf, Award, Truck, Shield } from 'lucide-react';
import { getCategoryById } from '../data/categories';

const ProductDetails = ({ product, isOpen, onClose, onAddToCart, onUpdateQuantity, cartQuantity = 0 }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!isOpen || !product) return null;

  const category = getCategoryById(product.categoryId);
  const images = product.images || [product.image];
  const isInStock = product.stock > 0;
  const isLowStock = product.stock <= 5 && product.stock > 0;

  const handleAddToCart = () => {
    onAddToCart({ ...product, quantity });
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const tabs = [
    { id: 'description', label: 'Description', icon: Info },
    { id: 'nutrition', label: 'Nutrition', icon: Leaf },
    { id: 'details', label: 'Détails', icon: Award }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={onClose}
              className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-sm"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-0 max-h-[90vh] overflow-y-auto">
            {/* Images Section */}
            <div className="p-6 bg-gray-50">
              <div className="sticky top-6">
                {/* Main Image */}
                <div className="aspect-square bg-white rounded-xl overflow-hidden mb-4 shadow-sm">
                  <img
                    src={images[selectedImage] || '/api/placeholder/400/400'}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 space-y-2">
                    {product.discount && (
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        -{product.discount}%
                      </span>
                    )}
                    {category && (
                      <span 
                        className="text-white px-3 py-1 rounded-full text-sm font-medium"
                        style={{ backgroundColor: category.color }}
                      >
                        {category.icon} {category.name}
                      </span>
                    )}
                  </div>
                </div>

                {/* Thumbnail Images */}
                {images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === index
                            ? 'border-green-500 ring-2 ring-green-200'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product Info Section */}
            <div className="p-6 flex flex-col">
              {/* Product Header */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                      {product.name}
                    </h1>
                    <p className="text-gray-600 font-medium">
                      {product.brand} • {product.origin}
                    </p>
                  </div>
                  <button
                    onClick={toggleWishlist}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <Heart 
                      size={24} 
                      className={`${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                    />
                  </button>
                </div>

                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={`${
                            i < Math.floor(product.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating}/5 ({product.reviewCount} avis)
                    </span>
                  </div>
                )}

                {/* Price */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-bold text-gray-900">
                    {product.price.toFixed(2)} €
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-lg text-gray-500 line-through">
                      {product.originalPrice.toFixed(2)} €
                    </span>
                  )}
                  {product.unit && (
                    <span className="text-sm text-gray-500">
                      / {product.unit}
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                <div className="mb-6">
                  {isInStock ? (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-green-700 font-medium">
                        En stock ({product.stock} disponibles)
                      </span>
                      {isLowStock && (
                        <span className="text-orange-600 text-sm">
                          - Stock limité !
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-red-700 font-medium">Rupture de stock</span>
                    </div>
                  )}
                </div>

                {/* Features */}
                {product.features && product.features.length > 0 && (
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {product.features.map((feature, index) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Quantity and Add to Cart */}
              <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-medium text-gray-700">Quantité :</span>
                  <div className="flex items-center bg-white rounded-lg border">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                      className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="px-4 py-2 font-semibold min-w-[3ch] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={quantity >= product.stock}
                      className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={!isInStock}
                  className={`w-full flex items-center justify-center gap-3 py-3 px-6 rounded-lg font-semibold transition-all ${
                    isInStock
                      ? 'bg-green-600 text-white hover:bg-green-700 active:scale-95'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart size={20} />
                  {isInStock ? `Ajouter au panier - ${(product.price * quantity).toFixed(2)} €` : 'Produit indisponible'}
                </button>

                {/* Delivery Info */}
                <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
                  <Truck size={16} />
                  <span>Livraison gratuite dès 50€ d'achat</span>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex-1">
                <div className="border-b border-gray-200 mb-6">
                  <nav className="flex space-x-8">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeTab === tab.id
                            ? 'border-green-500 text-green-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <tab.icon size={16} />
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="text-sm text-gray-700">
                  {activeTab === 'description' && (
                    <div>
                      <p className="mb-4">{product.description}</p>
                      {product.features && (
                        <div>
                          <h4 className="font-semibold mb-2">Caractéristiques :</h4>
                          <ul className="list-disc list-inside space-y-1">
                            {product.features.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'nutrition' && (
                    <div>
                      {product.nutritionalInfo ? (
                        <div>
                          <h4 className="font-semibold mb-3">Informations nutritionnelles (pour 100g) :</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <span className="font-medium">Calories</span>
                              <p className="text-lg font-bold text-green-600">{product.nutritionalInfo.calories} kcal</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <span className="font-medium">Glucides</span>
                              <p className="text-lg font-bold">{product.nutritionalInfo.carbs}g</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <span className="font-medium">Protéines</span>
                              <p className="text-lg font-bold">{product.nutritionalInfo.protein}g</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <span className="font-medium">Lipides</span>
                              <p className="text-lg font-bold">{product.nutritionalInfo.fat}g</p>
                            </div>
                            {product.nutritionalInfo.fiber && (
                              <div className="bg-gray-50 p-3 rounded-lg">
                                <span className="font-medium">Fibres</span>
                                <p className="text-lg font-bold">{product.nutritionalInfo.fiber}g</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-500">Informations nutritionnelles non disponibles pour ce produit.</p>
                      )}
                    </div>
                  )}

                  {activeTab === 'details' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="font-medium">Marque</span>
                          <span>{product.brand}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="font-medium">Origine</span>
                          <span>{product.origin}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="font-medium">Unité</span>
                          <span>{product.unit}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="font-medium">Stock disponible</span>
                          <span>{product.stock} unités</span>
                        </div>
                      </div>

                      {/* Garanties */}
                      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Shield size={18} className="text-blue-600" />
                          Nos garanties
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            Fraîcheur garantie
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            Satisfaction ou remboursé
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            Livraison rapide et sécurisée
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;