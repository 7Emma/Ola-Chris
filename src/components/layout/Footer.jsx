import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 ">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="space-y-4">
            <img src={Logo} alt="Logo" className="h-20 w-[120px]" />
            <p className="text-blue-100 leading-relaxed">
              Votre destination market de confiance. Découvrez des produits de
              qualité à des prix exceptionnels.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-all duration-200 transform hover:scale-110"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-400 hover:bg-blue-500 p-3 rounded-full transition-all duration-200 transform hover:scale-110"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-pink-600 hover:bg-pink-700 p-3 rounded-full transition-all duration-200 transform hover:scale-110"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-green-300 border-b-2 border-green-400 pb-2 inline-block">
              Liens rapides
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Accueil", to: "/" },
                { label: "Nos produits", to: "/products" },
                { label: "Offres spéciales", to: "/offer" },
                { label: "À propos", to: "/about" },
                { label: "Contact", to: "/contact" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-blue-100 hover:text-white transition-colors duration-200 hover:underline decoration-2 underline-offset-4 flex items-center"
                  >
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service client */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-green-300 border-b-2 border-green-400 pb-2 inline-block">
              Service client
            </h3>
            <ul className="space-y-3">
              {[
                "FAQ",
                "Politique de retour",
                "Livraison",
                "Garantie",
                "Support",
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    to="#"
                    className="text-blue-100 hover:text-white transition-colors duration-200 hover:underline decoration-2 underline-offset-4 flex items-center"
                  >
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact et newsletter */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-green-300 border-b-2 border-green-400 pb-2 inline-block">
              Contactez-nous
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-2 bg-blue-800/30 rounded-lg">
                <div className="bg-green-500 p-2 rounded-full">
                  <Phone size={16} className="text-white" />
                </div>
                <span className="text-blue-100">+229 01 XX XX XX XX</span>
              </div>
              <div className="flex items-center space-x-3 p-2 bg-blue-800/30 rounded-lg">
                <div className="bg-blue-500 p-2 rounded-full">
                  <Mail size={16} className="text-white" />
                </div>
                <span className="text-blue-100">contact@olalogo.fr</span>
              </div>
              <div className="flex items-center space-x-3 p-2 bg-blue-800/30 rounded-lg">
                <div className="bg-green-600 p-2 rounded-full">
                  <MapPin size={16} className="text-white" />
                </div>
                <span className="text-blue-100">Parakou, Benin</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-800/50 to-green-800/50 rounded-lg">
              <h4 className="font-semibold text-green-300 mb-3 text-center">
                📧 Newsletter
              </h4>
              <p className="text-blue-100 text-sm mb-3 text-center">
                Restez informé de nos dernières offres
              </p>
              <div className="flex py-4">
                <input
                  type="email"
                  name="newsletter"
                  placeholder="Votre email"
                  className="flex-1 px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400 border-2 border-transparent focus:border-green-400"
                />
                <button className="bg-gradient-to-r from-green-500 to-blue-500 px-4 py-2 rounded-r-lg hover:from-green-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105">
                  <Mail size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Barre de séparation */}
        <div className="border-t border-blue-800/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <p className="text-blue-200 text-sm">
                &copy; {currentYear} . Tous droits réservés.
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6">
              {[
                "Conditions d'utilisation",
                "Politique de confidentialité",
                "Cookies",
                "Mentions légales",
              ].map((item, idx) => (
                <a
                  href="#"
                  key={idx}
                  className="text-blue-200 hover:text-white text-sm transition-colors duration-200 hover:underline decoration-2"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;