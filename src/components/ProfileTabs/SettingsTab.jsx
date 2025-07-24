import React from "react";
import { Settings, Bell, Lock } from "lucide-react";

function SettingsTab() {
  return (
    <div className="space-y-6">
      {/* Notifications */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Bell className="w-5 h-5 mr-2" />
          Notifications
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">
                Offres et promotions
              </h4>
              <p className="text-sm text-gray-500">
                Recevoir des notifications sur les offres spéciales
              </p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="rounded text-green-600 focus:ring-green-500"
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
            <input
              type="checkbox"
              defaultChecked
              className="rounded text-green-600 focus:ring-green-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Nouveaux produits</h4>
              <p className="text-sm text-gray-500">
                Être informé des nouveautés
              </p>
            </div>
            <input
              type="checkbox"
              className="rounded text-green-600 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      {/* Sécurité */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Lock className="w-5 h-5 mr-2" />
          Sécurité
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">
                Changer le mot de passe
              </h4>
              <p className="text-sm text-gray-500">
                Dernière modification il y a 3 mois
              </p>
            </div>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              Modifier
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">
                Authentification à deux facteurs
              </h4>
              <p className="text-sm text-gray-500">
                Sécurisez votre compte avec la 2FA
              </p>
            </div>
            <button className="text-green-600 hover:text-green-700 font-medium">
              Activer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsTab;
