// products.js - Données des produits du supermarché

export const products = [
  // Fruits & Légumes (categoryId: 1)
  {
    id: 1,
    name: "Bananes bio",
    categoryId: 1,
    price: 2.49,
    originalPrice: 2.99,
    unit: "kg",
    quantity: 1,
    stock: 25,
    image: "/images/bananes.jpg",
    description: "Bananes biologiques du Costa Rica, riches en potassium",
    brand: "Bio Nature",
    origin: "Costa Rica",
    rating: 4.5,
    reviewCount: 128,
    discount: 15,
    nutritionalInfo: {
      calories: 89,
      carbs: 23,
      protein: 1.1,
      fat: 0.3,
      fiber: 2.6
    },
    features: ["Bio", "Commerce équitable", "Riche en potassium"]
  },
  {
    id: 2,
    name: "Tomates cerises",
    categoryId: 1,
    price: 3.99,
    unit: "barquette 250g",
    quantity: 1,
    stock: 15,
    image: "/images/tomates-cerises.jpg",
    description: "Tomates cerises sucrées, parfaites pour les salades",
    brand: "Jardin Frais",
    origin: "France",
    rating: 4.3,
    reviewCount: 89,
    nutritionalInfo: {
      calories: 18,
      carbs: 3.9,
      protein: 0.9,
      fat: 0.2,
      fiber: 1.2
    },
    features: ["Origine France", "Goût sucré", "Sans pesticides"]
  },
  {
    id: 3,
    name: "Pommes Gala",
    categoryId: 1,
    price: 2.99,
    unit: "kg",
    quantity: 1,
    stock: 30,
    image: "/images/pommes-gala.jpg",
    description: "Pommes Gala croquantes et sucrées",
    brand: "Vergers du Sud",
    origin: "France",
    rating: 4.4,
    reviewCount: 156,
    features: ["Croquantes", "Sucrées", "Origine France"]
  },

  // Boucherie & Charcuterie (categoryId: 2)
  {
    id: 4,
    name: "Escalope de porc",
    categoryId: 2,
    price: 8.99,
    unit: "kg",
    quantity: 1,
    stock: 12,
    image: "/images/escalope-porc.jpg",
    description: "Escalopes de porc tendres, idéales pour la poêle",
    brand: "Boucherie Française",
    origin: "France",
    rating: 4.6,
    reviewCount: 73,
    nutritionalInfo: {
      calories: 242,
      carbs: 0,
      protein: 27,
      fat: 14,
      fiber: 0
    },
    features: ["Viande française", "Tendre", "Élevage traditionnel"]
  },
  {
    id: 5,
    name: "Jambon blanc",
    categoryId: 2,
    price: 15.90,
    unit: "kg",
    quantity: 1,
    stock: 8,
    image: "/images/jambon-blanc.jpg",
    description: "Jambon blanc supérieur, tranché fin",
    brand: "Charcuterie Artisanale",
    origin: "France",
    rating: 4.7,
    reviewCount: 94,
    features: ["Artisanal", "Sans nitrites", "Goût authentique"]
  },

  // Poissonnerie (categoryId: 3)
  {
    id: 6,
    name: "Saumon atlantique",
    categoryId: 3,
    price: 22.90,
    unit: "kg",
    quantity: 1,
    stock: 6,
    image: "/images/saumon-atlantique.jpg",
    description: "Saumon atlantique frais, riche en oméga-3",
    brand: "Pêche Fraîche",
    origin: "Norvège",
    rating: 4.8,
    reviewCount: 67,
    nutritionalInfo: {
      calories: 208,
      carbs: 0,
      protein: 20,
      fat: 13,
      fiber: 0
    },
    features: ["Riche en oméga-3", "Pêche durable", "Fraîcheur garantie"]
  },
  {
    id: 7,
    name: "Crevettes roses",
    categoryId: 3,
    price: 18.50,
    unit: "kg",
    quantity: 1,
    stock: 10,
    image: "/images/crevettes-roses.jpg",
    description: "Crevettes roses cuites, prêtes à consommer",
    brand: "Océan Bleu",
    origin: "Madagascar",
    rating: 4.5,
    reviewCount: 45,
    features: ["Cuites", "Prêtes à consommer", "Pêche responsable"]
  },

  // Produits Laitiers (categoryId: 4)
  {
    id: 8,
    name: "Lait demi-écrémé",
    categoryId: 4,
    price: 1.25,
    unit: "litre",
    quantity: 1,
    stock: 50,
    image: "/images/lait-demi-ecreme.jpg",
    description: "Lait demi-écrémé UHT, source de calcium",
    brand: "Lactel",
    origin: "France",
    rating: 4.2,
    reviewCount: 234,
    nutritionalInfo: {
      calories: 46,
      carbs: 4.8,
      protein: 3.2,
      fat: 1.6,
      fiber: 0
    },
    features: ["Source de calcium", "UHT", "Origine France"]
  },
  {
    id: 9,
    name: "Camembert de Normandie",
    categoryId: 4,
    price: 3.49,
    unit: "pièce 250g",
    quantity: 1,
    stock: 18,
    image: "/images/camembert-normandie.jpg",
    description: "Camembert de Normandie AOP au lait cru",
    brand: "Président",
    origin: "Normandie",
    rating: 4.6,
    reviewCount: 112,
    features: ["AOP", "Lait cru", "Affinage traditionnel"]
  },

  // Boulangerie & Pâtisserie (categoryId: 5)
  {
    id: 10,
    name: "Baguette tradition",
    categoryId: 5,
    price: 1.20,
    unit: "pièce",
    quantity: 1,
    stock: 40,
    image: "/images/baguette-tradition.jpg",
    description: "Baguette tradition française, croustillante",
    brand: "Boulangerie Artisanale",
    origin: "France",
    rating: 4.7,
    reviewCount: 89,
    features: ["Tradition française", "Croustillante", "Artisanale"]
  },
  {
    id: 11,
    name: "Croissants pur beurre",
    categoryId: 5,
    price: 4.50,
    unit: "lot de 6",
    quantity: 1,
    stock: 20,
    image: "/images/croissants-pur-beurre.jpg",
    description: "Croissants pur beurre, feuilletage artisanal",
    brand: "Pâtisserie Française",
    origin: "France",
    rating: 4.8,
    reviewCount: 156,
    features: ["Pur beurre", "Feuilletage artisanal", "Viennoiserie française"]
  },

  // Épicerie Salée (categoryId: 6)
  {
    id: 12,
    name: "Pâtes spaghetti",
    categoryId: 6,
    price: 1.89,
    unit: "paquet 500g",
    quantity: 1,
    stock: 60,
    image: "/images/pates-spaghetti.jpg",
    description: "Spaghetti n°5 de qualité supérieure",
    brand: "Barilla",
    origin: "Italie",
    rating: 4.4,
    reviewCount: 203,
    nutritionalInfo: {
      calories: 371,
      carbs: 74,
      protein: 13,
      fat: 1.5,
      fiber: 3
    },
    features: ["Qualité supérieure", "Cuisson parfaite", "Tradition italienne"]
  },
  {
    id: 13,
    name: "Huile d'olive extra vierge",
    categoryId: 6,
    price: 6.99,
    unit: "bouteille 500ml",
    quantity: 1,
    stock: 25,
    image: "/images/huile-olive-extra-vierge.jpg",
    description: "Huile d'olive extra vierge première pression à froid",
    brand: "Puget",
    origin: "Espagne",
    rating: 4.5,
    reviewCount: 178,
    features: ["Extra vierge", "Première pression à froid", "Goût fruité"]
  },

  // Épicerie Sucrée (categoryId: 7)
  {
    id: 14,
    name: "Chocolat noir 70%",
    categoryId: 7,
    price: 2.99,
    unit: "tablette 100g",
    quantity: 1,
    stock: 35,
    image: "/images/chocolat-noir-70.jpg",
    description: "Chocolat noir intense 70% de cacao",
    brand: "Lindt",
    origin: "Suisse",
    rating: 4.6,
    reviewCount: 142,
    nutritionalInfo: {
      calories: 598,
      carbs: 24,
      protein: 12,
      fat: 50,
      fiber: 16
    },
    features: ["70% cacao", "Intense", "Antioxydants"]
  },
  {
    id: 15,
    name: "Miel d'acacia",
    categoryId: 7,
    price: 4.99,
    unit: "pot 250g",
    quantity: 1,
    stock: 22,
    image: "/images/miel-acacia.jpg",
    description: "Miel d'acacia liquide et doux",
    brand: "Lune de Miel",
    origin: "France",
    rating: 4.7,
    reviewCount: 98,
    features: ["Liquide", "Goût doux", "Origine France"]
  },

  // Boissons (categoryId: 8)
  {
    id: 16,
    name: "Eau minérale naturelle",
    categoryId: 8,
    price: 2.49,
    unit: "pack 6x1.5L",
    quantity: 1,
    stock: 80,
    image: "/images/eau-minerale-naturelle.jpg",
    description: "Eau minérale naturelle des Alpes",
    brand: "Évian",
    origin: "France",
    rating: 4.3,
    reviewCount: 267,
    features: ["Minérale naturelle", "Source des Alpes", "Équilibrée"]
  },
  {
    id: 17,
    name: "Jus d'orange pressé",
    categoryId: 8,
    price: 3.29,
    unit: "bouteille 1L",
    quantity: 1,
    stock: 28,
    image: "/images/jus-orange-presse.jpg",
    description: "Jus d'orange 100% pur jus sans sucre ajouté",
    brand: "Tropicana",
    origin: "Espagne",
    rating: 4.4,
    reviewCount: 134,
    features: ["100% pur jus", "Sans sucre ajouté", "Vitamine C"]
  },

  // Surgelés (categoryId: 9)
  {
    id: 18,
    name: "Légumes pour wok",
    categoryId: 9,
    price: 2.99,
    unit: "sachet 750g",
    quantity: 1,
    stock: 45,
    image: "/images/legumes-wok-surgeles.jpg",
    description: "Mélange de légumes asiatiques surgelés",
    brand: "Picard",
    origin: "Asie",
    rating: 4.2,
    reviewCount: 76,
    features: ["Prêt en 5 minutes", "Mélange asiatique", "Sans conservateurs"]
  },
  {
    id: 19,
    name: "Glace vanille",
    categoryId: 9,
    price: 4.99,
    unit: "bac 1L",
    quantity: 1,
    stock: 20,
    image: "/images/glace-vanille.jpg",
    description: "Glace à la vanille de Madagascar artisanale",
    brand: "Häagen-Dazs",
    origin: "France",
    rating: 4.8,
    reviewCount: 189,
    features: ["Vanille de Madagascar", "Artisanale", "Texture crémeuse"]
  },

  // Hygiène & Beauté (categoryId: 10)
  {
    id: 20,
    name: "Dentifrice blancheur",
    categoryId: 10,
    price: 3.49,
    unit: "tube 75ml",
    quantity: 1,
    stock: 40,
    image: "/images/dentifrice-blancheur.jpg",
    description: "Dentifrice blancheur protection complète",
    brand: "Signal",
    origin: "France",
    rating: 4.1,
    reviewCount: 156,
    features: ["Blancheur", "Protection complète", "Fluor"]
  },
  {
    id: 21,
    name: "Gel douche hydratant",
    categoryId: 10,
    price: 2.99,
    unit: "flacon 250ml",
    quantity: 1,
    stock: 55,
    image: "/images/gel-douche-hydratant.jpg",
    description: "Gel douche hydratant à l'huile d'argan",
    brand: "Dove",
    origin: "France",
    rating: 4.3,
    reviewCount: 234,
    features: ["Hydratant", "Huile d'argan", "Peau douce"]
  }
];

// Fonctions utilitaires pour les produits
export const getProductById = (id) => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (categoryId) => {
  return products.filter(product => product.categoryId === categoryId);
};

export const getAllProducts = () => {
  return products;
};

export const searchProducts = (query) => {
  const searchTerm = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.brand.toLowerCase().includes(searchTerm)
  );
};

export const getProductsWithDiscount = () => {
  return products.filter(product => product.discount > 0);
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.rating >= 4.5);
};

export default products;