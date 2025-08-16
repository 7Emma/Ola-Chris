import React, { useState, useEffect } from "react";
import {
  User,
  ShoppingCart,
  Heart,
  Award,
  Settings,
  AlertCircle,
  Camera, // Ajout de l'icône caméra pour l'upload
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import {
  updateUserProfile,
  fetchRecentOrders,
  fetchFavoriteProductIds,
  uploadProfilePicture, // Nouvelle fonction d'API pour l'upload
} from "../../utils/api";
import Spinner from "../../components/ui/Spinner"; // Ajustez ce chemin si votre Spinner est ailleurs

// Importation des nouveaux composants d'onglet
import ProfileInfoTab from "../../components/ProfileTabs/ProfileInfoTab";
import OrdersTab from "../../components/ProfileTabs/OrdersTab";
import FavoritesTab from "../../components/ProfileTabs/FavoritesTab";
import LoyaltyTab from "../../components/ProfileTabs/LoyaltyTab";
import SettingsTab from "../../components/ProfileTabs/SettingsTab";

function SupermarketProfile() {
  const {
    user,
    updateProfile: authContextUpdateProfile,
    isAuthenticated,
    loading: authLoading,
  } = useAuth();

  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Pour l'action de sauvegarde
  const [apiError, setApiError] = useState(null);
  const [apiSuccess, setApiSuccess] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    postalCode: "",
    profilePicture: null, // Pour stocker l'objet fichier sélectionné
    profilePictureUrl: "", // Pour stocker l'URL de prévisualisation (locale ou existante)
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState(null);

  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [favoritesLoading, setFavoritesLoading] = useState(false);
  const [favoritesError, setFavoritesError] = useState(null);

  // Effet pour charger les données de l'utilisateur dans le formulaire
  // lorsque le composant monte ou que l'objet user du contexte change.
  useEffect(() => {
    console.log(
      "useEffect: authLoading",
      authLoading,
      "isAuthenticated",
      isAuthenticated,
      "user",
      user
    );
    if (!authLoading && isAuthenticated && user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        dateOfBirth: user.dateOfBirth
          ? new Date(user.dateOfBirth).toISOString().split("T")[0]
          : "",
        address: user.address || "",
        city: user.city || "",
        postalCode: user.postalCode || "",
        profilePicture: null, // Réinitialiser le fichier d'image lors du chargement initial
        profilePictureUrl: user.picture || user.avatar || "", // Utiliser l'URL existante pour la prévisualisation
      });
      console.log(
        "useEffect: Données utilisateur chargées dans formData. profilePictureUrl:",
        user.picture || user.avatar || ""
      );
      setApiError(null);
      setApiSuccess(null);
    } else if (!authLoading && !isAuthenticated) {
      setApiError("Vous devez être connecté pour voir votre profil.");
      console.log("useEffect: Utilisateur non authentifié.");
    }
  }, [user, isAuthenticated, authLoading]);

  // Effet pour charger les données des onglets spécifiques (Commandes, Favoris)
  useEffect(() => {
    const fetchDataForTab = async () => {
      if (!isAuthenticated) return;

      if (activeTab === "orders") {
        setOrdersLoading(true);
        setOrdersError(null);
        try {
          const data = await fetchRecentOrders();
          setRecentOrders(data);
          console.log("Commandes récentes récupérées:", data);
        } catch (error) {
          console.error("Erreur lors de la récupération des commandes:", error);
          setOrdersError(
            error.response?.data?.message ||
              error.message ||
              "Échec de la récupération des commandes."
          );
        } finally {
          setOrdersLoading(false);
        }
      } else if (activeTab === "favorites") {
        setFavoritesLoading(true);
        setFavoritesError(null);
        try {
          const data = await fetchFavoriteProductIds();
          setFavoriteProducts(data);
          console.log("Produits favoris récupérés:", data);
        } catch (error) {
          console.error("Erreur lors de la récupération des favoris:", error);
          setFavoritesError(
            error.response?.data?.message ||
              error.message ||
              "Échec de la récupération des favoris."
          );
        } finally {
          setFavoritesLoading(false);
        }
      }
    };

    fetchDataForTab();
  }, [activeTab, isAuthenticated]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setApiError(null);
    setApiSuccess(null);
    console.log("Champ modifié:", name, value);
  };

  // Nouvelle fonction pour gérer le changement de photo de profil
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        profilePicture: file, // Stocke l'objet fichier
        profilePictureUrl: fileUrl, // Crée une URL temporaire pour la prévisualisation
      }));
      setApiError(null);
      setApiSuccess(null);
      console.log(
        "Photo de profil sélectionnée. Fichier:",
        file,
        "URL de prévisualisation:",
        fileUrl
      );
    } else {
      console.log("Aucun fichier sélectionné.");
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    setApiError(null);
    setApiSuccess(null);
    console.log(
      "Tentative de sauvegarde du profil. formData actuel:",
      formData
    );

    try {
      if (!formData.firstName || !formData.lastName || !formData.email) {
        setApiError("Le prénom, le nom et l'email sont obligatoires.");
        setIsLoading(false);
        console.log("Erreur de validation: Champs obligatoires manquants.");
        return;
      }

      // Mettre à jour les informations de texte du profil
      const updatedProfileData = { ...formData };
      delete updatedProfileData.profilePicture; // Ne pas envoyer le fichier direct dans cette mise à jour
      delete updatedProfileData.profilePictureUrl; // Ne pas envoyer l'URL de prévisualisation

      console.log(
        "Mise à jour des données textuelles du profil:",
        updatedProfileData
      );
      const profileUpdateResponse = await updateUserProfile(updatedProfileData);
      console.log(
        "Réponse de la mise à jour du profil textuel:",
        profileUpdateResponse
      );
      // Mettre à jour le contexte d'authentification avec les dernières données utilisateur (hors nouvelle image pour l'instant)
      authContextUpdateProfile(profileUpdateResponse.user);
      console.log(
        "Contexte d'authentification mis à jour avec les données textuelles. Utilisateur actuel dans le contexte:",
        user
      );

      // Si une nouvelle image a été sélectionnée, l'uploader séparément
      if (formData.profilePicture) {
        console.log("Téléchargement de la nouvelle photo de profil...");
        const uploadResponse = await uploadProfilePicture(
          formData.profilePicture
        );
        console.log(
          "Réponse du téléchargement de la photo de profil:",
          uploadResponse
        );
        // Mettre à jour le contexte d'authentification à nouveau avec la nouvelle URL de l'image reçue du backend
        authContextUpdateProfile(uploadResponse.user);
        console.log(
          "Contexte d'authentification mis à jour avec la nouvelle photo. Utilisateur actuel dans le contexte:",
          user
        );
        setApiSuccess("Profil et photo de profil mis à jour avec succès !");
      } else {
        setApiSuccess(
          profileUpdateResponse.message || "Profil mis à jour avec succès !"
        );
      }

      setIsEditing(false);
      console.log("Profil sauvegardé avec succès.");
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du profil:", error);
      setApiError(
        error.response?.data?.message ||
          error.message ||
          "Échec de la mise à jour du profil. Veuillez réessayer."
      );
    } finally {
      setIsLoading(false);
      // Révoquer l'URL de l'objet si elle a été créée, pour libérer de la mémoire
      if (
        formData.profilePictureUrl &&
        formData.profilePictureUrl.startsWith("blob:")
      ) {
        URL.revokeObjectURL(formData.profilePictureUrl);
        console.log("Ancienne URL d'objet révoquée.");
      }
    }
  };

  const tabs = [
    { id: "profile", label: "Mon Profil", icon: User },
    { id: "orders", label: "Mes Commandes", icon: ShoppingCart },
    { id: "favorites", label: "Mes Favoris", icon: Heart },
    { id: "loyalty", label: "Fidélité", icon: Award },
    { id: "settings", label: "Paramètres", icon: Settings },
  ];

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <Spinner size="w-12 h-12" color="border-green-600" />
        <p className="ml-4 text-lg text-gray-700">Chargement du profil...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4 text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Accès refusé</h2>
        <p className="text-gray-600 mb-6">
          Vous devez être connecté pour accéder à cette page.
        </p>
        {/* Vous pourriez ajouter un bouton pour rediriger vers la connexion */}
        <Link
          to="/login"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Se connecter
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* En-tête avec informations utilisateur */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img
                src={
                  formData.profilePictureUrl || // Priorité 1: L'URL de la nouvelle photo sélectionnée par l'utilisateur (pour prévisualisation)
                  user.picture || // Priorité 2: L'URL de la photo de profil existante de l'utilisateur
                  user.avatar || // Priorité 3: L'URL de l'avatar existant de l'utilisateur
                  "https://images.app.goo.gl/A1NpAWx21hhC1bdYA"
                }
                alt="Avatar"
                className="w-20 h-20 rounded-full object-cover border-4 border-green-200"
              />
              {isEditing && (
                // Le label agit comme une zone cliquable pour l'input de fichier caché
                <label
                  htmlFor="profile-picture-upload"
                  className="absolute -top-1 -right-1 w-8 h-8 bg-green-600 rounded-full border-2 border-white flex items-center justify-center cursor-pointer hover:bg-green-700 transition"
                  title="Changer la photo de profil"
                >
                  <Camera className="w-4 h-4 text-white" />
                  <input
                    id="profile-picture-upload"
                    type="file"
                    accept="image/*" // N'accepte que les fichiers image
                    onChange={handleProfilePictureChange}
                    className="hidden" // Cache l'input de fichier par défaut
                  />
                </label>
              )}
              {/* Badge de niveau utilisateur */}{" "}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-xs font-bold text-white">
                  {user.level ? user.level[0] : ""}
                </span>
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-gray-600 flex items-center mt-1">
                <Award className="w-4 h-4 mr-2 text-yellow-500" />
                Membre {user.level} • {user.points} points
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Membre depuis{" "}
                {user.memberSince
                  ? new Date(user.memberSince).toLocaleDateString("fr-FR")
                  : "N/A"}
              </p>
            </div>

            <div className="text-right">
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg">
                <div className="text-2xl font-bold">{user.points}</div>
                <div className="text-sm">Points fidélité</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation par onglets */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 whitespace-nowrap font-medium transition duration-200 ${
                  activeTab === tab.id
                    ? "text-green-600 border-b-2 border-green-600 bg-green-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Contenu des onglets (utilisant les nouveaux composants) */}
        <div>
          {activeTab === "profile" && (
            <ProfileInfoTab
              user={user}
              formData={formData}
              isEditing={isEditing}
              isLoading={isLoading}
              apiError={apiError}
              apiSuccess={apiSuccess}
              handleInputChange={handleInputChange}
              handleSave={handleSave}
              setIsEditing={setIsEditing}
              setApiError={setApiError}
              setApiSuccess={setApiSuccess}
              // handleProfilePictureChange n'est pas directement utilisé dans ProfileInfoTab pour l'instant,
              // car l'interface utilisateur de téléchargement est dans SupermarketProfile.
              // Si vous décidez de déplacer l'input dans ProfileInfoTab, passez-le ici.
            />
          )}
          {activeTab === "orders" && (
            <OrdersTab
              recentOrders={recentOrders}
              ordersLoading={ordersLoading}
              ordersError={ordersError}
            />
          )}
          {activeTab === "favorites" && (
            <FavoritesTab
              favoriteProducts={favoriteProducts}
              favoritesLoading={favoritesLoading}
              favoritesError={favoritesError}
            />
          )}
          {activeTab === "loyalty" && <LoyaltyTab user={user} />}
          {activeTab === "settings" && <SettingsTab />}
        </div>
      </div>
    </div>
  );
}

export default SupermarketProfile;
