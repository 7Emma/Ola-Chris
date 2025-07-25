import React from "react";

/**
 * Composant pour un bouton d'onglet de navigation.
 * @param {object} props - Les props du composant.
 * @param {string} props.id - L'identifiant unique de l'onglet.
 * @param {string} props.label - Le texte du libellé de l'onglet.
 * @param {React.ComponentType} props.icon - L'icône Lucide React à afficher.
 * @param {number} [props.count] - Un nombre à afficher à côté du libellé.
 * @param {string} props.activeTab - L'ID de l'onglet actuellement actif.
 * @param {function} props.onClick - La fonction à appeler lors du clic.
 */
const TabButton = ({ id, label, icon: Icon, count, activeTab, onClick }) => (
  <button
    onClick={() => onClick(id)}
    className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
      activeTab === id
        ? "bg-blue-600 text-white shadow-md"
        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
    }`}
  >
    <Icon size={20} className="mr-2" />
    {label}
    {count !== undefined && ( // Vérifier explicitement undefined pour permettre 0
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

export default TabButton;
