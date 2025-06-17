// components/Product.jsx
import React from "react";
import categories from "../data/categories";
import products from "../data/products";

const Product = () => {
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Nos Produits</h1>

      {categories.map((category) => (
        <div key={category.id} className="mb-8">
          <h2 className="text-2xl font-semibold text-green-700 mb-4 border-b pb-1">
            {category.name}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products
              .filter((product) => product.categoryId === category.id)
              .map((product) => (
                <div
                  key={product.id}
                  className="border rounded-lg p-4 shadow hover:shadow-lg transition"
                >
                  <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                  <p className="text-sm text-gray-600">
                    Prix : <span className="font-medium text-blue-600">{product.price} €</span>
                  </p>
                  <p className="text-sm text-gray-500">Unité : {product.unit}</p>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
