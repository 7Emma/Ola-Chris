import React, { useState } from "react";
import { Search, Plus, Eye, Edit, Trash2 } from "lucide-react";
import Modal from "./Modal"; // Assurez-vous du chemin correct

/**
 * Composant de gestion des utilisateurs pour le tableau de bord admin.
 * @param {object} props - Les props du composant.
 * @param {Array<object>} props.users - La liste des utilisateurs.
 * @param {function} props.setUsers - Fonction pour mettre à jour la liste des utilisateurs.
 * @param {function} props.onAddUser - Fonction pour gérer l'ajout d'un utilisateur.
 * @param {function} props.onEditUser - Fonction pour gérer la modification d'un utilisateur.
 * @param {function} props.onDeleteUser - Fonction pour gérer la suppression d'un utilisateur.
 */
const UserManagement = ({
  users,
  setUsers,
  onAddUser,
  onEditUser,
  onDeleteUser,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showModal, setShowModal] = useState({
    show: false,
    type: "",
    data: null,
  });

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

  const getModalTitle = () => {
    switch (showModal.type) {
      case "add-user":
        return "Ajouter un utilisateur";
      case "edit-user":
        return "Modifier l'utilisateur";
      case "view-user":
        return "Détails de l'utilisateur";
      case "delete-user":
        return "Supprimer l'utilisateur";
      default:
        return "Modal Utilisateur";
    }
  };

  const renderModalContent = () => {
    switch (showModal.type) {
      case "add-user":
      case "edit-user": {
        const isEditing = showModal.type === "edit-user";
        const initialData = isEditing
          ? showModal.data
          : {
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              password: "",
              role: "user",
            };
        const [formData, setFormData] = useState(initialData);

        const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData((prev) => ({ ...prev, [name]: value }));
        };

        const handleSubmit = (e) => {
          e.preventDefault();
          if (isEditing) {
            onEditUser(formData); // Appeler la fonction de modification du parent
          } else {
            onAddUser(formData); // Appeler la fonction d'ajout du parent
          }
          setShowModal({ show: false, type: "", data: null });
        };

        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prénom
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {!isEditing && ( // Le mot de passe n'est requis que pour l'ajout initial
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rôle
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="user">Utilisateur</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() =>
                  setShowModal({ show: false, type: "", data: null })
                }
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {isEditing ? "Sauvegarder" : "Ajouter"}
              </button>
            </div>
          </form>
        );
      }
      case "view-user": {
        const user = showModal.data;
        return user ? (
          <div className="space-y-4">
            <div>
              <span className="font-medium">Nom:</span> {user.name}
            </div>
            <div>
              <span className="font-medium">Email:</span> {user.email}
            </div>
            <div>
              <span className="font-medium">Rôle:</span> {user.role}
            </div>
            <div>
              <span className="font-medium">Statut:</span> {user.status}
            </div>
            <div>
              <span className="font-medium">Date d'inscription:</span>{" "}
              {new Date(user.joinDate).toLocaleDateString()}
            </div>
            <div>
              <span className="font-medium">Commandes:</span> {user.orders}
            </div>
          </div>
        ) : null;
      }
      case "delete-user": {
        const userToDelete = showModal.data;
        return userToDelete ? (
          <div>
            <p className="mb-4">
              Êtes-vous sûr de vouloir supprimer l'utilisateur{" "}
              <span className="font-semibold">
                {userToDelete.name} ({userToDelete.email})
              </span>{" "}
              ? Cette action est irréversible.
            </p>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() =>
                  setShowModal({ show: false, type: "", data: null })
                }
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={() => {
                  onDeleteUser(userToDelete.id);
                  setShowModal({ show: false, type: "", data: null });
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        ) : null;
      }
      default:
        return <p>Contenu du modal non défini</p>;
    }
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
                setShowModal({ show: true, type: "add-user", data: null })
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
                          setShowModal({
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
                          setShowModal({
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
                          setShowModal({
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

      {/* Modal pour la gestion des utilisateurs */}
      <Modal
        show={showModal.show}
        onClose={() => setShowModal({ show: false, type: "", data: null })}
        title={getModalTitle()}
        size={showModal.type === "view-user" ? "md" : "sm"}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default UserManagement;
