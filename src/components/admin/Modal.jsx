import React from "react";

/**
 * Composant générique pour une fenêtre modale.
 * @param {object} props - Les props du composant.
 * @param {boolean} props.show - Indique si le modal doit être affiché.
 * @param {function} props.onClose - Fonction à appeler pour fermer le modal.
 * @param {string} props.title - Le titre du modal.
 * @param {React.ReactNode} props.children - Le contenu du modal.
 * @param {'sm'|'md'|'lg'} [props.size='md'] - La taille du modal.
 */
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
            aria-label="Fermer"
          >
            ×
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
