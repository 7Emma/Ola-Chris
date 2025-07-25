import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Package,
  ShoppingCart,
  BarChart3,
  Plus,
  Clock,
  Download,
  Settings,
  Bell,
  LogOut,
  DollarSign,
} from "lucide-react";

// Importation des composants généraux d'administration
import StatCard from "../components/admin/StatCard";
import TabButton from "../components/admin/TabButton";
import ActionButton from "../components/admin/ActionButton";
import Modal from "../components/admin/Modal";
import Spinner from "../components/ui/Spinner";

// Importation des composants de gestion de section
import UserManagement from "../components/admin/UserManagement";
import ProductManagement from "../components/admin/ProductManagement";
import OrderManagement from "../components/admin/OrderManagement";

// Importation des composants de contenu de modal
import AddEditUserForm from "../components/admin/modals/AddEditUserForm";
import ViewUserDetails from "../components/admin/modals/ViewUserDetails";
import DeleteConfirmation from "../components/admin/modals/DeleteConfirmation";
import AddEditProductForm from "../components/admin/modals/AddEditProductForm";
import ViewOrderDetails from "../components/admin/modals/ViewOrderDetails";

import { useAuth } from "../context/AuthContext";

function AdminDashboard() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [showModal, setShowModal] = useState({
    show: false,
    type: "",
    data: null,
  });

  // Mock data (vous remplacerez cela par des appels API réels)
  const [stats, setStats] = useState({
    totalUsers: 1250,
    totalProducts: 89,
    totalOrders: 456,
    totalRevenue: 25680,
    monthlyGrowth: 12.5,
    pendingOrders: 23,
  });

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "user",
      status: "active",
      joinDate: "2024-01-15",
      orders: 12,
      phone: "123-456-7890",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "admin",
      status: "active",
      joinDate: "2024-02-20",
      orders: 8,
      phone: "098-765-4321",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "user",
      status: "inactive",
      joinDate: "2024-03-10",
      orders: 3,
      phone: "555-123-4567",
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

  // Vérifier l'authentification et le rôle de l'utilisateur
  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        navigate("/login");
        return;
      }
      if (user && user.role !== "admin") {
        alert(
          "Accès non autorisé : Vous n'avez pas les permissions d'administrateur."
        );
        navigate("/");
      }
    }
  }, [isAuthenticated, loading, user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Fonctions de gestion des utilisateurs (à connecter à l'API plus tard)
  const handleAddUser = (newUserData) => {
    console.log("Ajouter utilisateur:", newUserData);
    setUsers((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        ...newUserData,
        status: "active",
        joinDate: new Date().toISOString().split("T")[0],
        orders: 0,
      },
    ]);
    setShowModal({ show: false, type: "", data: null }); // Fermer le modal après action
  };

  const handleEditUser = (updatedUserData) => {
    console.log("Modifier utilisateur:", updatedUserData);
    setUsers((prev) =>
      prev.map((u) =>
        u.id === updatedUserData.id ? { ...u, ...updatedUserData } : u
      )
    );
    setShowModal({ show: false, type: "", data: null }); // Fermer le modal après action
  };

  const handleDeleteUser = (userId) => {
    console.log("Supprimer utilisateur ID:", userId);
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    setShowModal({ show: false, type: "", data: null }); // Fermer le modal après action
  };

  // Fonctions de gestion des produits (à connecter à l'API plus tard)
  const handleAddProduct = (newProductData) => {
    console.log("Ajouter produit:", newProductData);
    setProducts((prev) => [
      ...prev,
      { id: prev.length + 1, ...newProductData, sales: 0 },
    ]);
    setShowModal({ show: false, type: "", data: null }); // Fermer le modal après action
  };

  const handleEditProduct = (updatedProductData) => {
    console.log("Modifier produit:", updatedProductData);
    setProducts((prev) =>
      prev.map((p) =>
        p.id === updatedProductData.id ? { ...p, ...updatedProductData } : p
      )
    );
    setShowModal({ show: false, type: "", data: null }); // Fermer le modal après action
  };

  const handleDeleteProduct = (productId) => {
    console.log("Supprimer produit ID:", productId);
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    setShowModal({ show: false, type: "", data: null }); // Fermer le modal après action
  };

  // Fonction pour obtenir le titre du modal
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

  // Fonction pour rendre le contenu du modal
  const renderModalContent = () => {
    switch (showModal.type) {
      case "add-user":
        return (
          <AddEditUserForm
            onSubmit={handleAddUser}
            onCancel={() => setShowModal({ show: false, type: "", data: null })}
          />
        );
      case "edit-user":
        return (
          <AddEditUserForm
            initialData={showModal.data}
            onSubmit={handleEditUser}
            onCancel={() => setShowModal({ show: false, type: "", data: null })}
          />
        );
      case "view-user":
        return <ViewUserDetails user={showModal.data} />;
      case "delete-user":
        const userToDelete = showModal.data;
        return (
          <DeleteConfirmation
            itemType="l'utilisateur"
            itemName={userToDelete?.name}
            onConfirm={() => handleDeleteUser(userToDelete?.id)}
            onCancel={() => setShowModal({ show: false, type: "", data: null })}
          />
        );
      case "add-product":
        return (
          <AddEditProductForm
            onSubmit={handleAddProduct}
            onCancel={() => setShowModal({ show: false, type: "", data: null })}
          />
        );
      case "edit-product":
        return (
          <AddEditProductForm
            initialData={showModal.data}
            onSubmit={handleEditProduct}
            onCancel={() => setShowModal({ show: false, type: "", data: null })}
          />
        );
      case "delete-product":
        const productToDelete = showModal.data;
        return (
          <DeleteConfirmation
            itemType="le produit"
            itemName={productToDelete?.name}
            onConfirm={() => handleDeleteProduct(productToDelete?.id)}
            onCancel={() => setShowModal({ show: false, type: "", data: null })}
          />
        );
      case "view-order":
        return <ViewOrderDetails order={showModal.data} />;
      default:
        return <p>Contenu du modal non défini</p>;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Spinner size="w-10 h-10" color="border-blue-500" />
        <p className="ml-4 text-lg text-gray-700">
          Chargement du tableau de bord...
        </p>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return null; // La redirection est gérée par useEffect
  }

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
                    {user?.firstName || user?.email}
                  </p>
                  <p className="text-xs text-gray-500">Administrateur</p>
                </div>
                <button
                  onClick={handleLogout}
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
            <TabButton
              id="dashboard"
              label="Dashboard"
              icon={BarChart3}
              activeTab={activeTab}
              onClick={setActiveTab}
            />
            <TabButton
              id="users"
              label="Utilisateurs"
              icon={Users}
              count={users.length}
              activeTab={activeTab}
              onClick={setActiveTab}
            />
            <TabButton
              id="products"
              label="Produits"
              icon={Package}
              count={products.length}
              activeTab={activeTab}
              onClick={setActiveTab}
            />
            <TabButton
              id="orders"
              label="Commandes"
              icon={ShoppingCart}
              count={stats.pendingOrders}
              activeTab={activeTab}
              onClick={setActiveTab}
            />
          </div>
        </div>

        {/* Content */}
        {activeTab === "dashboard" && (
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
                    setShowModal({
                      show: true,
                      type: "add-product",
                      data: null,
                    })
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

            {/* Recent Orders (peut être un composant séparé si plus complexe) */}
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
                        <td className="px-4 py-3 text-gray-600">
                          {order.customer}
                        </td>
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
        )}

        {activeTab === "users" && (
          <UserManagement
            users={users}
            onShowModal={setShowModal} // Passer setShowModal comme prop
          />
        )}
        {activeTab === "products" && (
          <ProductManagement
            products={products}
            onShowModal={setShowModal} // Passer setShowModal comme prop
          />
        )}
        {activeTab === "orders" && (
          <OrderManagement
            orders={orders}
            setOrders={setOrders} // setOrders reste ici car la modification de statut est locale
            onShowModal={setShowModal} // Passer setShowModal comme prop
          />
        )}
      </div>

      {/* Modal global géré par AdminDashboard */}
      <Modal
        show={showModal.show}
        onClose={() => setShowModal({ show: false, type: "", data: null })}
        title={getModalTitle()}
        // Ajuster la taille du modal en fonction du type de contenu
        size={
          showModal.type === "view-order" || showModal.type === "view-user"
            ? "md"
            : "sm"
        }
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
}

export default AdminDashboard;
