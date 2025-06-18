// categories.js - Données des catégories du supermarché

export const categories = [
  {
    id: 1,
    name: "Fruits & Légumes",
    slug: "fruits-legumes",
    icon: "🥕",
    description: "Fruits et légumes frais de saison",
    color: "#10B981"
  },
  {
    id: 2,
    name: "Boucherie & Charcuterie",
    slug: "boucherie-charcuterie",
    icon: "🥩",
    description: "Viandes fraîches et charcuterie",
    color: "#DC2626"
  },
  {
    id: 3,
    name: "Poissonnerie",
    slug: "poissonnerie",
    icon: "🐟",
    description: "Poissons et fruits de mer frais",
    color: "#3B82F6"
  },
  {
    id: 4,
    name: "Produits Laitiers",
    slug: "produits-laitiers",
    icon: "🧀",
    description: "Lait, fromages, yaourts et œufs",
    color: "#F59E0B"
  },
  {
    id: 5,
    name: "Boulangerie & Pâtisserie",
    slug: "boulangerie-patisserie",
    icon: "🍞",
    description: "Pain frais, viennoiseries et pâtisseries",
    color: "#92400E"
  },
  {
    id: 6,
    name: "Épicerie Salée",
    slug: "epicerie-salee",
    icon: "🍝",
    description: "Pâtes, riz, conserves et condiments",
    color: "#7C2D12"
  },
  {
    id: 7,
    name: "Épicerie Sucrée",
    slug: "epicerie-sucree",
    icon: "🍫",
    description: "Chocolats, bonbons, biscuits et confiseries",
    color: "#BE185D"
  },
  {
    id: 8,
    name: "Boissons",
    slug: "boissons",
    icon: "🧃",
    description: "Eaux, sodas, jus et boissons chaudes",
    color: "#0891B2"
  },
  {
    id: 9,
    name: "Surgelés",
    slug: "surgeles",
    icon: "❄️",
    description: "Produits surgelés et glaces",
    color: "#1E40AF"
  },
  {
    id: 10,
    name: "Hygiène & Beauté",
    slug: "hygiene-beaute",
    icon: "🧴",
    description: "Produits d'hygiène et de beauté",
    color: "#9333EA"
  },
  {
    id: 11,
    name: "Entretien & Maison",
    slug: "entretien-maison",
    icon: "🧽",
    description: "Produits d'entretien et articles ménagers",
    color: "#059669"
  },
  {
    id: 12,
    name: "Bébé & Enfant",
    slug: "bebe-enfant",
    icon: "👶",
    description: "Alimentation et soins pour bébés et enfants",
    color: "#EC4899"
  }
];

// Fonction pour obtenir une catégorie par ID
export const getCategoryById = (id) => {
  return categories.find(category => category.id === id);
};

// Fonction pour obtenir une catégorie par slug
export const getCategoryBySlug = (slug) => {
  return categories.find(category => category.slug === slug);
};

// Fonction pour obtenir toutes les catégories
export const getAllCategories = () => {
  return categories;
};

export default categories;