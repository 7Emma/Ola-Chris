// src/main.jsx (ou index.js)
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext.jsx";

console.log("GOOGLE_CLIENT_ID:", import.meta.env.VITE_GOOGLE_CLIENT_ID);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <CartProvider>
          {/* Votre composant principal de l'application */}
          <App />
        </CartProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
