// context/AuthContext.jsx
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
} from "../utils/api"; // Supposant qu'ils existent
import { fetchFavoriteProductIds, toggleFavoriteProduct } from "../utils/api"; // Importer les nouvelles fonctions

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [favoriteProductIds, setFavoriteProductIds] = useState([]); // NOUVEL ÉTAT

  // Charger l'utilisateur depuis localStorage au montage du composant
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token"); // Supposant que vous stockez un jeton
    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
        // Récupérer les IDs des produits favoris initiaux lorsque l'utilisateur est authentifié
        fetchUserFavorites(); // Appeler la nouvelle fonction pour récupérer les favoris
      } catch (e) {
        console.error(
          "Échec de l'analyse de l'utilisateur depuis localStorage",
          e
        );
        logout(); // Effacer les données invalides
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    setAuthError(null);
    try {
      const { user: userData, token } = await loginUser(credentials);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);
      setUser(userData);
      setIsAuthenticated(true);
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
  }, []);

  // Fonction pour mettre à jour le profil utilisateur localement et en backend
  const updateProfile = useCallback(
    async (updatedUserData) => {
      try {
        // Supposant que l'API updateUserProfile renvoie l'objet utilisateur mis à jour
        // Nous n'avons pas besoin d'appeler l'API ici directement, SupermarketProfile l'appelle
        // Cette fonction est destinée à mettre à jour l'état de l'utilisateur du contexte
        setUser((prevUser) => ({ ...prevUser, ...updatedUserData }));
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, ...updatedUserData })
        );
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
  ); // Dépend de 'user' pour s'assurer qu'il utilise le dernier état pour la mise à jour de localStorage

  // NOUVEAU : Fonction pour récupérer les IDs des produits favoris
  const fetchUserFavorites = useCallback(async () => {
    if (!isAuthenticated) {
      setFavoriteProductIds([]); // Effacer si non authentifié
      return;
    }
    try {
      const ids = await fetchFavoriteProductIds();
      setFavoriteProductIds(ids);
    } catch (error) {
      console.error(
        "Échec de la récupération des IDs des produits favoris :",
        error
      );
      setFavoriteProductIds([]); // Effacer en cas d'erreur
    }
  }, [isAuthenticated]);

  // NOUVEAU : Fonction pour basculer le statut de favori d'un produit
  const handleToggleFavorite = useCallback(
    async (productId) => {
      if (!isAuthenticated) {
        alert("Veuillez vous connecter pour ajouter des favoris.");
        return false; // Indique que l'opération n'a pas pu être effectuée
      }
      try {
        const { isFavorite, favoriteProductIds: updatedIds } =
          await toggleFavoriteProduct(productId);
        setFavoriteProductIds(updatedIds); // Mettre à jour l'état avec la nouvelle liste d'IDs
        return isFavorite; // Retourne le nouveau statut
      } catch (error) {
        console.error("Échec du basculement des favoris :", error);
        throw error;
      }
    },
    [isAuthenticated]
  ); // Dépend de isAuthenticated

  const isProductFavorite = useCallback(
    (productId) => {
      return favoriteProductIds.includes(productId);
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
    favoriteProductIds, // NOUVEAU : Exposer favoriteProductIds
    handleToggleFavorite, // NOUVEAU : Exposer la fonction de bascule
    isProductFavorite, // NOUVEAU : Exposer la fonction de vérification
    fetchUserFavorites, // NOUVEAU : Exposer la fonction de récupération
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
