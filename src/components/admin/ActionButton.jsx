import React from 'react';

/**
 * Composant pour un bouton d'action stylisé.
 * @param {object} props - Les props du composant.
 * @param {function} props.onClick - La fonction à appeler lors du clic.
 * @param {React.ComponentType} props.icon - L'icône Lucide React à afficher.
 * @param {string} props.label - Le texte du libellé du bouton.
 * @param {'blue'|'green'|'orange'|'gray'} [props.color='blue'] - La couleur du bouton.
 */
const ActionButton = ({ onClick, icon: Icon, label, color = 'blue' }) => {
  const colorClasses = {
    green: 'text-green-600 bg-green-50 hover:bg-green-100',
    orange: 'text-orange-600 bg-orange-50 hover:bg-orange-100',
    gray: 'text-gray-600 bg-gray-50 hover:bg-gray-100',
    blue: 'text-blue-600 bg-blue-50 hover:bg-blue-100',
  }[color];

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200 ${colorClasses}`}
      title={label}
    >
      <Icon size={16} className="mr-1" />
      {label}
    </button>
  );
};

export default ActionButton;
