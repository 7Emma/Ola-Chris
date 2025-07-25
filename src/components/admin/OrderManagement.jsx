import React, { useState } from "react";
import { Search, Download, Eye, MoreVertical } from "lucide-react";
// Modal n'est plus importé ici, car il est géré par AdminDashboard
// Les composants de contenu de modal seront gérés par AdminDashboard

/**
 * Composant de gestion des commandes pour le tableau de bord admin.
 * @param {object} props - Les props du composant.
 * @param {Array<object>} props.orders - La liste des commandes.
 * @param {function} props.setOrders - Fonction pour mettre à jour la liste des commandes (mockée ici).
 * @param {function} props.onShowModal - Fonction pour demander à AdminDashboard d'afficher un modal.
 */
const OrderManagement = ({ orders, setOrders, onShowModal }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Filtrer et rechercher les commandes
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(order.id).includes(searchTerm);
    const matchesStatus =
      selectedStatus === "all" || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId, newStatus) => {
    const newOrders = orders.map((o) =>
      o.id === orderId ? { ...o, status: newStatus } : o
    );
    setOrders(newOrders);
    // Ici, vous feriez également un appel API pour mettre à jour le statut sur le backend
    console.log(
      `Mise à jour de la commande ${orderId} au statut: ${newStatus}`
    );
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Rechercher des commandes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="shipped">Expédiée</option>
              <option value="delivered">Livrée</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center">
              <Download size={20} className="mr-2" />
              Exporter
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                  ID Commande
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                  Client
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                  Articles
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                  Total
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                  Statut
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{order.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {order.items}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    ${order.total}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      className={`px-2 py-1 text-xs font-medium rounded-full border-0 focus:ring-2 focus:ring-blue-500 ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "shipped"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      <option value="pending">En attente</option>
                      <option value="shipped">Expédiée</option>
                      <option value="delivered">Livrée</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          onShowModal({
                            show: true,
                            type: "view-order",
                            data: order,
                          })
                        }
                        className="text-blue-600 hover:text-blue-700"
                        title="Voir détails"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-700"
                        title="Plus d'actions"
                      >
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
