import React, { useState, useEffect } from "react";
import {
  Grid,
  List,
} from "lucide-react";
// Supprimez cette ligne pour éviter la double navbar
// import Navbar from '../components/Navbar';
import CategoryFilter from "../components/CategoryFilter";
import ProductCard from "../components/ProductCard";
import ProductDetails from "../components/ProductsDetails";
import Cart from "./Cart";
import {
  getAllProducts,
  getProductsByCategory,
  searchProducts,
} from "../data/products";

const Products = ({
  // Props qui viendront du composant parent (App.js)
  searchTerm = "",
  onSearchChange,
  cartItems = [],
  onAddToCart,
  onUpdateCartQuantity,
  onRemoveFromCart,
  onClearCart,
  isCartOpen,
  onCloseCart,
}) => {
  // États principaux
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductDetailsOpen, setIsProductDetailsOpen] = useState(false);

  // États pour les filtres et vues
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Chargement initial des produits
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const allProducts = getAllProducts();
      setProducts(allProducts);
      setIsLoading(false);
    }, 500);
  }, []);

  // Filtrage et recherche - CORRIGÉ POUR SLUG
  useEffect(() => {
    let result = [...products]; // Copie du tableau

    // Recherche par terme AVANT le filtrage par catégorie
    if (searchTerm && searchTerm.trim()) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // CORRECTION: Filtrage par catégorie - comparer avec product.category et le slug de la catégorie
    if (selectedCategory !== "all") {
      result = result.filter(
        (product) => product.category === selectedCategory // product.category doit correspondre au slug
      );
    }

    // Filtrage par prix
    result = result.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Tri
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "price":
          comparison = a.price - b.price;
          break;
        case "rating":
          comparison = (b.rating || 0) - (a.rating || 0);
          break;
        default:
          comparison = 0;
      }
      return sortOrder === "desc" ? -comparison : comparison;
    });

    setFilteredProducts(result);
  }, [products, selectedCategory, searchTerm, sortBy, sortOrder, priceRange]);

  // Fonction pour obtenir la quantité dans le panier
  const getCartQuantity = (productId) => {
    const item = cartItems.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  // Gestion des détails produit
  const openProductDetails = (product) => {
    setSelectedProduct(product);
    setIsProductDetailsOpen(true);
  };

  const closeProductDetails = () => {
    setIsProductDetailsOpen(false);
    setSelectedProduct(null);
  };

  // Composant de tri et filtres
  const SortAndFilter = () => (
    <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Trier par :</span>
        <select
          value={`${sortBy}-${sortOrder}`}
          onChange={(e) => {
            const [field, order] = e.target.value.split("-");
            setSortBy(field);
            setSortOrder(order);
          }}
          className="p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="name-asc">Nom (A-Z)</option>
          <option value="name-desc">Nom (Z-A)</option>
          <option value="price-asc">Prix croissant</option>
          <option value="price-desc">Prix décroissant</option>
          <option value="rating-desc">Mieux notés</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Prix max :</span>
        <input
          type="range"
          min="0"
          max="50000"
          value={priceRange[1]}
          onChange={(e) =>
            setPriceRange([priceRange[0], parseInt(e.target.value)])
          }
          className="w-24"
        />
        <span className="text-sm text-gray-600">{priceRange[1]} FCFA</span>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <button
          onClick={() => setViewMode("grid")}
          className={`p-2 rounded-lg transition-colors ${
            viewMode === "grid"
              ? "bg-green-100 text-green-600"
              : "text-gray-400 hover:text-gray-600"
          }`}
          title="Vue grille"
        >
          <Grid size={20} />
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={`p-2 rounded-lg transition-colors ${
            viewMode === "list"
              ? "bg-green-100 text-green-600"
              : "text-gray-400 hover:text-gray-600"
          }`}
          title="Vue liste"
        >
          <List size={20} />
        </button>
      </div>
    </div>
  );

  // Composant de chargement
  const LoadingGrid = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="aspect-square bg-gray-200 animate-pulse"></div>
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded w-2/3"></div>
            <div className="h-6 bg-gray-200 animate-pulse rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header de la page */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4 m-auto">
              <h1 className="text-2xl font-bold text-gray-900">
                🛒 SuperMarché
              </h1>
              <span className="text-sm text-gray-500">
                {filteredProducts.length} produit(s)
                {searchTerm && (
                  <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    Recherche: "{searchTerm}"
                  </span>
                )}
              </span>
            </div>

            {/* Bouton pour réinitialiser les filtres */}
            {(searchTerm ||
              selectedCategory !== "all" ||
              priceRange[1] < 50000) && (
              <button
                onClick={() => {
                  if (onSearchChange) onSearchChange("");
                  setSelectedCategory("all");
                  setPriceRange([0, 50000]);
                }}
                className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors"
              >
                Réinitialiser filtres
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtres de catégories */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchTerm={searchTerm}
        />

        {/* Tri et filtres */}
        <SortAndFilter />

        {/* Grille de produits */}
        <div id="products-results">
          {isLoading ? (
            <LoadingGrid />
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Aucun produit trouvé
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm
                  ? `Aucun résultat pour "${searchTerm}". Essayez de modifier votre recherche.`
                  : "Essayez de modifier vos critères de recherche ou filtres"}
              </p>
              <button
                onClick={() => {
                  if (onSearchChange) onSearchChange("");
                  setSelectedCategory("all");
                  setPriceRange([0, 50000]);
                }}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div
              className={`${
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                  : "space-y-4"
              }`}
            >
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => openProductDetails(product)}
                >
                  <ProductCard
                    product={product}
                    onAddToCart={onAddToCart}
                    onUpdateQuantity={onUpdateCartQuantity}
                    cartQuantity={getCartQuantity(product.id)}
                    viewMode={viewMode}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modales */}
      <ProductDetails
        product={selectedProduct}
        isOpen={isProductDetailsOpen}
        onClose={closeProductDetails}
        onAddToCart={onAddToCart}
        onUpdateQuantity={onUpdateCartQuantity}
        cartQuantity={selectedProduct ? getCartQuantity(selectedProduct.id) : 0}
      />
    </div>
  );
};

export default Products;
