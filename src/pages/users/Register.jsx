import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../context/AuthContext";
import {
  UserPlus,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  CheckCircle,
} from "lucide-react";
// Importez le nouveau composant Spinner
import Spinner from "../../components/ui/Spinner";

function Register() {
  const navigate = useNavigate();
  const { register, loginWithGoogle } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  // Ajout d'un état pour les messages de succès qui ne sont pas une redirection
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name] || errors.general) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
        general: "",
      }));
    }
    // Efface le message de succès si l'utilisateur commence à taper à nouveau
    if (successMessage) {
      setSuccessMessage("");
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Le prénom est requis.";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Le nom est requis.";
    }

    if (!formData.email) {
      newErrors.email = "L'email est requis.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format d'email invalide.";
    }

    if (!formData.phone) {
      newErrors.phone = "Le numéro de téléphone est requis.";
    } else if (!/^[\+]?[0-9\s\-\(\)]{8,20}$/.test(formData.phone)) {
      newErrors.phone =
        "Format de téléphone invalide (min 8 chiffres, max 20, peut inclure +, espaces, tirets, parenthèses).";
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis.";
    } else if (formData.password.length < 8) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 8 caractères.";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Veuillez confirmer votre mot de passe.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
    }

    if (!acceptTerms) {
      newErrors.terms = "Vous devez accepter les conditions d'utilisation.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTraditionalRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});
    setSuccessMessage(""); // Réinitialise le message de succès

    try {
      const data = await register(formData);

      // Si l'inscription réussit, le backend renvoie un message 'Inscription réussie !'
      setSuccessMessage(data.message || "Inscription réussie !");
      setIsRegistered(true); // Active l'affichage du succès (avec redirection)

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error("Erreur lors de l'inscription traditionnelle:", error);
      // L'erreur vient du backend via api.js et AuthContext, elle contient déjà 'message'
      setErrors({
        general:
          error.message || "Erreur lors de l'inscription. Veuillez réessayer.",
      });
      setIsRegistered(false); // Assurez-vous que le succès n'est pas affiché en cas d'erreur
    } finally {
      setIsLoading(false);
    }
  };

  const googleRegisterHandler = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      setErrors({});
      setSuccessMessage("");
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
          setSuccessMessage(data.message || "Connexion Google réussie !");
          navigate("/");
        } else {
          setErrors({
            general:
              data.message ||
              "Échec de l'inscription/connexion Google. Veuillez réessayer.",
          });
        }
      } catch (error) {
        console.error("Erreur lors de l'inscription/connexion Google:", error);
        setErrors({
          general:
            "Échec de l'inscription/connexion Google. Veuillez réessayer.",
        });
      } finally {
        setIsLoading(false);
      }
    },
    onError: (errorResponse) => {
      console.error("Erreur de connexion Google:", errorResponse);
      setErrors({
        general: "Échec de l'inscription Google. Une erreur est survenue.",
      });
      setIsLoading(false);
    },
    scope: "openid email profile",
  });

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthColors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-blue-500",
    "bg-emerald-500",
    "bg-green-500",
  ];
  const strengthLabels = [
    "Très faible",
    "Faible",
    "Moyen",
    "Fort",
    "Très fort",
  ];

  if (isRegistered) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-6rem)] bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Inscription réussie !
          </h2>
          <p className="text-gray-600 mb-6">
            {successMessage ||
              "Votre compte a été créé avec succès. Vous allez être redirigé vers la page de connexion."}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-blue-600 h-2 rounded-full animate-pulse"
              style={{ width: "100%" }}
            ></div>
          </div>
          <p className="text-sm text-gray-500">Redirection en cours...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-6rem)] bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <UserPlus className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Inscription</h2>
          <p className="text-gray-600 mt-2">
            Créez votre compte pour commencer
          </p>
        </div>

        {/* Message de succès (si pas de redirection, ex: Google) */}
        {successMessage && !isRegistered && (
          <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-lg text-sm">
            {successMessage}
          </div>
        )}

        {/* Erreur générale */}
        {errors.general && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleTraditionalRegister} className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Prénom *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${
                  errors.firstName
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder="John"
              />
              {errors.firstName && (
                <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nom *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${
                  errors.lastName
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder="Doe"
              />
              {errors.lastName && (
                <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Adresse email *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${
                  errors.email ? "border-red-300 bg-red-50" : "border-gray-300"
                }`}
                placeholder="john.doe@example.com"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Numéro de téléphone *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${
                  errors.phone ? "border-red-300 bg-red-50" : "border-gray-300"
                }`}
                placeholder="+33 1 23 45 67 89"
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Mot de passe *
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

            {formData.password && (
              <div className="mt-2">
                <div className="flex space-x-1 mb-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`h-2 flex-1 rounded ${
                        level <= passwordStrength
                          ? strengthColors[passwordStrength - 1]
                          : "bg-gray-200"
                      }`}
                    ></div>
                  ))}
                </div>
                <p className="text-xs text-gray-600">
                  Force:{" "}
                  {passwordStrength > 0
                    ? strengthLabels[passwordStrength - 1]
                    : "Aucun"}
                </p>
              </div>
            )}

            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirmer le mot de passe *
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${
                  errors.confirmPassword
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder="Confirmez votre mot de passe"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={
                  showConfirmPassword
                    ? "Cacher le mot de passe de confirmation"
                    : "Afficher le mot de passe de confirmation"
                }
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="acceptTerms"
              checked={acceptTerms}
              onChange={(e) => {
                setAcceptTerms(e.target.checked);
                if (errors.terms) {
                  setErrors((prev) => ({ ...prev, terms: "" }));
                }
              }}
              className="mt-1 rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-200"
            />
            <label
              htmlFor="acceptTerms"
              className="text-sm text-gray-600 cursor-pointer"
            >
              J'accepte les{" "}
              <Link
                to="/terms-of-service"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                conditions d'utilisation
              </Link>{" "}
              et la{" "}
              <Link
                to="/privacy-policy"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                politique de confidentialité
              </Link>
              *
            </label>
          </div>
          {errors.terms && (
            <p className="text-sm text-red-600">{errors.terms}</p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition duration-300 transform hover:scale-105 shadow-md disabled:transform-none"
          >
            {isLoading ? (
              <Spinner size="w-5 h-5" color="border-white" /> // Utilisation du Spinner
            ) : (
              <>
                <UserPlus size={20} />
                <span>Créer mon compte</span>
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
              Ou s'inscrire avec
            </span>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3 text-center">
            Inscription rapide
          </h3>
          <button
            onClick={() => googleRegisterHandler()}
            disabled={isLoading}
            className="w-full bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition duration-300 transform hover:scale-105 shadow-sm disabled:transform-none"
          >
            {isLoading ? ( // Spinner pour le bouton Google
              <Spinner size="w-5 h-5" color="border-gray-500" />
            ) : (
              <>
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google icon"
                  className="w-5 h-5"
                />
                <span>S'inscrire avec Google</span>
              </>
            )}
          </button>
        </div>

        <div className="text-center text-sm text-gray-600">
          Vous avez déjà un compte ?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
