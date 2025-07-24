// src/components/Login.jsx

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../context/AuthContext";
import { User, LogIn, LogOut, Eye, EyeOff, Mail, Lock } from "lucide-react";

function Login() {
  // <-- Début de votre composant fonctionnel

  const navigate = useNavigate();
  const {
    login,
    logout,
    isAuthenticated,
    user,
    loading: authContextLoading,
    authError,
  } = useAuth();

  // --- Déclarations d'état ---
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // --- Fonctions d'aide et gestionnaires d'événements ---
  // C'est ICI que handleInputChange DOIT ÊTRE DÉFINIE :
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Nettoyer l'erreur spécifique au champ quand l'utilisateur commence à taper
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
    // Nettoyer l'erreur générale si l'utilisateur modifie un champ après une erreur de soumission
    if (errors.general) {
      setErrors((prev) => ({
        ...prev,
        general: "",
      }));
    }
  };

  // validateForm doit aussi être ici :
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "L'email est requis.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format d'email invalide.";
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis.";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // handleTraditionalLogin doit aussi être ici :
  const handleTraditionalLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLocalLoading(true);
    setErrors({});

    try {
      const { success, error, user: loggedInUser } = await login(formData);

      if (success) {
        navigate("/");
      } else {
        setErrors({
          general: error || "Identifiants invalides. Veuillez réessayer.",
        });
      }
    } catch (err) {
      console.error(
        "Erreur inattendue lors de la connexion traditionnelle:",
        err
      );
      setErrors({
        general: "Une erreur inattendue est survenue. Veuillez réessayer.",
      });
    } finally {
      setLocalLoading(false);
    }
  };

  // googleLoginHandler doit être initialisé ici :
  const googleLoginHandler = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLocalLoading(true);
      setErrors({});
      try {
        // Récupère le bon token (id_token ou access_token)
        const idToken = tokenResponse.id_token || tokenResponse.access_token;
        const backendResponse = await fetch(
          import.meta.env.VITE_REACT_APP_API_URL + "/api/auth/google",
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id_token: idToken }),
          }
        );
        const data = await backendResponse.json();
        if (backendResponse.ok) {
          login(data.user, data.token);
          navigate("/");
        } else {
          setErrors({
            general:
              data.message ||
              "Échec de la connexion Google. Veuillez réessayer.",
          });
        }
      } catch (error) {
        console.error(
          "Erreur lors de l'envoi du token Google au backend:",
          error
        );
        setErrors({
          general:
            "Erreur lors de la connexion via Google. Veuillez réessayer.",
        });
      } finally {
        setLocalLoading(false);
      }
    },
    onError: (errorResponse) => {
      console.error("Erreur de connexion Google:", errorResponse);
      setErrors({
        general: "Échec de la connexion Google. Une erreur est survenue.",
      });
      setLocalLoading(false);
    },
    scope: "openid email profile",
  });

  // handleLogout doit aussi être ici :
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // --- Rendu JSX ---
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-6rem)] bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        {/* En-tête de la carte de connexion */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            {/* L'icône User est ici ! */}
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">
            {isAuthenticated ? "Bienvenue !" : "Connexion"}
          </h2>
          {!isAuthenticated && (
            <p className="text-gray-600 mt-2">
              Connectez-vous pour accéder à votre compte
            </p>
          )}
        </div>
        {/* ... votre contenu JSX ... */}
        {isAuthenticated ? (
          <div className="text-center">
            <div className="flex flex-col items-center mb-6">
              {user?.picture && (
                <img
                  src={user.picture}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full mb-4 border-4 border-blue-400 shadow-md"
                />
              )}
              <p className="text-xl font-semibold text-gray-700">
                {user?.name ||
                  user?.firstName + " " + user?.lastName ||
                  user?.email}
              </p>
              <p className="text-gray-500">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition duration-300 transform hover:scale-105 shadow-md"
            >
              <LogOut size={20} />
              <span>Déconnexion</span>
            </button>
          </div>
        ) : (
          <div>
            {errors.general && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
                {errors.general}
              </div>
            )}
            {authError && !errors.general && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
                {authError}
              </div>
            )}

            <form onSubmit={handleTraditionalLogin} className="space-y-4 mb-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Adresse email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange} // <-- La ligne 200 (environ) qui posait problème
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${
                      errors.email
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="votre@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${
                      errors.password
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="Votre mot de passe"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label={
                      showPassword
                        ? "Cacher le mot de passe"
                        : "Afficher le mot de passe"
                    }
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-200"
                  />
                  <span className="ml-2 text-gray-600">Se souvenir de moi</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              <button
                type="submit"
                disabled={localLoading || authContextLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition duration-300 transform hover:scale-105 shadow-md disabled:transform-none"
              >
                {localLoading || authContextLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <LogIn size={20} />
                    <span>Se connecter</span>
                  </>
                )}
              </button>
            </form>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">
                  Ou continuer avec
                </span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-3 text-center">
                Authentification rapide
              </h3>
              <button
                onClick={() => googleLoginHandler()}
                disabled={localLoading || authContextLoading}
                className="w-full bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition duration-300 transform hover:scale-105 shadow-sm disabled:transform-none"
              >
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google icon"
                  className="w-5 h-5"
                />
                <span>Continuer avec Google</span>
              </button>
            </div>

            <div className="mt-6 text-center text-sm text-gray-600">
              Pas encore de compte ?{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Créer un compte
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} // <-- Fin de votre composant fonctionnel

export default Login;
