import React from "react";
import { ShoppingCart, Package, AlertCircle } from "lucide-react";
import Spinner from "../ui/Spinner"; // Assurez-vous que le chemin est correct

function OrdersTab({ recentOrders, ordersLoading, ordersError }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Mes commandes récentes
      </h3>
      {ordersLoading ? (
        <div className="flex justify-center items-center h-48">
          <Spinner size="w-8 h-8" color="border-green-500" />
          <p className="ml-3 text-gray-600">Chargement des commandes...</p>
        </div>
      ) : ordersError ? (
        <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg flex items-center space-x-2 text-sm">
          <AlertCircle className="w-5 h-5" />
          <span>{ordersError.message || ordersError}</span>{" "}
          {/* Affiche le message d'erreur d'Axios ou le texte brut */}
        </div>
      ) : recentOrders.length === 0 ? (
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-center text-gray-600">
          Aucune commande récente trouvée.
        </div>
      ) : (
        recentOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Commande #{order.id}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {new Date(order.date).toLocaleDateString("fr-FR")}
                  </p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === "Livrée"
                    ? "bg-green-100 text-green-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {order.status}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                {order.items} articles • {order.total.toFixed(2)} €
              </div>
              <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                Voir détails
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default OrdersTab;
