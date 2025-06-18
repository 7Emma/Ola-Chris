import React, { useState, useEffect } from "react";
import client1 from "../assets/client/client1.jpeg";
import client2 from "../assets/client/client2.jpg";
import client3 from "../assets/client/client3.jpg";
import equipe1 from "../assets/equipe/equipe1.avif"
import equipe2 from "../assets/equipe/equipe2.jpg"
import equipe3 from "../assets/equipe/equipe3.jpg"
import equipe4 from "../assets/equipe/equipe4.jpg"
import photoAcceuil from '../assets/home.jpg'

import {
  Search,
  Star,
  Clock,
  Truck,
  Shield,
  Leaf,
  Award,
  MapPin,
} from "lucide-react";

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const categories = [
    {
      id: 1,
      name: "Fruits & Légumes",
      icon: "🍎",
      color: "bg-gradient-to-br from-green-100 to-green-200",
      items: "250+ produits",
    },
    {
      id: 2,
      name: "Produits Laitiers",
      icon: "🥛",
      color: "bg-gradient-to-br from-blue-100 to-blue-200",
      items: "120+ produits",
    },
    {
      id: 3,
      name: "Viandes & Poissons",
      icon: "🍗",
      color: "bg-gradient-to-br from-red-100 to-red-200",
      items: "80+ produits",
    },
    {
      id: 4,
      name: "Boulangerie",
      icon: "🥖",
      color: "bg-gradient-to-br from-yellow-100 to-yellow-200",
      items: "60+ produits",
    },
    {
      id: 5,
      name: "Épicerie",
      icon: "🥫",
      color: "bg-gradient-to-br from-purple-100 to-purple-200",
      items: "500+ produits",
    },
    {
      id: 6,
      name: "Surgelés",
      icon: "🧊",
      color: "bg-gradient-to-br from-cyan-100 to-cyan-200",
      items: "150+ produits",
    },
    {
      id: 7,
      name: "Boissons",
      icon: "🥤",
      color: "bg-gradient-to-br from-orange-100 to-orange-200",
      items: "200+ produits",
    },
    {
      id: 8,
      name: "Hygiène & Beauté",
      icon: "🧴",
      color: "bg-gradient-to-br from-pink-100 to-pink-200",
      items: "180+ produits",
    },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Pommes Golden Bio",
      price: 2.99,
      discount: 1.99,
      rating: 4.8,
      image: "🍎",
      badge: "Bio",
    },
    {
      id: 2,
      name: "Lait Bio Fermier 1L",
      price: 1.49,
      discount: 0.99,
      rating: 4.9,
      image: "🥛",
      badge: "Local",
    },
    {
      id: 3,
      name: "Pain Artisanal",
      price: 1.2,
      discount: 0.89,
      rating: 4.7,
      image: "🥖",
      badge: "Frais",
    },
    {
      id: 4,
      name: "Saumon Atlantique",
      price: 12.99,
      discount: 9.99,
      rating: 4.6,
      image: "🐟",
      badge: "Premium",
    },
    {
      id: 5,
      name: "Fromage de Chèvre",
      price: 4.5,
      discount: 3.2,
      rating: 4.8,
      image: "🧀",
      badge: "Artisan",
    },
    {
      id: 6,
      name: "Avocat Bio x3",
      price: 3.99,
      discount: 2.99,
      rating: 4.5,
      image: "🥑",
      badge: "Bio",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Marie Dubois",
      rating: 5,
      comment:
        "Service irréprochable ! Livraison rapide et produits toujours frais.",
      avatar: client1,
      location: "Cotonou",
    },
    {
      id: 2,
      name: "Jean Baptiste",
      rating: 5,
      comment:
        "La qualité des produits bio est exceptionnelle. Je recommande !",
      avatar: client2,
      location: "Porto-Novo",
    },
    {
      id: 3,
      name: "Fatima Kone",
      rating: 5,
      comment: "App très facile à utiliser. Mes courses en quelques clics !",
      avatar: client3,
      location: "Abomey-Calavi",
    },
  ];

  const services = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Livraison Express 30min",
      description: "Livraison ultra-rapide dans toute la ville",
      color: "text-green-600",
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "100% Bio & Local",
      description: "Produits certifiés bio et circuits courts",
      color: "text-emerald-600",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Garantie Fraîcheur",
      description: "Remboursé si pas satisfait de la fraîcheur",
      color: "text-blue-600",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Service Premium",
      description: "Support client 24/7 et livraison gratuite dès 25€",
      color: "text-purple-600",
    },
  ];

  const teamMembers = [
    {
      id: 1,
      name: "Olivier Martin",
      role: "Directeur Général",
      description: "15 ans d'expérience dans la grande distribution",
      avatar: equipe1,
    },
    {
      id: 2,
      name: "Christine Dubois",
      role: "Responsable Qualité",
      description: "Experte en sélection de produits frais et bio",
      avatar: equipe2,
    },
    {
      id: 3,
      name: "Marc Leroy",
      role: "Chef de Rayon",
      description: "Spécialiste des produits locaux et de saison",
      avatar: equipe3,
    },
    {
      id: 4,
      name: "Sarah Johnson",
      role: "Service Client",
      description: "Toujours à votre écoute pour vous conseiller",
      avatar: equipe4,
    },
  ];

  const backgroundImageUrl = "https://urlz.fr/uC6l";

  const slides = [
    {
      title: "Livraison Express en 30min",
      subtitle: "Vos courses fraîches livrées ultra-rapidement",
      buttonText: "Commander maintenant",
    },
    {
      title: "Produits Bio & Locaux",
      subtitle: "100% frais, 100% de qualité premium",
      buttonText: "Découvrir nos producteurs",
    },
    {
      title: "Promotion Flash -40%",
      subtitle: "Sur une sélection de fruits et légumes",
      buttonText: "Profiter des offres",
    },
  ];

  // Auto-carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero avec image de fond - CONSERVÉ */}
      <section
        className="relative h-[600px] bg-cover bg-center text-white flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: `url('${photoAcceuil}')` }}
      >
        {/* Overlay pour le carousel de texte */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Contenu du carousel */}
        <div className="relative z-10 text-center max-w-4xl px-4">
          <div className="transition-all duration-500 ease-in-out">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Bienvenue chez <span className="text-blue-400">Ola-Chris</span>{" "}
              <span className="text-green-400">Market</span>
            </h1>
            <div className="mb-8 min-h-[120px] flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-yellow-300">
                {slides[currentSlide].title}
              </h2>
              <p className="text-lg md:text-xl text-white/90">
                {slides[currentSlide].subtitle}
              </p>
            </div>
            <button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-2xl">
              {slides[currentSlide].buttonText}
            </button>
          </div>
        </div>

        {/* Indicateurs du carousel */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Barre de recherche prominente */}
      <section className="py-8 bg-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Recherchez parmi plus de 1500 produits..."
                className="w-full pl-12 pr-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition-all">
                Rechercher
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services premium avec design moderne */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              Pourquoi choisir Ola-Chris Market ?
            </h2>
            <p className="text-xl text-gray-600">
              Une expérience d'achat exceptionnelle à chaque commande
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white text-center p-8 rounded-3xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border border-white/50 backdrop-blur-sm"
              >
                <div
                  className={`inline-flex p-6 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 mb-6 ${service.color} shadow-lg`}
                >
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catégories avec effet moderne */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              Explorez nos catégories
            </h2>
            <p className="text-xl text-gray-600">
              Plus de 1500 produits frais et de qualité vous attendent
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`${category.color} p-6 md:p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center cursor-pointer transform hover:-translate-y-2 hover:rotate-1 group border border-white/50`}
              >
                <span className="text-4xl md:text-5xl mb-4 block group-hover:animate-bounce transform transition-transform duration-300">
                  {category.icon}
                </span>
                <h3 className="font-bold text-lg mb-2 text-gray-800">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 font-medium">
                  {category.items}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotions avec design premium */}
      <section className="py-16 bg-gradient-to-br from-gray-100 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-red-500 text-white px-6 py-2 rounded-full font-bold text-sm mb-4 animate-pulse">
              🔥 OFFRES FLASH
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              Promotions exceptionnelles
            </h2>
            <p className="text-xl text-gray-600">
              Économisez jusqu'à 40% sur une sélection de produits premium
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group"
              >
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-green-50 transition-all duration-300">
                    <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                      {product.image}
                    </span>
                  </div>
                  <div
                    className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg ${
                      product.badge === "Bio"
                        ? "bg-gradient-to-r from-green-500 to-green-600"
                        : product.badge === "Local"
                        ? "bg-gradient-to-r from-blue-500 to-blue-600"
                        : product.badge === "Frais"
                        ? "bg-gradient-to-r from-orange-500 to-orange-600"
                        : product.badge === "Premium"
                        ? "bg-gradient-to-r from-purple-500 to-purple-600"
                        : "bg-gradient-to-r from-indigo-500 to-indigo-600"
                    }`}
                  >
                    {product.badge}
                  </div>
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold shadow-lg">
                    -
                    {Math.round(
                      ((product.price - product.discount) / product.price) * 100
                    )}
                    %
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-xl mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>

                  <div className="flex items-center mb-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2 font-medium">
                      ({product.rating})
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <span className="text-green-600 font-bold text-2xl">
                        {product.discount}€
                      </span>
                      <span className="text-gray-400 line-through text-lg">
                        {product.price}€
                      </span>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white py-3 rounded-2xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    Ajouter au panier
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* À propos avec notre équipe */}
      <section className="py-16 bg-white">
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

          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Notre Équipe Passionnée
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 text-center transform hover:-translate-y-2 border border-gray-100"
                >
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-18 justify-center h-14 rounded-full object-cover mr-4"
                  />
                  <h4 className="text-xl font-bold mb-2 text-gray-800">
                    {member.name}
                  </h4>
                  <p className="text-blue-600 font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Nos valeurs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-3xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-6xl mb-6">🌍</div>
              <h4 className="text-2xl font-bold mb-4 text-green-700">
                Respect de l'Environnement
              </h4>
              <p className="text-gray-700 leading-relaxed">
                Nous privilégions les circuits courts, les emballages
                éco-responsables et soutenons l'agriculture durable pour
                préserver notre planète.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-3xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-6xl mb-6">⭐</div>
              <h4 className="text-2xl font-bold mb-4 text-blue-700">
                Qualité Premium
              </h4>
              <p className="text-gray-700 leading-relaxed">
                Chaque produit est soigneusement sélectionné par nos experts
                pour vous garantir fraîcheur, goût et qualité nutritionnelle
                exceptionnels.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-3xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-6xl mb-6">🤝</div>
              <h4 className="text-2xl font-bold mb-4 text-purple-700">
                Proximité Client
              </h4>
              <p className="text-gray-700 leading-relaxed">
                Votre satisfaction est notre priorité. Notre équipe est
                disponible pour vous conseiller et répondre à tous vos besoins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages clients */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              Ce que disent nos clients
            </h2>
            <p className="text-xl text-gray-600">
              Plus de 10,000 clients satisfaits nous font confiance chaque jour
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-lg text-gray-800">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 flex items-center text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {testimonial.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                <p className="text-gray-700 italic leading-relaxed">
                  "{testimonial.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter moderne */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-6xl mb-6 animate-bounce">📱</div>
            <h2 className="text-4xl font-bold mb-4">
              Restez connecté avec nous
            </h2>
            <p className="text-xl mb-8 text-white/90 leading-relaxed">
              Recevez nos offres exclusives, nouveautés et conseils nutrition
              directement dans votre boîte mail
            </p>

            <div className="flex flex-col sm:flex-row max-w-md mx-auto sm:max-w-2xl gap-4">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-grow px-6 py-4 rounded-2xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-white/30 text-lg shadow-lg"
              />
              <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg">
                S'abonner
              </button>
            </div>

            <p className="text-sm text-white/70 mt-4">
              🔒 Pas de spam, vous pouvez vous désabonner à tout moment
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
