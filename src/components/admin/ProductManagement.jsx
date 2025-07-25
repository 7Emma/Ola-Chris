import React, { useState } from "react";
import { Search, Plus, Edit, Trash2, Package, Star } from "lucide-react";
// Modal n'est plus importé ici, car il est géré par AdminDashboard
// Les composants de contenu de modal seront gérés par AdminDashboard

/**
 * Composant de gestion des produits pour le tableau de bord admin.
 * @param {object} props - Les props du composant.
 * @param {Array<object>} props.products - La liste des produits.
 * @param {function} props.onShowModal - Fonction pour demander à AdminDashboard d'afficher un modal.
 */
const ProductManagement = ({ products, onShowModal }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Filtrer et rechercher les produits
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Rechercher des produits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Toutes catégories</option>
              <option value="Electronics">Electronics</option>
              <option value="Audio">Audio</option>
              <option value="Accessories">Accessories</option>
            </select>
            <button
              onClick={() =>
                onShowModal({ show: true, type: "add-product", data: null })
              }
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center"
            >
              <Plus size={20} className="mr-2" />
              Ajouter
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <Package size={48} className="text-gray-400" />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{product.name}</h3>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    product.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.status === "active" ? "Actif" : "Rupture"}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{product.category}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold text-gray-900">
                  ${product.price}
                </span>
                <span className="text-sm text-gray-600">
                  Stock: {product.stock}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-600">
                  <Star size={16} className="text-yellow-400 mr-1" />
                  {product.sales} ventes
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      onShowModal({
                        show: true,
                        type: "edit-product",
                        data: product,
                      })
                    }
                    className="text-blue-600 hover:text-blue-700"
                    title="Modifier"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() =>
                      onShowModal({
                        show: true,
                        type: "delete-product",
                        data: product,
                      })
                    }
                    className="text-red-600 hover:text-red-700"
                    title="Supprimer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManagement;
