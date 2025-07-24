// src/components/ProfileTabs/FavoritesTab.jsx
import React, { useEffect, useState } from "react";
import { Heart, AlertCircle } from "lucide-react";
import Spinner from "../ui/Spinner"; // Assurez-vous que le chemin est correct
import { useAuth } from "../../context/AuthContext"; // Importez useAuth
import { getAllProducts } from "../../data/products"; // Importez vos données de produits locaux
import ProductCard from "../../components/ui/ProductCard"; // Réutilisez ProductCard pour l'affichage

function FavoritesTab() {
  // Nous récupérons favoriteProductIds, loading, isAuthenticated et fetchUserFavorites depuis AuthContext
  const {
    favoriteProductIds,
    loading: authLoading,
    isAuthenticated,
    fetchUserFavorites,
  } = useAuth();
  const [favoriteProductsFull, setFavoriteProductsFull] = useState([]);
  const [favoritesLoading, setFavoritesLoading] = useState(true);
  const [favoritesError, setFavoritesError] = useState(null);

  useEffect(() => {
    // Re-fetch des favoris depuis le backend via AuthContext à l'authentification
    if (isAuthenticated) {
      fetchUserFavorites(); // Cette fonction est déjà dans AuthContext
    }
  }, [isAuthenticated, fetchUserFavorites]);

  useEffect(() => {
    if (authLoading) return; // Attendre que l'authentification ait fini de charger

    setFavoritesLoading(true);
    setFavoritesError(null);

    if (!isAuthenticated) {
      setFavoritesError("Veuillez vous connecter pour voir vos favoris.");
      setFavoritesLoading(false);
      setFavoriteProductsFull([]);
      return;
    }

    try {
      const allProducts = getAllProducts(); // Obtenez tous les produits disponibles localement
      // Filtrez tous les produits pour trouver ceux qui correspondent aux IDs favoris de l'utilisateur
      const userFavoriteProducts = allProducts.filter((product) =>
        favoriteProductIds.includes(product.id)
      );
      setFavoriteProductsFull(userFavoriteProducts);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des produits favoris locaux:",
        error
      );
      setFavoritesError("Échec de la récupération des produits favoris.");
    } finally {
      setFavoritesLoading(false);
    }
  }, [favoriteProductIds, isAuthenticated, authLoading]); // Se ré-exécute quand les IDs favoris ou l'état d'auth changent

  if (favoritesLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Spinner size="w-8 h-8" color="border-green-500" />
        <p className="ml-3 text-gray-600">Chargement des favoris...</p>
      </div>
    );
  }

  if (favoritesError) {
    return (
      <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg flex items-center space-x-2 text-sm">
        <AlertCircle className="w-5 h-5" />
        <span>{favoritesError}</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Mes produits favoris
      </h3>
      {favoriteProductsFull.length === 0 ? (
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-center text-gray-600">
          <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p>Vous n'avez pas encore de produits favoris.</p>
          <p className="text-sm mt-2">
            Cliquez sur le cœur à côté d'un produit pour l'ajouter à vos
            favoris.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoriteProductsFull.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              // Ces props sont passées pour que ProductCard puisse potentiellement ajouter au panier
              // même depuis l'onglet favoris. Si vous ne voulez pas cette fonctionnalité ici,
              // vous pouvez les retirer ou passer des fonctions vides.
              onAddToCart={() =>
                console.log("Add to cart from favorites:", product.name)
              }
              onUpdateQuantity={() =>
                console.log("Update quantity from favorites:", product.name)
              }
              cartQuantity={0} // Ou la quantité réelle si vous la traitez dans l'onglet favoris
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesTab;
