import React from "react";

/**
 * Affiche les détails d'une commande.
 * @param {object} props - Les props du composant.
 * @param {object} props.order - L'objet commande à afficher.
 */
const ViewOrderDetails = ({ order }) => {
  if (!order) return <p>Aucune commande sélectionnée.</p>;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-sm font-medium text-gray-700">
            ID Commande:
          </span>
          <p className="text-gray-900">#{order.id}</p>
        </div>
        <div>
          <span className="text-sm font-medium text-gray-700">Client:</span>
          <p className="text-gray-900">{order.customer}</p>
        </div>
        <div>
          <span className="text-sm font-medium text-gray-700">Date:</span>
          <p className="text-gray-900">
            {new Date(order.date).toLocaleDateString()}
          </p>
        </div>
        <div>
          <span className="text-sm font-medium text-gray-700">Total:</span>
          <p className="text-gray-900 font-semibold">${order.total}</p>
        </div>
      </div>
      <div>
        <span className="text-sm font-medium text-gray-700">Statut:</span>
        <span
          className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
            order.status === "delivered"
              ? "bg-green-100 text-green-800"
              : order.status === "shipped"
              ? "bg-blue-100 text-blue-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {order.status}
        </span>
      </div>
    </div>
  );
};

export default ViewOrderDetails;
