// src/main.jsx (ou index.js)
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext.jsx";

// Remplacez 'VOTRE_CLIENT_ID_GOOGLE_FRONTEND' par votre véritable ID client Google (celui pour les applications web)
const GOOGLE_CLIENT_ID_FRONTEND = "VOTRE_CLIENT_ID_GOOGLE_FRONTEND";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID_FRONTEND}>
      <AuthProvider>
        <CartProvider>
          {/* Votre composant principal de l'application */}
          <App />
        </CartProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
