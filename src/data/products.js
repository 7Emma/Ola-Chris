export const products = [
  // Vêtements
  {
    id: 1,
    name: "T-shirt Premium Coton",
    description: "T-shirt en coton bio de haute qualité, coupe moderne et confortable. Parfait pour un style décontracté.",
    price: 29.99,
    originalPrice: 39.99,
    image: "https://via.placeholder.com/400x400/3B82F6/FFFFFF?text=T-shirt",
    category: "clothing",
    inStock: true,
    featured: true,
    colors: ["Blanc", "Noir", "Bleu", "Rouge"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.5,
    reviews: 128
  },
  {
    id: 2,
    name: "Robe d'été Florale",
    description: "Robe légère et élégante avec motifs floraux. Idéale pour les journées ensoleillées.",
    price: 59.99,
    originalPrice: 79.99,
    image: "https://via.placeholder.com/400x400/EC4899/FFFFFF?text=Robe",
    category: "clothing",
    inStock: true,
    featured: false,
    colors: ["Floral Bleu", "Floral Rose", "Floral Jaune"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.7,
    reviews: 89
  },
  {
    id: 3,
    name: "Jean Slim Fit",
    description: "Jean coupe slim en denim stretch pour un confort optimal. Style intemporel.",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://via.placeholder.com/400x400/1F2937/FFFFFF?text=Jean",
    category: "clothing",
    inStock: true,
    featured: true,
    colors: ["Bleu Foncé", "Noir", "Bleu Clair"],
    sizes: ["28", "30", "32", "34", "36"],
    rating: 4.3,
    reviews: 156
  },

  // Accessoires
  {
    id: 4,
    name: "Montre Connectée Sport",
    description: "Montre intelligente avec suivi d'activité, GPS et notifications. Étanche jusqu'à 50m.",
    price: 199.99,
    originalPrice: 249.99,
    image: "https://via.placeholder.com/400x400/10B981/FFFFFF?text=Montre",
    category: "accessories",
    inStock: true,
    featured: true,
    colors: ["Noir", "Blanc", "Bleu"],
    sizes: ["Unique"],
    rating: 4.6,
    reviews: 203
  },
  {
    id: 5,
    name: "Lunettes de Soleil Aviateur",
    description: "Lunettes de soleil style aviateur avec verres polarisés et protection UV400.",
    price: 89.99,
    originalPrice: 119.99,
    image: "https://via.placeholder.com/400x400/F59E0B/FFFFFF?text=Lunettes",
    category: "accessories",
    inStock: true,
    featured: false,
    colors: ["Or", "Argent", "Noir"],
    sizes: ["Unique"],
    rating: 4.4,
    reviews: 67
  },
  {
    id: 6,
    name: "Écharpe en Cachemire",
    description: "Écharpe douce et chaude en cachemire authentique. Accessoire indispensable pour l'hiver.",
    price: 149.99,
    originalPrice: 199.99,
    image: "https://via.placeholder.com/400x400/8B5CF6/FFFFFF?text=Écharpe",
    category: "accessories",
    inStock: false,
    featured: false,
    colors: ["Beige", "Gris", "Noir", "Rouge"],
    sizes: ["Unique"],
    rating: 4.8,
    reviews: 45
  },

  // Chaussures
  {
    id: 7,
    name: "Baskets Running Pro",
    description: "Chaussures de course avec technologie d'amortissement avancée et semelle respirante.",
    price: 129.99,
    originalPrice: 159.99,
    image: "https://via.placeholder.com/400x400/EF4444/FFFFFF?text=Baskets",
    category: "shoes",
    inStock: true,
    featured: true,
    colors: ["Blanc/Rouge", "Noir/Blanc", "Bleu/Gris"],
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    rating: 4.5,
    reviews: 234
  },
  {
    id: 8,
    name: "Bottes en Cuir Classiques",
    description: "Bottes élégantes en cuir véritable pour un look sophistiqué en toute occasion.",
    price: 189.99,
    originalPrice: 229.99,
    image: "https://via.placeholder.com/400x400/92400E/FFFFFF?text=Bottes",
    category: "shoes",
    inStock: true,
    featured: false,
    colors: ["Marron", "Noir"],
    sizes: ["38", "39", "40", "41", "42", "43"],
    rating: 4.6,
    reviews: 98
  },

  // Bijoux
  {
    id: 9,
    name: "Collier Pendentif Or",
    description: "Collier délicat avec pendentif en or 18 carats et pierre précieuse naturelle.",
    price: 299.99,
    originalPrice: 399.99,
    image: "https://via.placeholder.com/400x400/F59E0B/FFFFFF?text=Collier",
    category: "jewelry",
    inStock: true,
    featured: true,
    colors: ["Or", "Or Rose"],
    sizes: ["45cm", "50cm"],
    rating: 4.9,
    reviews: 76
  },
  {
    id: 10,
    name: "Boucles d'Oreilles Diamant",
    description: "Boucles d'oreilles élégantes serties de diamants certifiés. Parfaites pour les occasions spéciales.",
    price: 449.99,
    originalPrice: 599.99,
    image: "https://via.placeholder.com/400x400/E5E7EB/000000?text=Boucles",
    category: "jewelry",
    inStock: true,
    featured: false,
    colors: ["Argent", "Or Blanc"],
    sizes: ["Unique"],
    rating: 4.8,
    reviews: 52
  },

  // Sacs
  {
    id: 11,
    name: "Sac à Main Cuir Premium",
    description: "Sac à main en cuir italien de première qualité avec finitions soignées et compartiments pratiques.",
    price: 249.99,
    originalPrice: 319.99,
    image: "https://via.placeholder.com/400x400/DC2626/FFFFFF?text=Sac",
    category: "bags",
    inStock: true,
    featured: true,
    colors: ["Rouge", "Noir", "Marron", "Beige"],
    sizes: ["Medium", "Large"],
    rating: 4.7,
    reviews: 142
  },
  {
    id: 12,
    name: "Sac de Voyage Résistant",
    description: "Sac de voyage spacieux et résistant avec roulettes et poignée télescopique.",
    price: 179.99,
    originalPrice: 219.99,
    image: "https://via.placeholder.com/400x400/374151/FFFFFF?text=Voyage",
    category: "bags",
    inStock: true,
    featured: false,
    colors: ["Noir", "Gris", "Bleu Marine"],
    sizes: ["55cm", "65cm", "75cm"],
    rating: 4.4,
    reviews: 87
  }
];

// Fonction pour obtenir les produits par catégorie
export const getProductsByCategory = (category) => {
  if (category === "all") {
    return products;
  }
  return products.filter(product => product.category === category);
};

// Fonction pour obtenir les produits en vedette
export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

// Fonction pour obtenir un produit par ID
export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

// Fonction pour rechercher des produits
export const searchProducts = (query) => {
  const searchTerm = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm)
  );
};

export default products;