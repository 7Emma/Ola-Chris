import React from "react";

/**
 * Affiche les détails d'un utilisateur.
 * @param {object} props - Les props du composant.
 * @param {object} props.user - L'objet utilisateur à afficher.
 */
const ViewUserDetails = ({ user }) => {
  if (!user) return <p>Aucun utilisateur sélectionné.</p>;

  return (
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
  );
};

export default ViewUserDetails;
