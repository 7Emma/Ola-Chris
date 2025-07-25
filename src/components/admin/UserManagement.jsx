import React, { useState } from "react";
import { Search, Plus, Eye, Edit, Trash2 } from "lucide-react";
// Modal n'est plus importé ici, car il est géré par AdminDashboard
// Les composants de contenu de modal seront gérés par AdminDashboard

/**
 * Composant de gestion des utilisateurs pour le tableau de bord admin.
 * @param {object} props - Les props du composant.
 * @param {Array<object>} props.users - La liste des utilisateurs.
 * @param {function} props.onShowModal - Fonction pour demander à AdminDashboard d'afficher un modal.
 */
const UserManagement = ({ users, onShowModal }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Filtrer et rechercher les utilisateurs
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" ||
      user.role === selectedFilter ||
      user.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

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
              placeholder="Rechercher des utilisateurs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tous les utilisateurs</option>
              <option value="admin">Admins</option>
              <option value="user">Utilisateurs</option>
              <option value="active">Actifs</option>
              <option value="inactive">Inactifs</option>
            </select>
            <button
              onClick={() =>
                onShowModal({ show: true, type: "add-user", data: null })
              }
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
            >
              <Plus size={20} className="mr-2" />
              Ajouter
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                  Utilisateur
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                  Rôle
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                  Statut
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                  Date d'inscription
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                  Commandes
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        user.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(user.joinDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.orders}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          onShowModal({
                            show: true,
                            type: "view-user",
                            data: user,
                          })
                        }
                        className="text-blue-600 hover:text-blue-700"
                        title="Voir"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() =>
                          onShowModal({
                            show: true,
                            type: "edit-user",
                            data: user,
                          })
                        }
                        className="text-green-600 hover:text-green-700"
                        title="Modifier"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() =>
                          onShowModal({
                            show: true,
                            type: "delete-user",
                            data: user,
                          })
                        }
                        className="text-red-600 hover:text-red-700"
                        title="Supprimer"
                      >
                        <Trash2 size={16} />
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

export default UserManagement;
