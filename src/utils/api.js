// src/utils/api.js

import axios from "axios";

// Utiliser import.meta.env.VITE_REACT_APP_API_URL pour Vite
// Assurez-vous d'avoir VITE_REACT_APP_API_URL défini dans votre fichier .env du frontend
const API_BASE_URL =
  import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:5000/api";

// Création d'une instance Axios avec configuration globale
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Permet l'envoi des cookies (pour JWT)
  headers: {
    "Content-Type": "application/json",
  },
});

// Ajouter automatiquement le token JWT à chaque requête si disponible
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- Authentification ---

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      error.message ||
      "Erreur d'inscription inconnue."
    );
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      error.message ||
      "Erreur de connexion inconnue."
    );
  }
};

export const handleGoogleAuth = async (id_token_object) => {
  try {
    const response = await api.post("/auth/google", id_token_object);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      error.message ||
      "Erreur d'authentification Google inconnue."
    );
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.post("/auth/logout");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      error.message ||
      "Erreur de déconnexion inconnue."
    );
  }
};

export const checkAuthStatus = async () => {
  try {
    const response = await api.get("/auth/status");
    return response.data;
  } catch (error) {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      return {
        isAuthenticated: false,
        user: null,
        message: error.response.data?.message || "Non authentifié",
      };
    }
    throw (
      error.response?.data?.message ||
      error.message ||
      "Erreur de vérification du statut inconnue."
    );
  }
};

// --- Ressources protégées (Exemple général) ---

export const getProtectedResource = async () => {
  try {
    const response = await api.get("/protected-resource");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      error.message ||
      "Erreur de ressource protégée inconnue."
    );
  }
};

// --- Fonctions de gestion du profil utilisateur ---

/**
 * Récupère le profil de l'utilisateur connecté.
 * @returns {Promise<object>} Les données du profil utilisateur.
 * @throws {Error} En cas d'échec de la récupération.
 */
export const getUserProfile = async () => {
  try {
    const response = await api.get("/api/user/profile"); // Corrigé
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du profil utilisateur:",
      error
    );
    throw (
      error.response?.data?.message ||
      error.message ||
      "Échec de la récupération du profil utilisateur."
    );
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    const response = await api.put("/api/user/profile", profileData); // Corrigé
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      error.message ||
      "Échec de la mise à jour du profil."
    );
  }
};

export const fetchRecentOrders = async () => {
  try {
    const response = await api.get("/api/user/orders"); // Corrigé
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      error.message ||
      "Échec de la récupération des commandes."
    );
  }
};

// --- Fonctions pour les Favoris ---

export const toggleFavoriteProduct = async (productId) => {
  try {
    // IMPORTANT: Votre backend DOIT renvoyer un objet avec { isFavorite: boolean, favoriteProductIds: array_of_numbers }
    // où favoriteProductIds est la LISTE COMPLÈTE et MISE À JOUR des IDs favoris de l'utilisateur.
    const response = await api.post(`/api/user/favorites/toggle/${productId}`); // Corrigé
    return response.data;
  } catch (error) {
    console.error("Erreur lors du basculement du produit favori:", error);
    throw (
      error.response?.data?.message ||
      error.message ||
      "Échec du basculement des favoris."
    );
  }
};

export const fetchFavoriteProductIds = async () => {
  try {
    const response = await api.get("/api/user/favorites"); // Corrigé
    // IMPORTANT: Votre backend DOIT renvoyer un objet comme { favoriteIds: [1, 5, 10] }
    // OU directement un tableau d'IDs comme [1, 5, 10].
    // Cette ligne gère les deux cas, mais le backend doit être correct.
    return response.data.favoriteIds || response.data || [];
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des IDs de produits favoris:",
      error
    );
    throw (
      error.response?.data?.message ||
      error.message ||
      "Échec de la récupération des favoris."
    );
  }
};
