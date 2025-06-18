import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Send,
  User,
  FileText,
  Star,
  CheckCircle,
  AlertCircle,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Globe,
} from "lucide-react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    type: "general",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Le nom est requis";
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }
    if (!formData.message.trim()) newErrors.message = "Le message est requis";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          type: "general",
        });
      }, 3000);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Adresse",
      details: ["Bannikani, Parakou", "Borgou, Bénin"],
      color: "text-blue-600",
    },
    {
      icon: Phone,
      title: "Téléphone",
      details: ["+229 01 21 XX XX XX", "+229 01 97 XX XX XX"],
      color: "text-green-600",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["contact@olachrismarket.bj", "info@olachrismarket.bj"],
      color: "text-purple-600",
    },
    {
      icon: Clock,
      title: "Horaires",
      details: ["Lun-Sam: 7h00 - 21h00", "Dim: 8h00 - 20h00"],
      color: "text-orange-600",
    },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      name: "Facebook",
      url: "#",
      color: "hover:text-blue-600",
    },
    {
      icon: Instagram,
      name: "Instagram",
      url: "#",
      color: "hover:text-pink-600",
    },
    { icon: Twitter, name: "Twitter", url: "#", color: "hover:text-blue-400" },
    {
      icon: Linkedin,
      name: "LinkedIn",
      url: "#",
      color: "hover:text-blue-700",
    },
  ];

  const messageTypes = [
    { value: "general", label: "Question générale" },
    { value: "complaint", label: "Réclamation" },
    { value: "suggestion", label: "Suggestion" },
    { value: "partnership", label: "Partenariat" },
    { value: "job", label: "Emploi" },
  ];

  const faqs = [
    {
      question: "Quels sont vos modes de paiement ?",
      answer:
        "Nous acceptons les espèces, cartes bancaires, et paiements mobiles (MTN Mobile Money, Moov Money).",
    },
    {
      question: "Proposez-vous la livraison à domicile ?",
      answer:
        "Oui, nous livrons dans un rayon de 15km autour de Parakou. Livraison gratuite pour les commandes de plus de 25 000 FCFA.",
    },
    {
      question: "Avez-vous un programme de fidélité ?",
      answer:
        "Oui ! Notre offre OlaChris+ vous fait bénéficier de 5% de réduction et d'offres exclusives.",
    },
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Message envoyé !
          </h2>
          <p className="text-gray-600 mb-6">
            Merci pour votre message. Notre équipe vous répondra dans les plus
            brefs délais.
          </p>
          <div className="animate-pulse">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const backgroundImageUrl =
    "https://urlz.fr/uC8P";
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div
        className="relative h-[300px] bg-cover bg-center flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
      >
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-400">
            Contactez-nous
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Nous sommes là pour vous aider ! N'hésitez pas à nous contacter pour
            toute question ou suggestion.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-blue-100 rounded-full p-3">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Envoyer un message
                </h2>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Votre nom complet"
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="votre@email.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+229 XX XX XX XX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type de message
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {messageTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sujet
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Sujet de votre message"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                      errors.message ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Décrivez votre demande en détail..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 px-8 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Envoyer le message
                </button>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Contact Details */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Nos coordonnées
              </h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div
                      className={`${info.color} bg-gray-50 rounded-full p-3`}
                    >
                      <info.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">
                        {info.title}
                      </h4>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600 text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Suivez-nous
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className={`bg-gray-100 rounded-full p-3 text-gray-600 ${social.color} transition-colors duration-300`}
                    title={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl shadow-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-6">Service client</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Temps de réponse moyen</span>
                  <span className="font-bold">2h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Satisfaction client</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold">4.8/5</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Messages traités/jour</span>
                  <span className="font-bold">50+</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Questions fréquentes
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Trouvez rapidement les réponses aux questions les plus courantes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="font-semibold text-gray-800 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-6">
              <h3 className="text-2xl font-bold mb-2">Notre localisation</h3>
              <p className="text-blue-100">
                Venez nous rendre visite en magasin
              </p>
            </div>
            <div className="p-6">
              <div className="rounded-lg overflow-hidden h-64 w-full">
                <iframe
                  title="Carte OlaChris Market"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3974.487799319175!2d2.6421790150732776!3d9.327083893535774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10321ba3fcd05dfb%3A0x56402aa68972cda5!2sOLA%20CHRIS%20MARKET!5e0!3m2!1sfr!2sbj!4v1718614749000!5m2!1sfr!2sbj"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
