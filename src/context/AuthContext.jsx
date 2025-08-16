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
  fetchFavoriteProductIds,
  toggleFavoriteProduct,
} from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [favoriteProductIds, setFavoriteProductIds] = useState([]);

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
    setFavoriteProductIds([]);
    setAuthError(null);
    setLoading(false);
    console.log("[AuthContext] Déconnexion effectuée, état nettoyé.");
  }, []);

  const fetchUserFavorites = useCallback(async () => {
    if (!isAuthenticated) {
      setFavoriteProductIds([]);
      console.log("[AuthContext] Non authentifié, favoris vidés.");
      return;
    }
    try {
      console.log("[AuthContext] Récupération des favoris en cours...");
      const ids = await fetchFavoriteProductIds();
      setFavoriteProductIds(ids);
      console.log("[AuthContext] Favoris mis à jour:", ids);
    } catch (error) {
      console.error("[AuthContext] Erreur récupération favoris :", error);
      setFavoriteProductIds([]);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      setAuthError(null);

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsAuthenticated(false);
          setUser(null);
          setFavoriteProductIds([]);
          console.log("[AuthContext] Pas de token détecté.");
          return;
        }

        // Vérifier le token via API et récupérer profil
        const userData = await getUserProfile();

        setUser(userData);
        setIsAuthenticated(true);

        // Récupérer les favoris
        await fetchUserFavorites();

        console.log("[AuthContext] Authentification vérifiée avec succès.");
      } catch (error) {
        console.error("[AuthContext] Token invalide ou erreur:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [fetchUserFavorites, logout]);

  const login = async (credentials) => {
    setLoading(true);
    setAuthError(null);
    try {
      const { user: userData, token } = await loginUser(credentials);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);
      setUser(userData);
      setIsAuthenticated(true);
      await fetchUserFavorites();
      console.log("[AuthContext] Connexion réussie.");
      return { success: true };
    } catch (error) {
      console.error("[AuthContext] Échec connexion :", error);
      setAuthError(error.response?.data?.message || "Échec de la connexion");
      return { success: false, error: authError };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setAuthError(null);
    try {
      const { user: newUser, token } = await registerUser(userData);
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("token", token);
      setUser(newUser);
      setIsAuthenticated(true);
      await fetchUserFavorites();
      console.log("[AuthContext] Inscription réussie.");
      return { success: true };
    } catch (error) {
      console.error("[AuthContext] Échec inscription :", error);
      setAuthError(error.response?.data?.message || "Échec de l'inscription");
      return { success: false, error: authError };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = useCallback(async (updatedUserData) => {
    try {
      setUser((prevUser) => {
        const newUser = { ...prevUser, ...updatedUserData };
        localStorage.setItem("user", JSON.stringify(newUser));
        return newUser;
      });
      console.log("[AuthContext] Profil mis à jour localement.");
      return { success: true };
    } catch (error) {
      console.error("[AuthContext] Erreur mise à jour profil local:", error);
      return {
        success: false,
        error: error.message || "Échec de la mise à jour du profil localement",
      };
    }
  }, []);

  const handleToggleFavorite = useCallback(
    async (productId) => {
      if (!isAuthenticated) {
        alert("Veuillez vous connecter pour gérer vos favoris.");
        console.warn("[AuthContext] Toggle favori refusé, non connecté.");
        return false;
      }
      try {
        const { isFavorite, favoriteProductIds: updatedIds } =
          await toggleFavoriteProduct(productId);

        if (updatedIds) {
          setFavoriteProductIds(updatedIds);
        } else {
          await fetchUserFavorites();
        }

        return isFavorite;
      } catch (error) {
        console.error("[AuthContext] Erreur toggle favori:", error);
        throw error;
      }
    },
    [isAuthenticated, fetchUserFavorites]
  );

  const isProductFavorite = useCallback(
    (productId) => favoriteProductIds.includes(productId),
    [favoriteProductIds]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        authError,
        login,
        register,
        logout,
        updateProfile,
        favoriteProductIds,
        handleToggleFavorite,
        isProductFavorite,
        fetchUserFavorites,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
