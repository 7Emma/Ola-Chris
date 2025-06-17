# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Ola Chris Website

Un site web moderne et responsive pour Ola Chris, construit avec Next.js et Tailwind CSS.

## Fonctionnalités

- 🏠 Page d'accueil attractive
- 🛍️ Catalogue de produits avec filtres
- 🛒 Système de panier d'achat
- 📱 Design responsive
- 🎨 Interface utilisateur moderne
- ⚡ Performance optimisée avec Next.js

## Technologies utilisées

- **Next.js 14** - Framework React pour la production
- **React 18** - Bibliothèque JavaScript pour l'interface utilisateur
- **Tailwind CSS** - Framework CSS utilitaire
- **Lucide React** - Icônes modernes
- **TypeScript** - Typage statique pour JavaScript

## Installation

1. Clonez le repository :

```bash
git clone [url-du-repo]
cd ola-chris-website
```

2. Installez les dépendances :

```bash
npm install
# ou
yarn install
```

3. Lancez le serveur de développement :

```bash
npm run dev
# ou
yarn dev
```

4. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── CategoryFilter.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   └── ProductCard.jsx
├── context/            # Contexte React (état global)
│   └── CartContext.jsx
├── data/              # Données statiques
│   ├── categories.js
│   └── products.js
├── pages/             # Pages de l'application
│   ├── About.jsx
│   ├── Cart.jsx
│   ├── Contact.jsx
│   ├── Home.jsx
│   ├── Offer.jsx
│   ├── Products.jsx
│   └── ProductsDetails.jsx
├── routes/            # Configuration des routes
│   └── AppRoutes.jsx
└── styles/            # Styles CSS
    ├── App.jsx
    ├── index.css
    └── main.jsx
```

## Scripts disponibles

- `yarn run dev` - Lance le serveur de développement
- `yarn run build` - Construit l'application pour la production
- `yarn run start` - Lance l'application en mode production
- `yarn run lint` - Vérifie la qualité du code

## Contribution

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## Contact

Ola Chris - [email@example.com]

Lien du projet : [https://github.com/kpego/ola-chris-website]
