import React from "react";
import {
  User,
  Edit3,
  Save,
  MapPin,
  Phone,
  Mail,
  Calendar,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import Spinner from "../ui/Spinner"; // Assurez-vous que le chemin est correct

function ProfileInfoTab({
  user,
  formData,
  isEditing,
  isLoading,
  apiError,
  apiSuccess,
  handleInputChange,
  handleSave,
  setIsEditing,
  setApiError, // Passé pour effacer les erreurs si l'utilisateur annule l'édition
  setApiSuccess, // Passé pour effacer les succès si l'utilisateur annule l'édition
}) {
  return (
    <div className="space-y-6">
      {/* Messages de succès/erreur API */}
      {apiSuccess && (
        <div className="p-3 bg-green-100 border border-green-300 text-green-700 rounded-lg flex items-center space-x-2 text-sm">
          <CheckCircle className="w-5 h-5" />
          <span>{apiSuccess}</span>
        </div>
      )}
      {apiError && (
        <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg flex items-center space-x-2 text-sm">
          <AlertCircle className="w-5 h-5" />
          <span>{apiError}</span>
        </div>
      )}

      {/* Informations personnelles */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <User className="w-5 h-5 mr-2" />
            Informations personnelles
          </h3>
          {!isEditing ? (
            <button
              onClick={() => {
                setIsEditing(true);
                setApiError(null);
                setApiSuccess(null);
              }}
              className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition duration-200"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Modifier
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setIsEditing(false);
                  // Réinitialiser formData aux données originales de l'utilisateur si annulé
                  if (user) {
                    // Note: Le formatting de dateOfBirth doit correspondre à celui attendu par l'input type="date"
                    const formattedDateOfBirth = user.dateOfBirth
                      ? new Date(user.dateOfBirth).toISOString().split("T")[0]
                      : "";
                    // IMPORTANT: formData doit être réinitialisé ici pour refléter les données non modifiées
                    // Cela est géré dans le parent (SupermarketProfile.jsx) pour garder la logique de réinitialisation centralisée.
                    // Pour ce composant, on peut juste s'assurer que l'édition est désactivée.
                  }
                  setApiError(null);
                  setApiSuccess(null);
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition duration-200"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 disabled:opacity-50"
              >
                {isLoading ? (
                  <Spinner size="w-4 h-4" color="border-white" />
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Sauvegarder
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prénom
            </label>
            {isEditing ? (
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900 py-2">{user?.firstName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom
            </label>
            {isEditing ? (
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900 py-2">{user?.lastName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900 py-2 flex items-center">
                <Mail className="w-4 h-4 mr-2 text-gray-500" />
                {user?.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Téléphone
            </label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900 py-2 flex items-center">
                <Phone className="w-4 h-4 mr-2 text-gray-500" />
                {user?.phone}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date de naissance
            </label>
            {isEditing ? (
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900 py-2 flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                {user?.dateOfBirth
                  ? new Date(user.dateOfBirth).toLocaleDateString("fr-FR")
                  : "N/A"}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Adresse de livraison */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          Adresse de livraison
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adresse
            </label>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900 py-2">{user?.address}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ville
            </label>
            {isEditing ? (
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900 py-2">{user?.city}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Code postal
            </label>
            {isEditing ? (
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900 py-2">{user?.postalCode}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfoTab;
