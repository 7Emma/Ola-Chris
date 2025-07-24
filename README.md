# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

Parfait ! Tu as déjà une base très solide et un plan clair — maintenant je vais t’aider à :

1. ✅ Réorganiser ton projet pour plus de lisibilité.
2. 📄 Mettre à jour ton `README.md` pour qu’il reflète bien cette structure et ce cahier des charges.

---
# 🛒 Ola Chris - Supermarché en ligne

Un site e-commerce moderne et responsive pour Ola Chris. L'utilisateur peut consulter, filtrer et acheter des produits en ligne. L’administration permet une gestion complète du stock, des commandes et des utilisateurs.

---

## 🧩 Fonctionnalités

- 🏠 Accueil avec promotions et nouveautés
- 🔍 Catalogue avec filtres et recherche
- 🛍️ Détail de produit, ajout au panier
- 🛒 Panier persisté (localStorage / context)
- ✅ Checkout sécurisé
- 👤 Authentification & gestion utilisateur
- 🔐 Dashboard admin (produits, commandes, utilisateurs)
- 📱 Responsive mobile-first
- 📦 Back-end API REST avec sécurité JWT

---

## 🛠️ Stack Technique

| Frontend              | Backend                 | Base de données        |
|-----------------------|-------------------------|------------------------|
| React + Vite          | Node.js + Express       | MongoDB + Mongoose     |
| React Router DOM      | JWT + Bcrypt            |                        |
| TailwindCSS + Lucide  | CORS, cookie-parser     |                        |

---

## 📁 Structure du projet

```

ola-chris/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/               # Images et icônes
│   │   ├── components/
│   │   │   ├── layout/           # Header, Footer, Panier
│   │   │   └── ui/               # Composants UI : cartes, filtres
│   │   ├── context/              # AuthContext, CartContext
│   │   ├── data/                 # Données statiques (fictives)
│   │   ├── pages/
│   │   │   ├── users/            # Login, Register
│   │   │   ├── products/         # Produits & détails
│   │   │   ├── cart/             # Panier, Checkout
│   │   │   └── misc/             # About, Contact, Home, Offer
│   │   ├── routes/               # AppRoutes.jsx
│   │   ├── styles/               # index.css, tailwind config
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── backend/
│   ├── controllers/             # Logique métier
│   ├── models/                  # Mongoose models
│   ├── routes/                  # Routes Express
│   ├── middlewares/            # Authentification / erreurs
│   ├── config/                  # Connexion MongoDB
│   ├── server.js
│   └── .env
└── README.md

````

---

## 🚀 Lancer le projet localement

### 1. Cloner le repo

```bash
git clone https://github.com/votre-utilisateur/ola-chris.git
cd ola-chris
````

### 2. Lancer le frontend

```bash
cd frontend
npm install
npm run dev
```

### 3. Lancer le backend

```bash
cd backend
npm install
npm run dev
```

### 4. Visiter

[http://localhost:5173](http://localhost:5173)

---

## 🧪 Scripts utiles

| Commande        | Description          |
| --------------- | -------------------- |
| `npm run dev`   | Démarrer serveur dev |
| `npm run build` | Construire le projet |
| `npm run start` | Lancer serveur prod  |
| `npm run lint`  | Linter le code       |

---

## 🤝 Contribution

1. Forkez le projet
2. Créez une branche : `git checkout -b feature/NouvelleFonction`
3. Commit : `git commit -m "Ajout fonction"`
4. Push : `git push origin feature/NouvelleFonction`
5. Ouvrez une Pull Request

---

## 📩 Contact

**Ola Chris Team** - \[[email@example.com](mailto:email@example.com)]
Lien GitHub : [https://github.com/kpego/ola-chris](https://github.com/kpego/ola-chris)

---

## ⚖️ Licence

Ce projet est sous licence MIT.

```
