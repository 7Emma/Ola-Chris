import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">Catégories</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedCategory === 'all'
              ? 'bg-green-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Tous les produits
        </button>
        
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.name)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === category.name
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name}
            <span className="ml-2 text-xs opacity-75">
              ({category.count})
            </span>
          </button>
        ))}
      </div>
      
      {/* Version mobile - Select dropdown */}
      <div className="md:hidden mt-4">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="all">Tous les produits</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name} ({category.count})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CategoryFilter;