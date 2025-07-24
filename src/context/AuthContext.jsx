// src/context/AuthContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  fetchFavoriteProductIds, // Importé depuis api.js
  toggleFavoriteProduct, // Importé depuis api.js
} from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [favoriteProductIds, setFavoriteProductIds] = useState([]); // État pour les IDs des favoris

  // Charger l'utilisateur depuis localStorage au montage du composant
  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
          // Récupérer les IDs des produits favoris initiaux lorsque l'utilisateur est authentifié
          console.log(
            "[AuthContext] Utilisateur authentifié au démarrage, récupération des favoris..."
          );
          await fetchUserFavorites(); // Appel de la fonction pour récupérer les favoris
        } else {
          setIsAuthenticated(false);
          setUser(null);
          setFavoriteProductIds([]); // S'assurer que les favoris sont vides si non authentifié
          console.log(
            "[AuthContext] Aucun utilisateur authentifié au démarrage."
          );
        }
      } catch (e) {
        console.error(
          "Échec de l'analyse de l'utilisateur depuis localStorage ou de la récupération des favoris",
          e
        );
        logout(); // Effacer les données invalides
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []); // Dépendances vides pour s'exécuter une seule fois au montage

  const login = async (credentials) => {
    setLoading(true);
    setAuthError(null);
    try {
      const { user: userData, token } = await loginUser(credentials);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);
      setUser(userData);
      setIsAuthenticated(true);
      console.log(
        "[AuthContext] Connexion réussie, récupération des favoris..."
      );
      await fetchUserFavorites(); // Récupérer les favoris lors de la connexion
      return { success: true };
    } catch (error) {
      console.error("Échec de la connexion :", error);
      setAuthError(error.response?.data?.message || "Échec de la connexion");
      return {
        success: false,
        error: error.response?.data?.message || "Échec de la connexion",
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setAuthError(null);
    try {
      const { user: newUserData, token } = await registerUser(userData);
      localStorage.setItem("user", JSON.stringify(newUserData));
      localStorage.setItem("token", token);
      setUser(newUserData);
      setIsAuthenticated(true);
      console.log(
        "[AuthContext] Inscription réussie, récupération des favoris..."
      );
      await fetchUserFavorites(); // Récupérer les favoris lors de l'inscription
      return { success: true };
    } catch (error) {
      console.error("Échec de l'inscription :", error);
      setAuthError(error.response?.data?.message || "Échec de l'inscription");
      return {
        success: false,
        error: error.response?.data?.message || "Échec de l'inscription",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
    setFavoriteProductIds([]); // Effacer les favoris à la déconnexion
    setAuthError(null);
    setLoading(false);
    console.log("[AuthContext] Déconnexion effectuée. Favoris effacés.");
  }, []);

  // Fonction pour mettre à jour le profil utilisateur localement et en backend
  const updateProfile = useCallback(
    async (updatedUserData) => {
      try {
        setUser((prevUser) => ({ ...prevUser, ...updatedUserData }));
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, ...updatedUserData })
        );
        console.log("[AuthContext] Profil utilisateur mis à jour localement.");
        return { success: true };
      } catch (error) {
        console.error(
          "Erreur lors de la mise à jour du profil dans AuthContext:",
          error
        );
        return {
          success: false,
          error:
            error.message || "Échec de la mise à jour du profil localement",
        };
      }
    },
    [user]
  );

  // Fonction pour récupérer les IDs des produits favoris
  const fetchUserFavorites = useCallback(async () => {
    if (!isAuthenticated) {
      setFavoriteProductIds([]); // Effacer si non authentifié
      console.log(
        "[AuthContext] Non authentifié, ne peut pas récupérer les favoris."
      );
      return;
    }
    try {
      console.log("[AuthContext] Appel à fetchFavoriteProductIds...");
      const ids = await fetchFavoriteProductIds(); // Appel à l'API
      console.log(
        "[AuthContext] fetchFavoriteProductIds a renvoyé les IDs:",
        ids
      );
      setFavoriteProductIds(ids);
      console.log(
        "[AuthContext] favoriteProductIds mis à jour dans l'état avec:",
        ids
      );
    } catch (error) {
      console.error(
        "Échec de la récupération des IDs des produits favoris :",
        error
      );
      setFavoriteProductIds([]); // Effacer en cas d'erreur
    }
  }, [isAuthenticated]);

  // Fonction pour basculer le statut de favori d'un produit
  const handleToggleFavorite = useCallback(
    async (productId) => {
      if (!isAuthenticated) {
        alert("Veuillez vous connecter pour ajouter des favoris.");
        console.warn(
          "[AuthContext] Tentative de bascule de favori sans authentification."
        );
        return false;
      }
      try {
        console.log(
          `[AuthContext] Tentative de bascule du favori pour le produit ID: ${productId}`
        );
        const { isFavorite, favoriteProductIds: updatedIds } =
          await toggleFavoriteProduct(productId); // Appel à l'API

        console.log(
          `[AuthContext] Réponse de toggleFavoriteProduct: isFavorite=${isFavorite}, favoriteProductIds=`,
          updatedIds
        );

        if (updatedIds) {
          setFavoriteProductIds(updatedIds); // Mettre à jour l'état avec la nouvelle liste d'IDs
          console.log(
            "[AuthContext] favoriteProductIds mis à jour dans l'état après toggle avec:",
            updatedIds
          );
        } else {
          console.warn(
            "[AuthContext] toggleFavoriteProduct n'a pas renvoyé 'favoriteProductIds'. L'état pourrait être incohérent."
          );
          // Optionnel: Re-fetch complet des favoris si la réponse est incomplète
          await fetchUserFavorites();
        }

        return isFavorite;
      } catch (error) {
        console.error("Échec du basculement des favoris :", error);
        throw error;
      }
    },
    [isAuthenticated, fetchUserFavorites]
  );

  // Fonction pour vérifier si un produit est favori
  const isProductFavorite = useCallback(
    (productId) => {
      const isFav = favoriteProductIds.includes(productId);
      // Ce log peut être très verbeux, à utiliser avec parcimonie ou en mode debug
      // console.log(`[AuthContext] Vérification favori pour ${productId}: ${isFav}. Liste actuelle:`, favoriteProductIds);
      return isFav;
    },
    [favoriteProductIds]
  );

  const value = {
    user,
    isAuthenticated,
    loading,
    authError,
    login,
    register,
    logout,
    updateProfile,
    favoriteProductIds, // Exposer l'état des IDs favoris
    handleToggleFavorite, // Exposer la fonction de bascule
    isProductFavorite, // Exposer la fonction de vérification
    fetchUserFavorites, // Exposer la fonction de récupération
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
