import React, { useState, useEffect, useCallback } from "react";
import { Grid, List, Search, ShoppingCart } from "lucide-react";
import CategoryFilter from "../components/CategoryFilter";
import ProductCard from "../components/ProductCard";
import ProductDetails from "../components/ProductsDetails";
import { getAllProducts } from "../data/products";
import { getAllCategories } from "../data/categories";

const Products = ({
  // Props venant du composant parent (App.jsx via AppRoutes)
  searchTerm = "",
  onSearchChange,
  cartItems = [],
  onAddToCart,
  onUpdateCartQuantity,
}) => {
  //États principaux
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //États pour les filtres et la recherche
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 50000]);

  //États pour le tri
  const [sortBy, setSortBy] = useState("name"); // Critère de tri : 'name', 'price', 'rating'
  const [sortOrder, setSortOrder] = useState("asc"); // Ordre de tri : 'asc' ou 'desc'

  //États pour l'affichage et les modales
  const [viewMode, setViewMode] = useState("grid");
  const [selectedProduct, setSelectedProduct] = useState(null); // Produit actuellement affiché dans la modale des détails
  const [isProductDetailsOpen, setIsProductDetailsOpen] = useState(false); // État d'ouverture de la modale des détails du produit

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const allProducts = getAllProducts();
      setProducts(allProducts);
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    let result = [...products];
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const categoriesData = getAllCategories();

    // 1. Recherche par terme (Nom, Description, Marque, et Nom de Catégorie)
    if (lowerCaseSearchTerm && lowerCaseSearchTerm.trim()) {
      result = result.filter((product) => {
        // Trouver le nom de la catégorie pour le produit actuel
        const categoryName = categoriesData.find(
          (cat) => cat.id === product.categoryId
        )?.name;

        return (
          product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          product.description.toLowerCase().includes(lowerCaseSearchTerm) ||
          (product.brand &&
            product.brand.toLowerCase().includes(lowerCaseSearchTerm)) || // Vérifier l'existence de la marque
          (categoryName &&
            categoryName.toLowerCase().includes(lowerCaseSearchTerm)) // Vérifier l'existence du nom de catégorie
        );
      });
    }

    //Filtrer par catégorie sélectionnée
    if (selectedCategory !== "all") {
      result = result.filter(
        (product) => product.categoryId === parseInt(selectedCategory, 10)
      );
    }

    //Filtrer par plage de prix
    result = result.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    //Trier les produits
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
          comparison = (b.rating || 0) - (a.rating || 0); // Décroissant pour la note
          break;
        default:
          comparison = 0;
      }
      return sortOrder === "desc" ? -comparison : comparison;
    });

    setFilteredProducts(result);
  }, [products, selectedCategory, searchTerm, sortBy, sortOrder, priceRange]);

  //Aide à la quantité du panier (useCallback pour l'optimisation
  const getCartQuantity = useCallback(
    (productId) => {
      const item = cartItems.find((item) => item.id === productId);
      return item ? item.quantity : 0;
    },
    [cartItems]
  );

  //Gestion des détails du produit (useCallback pour l'optimisation)
  const openProductDetails = useCallback((product) => {
    setSelectedProduct(product);
    setIsProductDetailsOpen(true);
  }, []);

  const closeProductDetails = useCallback(() => {
    setIsProductDetailsOpen(false);
    setSelectedProduct(null);
  }, []);

  //Composant interne pour les contrôles de tri et de filtre
  const SortAndFilterControls = () => (
    <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm">
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
            setPriceRange([priceRange[0], parseInt(e.target.value, 10)])
          }
          className="w-24 accent-green-600"
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
          aria-label="Afficher en grille"
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
          aria-label="Afficher en liste"
        >
          <List size={20} />
        </button>
      </div>
    </div>
  );

  //Composant de squelette de chargement
  const LoadingGrid = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse"
        >
          <div className="aspect-square bg-gray-200"></div>
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête de la page Products (pas de Navbar globale ici) */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4 mx-auto">
              {" "}
              {/* Contenu centré */}
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

            {/* Bouton Réinitialiser les filtres */}
            {(searchTerm ||
              selectedCategory !== "all" ||
              priceRange[1] < 50000) && (
              <button
                onClick={() => {
                  if (onSearchChange) onSearchChange(""); // Réinitialise le terme de recherche global via la prop
                  setSelectedCategory("all");
                  setPriceRange([0, 50000]);
                  setSortBy("name"); // Réinitialise aussi l'ordre de tri
                  setSortOrder("asc");
                }}
                className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors"
              >
                Réinitialiser filtres
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Zone de contenu principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Composant de filtre par catégorie */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchTerm={searchTerm}
        />

        {/* Composant de tri et filtres additionnels */}
        <SortAndFilterControls />

        {/* Affichage de la grille/liste des produits */}
        <div id="products-results">
          {isLoading ? (
            <LoadingGrid /> // Afficher le squelette de chargement
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md mt-6">
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
                  if (onSearchChange) onSearchChange(""); // Réinitialise le terme de recherche global
                  setSelectedCategory("all");
                  setPriceRange([0, 50000]);
                  setSortBy("name"); // Réinitialise aussi l'ordre de tri
                  setSortOrder("asc");
                }}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            // Afficher les produits en mode grille ou liste
            <div
              className={`${
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                  : "space-y-4" // Pour la vue liste, les éléments s'empilent verticalement
              }`}
            >
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="cursor-pointer"
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

      {/* Modale des détails du produit */}
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
