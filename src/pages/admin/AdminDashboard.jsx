import React, { useState, useEffect } from "react";
import {
  Users,
  Package,
  ShoppingCart,
  BarChart3,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Settings,
  Bell,
  LogOut,
  ChevronDown,
  MoreVertical,
  Star,
} from "lucide-react";

function AdminDashboard() {
  // Mock auth context
  const user = {
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
  };
  const isAuthenticated = true;
  const logout = () => console.log("Logging out...");

  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showModal, setShowModal] = useState({
    show: false,
    type: "",
    data: null,
  });
  const [stats, setStats] = useState({
    totalUsers: 1250,
    totalProducts: 89,
    totalOrders: 456,
    totalRevenue: 25680,
    monthlyGrowth: 12.5,
    pendingOrders: 23,
  });

  // Mock data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "user",
      status: "active",
      joinDate: "2024-01-15",
      orders: 12,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "admin",
      status: "active",
      joinDate: "2024-02-20",
      orders: 8,
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "user",
      status: "inactive",
      joinDate: "2024-03-10",
      orders: 3,
    },
  ]);

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Smartphone XY",
      category: "Electronics",
      price: 599,
      stock: 45,
      status: "active",
      sales: 156,
    },
    {
      id: 2,
      name: "Laptop Pro",
      category: "Electronics",
      price: 1299,
      stock: 12,
      status: "active",
      sales: 89,
    },
    {
      id: 3,
      name: "Headphones",
      category: "Audio",
      price: 199,
      stock: 0,
      status: "out_of_stock",
      sales: 234,
    },
  ]);

  const [orders, setOrders] = useState([
    {
      id: 1001,
      customer: "John Doe",
      total: 599,
      status: "pending",
      date: "2024-07-20",
      items: 2,
    },
    {
      id: 1002,
      customer: "Jane Smith",
      total: 1498,
      status: "shipped",
      date: "2024-07-19",
      items: 3,
    },
    {
      id: 1003,
      customer: "Bob Johnson",
      total: 199,
      status: "delivered",
      date: "2024-07-18",
      items: 1,
    },
  ]);

  // Utility Components
  const StatCard = ({ icon: Icon, title, value, change, color = "blue" }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <div
              className={`flex items-center mt-2 text-sm ${
                change > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {change > 0 ? (
                <TrendingUp size={16} />
              ) : (
                <TrendingDown size={16} />
              )}
              <span className="ml-1">{Math.abs(change)}%</span>
            </div>
          )}
        </div>
        <div
          className={`p-3 rounded-full ${
            color === "blue"
              ? "bg-blue-100"
              : color === "green"
              ? "bg-green-100"
              : color === "purple"
              ? "bg-purple-100"
              : color === "yellow"
              ? "bg-yellow-100"
              : "bg-gray-100"
          }`}
        >
          <Icon
            className={`w-6 h-6 ${
              color === "blue"
                ? "text-blue-600"
                : color === "green"
                ? "text-green-600"
                : color === "purple"
                ? "text-purple-600"
                : color === "yellow"
                ? "text-yellow-600"
                : "text-gray-600"
            }`}
          />
        </div>
      </div>
    </div>
  );

  const TabButton = ({ id, label, icon: Icon, count }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
        activeTab === id
          ? "bg-blue-600 text-white shadow-md"
          : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
      }`}
    >
      <Icon size={20} className="mr-2" />
      {label}
      {count && (
        <span
          className={`ml-2 px-2 py-1 text-xs rounded-full ${
            activeTab === id ? "bg-blue-500" : "bg-gray-200 text-gray-600"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );

  const Modal = ({ show, onClose, title, children, size = "md" }) => {
    if (!show) return null;

    const sizeClasses = {
      sm: "max-w-md",
      md: "max-w-lg",
      lg: "max-w-4xl",
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div
          className={`bg-white rounded-xl shadow-2xl ${sizeClasses[size]} w-full max-h-screen overflow-y-auto`}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors text-2xl"
            >
              ×
            </button>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    );
  };

  const ActionButton = ({
    onClick,
    icon: Icon,
    label,
    color = "blue",
    size = "sm",
  }) => (
    <button
      onClick={onClick}
      className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
        color === "green"
          ? "text-green-600 bg-green-50 hover:bg-green-100"
          : color === "orange"
          ? "text-orange-600 bg-orange-50 hover:bg-orange-100"
          : color === "gray"
          ? "text-gray-600 bg-gray-50 hover:bg-gray-100"
          : "text-blue-600 bg-blue-50 hover:bg-blue-100"
      }`}
      title={label}
    >
      <Icon size={16} className="mr-1" />
      {label}
    </button>
  );

  // Modal Content Components
  const renderModalContent = () => {
    switch (showModal.type) {
      case "add-user":
        return (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rôle
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
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
                Ajouter
              </button>
            </div>
          </form>
        );
      case "add-product":
        return (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom du produit
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Catégorie
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="Electronics">Electronics</option>
                <option value="Audio">Audio</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prix
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
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
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Ajouter
              </button>
            </div>
          </form>
        );
      case "view-order":
        return showModal.data ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-700">
                  ID Commande:
                </span>
                <p className="text-gray-900">#{showModal.data.id}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">
                  Client:
                </span>
                <p className="text-gray-900">{showModal.data.customer}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Date:</span>
                <p className="text-gray-900">
                  {new Date(showModal.data.date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">
                  Total:
                </span>
                <p className="text-gray-900 font-semibold">
                  ${showModal.data.total}
                </p>
              </div>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-700">Statut:</span>
              <span
                className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                  showModal.data.status === "delivered"
                    ? "bg-green-100 text-green-800"
                    : showModal.data.status === "shipped"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {showModal.data.status}
              </span>
            </div>
          </div>
        ) : null;
      default:
        return <p>Contenu du modal non défini</p>;
    }
  };

  // Tab Render Functions
  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          title="Total Utilisateurs"
          value={stats.totalUsers.toLocaleString()}
          change={stats.monthlyGrowth}
          color="blue"
        />
        <StatCard
          icon={Package}
          title="Total Produits"
          value={stats.totalProducts}
          change={5.2}
          color="green"
        />
        <StatCard
          icon={ShoppingCart}
          title="Commandes"
          value={stats.totalOrders}
          change={-2.1}
          color="purple"
        />
        <StatCard
          icon={DollarSign}
          title="Revenus"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          change={stats.monthlyGrowth}
          color="yellow"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Actions rapides
        </h3>
        <div className="flex flex-wrap gap-3">
          <ActionButton
            onClick={() =>
              setShowModal({ show: true, type: "add-product", data: null })
            }
            icon={Plus}
            label="Ajouter Produit"
            color="green"
          />
          <ActionButton
            onClick={() => setActiveTab("orders")}
            icon={Clock}
            label={`${stats.pendingOrders} Commandes en attente`}
            color="orange"
          />
          <ActionButton
            onClick={() => console.log("Export data")}
            icon={Download}
            label="Exporter Données"
            color="blue"
          />
          <ActionButton
            onClick={() => console.log("Settings")}
            icon={Settings}
            label="Paramètres"
            color="gray"
          />
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Commandes récentes
          </h3>
          <button
            onClick={() => setActiveTab("orders")}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Voir tout
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                  ID
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                  Client
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                  Total
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="border-t border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    #{order.id}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{order.customer}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    ${order.total}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "shipped"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
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
              {users.map((user) => (
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
    </div>
  );

  const renderProducts = () => (
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
              placeholder="Rechercher des produits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Toutes catégories</option>
              <option>Electronics</option>
              <option>Audio</option>
              <option>Accessories</option>
            </select>
            <button
              onClick={() =>
                setShowModal({ show: true, type: "add-product", data: null })
              }
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center"
            >
              <Plus size={20} className="mr-2" />
              Ajouter
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <Package size={48} className="text-gray-400" />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{product.name}</h3>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    product.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.status === "active" ? "Actif" : "Rupture"}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{product.category}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold text-gray-900">
                  ${product.price}
                </span>
                <span className="text-sm text-gray-600">
                  Stock: {product.stock}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-600">
                  <Star size={16} className="text-yellow-400 mr-1" />
                  {product.sales} ventes
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      setShowModal({
                        show: true,
                        type: "edit-product",
                        data: product,
                      })
                    }
                    className="text-blue-600 hover:text-blue-700"
                    title="Modifier"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() =>
                      setShowModal({
                        show: true,
                        type: "delete-product",
                        data: product,
                      })
                    }
                    className="text-red-600 hover:text-red-700"
                    title="Supprimer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderOrders = () => (
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
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Tous les statuts</option>
              <option>En attente</option>
              <option>Expédiée</option>
              <option>Livrée</option>
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
              {orders.map((order) => (
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
                      onChange={(e) => {
                        const newOrders = orders.map((o) =>
                          o.id === order.id
                            ? { ...o, status: e.target.value }
                            : o
                        );
                        setOrders(newOrders);
                      }}
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
                          setShowModal({
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
      case "add-product":
        return "Ajouter un produit";
      case "edit-product":
        return "Modifier le produit";
      case "delete-product":
        return "Supprimer le produit";
      case "view-order":
        return "Détails de la commande";
      default:
        return "Modal";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Dashboard Admin
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell size={20} />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name || user?.email}
                  </p>
                  <p className="text-xs text-gray-500">Administrateur</p>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  title="Se déconnecter"
                >
                  <LogOut size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <TabButton id="dashboard" label="Dashboard" icon={BarChart3} />
            <TabButton
              id="users"
              label="Utilisateurs"
              icon={Users}
              count={users.length}
            />
            <TabButton
              id="products"
              label="Produits"
              icon={Package}
              count={products.length}
            />
            <TabButton
              id="orders"
              label="Commandes"
              icon={ShoppingCart}
              count={stats.pendingOrders}
            />
          </div>
        </div>

        {/* Content */}
        {activeTab === "dashboard" && renderDashboard()}
        {activeTab === "users" && renderUsers()}
        {activeTab === "products" && renderProducts()}
        {activeTab === "orders" && renderOrders()}
      </div>

      {/* Modal */}
      <Modal
        show={showModal.show}
        onClose={() => setShowModal({ show: false, type: "", data: null })}
        title={getModalTitle()}
        size={showModal.type === "view-order" ? "lg" : "md"}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
}

export default AdminDashboard;
