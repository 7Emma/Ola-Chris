import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Target,
  Eye,
  Heart,
  BookOpen,
  TrendingUp,
  ShoppingCart,
  Users,
  Star,
  MapPin,
  Award,
  Clock,
  Truck,
  Shield,
  Leaf,
  Globe,
  Building,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  Zap,
  PieChart,
  BarChart,
  Briefcase,
  Handshake,
  Coffee,
  Camera,
  PlayCircle,
} from "lucide-react";

function About() {
  const [activeTab, setActiveTab] = useState("overview");
  const backgroundImageUrl = "https://urlz.fr/uC77";

  const stats = [
    {
      icon: Users,
      value: "+3 500",
      label: "clients fidèles",
      growth: "+75% depuis 2023",
    },
    {
      icon: ShoppingCart,
      value: "+850",
      label: "références produits",
      growth: "+70% en 2 ans",
    },
    {
      icon: MapPin,
      value: "5 villes",
      label: "implantations",
      growth: "Expansion continue",
    },
    {
      icon: Truck,
      value: "48h",
      label: "livraison max",
      growth: "Service premium",
    },
    {
      icon: Building,
      value: "150",
      label: "emplois créés",
      growth: "+50 en 2024",
    },
    {
      icon: Globe,
      value: "25",
      label: "fournisseurs locaux",
      growth: "Partenariat durable",
    },
  ];

  const values = [
    {
      icon: Star,
      title: "Excellence Produits",
      desc: "Sélection rigoureuse et qualité garantie",
      details:
        "Contrôle qualité quotidien, traçabilité complète, certifications sanitaires",
    },
    {
      icon: Heart,
      title: "Proximité Client",
      desc: "Relations humaines au cœur de notre service",
      details: "Équipe formée, service personnalisé, écoute active des besoins",
    },
    {
      icon: Shield,
      title: "Transparence",
      desc: "Prix justes et informations claires",
      details: "Étiquetage complet, origine des produits, prix compétitifs",
    },
    {
      icon: Leaf,
      title: "Responsabilité",
      desc: "Engagement environnemental et social",
      details:
        "Produits locaux, réduction des déchets, soutien aux producteurs",
    },
  ];

  const milestones = [
    {
      year: "2022",
      title: "Création",
      desc: "Ouverture du premier magasin à Cotonou",
      icon: Calendar,
    },
    {
      year: "2023",
      title: "Expansion",
      desc: "3 nouvelles ouvertures, +1000 clients",
      icon: TrendingUp,
    },
    {
      year: "2024",
      title: "Innovation",
      desc: "Livraison à domicile et service premium",
      icon: Zap,
    },
    {
      year: "2025",
      title: "Leadership",
      desc: "Référence régionale en grande distribution",
      icon: Award,
    },
  ];

  const services = [
    {
      icon: Truck,
      title: "Livraison Rapide",
      desc: "Livraison en 24-48h dans toute la région",
    },
    {
      icon: Clock,
      title: "Horaires Étendus",
      desc: "Ouvert 7j/7 de 7h à 22h pour votre confort",
    },
    {
      icon: Shield,
      title: "Garantie Fraîcheur",
      desc: "Produits frais garantis ou remboursés",
    },
    {
      icon: Coffee,
      title: "Espace Détente",
      desc: "Café et restauration rapide sur place",
    },
  ];

  const marketData = [
    {
      label: "Croissance du marché béninois",
      value: "+8.5%",
      desc: "Croissance annuelle du secteur",
    },
    {
      label: "Population urbaine",
      value: "47%",
      desc: "Clientèle cible en expansion",
    },
    { label: "Pouvoir d'achat", value: "+12%", desc: "Augmentation en 3 ans" },
    {
      label: "Commerce moderne",
      value: "15%",
      desc: "Part de marché en croissance",
    },
  ];

  const TabButton = ({ id, title, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
        isActive
          ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      {title}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Section Bannière Hero */}
      <section
        className="relative h-[800px] bg-cover bg-center flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>

        <div className="relative z-10 text-center max-w-4xl px-6">
          <div className="backdrop-blur-sm bg-white/10 p-12 rounded-3xl shadow-2xl border border-white/20">
            <h1 className="text-5xl sm:text-7xl font-bold text-white mb-8 drop-shadow-lg">
              Ola-Chris Market
            </h1>
            <p className="text-xl sm:text-2xl text-blue-200 mb-6 font-medium">
              Votre Supermarché de Confiance au Bénin
            </p>
            <p className="text-white/90 text-lg max-w-3xl mx-auto leading-relaxed mb-8">
              Depuis 2015, nous révolutionnons l'expérience d'achat avec une
              sélection premium de produits locaux et internationaux, dans un
              environnement moderne et accueillant.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-full hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <PlayCircle className="inline-block mr-2 h-5 w-5" />
                Découvrir nos magasins
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full hover:bg-white/30 transition-all duration-300 border border-white/30">
                <Camera className="inline-block mr-2 h-5 w-5" />
                Visite virtuelle
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation par onglets */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <TabButton
            id="overview"
            title="Vue d'ensemble"
            isActive={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
          />
          <TabButton
            id="history"
            title="Notre Histoire"
            isActive={activeTab === "history"}
            onClick={() => setActiveTab("history")}
          />
          <TabButton
            id="services"
            title="Nos Services"
            isActive={activeTab === "services"}
            onClick={() => setActiveTab("services")}
          />
          <TabButton
            id="market"
            title="Marché & Données"
            isActive={activeTab === "market"}
            onClick={() => setActiveTab("market")}
          />
        </div>

        {/* Contenu des onglets */}
        {activeTab === "overview" && (
          <div className="space-y-16">
            {/* Statistiques principales */}
            <section>
              <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
                Ola-Chris Market en Chiffres
              </h2>
              <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
                Le secteur tertiaire représente 52% du PIB béninois, dont 11,2%
                pour le commerce, et nous contribuons activement à cette
                croissance.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
                        <stat.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-4xl font-bold text-gray-800 mb-2">
                        {stat.value}
                      </div>
                      <div className="text-gray-600 text-lg mb-2">
                        {stat.label}
                      </div>
                      <div className="text-sm text-green-600 font-medium">
                        {stat.growth}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Mission et Vision */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <section className="bg-white rounded-2xl p-10 shadow-xl border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-green-700">
                    Notre Mission
                  </h2>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  Démocratiser l'accès à des produits de qualité supérieure pour
                  toutes les familles béninoises, en proposant une expérience
                  d'achat moderne, pratique et accessible.
                </p>
                <div className="flex items-center text-green-600">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span>Engagement qualité garantie</span>
                </div>
              </section>

              <section className="bg-white rounded-2xl p-10 shadow-xl border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <Eye className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-green-700">
                    Notre Vision
                  </h2>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  Devenir le leader de la grande distribution moderne en Afrique
                  de l'Ouest, reconnu pour son innovation, sa responsabilité
                  sociale et son excellence opérationnelle.
                </p>
                <div className="flex items-center text-blue-600">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span>Expansion régionale planifiée</span>
                </div>
              </section>
            </div>

            {/* Nos valeurs */}
            <section>
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                Nos Valeurs Fondamentales
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 group"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <value.icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-800 mb-2">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">{value.desc}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {value.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === "history" && (
          <div className="space-y-16">
            <section>
              <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
                Notre Parcours Exceptionnel
              </h2>
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-green-500 to-blue-500 rounded-lg"></div>
                <div className="space-y-12">
                  {milestones.map((milestone, index) => (
                    <div
                      key={index}
                      className={`flex items-center ${
                        index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                      }`}
                    >
                      <div
                        className={`w-1/2 ${
                          index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"
                        }`}
                      >
                        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                          <div className="flex items-center mb-3">
                            <milestone.icon className="w-6 h-6 text-blue-600 mr-2" />
                            <span className="text-2xl font-bold text-green-700">
                              {milestone.year}
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            {milestone.title}
                          </h3>
                          <p className="text-gray-600">{milestone.desc}</p>
                        </div>
                      </div>
                      <div className="w-4 h-4 bg-white border-4 border-green-500 rounded-full z-10"></div>
                      <div className="w-1/2"></div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-10 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                L'Histoire d'une Réussite
              </h3>
              <div className="prose max-w-4xl mx-auto text-gray-700 text-lg leading-relaxed">
                <p className="mb-4">
                  Ola-Chris Market est né de la vision de ses fondateurs : créer
                  un supermarché qui combine la modernité européenne avec
                  l'authenticité africaine. Partant d'une simple épicerie de
                  quartier de 200m², nous avons grandi pour devenir un acteur
                  majeur de la distribution au Bénin.
                </p>
                <p className="mb-4">
                  Notre croissance s'appuie sur trois piliers : l'excellence
                  produit, l'innovation service, et l'engagement communautaire.
                  Alors que les enseignes internationales comme Shoprite
                  dominent le marché africain, nous avons choisi de rester une
                  entreprise locale, proche de nos clients et de nos valeurs.
                </p>
                <p>
                  Aujourd'hui, nous employons plus de 150 personnes et
                  contribuons activement au développement économique local en
                  privilégiant les fournisseurs béninois et en investissant dans
                  la formation de nos équipes.
                </p>
              </div>
            </section>
          </div>
        )}

        {activeTab === "services" && (
          <div className="space-y-16">
            <section>
              <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
                Services Premium
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <service.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                          {service.title}
                        </h3>
                        <p className="text-gray-600">{service.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-2xl p-10 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                Nos Départements Spécialisés
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Leaf className="w-10 h-10 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Produits Bio & Locaux
                  </h4>
                  <p className="text-gray-600">
                    Sélection de produits biologiques et issus de l'agriculture
                    locale
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Coffee className="w-10 h-10 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Épicerie Fine
                  </h4>
                  <p className="text-gray-600">
                    Produits d'exception et spécialités internationales
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-10 h-10 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Solutions Entreprises
                  </h4>
                  <p className="text-gray-600">
                    Livraisons en gros pour restaurants et commerces
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === "market" && (
          <div className="space-y-16">
            <section>
              <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
                Contexte Économique Béninois
              </h2>
              <p className="text-center text-gray-600 text-lg mb-12 max-w-3xl mx-auto">
                Le secteur tertiaire représente 52% du PIB béninois, avec une
                croissance soutenue du commerce moderne qui bénéficie de
                l'urbanisation croissante.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {marketData.map((data, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                  >
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {data.value}
                      </div>
                      <div className="text-gray-800 font-medium mb-1">
                        {data.label}
                      </div>
                      <div className="text-sm text-gray-600">{data.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-10">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Notre Impact Économique
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-4">
                    Contribution Locale
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      150 emplois directs créés
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      25 fournisseurs locaux partenaires
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      Formation continue de 200 personnes
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      Soutien à 15 coopératives agricoles
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-4">
                    Projection 2025-2027
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-blue-600 mr-2" />
                      Ouverture de 8 nouveaux magasins
                    </li>
                    <li className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-blue-600 mr-2" />
                      500 emplois supplémentaires
                    </li>
                    <li className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-blue-600 mr-2" />
                      Expansion au Togo et Niger
                    </li>
                    <li className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-blue-600 mr-2" />
                      Digitalisation complète
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-2xl p-10 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Positionnement Concurrentiel
              </h3>
              <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
                Face à la "vague des supermarchés" en Afrique de l'Ouest,
                Ola-Chris Market se distingue par son approche locale et son
                service de proximité.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <PieChart className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-800">
                    Part de Marché
                  </h4>
                  <p className="text-2xl font-bold text-green-600">12%</p>
                  <p className="text-sm text-gray-600">
                    Commerce moderne Bénin
                  </p>
                </div>
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <BarChart className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-800">Croissance CA</h4>
                  <p className="text-2xl font-bold text-blue-600">+85%</p>
                  <p className="text-sm text-gray-600">Progression annuelle</p>
                </div>
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <Handshake className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-800">Satisfaction</h4>
                  <p className="text-2xl font-bold text-purple-600">94%</p>
                  <p className="text-sm text-gray-600">Clients recommandent</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Call to Action final */}
        <div className="text-center bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl p-12 shadow-xl">
          <h3 className="text-3xl font-bold mb-6">
            Rejoignez la Famille Ola-Chris Market
          </h3>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Découvrez pourquoi plus de 3 500 familles nous font confiance pour
            leurs achats quotidiens. Vivez l'expérience OlaChris Market dès
            aujourd'hui !
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold">
              <MapPin className="inline-block mr-2 h-5 w-5" />
              Nos Magasins
            </button>
            <Link to="/contact" className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full hover:bg-white/30 transition-all duration-300 border border-white/30">
              <Phone className="inline-block mr-2 h-5 w-5" />
              Nous Contacter
            </Link>
            <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full hover:bg-white/30 transition-all duration-300 border border-white/30">
              <Mail className="inline-block mr-2 h-5 w-5" />
              Newsletter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
