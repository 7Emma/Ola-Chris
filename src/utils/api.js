// src/utils/api.js

import axios from "axios";

// Use import.meta.env.VITE_REACT_APP_API_URL for Vite
// Ensure you have VITE_REACT_APP_API_URL defined in your frontend's .env file
const API_BASE_URL =
  import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:5000";

// Create an Axios instance with global configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Allows sending cookies (for JWT)
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically add JWT token to each request if available
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

// --- Authentication ---

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/api/auth/register", userData);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      error.message ||
      "Unknown registration error."
    );
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/api/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message || error.message || "Unknown login error."
    );
  }
};

export const handleGoogleAuth = async (id_token_object) => {
  try {
    const response = await api.post("/api/auth/google", id_token_object); // Corrected path
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      error.message ||
      "Unknown Google authentication error."
    );
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.post("/api/auth/logout"); // Corrected path
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message || error.message || "Unknown logout error."
    );
  }
};

export const checkAuthStatus = async () => {
  try {
    const response = await api.get("/api/auth/status"); // Corrected path
    return response.data;
  } catch (error) {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      return {
        isAuthenticated: false,
        user: null,
        message: error.response.data?.message || "Unauthenticated",
      };
    }
    throw (
      error.response?.data?.message ||
      error.message ||
      "Unknown status check error."
    );
  }
};

// --- Protected Resources (General Example) ---

export const getProtectedResource = async () => {
  try {
    const response = await api.get("/api/protected-resource"); // Corrected path
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      error.message ||
      "Unknown protected resource error."
    );
  }
};

// --- User Profile Management Functions ---

/**
 * Retrieves the profile of the logged-in user.
 * @returns {Promise<object>} The user profile data.
 * @throws {Error} If retrieval fails.
 */
export const getUserProfile = async () => {
  try {
    const response = await api.get("/api/user/profile");
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw (
      error.response?.data?.message ||
      error.message ||
      "Failed to retrieve user profile."
    );
  }
};

// Updated updateUserProfile: uses the 'api' instance
export const updateUserProfile = async (profileData) => {
  try {
    const response = await api.put("/api/user/profile", profileData);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      error.message ||
      "Failed to update profile."
    );
  }
};

// New function for uploading profile picture
export const uploadProfilePicture = async (file) => {
  try {
    const formData = new FormData();
    formData.append("profilePicture", file); // 'profilePicture' is the field name expected by your backend

    // Ensure your backend handles file uploads with Content-Type: multipart/form-data
    // Using 'api.post' to ensure the JWT token is included in the headers
    const response = await api.post("/api/users/profile/picture", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // This header is important for file uploads
      },
    });
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      error.message ||
      "Failed to upload profile picture."
    );
  }
};

export const fetchRecentOrders = async () => {
  try {
    const response = await api.get("/api/user/orders");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      error.message ||
      "Failed to retrieve orders."
    );
  }
};

// --- Functions for Favorites ---

export const toggleFavoriteProduct = async (productId) => {
  try {
    // IMPORTANT: Your backend MUST return an object with { isFavorite: boolean, favoriteProductIds: array_of_numbers }
    // where favoriteProductIds is the COMPLETE and UPDATED list of user's favorite IDs.
    const response = await api.post(`/api/user/favorites/toggle/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error toggling favorite product:", error);
    throw (
      error.response?.data?.message ||
      error.message ||
      "Failed to toggle favorites."
    );
  }
};

export const fetchFavoriteProductIds = async () => {
  try {
    const response = await api.get("/api/user/favorites");
    // IMPORTANT: Your backend MUST return an object like { favoriteIds: [1, 5, 10] }
    // OR directly an array of IDs like [1, 5, 10].
    // This line handles both cases, but the backend must be correct.
    return response.data.favoriteIds || response.data || [];
  } catch (error) {
    console.error("Error fetching favorite product IDs:", error);
    throw (
      error.response?.data?.message ||
      error.message ||
      "Failed to retrieve favorites."
    );
  }
};
