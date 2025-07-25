import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

/**
 * Composant pour afficher une carte de statistique.
 * @param {object} props - Les props du composant.
 * @param {React.ComponentType} props.icon - L'icône Lucide React à afficher.
 * @param {string} props.title - Le titre de la statistique.
 * @param {string|number} props.value - La valeur de la statistique.
 * @param {number} [props.change] - Le pourcentage de changement (positif ou négatif).
 * @param {string} [props.color='blue'] - La couleur de la carte (blue, green, purple, yellow).
 */
const StatCard = ({ icon: Icon, title, value, change, color = "blue" }) => {
  const bgColorClass = {
    blue: "bg-blue-100",
    green: "bg-green-100",
    purple: "bg-purple-100",
    yellow: "bg-yellow-100",
    gray: "bg-gray-100",
  }[color];

  const textColorClass = {
    blue: "text-blue-600",
    green: "text-green-600",
    purple: "text-purple-600",
    yellow: "text-yellow-600",
    gray: "text-gray-600",
  }[color];

  return (
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
        <div className={`p-3 rounded-full ${bgColorClass}`}>
          <Icon className={`w-6 h-6 ${textColorClass}`} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
