import React from "react";

function Home() {
  const categories = [
    { id: 1, name: "Fruits & Légumes", icon: "🍎", color: "bg-green-100" },
    { id: 2, name: "Produits Laitiers", icon: "🥛", color: "bg-blue-100" },
    { id: 3, name: "Viandes & Poissons", icon: "🍗", color: "bg-green-100" },
    { id: 4, name: "Boulangerie", icon: "🥖", color: "bg-blue-100" },
  ];

  const promotions = [
    { id: 1, name: "Pommes Golden", price: 2.99, discount: 1.99 },
    { id: 2, name: "Lait Bio 1L", price: 1.49, discount: 0.99 },
    { id: 3, name: "Pain complet", price: 1.2, discount: 0.89 },
  ];

  const teamMembers = [
    {
      id: 1,
      name: "Olivier Martin",
      role: "Directeur Général",
      description: "15 ans d'expérience dans la grande distribution",
      avatar: "👨‍💼",
    },
    {
      id: 2,
      name: "Christine Dubois",
      role: "Responsable Qualité",
      description: "Experte en sélection de produits frais et bio",
      avatar: "👩‍🔬",
    },
    {
      id: 3,
      name: "Marc Leroy",
      role: "Chef de Rayon",
      description: "Spécialiste des produits locaux et de saison",
      avatar: "👨‍🍳",
    },
    {
      id: 4,
      name: "Sarah Johnson",
      role: "Service Client",
      description: "Toujours à votre écoute pour vous conseiller",
      avatar: "👩‍💻",
    },
  ];

  const services = [
    {
      icon: "🚚",
      title: "Livraison Rapide",
      description: "Livraison en 2h dans toute la ville",
    },
    {
      icon: "🌱",
      title: "Produits Bio",
      description: "Une large sélection de produits biologiques certifiés",
    },
    {
      icon: "🏪",
      title: "Produits Locaux",
      description: "Partenariat avec les producteurs de la région",
    },
    {
      icon: "💳",
      title: "Paiement Sécurisé",
      description: "Transactions 100% sécurisées et garanties",
    },
  ];

  const backgroundImageUrl = "https://urlz.fr/uC6l";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero avec image de fond */}
      <section
        className="h-[500px] bg-cover bg-center text-white flex items-center justify-center"
        style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
      >
        <div className="bg-black/50 p-6 rounded-lg text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Bienvenue chez <span className="text-blue-400">Ola-Chris</span>{" "}
            <span className="text-green-400">Market</span>
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Vos courses en ligne, livrées rapidement à votre porte
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold transition-colors">
            Commencer mes courses
          </button>
        </div>
      </section>

      {/* À propos de nous */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">
              À propos d'Ola-Chris Market
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Depuis 2015, Ola-Chris Market révolutionne vos courses
              quotidiennes. Notre mission est simple : vous offrir les meilleurs
              produits frais, locaux et bio, directement livrés chez vous. Nous
              croyons en une alimentation de qualité, accessible à tous, tout en
              soutenant les producteurs locaux.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notre équipe */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">
              Notre Équipe Passionnée
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Rencontrez l'équipe dévouée qui travaille chaque jour pour vous
              garantir la meilleure expérience d'achat et des produits de
              qualité exceptionnelle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <div className="text-6xl mb-4">{member.avatar}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="py-16 bg-gradient-to-r from-green-100 to-blue-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12 text-gray-800">
            Nos Valeurs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-2xl font-bold mb-4 text-green-600">
                Respect de l'Environnement
              </h3>
              <p className="text-gray-600">
                Nous privilégions les circuits courts, les emballages
                éco-responsables et soutenons l'agriculture durable pour
                préserver notre planète.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="text-2xl font-bold mb-4 text-blue-600">
                Qualité Premium
              </h3>
              <p className="text-gray-600">
                Chaque produit est soigneusement sélectionné par nos experts
                pour vous garantir fraîcheur, goût et qualité nutritionnelle
                exceptionnels.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold mb-4 text-purple-600">
                Proximité Client
              </h3>
              <p className="text-gray-600">
                Votre satisfaction est notre priorité. Notre équipe est
                disponible pour vous conseiller et répondre à tous vos besoins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Catégories */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Nos Catégories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`${category.color} p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center cursor-pointer`}
              >
                <span className="text-4xl mb-2 block">{category.icon}</span>
                <h3 className="font-medium">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotions */}
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Promotions du moment</h2>
            <a href="#" className="text-blue-600 hover:underline">
              Voir tout
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {promotions.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow p-4"
              >
                <div className="h-40 bg-gray-200 mb-4 flex items-center justify-center">
                  <span className="text-6xl">🛒</span>
                </div>
                <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                <div className="flex items-center">
                  <span className="text-green-600 font-bold text-xl mr-2">
                    {product.discount}€
                  </span>
                  <span className="text-gray-400 line-through text-sm">
                    {product.price}€
                  </span>
                </div>
                <button className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-full transition-colors">
                  Ajouter au panier
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 bg-green-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Recevez nos offres spéciales
          </h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Abonnez-vous à notre newsletter pour ne rien manquer
          </p>

          <div className="flex flex-col sm:flex-row max-w-md mx-auto sm:max-w-xl">
            <input
              type="email"
              placeholder="Votre email"
              className="flex-grow px-4 py-3 rounded-l-full sm:rounded-r-none rounded-r-full mb-2 sm:mb-0 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-r-full sm:rounded-l-none rounded-l-full font-bold transition-colors">
              S'abonner
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
