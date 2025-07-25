import React, { useState, useEffect } from 'react';

/**
 * Formulaire pour ajouter ou modifier un utilisateur.
 * @param {object} props - Les props du composant.
 * @param {object} [props.initialData] - Les données initiales de l'utilisateur pour la modification.
 * @param {function} props.onSubmit - Fonction à appeler lors de la soumission du formulaire.
 * @param {function} props.onCancel - Fonction à appeler lors de l'annulation.
 */
const AddEditUserForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialData || {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    role: 'user',
  });
  const isEditing = !!initialData; // Si initialData est fourni, c'est une édition

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
        <input type="text" name="phone" value={formData.phone || ''} onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      {!isEditing && ( // Le mot de passe n'est requis que pour l'ajout initial
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required={!isEditing} />
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
        <select name="role" value={formData.role} onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="user">Utilisateur</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <button type="button" onClick={onCancel}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
          Annuler
        </button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          {isEditing ? 'Sauvegarder' : 'Ajouter'}
        </button>
      </div>
    </form>
  );
};

export default AddEditUserForm;
