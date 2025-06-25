import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { products } from "../data/products";
import { categories } from "../data/categories";

const Offer = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const chartData = categories.map((category) => ({
    ...category,
    count: products.filter(
      (p) => p.categoryId === category.id && p.discount > 0
    ).length,
  }));

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
                  if (label) label += ": ";
                  if (context.parsed !== null)
                    label += context.parsed + " offre(s)";
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
        {/* Sections ici (header, promotions, graphique, newsletter...) */}
      </div>
    </div>
  );
};

export default Offer;
