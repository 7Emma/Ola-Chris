import React from 'react';

/**
 * Composant de spinner de chargement réutilisable.
 * @param {string} size - La taille du spinner (ex: 'w-5 h-5', 'w-8 h-8').
 * @param {string} color - La couleur de la bordure du spinner (ex: 'border-blue-500', 'border-white').
 */
function Spinner({ size = 'w-5 h-5', color = 'border-white' }) {
  return (
    <div
      className={`${size} border-2 ${color} border-t-transparent rounded-full animate-spin`}
      role="status"
      aria-label="Chargement en cours"
    >
      <span className="sr-only">Chargement...</span>
    </div>
  );
}

export default Spinner;