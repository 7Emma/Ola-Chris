import React from "react";

/**
 * Modal de confirmation générique pour la suppression.
 * @param {object} props - Les props du composant.
 * @param {string} props.itemType - Le type de l'élément à supprimer (ex: "utilisateur", "produit").
 * @param {string} props.itemName - Le nom de l'élément à supprimer.
 * @param {function} props.onConfirm - Fonction à appeler si la suppression est confirmée.
 * @param {function} props.onCancel - Fonction à appeler si la suppression est annulée.
 */
const DeleteConfirmation = ({ itemType, itemName, onConfirm, onCancel }) => {
  return (
    <div>
      <p className="mb-4">
        Êtes-vous sûr de vouloir supprimer {itemType}{" "}
        <span className="font-semibold">{itemName}</span> ? Cette action est
        irréversible.
      </p>
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Annuler
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
