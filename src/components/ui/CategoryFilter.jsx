import React from 'react';
import { getAllCategories } from '../../data/categories';
import { getProductsByCategory, getAllProducts } from '../../data/products';

const CategoryFilter = ({ selectedCategory, onCategoryChange, searchTerm }) => {
  const categories = getAllCategories();
  const allProducts = getAllProducts();
  
  // Calculer le nombre de produits par catégorie
  const categoriesWithCount = categories.map(category => ({
    ...category,
    count: getProductsByCategory(category.id).filter(product => 
      !searchTerm || product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    ).length
  }));

  // Compter tous les produits (avec recherche)
  const totalProducts = searchTerm 
    ? allProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      ).length
    : allProducts.length;

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
        🏪 Catégories
      </h3>
      
      {/* Version desktop - Boutons */}
      <div className="hidden md:flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => onCategoryChange('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
            selectedCategory === 'all'
              ? 'bg-green-600 text-white shadow-md transform scale-105'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:transform hover:scale-105'
          }`}
        >
          <span>🛒</span>
          Tous les produits
          <span className="ml-1 text-xs opacity-75 bg-white/20 px-2 py-0.5 rounded-full">
            {totalProducts}
          </span>
        </button>
        
        {categoriesWithCount.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              selectedCategory === category.id
                ? 'text-white shadow-md transform scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:transform hover:scale-105'
            }`}
            style={{
              backgroundColor: selectedCategory === category.id ? category.color : undefined
            }}
          >
            <span>{category.icon}</span>
            {category.name}
            <span className={`ml-1 text-xs opacity-75 px-2 py-0.5 rounded-full ${
              selectedCategory === category.id ? 'bg-white/20' : 'bg-gray-200'
            }`}>
              {category.count}
            </span>
          </button>
        ))}
      </div>
      
      {/* Version mobile - Select dropdown */}
      <div className="md:hidden">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
        >
          <option value="all">🛒 Tous les produits ({totalProducts})</option>
          {categoriesWithCount.map((category) => (
            <option key={category.id} value={category.id}>
              {category.icon} {category.name} ({category.count})
            </option>
          ))}
        </select>
      </div>

      {/* Statistiques */}
      <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
        <span>
          {selectedCategory === 'all' ? totalProducts : categoriesWithCount.find(c => c.id === selectedCategory)?.count || 0} produit(s)
          {searchTerm && ` pour "${searchTerm}"`}
        </span>
        {searchTerm && (
          <button
            onClick={() => onCategoryChange('all')}
            className="text-green-600 hover:text-green-700 underline"
          >
            Effacer les filtres
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;