// products.js - Données des produits du supermarché
import bio from "../assets/picture-pro/bio.jpeg";
import tomates from "../assets/picture-pro/tomate.webp";
import baguette from "../assets/picture-pro/baguette.jpeg";
import camembert from "../assets/picture-pro/camembert.jpeg";
import saumon from "../assets/picture-pro/saumon.webp";
import lait from "../assets/picture-pro/lait.webp";
import porc from "../assets/picture-pro/porc.jpeg";
import crevettes from "../assets/picture-pro/crevettes.webp";
import jambon from "../assets/picture-pro/jambon.jpeg";
import pomme from "../assets/picture-pro/pomme.webp";
import chocolat from "../assets/picture-pro/chocolat.webp";
import olive from "../assets/picture-pro/olive.webp";
import miel from "../assets/picture-pro/miel.jpeg";
import legume from "../assets/picture-pro/legume.jpeg";
import croissant from "../assets/picture-pro/croissant.jpeg";
import spaghetti from "../assets/picture-pro/spaghetti.webp";
import jusOrange from "../assets/picture-pro/jusOrange.jpeg";
import eau from "../assets/picture-pro/eau.jpeg";
import glace from "../assets/picture-pro/glace.jpeg";
import dentifrice from "../assets/picture-pro/dentifrice.jpeg";
import gel from "../assets/picture-pro/gel.jpeg";
import couscous from "../assets/picture-pro/couscous.jpeg";
import cassoulet from "../assets/picture-pro/cassoulet.jpeg";
import riz from "../assets/picture-pro/riz.jpeg";

export const products = [
  // Fruits & Légumes (categoryId: 1)
  {
    _id: "1",
    name: "Bananes bio",
    categoryId: 1,
    price: 2400,
    originalPrice: 2.99,
    unit: "kg",
    quantity: 1,
    stock: 25,
    image: bio,
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
      fiber: 2.6,
    },
    features: ["Bio", "Commerce équitable", "Riche en potassium"],
  },
  {
    _id: "2",
    name: "Tomates cerises",
    categoryId: 1,
    price: 3900,
    unit: "barquette 250g",
    quantity: 1,
    stock: 15,
    image: tomates,
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
      fiber: 1.2,
    },
    features: ["Origine France", "Goût sucré", "Sans pesticides"],
  },
  {
    _id: "3",
    name: "Pommes Gala",
    categoryId: 1,
    price: 5950,
    unit: "kg",
    quantity: 1,
    stock: 30,
    image: pomme,
    description: "Pommes Gala croquantes et sucrées",
    brand: "Vergers du Sud",
    origin: "France",
    rating: 4.4,
    reviewCount: 156,
    features: ["Croquantes", "Sucrées", "Origine France"],
  },

  // Boucherie & Charcuterie (categoryId: 2)
  {
    _id: "4",
    name: "Escalope de porc",
    categoryId: 2,
    price: 8.99,
    unit: "kg",
    quantity: 1,
    stock: 12,
    image: porc,
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
      fiber: 0,
    },
    features: ["Viande française", "Tendre", "Élevage traditionnel"],
  },
  {
    _id: "5",
    name: "Jambon blanc",
    categoryId: 2,
    price: 15000,
    unit: "kg",
    quantity: 1,
    stock: 8,
    image: jambon,
    description: "Jambon blanc supérieur, tranché fin",
    brand: "Charcuterie Artisanale",
    origin: "France",
    rating: 4.7,
    reviewCount: 94,
    features: ["Artisanal", "Sans nitrites", "Goût authentique"],
  },

  // Poissonnerie (categoryId: 3)
  {
    _id: "6",
    name: "Saumon atlantique",
    categoryId: 3,
    price: 2200,
    unit: "kg",
    quantity: 1,
    stock: 6,
    image: saumon,
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
      fiber: 0,
    },
    features: ["Riche en oméga-3", "Pêche durable", "Fraîcheur garantie"],
  },
  {
    _id: "7",
    name: "Crevettes roses",
    categoryId: 3,
    price: 18050,
    unit: "kg",
    quantity: 1,
    stock: 10,
    image: crevettes,
    description: "Crevettes roses cuites, prêtes à consommer",
    brand: "Océan Bleu",
    origin: "Madagascar",
    rating: 4.5,
    reviewCount: 45,
    features: ["Cuites", "Prêtes à consommer", "Pêche responsable"],
  },

  // Produits Laitiers (categoryId: 4)
  {
    _id: "8",
    name: "Lait demi-écrémé",
    categoryId: 4,
    price: 1250,
    unit: "litre",
    quantity: 1,
    stock: 50,
    image: lait,
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
      fiber: 0,
    },
    features: ["Source de calcium", "UHT", "Origine France"],
  },
  {
    _id: "9",
    name: "Camembert de Normandie",
    categoryId: 4,
    price: 3490,
    unit: "pièce 250g",
    quantity: 1,
    stock: 18,
    image: camembert,
    description: "Camembert de Normandie AOP au lait cru",
    brand: "Président",
    origin: "Normandie",
    rating: 4.6,
    reviewCount: 112,
    features: ["AOP", "Lait cru", "Affinage traditionnel"],
  },

  // Boulangerie & Pâtisserie (categoryId: 5)
  {
    _id: "10",
    name: "Baguette tradition",
    categoryId: 5,
    price: 1200,
    unit: "pièce",
    quantity: 1,
    stock: 40,
    image: baguette,
    description: "Baguette tradition française, croustillante",
    brand: "Boulangerie Artisanale",
    origin: "France",
    rating: 4.7,
    reviewCount: 89,
    features: ["Tradition française", "Croustillante", "Artisanale"],
  },
  {
    _id: "11",
    name: "Croissants pur beurre",
    categoryId: 5,
    price: 4500,
    unit: "lot de 6",
    quantity: 1,
    stock: 20,
    image: croissant,
    description: "Croissants pur beurre, feuilletage artisanal",
    brand: "Pâtisserie Française",
    origin: "France",
    rating: 4.8,
    reviewCount: 156,
    features: ["Pur beurre", "Feuilletage artisanal", "Viennoiserie française"],
  },

  // Épicerie Salée (categoryId: 6)
  {
    _id: "12",
    name: "Pâtes spaghetti",
    categoryId: 6,
    price: 1890,
    unit: "paquet 500g",
    quantity: 1,
    stock: 60,
    image: spaghetti,
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
      fiber: 3,
    },
    features: ["Qualité supérieure", "Cuisson parfaite", "Tradition italienne"],
  },
  {
    _id: "13",
    name: "Huile d'olive extra vierge",
    categoryId: 6,
    price: 6990,
    unit: "bouteille 500ml",
    quantity: 1,
    stock: 25,
    image: olive,
    description: "Huile d'olive extra vierge première pression à froid",
    brand: "Puget",
    origin: "Espagne",
    rating: 4.5,
    reviewCount: 178,
    features: ["Extra vierge", "Première pression à froid", "Goût fruité"],
  },

  // Épicerie Sucrée (categoryId: 7)
  {
    _id: "14",
    name: "Chocolat noir 70%",
    categoryId: 7,
    price: 2390,
    unit: "tablette 100g",
    quantity: 1,
    stock: 35,
    image: chocolat,
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
      fiber: 16,
    },
    features: ["70% cacao", "Intense", "Antioxydants"],
  },
  {
    _id: "15",
    name: "Miel d'acacia",
    categoryId: 7,
    price: 4600,
    unit: "pot 250g",
    quantity: 1,
    stock: 22,
    image: miel,
    description: "Miel d'acacia liquide et doux",
    brand: "Lune de Miel",
    origin: "France",
    rating: 4.7,
    reviewCount: 98,
    features: ["Liquide", "Goût doux", "Origine France"],
  },

  // Boissons (categoryId: 8)
  {
    _id: "16",
    name: "Eau minérale naturelle",
    categoryId: 8,
    price: 7500,
    unit: "pack 6x1.5L",
    quantity: 1,
    stock: 80,
    image: eau,
    description: "Eau minérale naturelle des Alpes",
    brand: "Évian",
    origin: "France",
    rating: 4.3,
    reviewCount: 267,
    features: ["Minérale naturelle", "Source des Alpes", "Équilibrée"],
  },
  {
    _id: "17",
    name: "Jus d'orange pressé",
    categoryId: 8,
    price: 3300,
    unit: "bouteille 1L",
    quantity: 1,
    stock: 28,
    image: jusOrange,
    description: "Jus d'orange 100% pur jus sans sucre ajouté",
    brand: "Tropicana",
    origin: "Espagne",
    rating: 4.4,
    reviewCount: 134,
    features: ["100% pur jus", "Sans sucre ajouté", "Vitamine C"],
  },

  // Surgelés (categoryId: 9)
  {
    _id: "18",
    name: "Légumes pour wok",
    categoryId: 9,
    price: 9800,
    unit: "sach5et 750g",
    quantity: 1,
    stock: 45,
    image: legume,
    description: "Mélange de légumes asiatiques surgelés",
    brand: "Picard",
    origin: "Asie",
    rating: 4.2,
    reviewCount: 76,
    features: ["Prêt en 5 minutes", "Mélange asiatique", "Sans conservateurs"],
  },
  {
    _id: "19",
    name: "Glace vanille",
    categoryId: 9,
    price: 1800,
    unit: "bac 1L",
    quantity: 1,
    stock: 20,
    image: glace,
    description: "Glace à la vanille de Madagascar artisanale",
    brand: "Häagen-Dazs",
    origin: "France",
    rating: 4.8,
    reviewCount: 189,
    features: ["Vanille de Madagascar", "Artisanale", "Texture crémeuse"],
  },

  // Hygiène & Beauté (categoryId: 10)
  {
    _id: "20",
    name: "Dentifrice blancheur",
    categoryId: 10,
    price: 3490,
    unit: "tube 75ml",
    quantity: 1,
    stock: 40,
    image: dentifrice,
    description: "Dentifrice blancheur protection complète",
    brand: "Signal",
    origin: "France",
    rating: 4.1,
    reviewCount: 156,
    features: ["Blancheur", "Protection complète", "Fluor"],
  },
  {
    _id: "21",
    name: "Gel douche hydratant",
    categoryId: 10,
    price: 2990,
    unit: "flacon 250ml",
    quantity: 1,
    stock: 55,
    image: gel,
    description: "Gel douche hydratant à l'huile d'argan",
    brand: "Dove",
    origin: "France",
    rating: 4.3,
    reviewCount: 234,
    features: ["Hydratant", "Huile d'argan", "Peau douce"],
  },
  {
    _id: "22",
    name: "Riz parfumé",
    categoryId: 10,
    price: 2890,
    unit: "sachet 1kg",
    quantity: 1,
    stock: 120,
    image: riz,
    description:
      "Riz parfumé de qualité supérieure, idéal pour les plats asiatiques",
    brand: "Tropical",
    origin: "Thaïlande",
    rating: 4.6,
    reviewCount: 152,
    features: ["Parfumé", "Long grain", "Cuisson rapide"],
  },
  {
    _id: "23",
    name: "Cassoulet",
    categoryId: 10,
    price: 3500,
    unit: "boîte 400g",
    quantity: 1,
    stock: 30,
    image: cassoulet,
    description: "Cassoulet traditionnel aux haricots blancs et saucisse",
    brand: "William Saurin",
    origin: "France",
    rating: 4.1,
    reviewCount: 89,
    features: ["Plat cuisiné", "Rapide", "Riche en protéines"],
  },
  {
    _id: "24",
    name: "Couscous",
    categoryId: 10,
    price: 2700,
    unit: "paquet 1kg",
    quantity: 1,
    stock: 60,
    image: couscous,
    description: "Couscous moyen, parfait pour les tajines et plats maghrébins",
    brand: "Tipiak",
    origin: "Maroc",
    rating: 4.4,
    reviewCount: 112,
    features: ["Rapide à cuire", "Texture légère", "Accompagne tous les plats"],
  },
];

// Fonctions utilitaires pour les produits
export const getProductById = (_id) => {
  return products.find((product) => product._id === _id);
};

export const getProductsByCategory = (categoryId) => {
  return products.filter((product) => product.categoryId === categoryId);
};

export const getAllProducts = () => {
  return products;
};

export const searchProducts = (query) => {
  const searchTerm = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.brand.toLowerCase().includes(searchTerm)
  );
};

export const getProductsWithDiscount = () => {
  return products.filter((product) => product.discount > 0);
};

export const getFeaturedProducts = () => {
  return products.filter((product) => product.rating >= 4.5);
};

export default products;
