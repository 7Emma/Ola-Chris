import React from "react";
import { Award, Star, Truck, Clock, Gift } from "lucide-react";

function LoyaltyTab({ user }) {
  return (
    <div className="space-y-6">
      {/* Carte de fidélité */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold">Carte Fidélité</h3>
            <p className="text-green-100">Membre {user?.level}</p>
          </div>
          <Award className="w-8 h-8 text-green-200" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Numéro de carte:</span>
            <span className="font-mono">{user?.loyaltyCard || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span>Points disponibles:</span>
            <span className="font-bold">{user?.points} pts</span>
          </div>
          <div className="flex justify-between">
            <span>Membre depuis:</span>
            <span>
              {user?.memberSince
                ? new Date(user.memberSince).toLocaleDateString("fr-FR")
                : "N/A"}
            </span>
          </div>
        </div>
      </div>

      {/* Avantages du niveau Gold */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Star className="w-5 h-5 mr-2 text-yellow-500" />
          Avantages Membre {user?.level}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
            <Gift className="w-5 h-5 text-yellow-600 mr-3" />
            <span className="text-sm text-gray-700">
              5% de remise sur tous les produits
            </span>
          </div>
          <div className="flex items-center p-3 bg-green-50 rounded-lg">
            <Truck className="w-5 h-5 text-green-600 mr-3" />
            <span className="text-sm text-gray-700">
              Livraison gratuite dès 50€
            </span>
          </div>
          <div className="flex items-center p-3 bg-blue-50 rounded-lg">
            <Clock className="w-5 h-5 text-blue-600 mr-3" />
            <span className="text-sm text-gray-700">
              Créneaux de livraison prioritaires
            </span>
          </div>
          <div className="flex items-center p-3 bg-purple-50 rounded-lg">
            <Star className="w-5 h-5 text-purple-600 mr-3" />
            <span className="text-sm text-gray-700">
              Accès aux offres exclusives
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoyaltyTab;
