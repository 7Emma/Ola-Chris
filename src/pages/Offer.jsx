import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { products } from "../data/products";
import { categories } from "../data/categories";

const SpecialOffersComponent = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Préparer les données pour le graphique
  const chartData = categories.map((category) => ({
    ...category,
    count: products.filter(
      (p) => p.categoryId === category.id && p.discount > 0
    ).length,
  }));

  // Filtrer les produits avec des offres spéciales (discount > 0)
  const specialOffers = products.filter((product) => product.discount > 0);

  const getUpcomingSunday = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysUntilSunday = 7 - dayOfWeek;
    const nextSunday = new Date(today);
    nextSunday.setDate(today.getDate() + daysUntilSunday);
    return nextSunday.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const createFeaturedCard = (offer) => {
    const category = categories.find((c) => c.id === offer.categoryId);
    return (
      <div
        key={offer.id}
        className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 relative"
      >
        <img
          src={offer.image}
          alt={offer.name}
          className="w-full h-56 object-cover"
        />
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h3 className="text-2xl font-bold text-primaryBlue-800 mb-2">
              {offer.name}
            </h3>
            <span className="bg-primaryGreen-300 text-primaryGreen-900 text-xs font-semibold px-2 py-1 rounded-full">
              {offer.discount}% de réduction
            </span>
          </div>
          <p className="text-primaryBlue-700 mb-4">{offer.description}</p>
          <div className="flex items-baseline gap-4 mb-4">
            <span className="text-3xl font-bold gradient-text">
              {(offer.price * (1 - offer.discount / 100)).toFixed(2)} FCFA
            </span>
            <span className="text-lg text-primaryBlue-400 line-through">
              {offer.price} FCFA
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-primaryBlue-500">
              Offre valable jusqu'au {getUpcomingSunday()}
            </span>
            <span
              className="text-xs px-2 py-1 rounded-full"
              style={{
                backgroundColor: category.color + "20",
                color: category.color,
              }}
            >
              {category.name}
            </span>
          </div>
        </div>
        <div className="promo-badge bg-accentPink-600 text-white font-bold px-4 py-1 rounded-full shadow-lg">
          Spécial -{offer.discount}%
        </div>
      </div>
    );
  };

  const createOfferCard = (offer) => {
    const category = categories.find((c) => c.id === offer.categoryId);
    return (
      <div
        key={offer.id}
        className="bg-primaryBlue-100 rounded-xl overflow-hidden transform hover:shadow-lg hover:scale-105 transition-all duration-300 flex flex-col"
      >
        <img
          src={offer.image}
          alt={offer.name}
          className="w-full h-40 object-cover"
        />
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-start">
            <h4 className="font-bold text-lg text-primaryBlue-800">
              {offer.name}
            </h4>
            <span className="bg-primaryGreen-300 text-primaryGreen-900 text-xs font-semibold px-2 py-1 rounded-full">
              -{offer.discount}%
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-xl font-bold text-primaryGreen-600">
              {(offer.price * (1 - offer.discount / 100)).toFixed(2)} F
            </span>
            <span className="text-sm text-primaryBlue-400 line-through">
              {offer.price} F
            </span>
          </div>
          <p className="text-sm text-primaryBlue-500 mt-2 flex-grow">
            {offer.description}
          </p>
          <div className="flex justify-between items-center mt-2">
            <span
              className="text-xs px-2 py-1 rounded-full"
              style={{
                backgroundColor: category.color + "20",
                color: category.color,
              }}
            >
              {category.name}
            </span>
            <button className="bg-primaryGreen-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-primaryGreen-700 transition-colors">
              Ajouter
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderProducts = (category = "all") => {
    const filteredOffers =
      category === "all"
        ? specialOffers
        : specialOffers.filter(
            (offer) => offer.categoryId === parseInt(category)
          );

    if (filteredOffers.length === 0) {
      return (
        <div className="col-span-full text-center py-8">
          <p className="text-primaryBlue-500">
            Aucune offre spéciale dans cette catégorie pour le moment
          </p>
        </div>
      );
    }

    return filteredOffers.map((offer) => createOfferCard(offer));
  };

  const handleFilterClick = (category) => {
    setActiveCategory(category);
    highlightChartSegment(
      category === "all"
        ? -1
        : categories.findIndex((c) => c.id === parseInt(category))
    );
  };

  const highlightChartSegment = (index) => {
    if (!chartInstance.current) return;
    chartInstance.current.setActiveElements(
      index > -1 ? [{ datasetIndex: 0, index }] : []
    );
    chartInstance.current.update();
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const emailInput = e.target.elements["newsletter-email"];
    if (emailInput.value) {
      emailInput.value = "";
      setNewsletterSuccess(true);
      setTimeout(() => setNewsletterSuccess(false), 3000);
    }
  };

  useEffect(() => {
    if (chartRef.current && !chartInstance.current) {
      const ctx = chartRef.current.getContext("2d");

      chartInstance.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: chartData.map((c) => c.name),
          datasets: [
            {
              label: "Nombre d'offres",
              data: chartData.map((c) => c.count),
              backgroundColor: chartData.map((c) => c.color),
              borderColor: "#ffffff",
              borderWidth: 4,
              hoverOffset: 16,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "60%",
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                padding: 20,
                usePointStyle: true,
                pointStyle: "circle",
              },
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  let label = context.label || "";
                  if (label) {
                    label += ": ";
                  }
                  if (context.parsed !== null) {
                    label += context.parsed + " offre(s)";
                  }
                  return label;
                },
              },
            },
          },
        },
      });

      const handleChartClick = (e) => {
        const activePoints = chartInstance.current.getElementsAtEventForMode(
          e,
          "nearest",
          { intersect: true },
          true
        );
        if (activePoints.length) {
          const firstPoint = activePoints[0];
          const index = firstPoint.index;
          handleFilterClick(chartData[index].id.toString());
        }
      };

      chartRef.current.onclick = handleChartClick;
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, []);

  return (
    <div className="antialiased font-['Inter'] bg-gray-50 text-primaryBlue-900">
      <div className="container mx-auto p-4 sm:p-6 md:p-8">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primaryBlue-800 mb-2">
            🎁 Nos Offres Spéciales du Moment !
          </h1>
          <p className="text-lg text-primaryBlue-700 max-w-3xl mx-auto">
            Découvrez nos meilleures promotions et réductions exclusives. Faites
            des économies sur vos produits préférés !
          </p>
        </header>

        {/* Featured Offers Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primaryBlue-700 mb-8 text-center">
            ✨ Les Offres Phares de la Semaine
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {specialOffers
              .filter((o) => o.discount >= 20)
              .slice(0, 2)
              .map(createFeaturedCard)}
          </div>
        </section>

        {/* Interactive Promotions Section */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-primaryBlue-700 mb-8 text-center">
            Toutes nos Promotions Actuelles
          </h2>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Chart */}
            <div className="w-full lg:w-1/3 flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-4 text-primaryBlue-600">
                Répartition des Offres
              </h3>
              <div className="chart-container">
                <canvas ref={chartRef} id="offersChart"></canvas>
              </div>
            </div>
            {/* Filters and Product List */}
            <div className="w-full lg:w-2/3">
              <h3 className="text-xl font-semibold mb-4 text-primaryBlue-600">
                Filtrer par Catégorie
              </h3>
              <div className="flex flex-wrap gap-2 mb-8">
                <button
                  onClick={() => handleFilterClick("all")}
                  className={`filter-btn px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    activeCategory === "all"
                      ? "bg-primaryGreen-600 text-white shadow"
                      : "bg-gray-100 text-primaryBlue-700"
                  }`}
                >
                  Toutes
                </button>
                {chartData
                  .filter((c) => c.count > 0)
                  .map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleFilterClick(cat.id.toString())}
                      className={`filter-btn px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                        activeCategory === cat.id.toString()
                          ? "bg-primaryGreen-600 text-white shadow"
                          : "bg-gray-100 text-primaryBlue-700"
                      }`}
                    >
                      {cat.icon} {cat.name}
                    </button>
                  ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {renderProducts(activeCategory)}
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-gradient-to-r from-primaryGreen-500 to-primaryGreen-600 text-white p-8 sm:p-12 rounded-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            🔔 Ne Manquez Plus Aucune Offre !
          </h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Recevez nos meilleures offres directement dans votre boîte mail !
          </p>
          <form
            onSubmit={handleNewsletterSubmit}
            className="max-w-md mx-auto flex flex-col sm:flex-row gap-4"
          >
            <input
              type="email"
              name="newsletter-email"
              required
              placeholder="Votre adresse e-mail"
              className="w-full px-4 py-3 rounded-lg text-primaryBlue-900 focus:outline-none focus:ring-4 focus:ring-white/50 transition"
            />
            <button
              type="submit"
              className="bg-white text-primaryGreen-700 font-bold px-6 py-3 rounded-lg hover:bg-primaryBlue-200 transform hover:scale-105 transition"
            >
              S'inscrire
            </button>
          </form>
          {newsletterSuccess && (
            <p className="mt-4 text-primaryBlue-200 font-semibold">
              Merci pour votre inscription !
            </p>
          )}
        </section>
      </div>

      <style jsx>{`
        .chart-container {
          position: relative;
          height: 350px;
          width: 100%;
          max-width: 350px;
          margin: auto;
        }
        .gradient-text {
          background: linear-gradient(to right, #22c55e, #16a34a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .promo-badge {
          position: absolute;
          top: -10px;
          right: -10px;
          transform: rotate(15deg);
        }
        :root {
          --color-primary-blue-100: #dbeafe;
          --color-primary-blue-200: #bfdbfe;
          --color-primary-blue-400: #60a5fa;
          --color-primary-blue-500: #3b82f6;
          --color-primary-blue-600: #2563eb;
          --color-primary-blue-700: #1d4ed8;
          --color-primary-blue-800: #1e40af;
          --color-primary-blue-900: #1e3a8a;
          --color-primary-green-300: #86efac;
          --color-primary-green-400: #4ade80;
          --color-primary-green-500: #22c55e;
          --color-primary-green-600: #16a34a;
          --color-primary-green-800: #166534;
          --color-primary-green-900: #14532d;
          --color-accent-pink-600: #db2777;
          --color-accent-pink-700: #be185d;
        }
        .bg-primaryBlue-100 {
          background-color: var(--color-primary-blue-100);
        }
        .text-primaryBlue-900 {
          color: var(--color-primary-blue-900);
        }
      `}</style>
    </div>
  );
};

export default SpecialOffersComponent;
