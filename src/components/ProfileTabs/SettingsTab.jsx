import React, { useState } from "react";
import {
  Settings,
  Bell,
  Lock,
  LogOut,
  Eye,
  EyeOff,
  X,
  Check,
  AlertTriangle,
  Shield,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function SettingsTab() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // États pour les modals
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);

  // États pour les notifications
  const [notifications, setNotifications] = useState({
    promotions: true,
    orders: true,
    newProducts: false,
  });

  // États pour le changement de mot de passe
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [passwordLoading, setPasswordLoading] = useState(false);

  // États pour les toasts
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  // États pour la 2FA
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [twoFALoading, setTwoFALoading] = useState(false);

  // Fonction pour afficher les toasts
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  // Gestion de la déconnexion
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      showToast("Déconnexion réussie !");
    } catch (error) {
      console.error("Échec de la déconnexion :", error);
      showToast("Erreur lors de la déconnexion", "error");
    }
    setShowLogoutModal(false);
  };

  // Gestion des notifications
  const handleNotificationChange = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    showToast("Préférences de notification mises à jour");
  };

  // Gestion du changement de mot de passe
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordLoading(true);

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast("Les mots de passe ne correspondent pas", "error");
      setPasswordLoading(false);
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      showToast("Le mot de passe doit contenir au moins 6 caractères", "error");
      setPasswordLoading(false);
      return;
    }

    try {
      // Simuler un appel API
      await new Promise((resolve) => setTimeout(resolve, 2000));
      showToast("Mot de passe modifié avec succès");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowPasswordModal(false);
    } catch (error) {
      showToast("Erreur lors de la modification du mot de passe", "error");
    }

    setPasswordLoading(false);
  };

  // Gestion de la 2FA
  const handle2FAToggle = async () => {
    setTwoFALoading(true);
    try {
      // Simuler un appel API
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setTwoFAEnabled(!twoFAEnabled);
      showToast(
        `Authentification à deux facteurs ${
          !twoFAEnabled ? "activée" : "désactivée"
        }`
      );
      setShow2FAModal(false);
    } catch (error) {
      showToast("Erreur lors de la configuration de la 2FA", "error");
    }
    setTwoFALoading(false);
  };

  // Composant Switch moderne
  const ModernSwitch = ({ checked, onChange, disabled = false }) => (
    <button
      onClick={onChange}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
        checked ? "bg-green-600" : "bg-gray-200"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );

  // Composant Toast
  const Toast = ({ show, message, type }) => {
    if (!show) return null;

    const bgColor = type === "error" ? "bg-red-500" : "bg-green-500";
    const icon =
      type === "error" ? <AlertTriangle size={20} /> : <Check size={20} />;

    return (
      <div
        className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2 animate-slide-in`}
      >
        {icon}
        <span>{message}</span>
      </div>
    );
  };

  // Composant Modal
  const Modal = ({ show, onClose, title, children, size = "md" }) => {
    if (!show) return null;

    const sizeClasses = {
      sm: "max-w-md",
      md: "max-w-lg",
      lg: "max-w-2xl",
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div
          className={`bg-white rounded-xl shadow-2xl ${sizeClasses[size]} w-full max-h-screen overflow-y-auto animate-fade-in`}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      <Toast show={toast.show} message={toast.message} type={toast.type} />

      {/* Notifications */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Bell className="w-5 h-5 mr-2 text-blue-600" />
          Notifications
        </h3>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">
                Offres et promotions
              </h4>
              <p className="text-sm text-gray-500">
                Recevoir des notifications sur les offres spéciales
              </p>
            </div>
            <ModernSwitch
              checked={notifications.promotions}
              onChange={() => handleNotificationChange("promotions")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">
                Statut des commandes
              </h4>
              <p className="text-sm text-gray-500">
                Notifications sur l'état de vos commandes
              </p>
            </div>
            <ModernSwitch
              checked={notifications.orders}
              onChange={() => handleNotificationChange("orders")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Nouveaux produits</h4>
              <p className="text-sm text-gray-500">
                Être informé des nouveautés
              </p>
            </div>
            <ModernSwitch
              checked={notifications.newProducts}
              onChange={() => handleNotificationChange("newProducts")}
            />
          </div>
        </div>
      </div>

      {/* Sécurité */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Lock className="w-5 h-5 mr-2 text-green-600" />
          Sécurité
        </h3>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">
                Changer le mot de passe
              </h4>
              <p className="text-sm text-gray-500">
                Dernière modification il y a 3 mois
              </p>
            </div>
            <button
              onClick={() => setShowPasswordModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
            >
              Modifier
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">
                Authentification à deux facteurs
              </h4>
              <p className="text-sm text-gray-500">
                {twoFAEnabled
                  ? "2FA activée"
                  : "Sécurisez votre compte avec la 2FA"}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {twoFAEnabled && (
                <span className="flex items-center text-green-600 text-sm font-medium">
                  <Shield size={16} className="mr-1" />
                  Actif
                </span>
              )}
              <button
                onClick={() => setShow2FAModal(true)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
                  twoFAEnabled
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }`}
              >
                {twoFAEnabled ? "Désactiver" : "Activer"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bouton de Déconnexion */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex justify-center hover:shadow-md transition-shadow duration-200">
        <button
          onClick={() => setShowLogoutModal(true)}
          className="flex items-center px-8 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Se Déconnecter
        </button>
      </div>

      {/* Modal de Confirmation de Déconnexion */}
      <Modal
        show={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Confirmer la déconnexion"
        size="sm"
      >
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <LogOut className="h-6 w-6 text-red-600" />
          </div>
          <p className="text-gray-600 mb-6">
            Êtes-vous sûr de vouloir vous déconnecter ? Vous devrez vous
            reconnecter pour accéder à votre compte.
          </p>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowLogoutModal(false)}
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-200"
            >
              Annuler
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal de Changement de Mot de Passe */}
      <Modal
        show={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        title="Changer le mot de passe"
        size="md"
      >
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe actuel
            </label>
            <div className="relative">
              <input
                type={showPasswords.current ? "text" : "password"}
                value={passwordForm.currentPassword}
                onChange={(e) =>
                  setPasswordForm((prev) => ({
                    ...prev,
                    currentPassword: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords((prev) => ({
                    ...prev,
                    current: !prev.current,
                  }))
                }
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.current ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nouveau mot de passe
            </label>
            <div className="relative">
              <input
                type={showPasswords.new ? "text" : "password"}
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm((prev) => ({
                    ...prev,
                    newPassword: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords((prev) => ({ ...prev, new: !prev.new }))
                }
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirmer le nouveau mot de passe
            </label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? "text" : "password"}
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords((prev) => ({
                    ...prev,
                    confirm: !prev.confirm,
                  }))
                }
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.confirm ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={() => setShowPasswordModal(false)}
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-200"
              disabled={passwordLoading}
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={passwordLoading}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {passwordLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              ) : (
                "Modifier"
              )}
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal 2FA */}
      <Modal
        show={show2FAModal}
        onClose={() => setShow2FAModal(false)}
        title={`${
          twoFAEnabled ? "Désactiver" : "Activer"
        } l'authentification à deux facteurs`}
        size="sm"
      >
        <div className="text-center">
          <div
            className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full mb-4 ${
              twoFAEnabled ? "bg-red-100" : "bg-green-100"
            }`}
          >
            <Shield
              className={`h-6 w-6 ${
                twoFAEnabled ? "text-red-600" : "text-green-600"
              }`}
            />
          </div>
          <p className="text-gray-600 mb-6">
            {twoFAEnabled
              ? "La désactivation de la 2FA réduira la sécurité de votre compte. Êtes-vous sûr ?"
              : "L'activation de la 2FA ajoutera une couche de sécurité supplémentaire à votre compte."}
          </p>
          <div className="flex space-x-4">
            <button
              onClick={() => setShow2FAModal(false)}
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-200"
              disabled={twoFALoading}
            >
              Annuler
            </button>
            <button
              onClick={handle2FAToggle}
              disabled={twoFALoading}
              className={`flex-1 py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center ${
                twoFAEnabled
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {twoFALoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              ) : twoFAEnabled ? (
                "Désactiver"
              ) : (
                "Activer"
              )}
            </button>
          </div>
        </div>
      </Modal>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}

export default SettingsTab;
