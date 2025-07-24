import React, { useEffect, useRef, useState } from "react";
import { CreditCard, Phone, Mail, ArrowRight, CheckCircle } from "lucide-react";

const InputField = ({
  type,
  placeholder,
  value,
  onChange,
  icon: Icon,
  name,
  focusedField,
  onFocus,
  onBlur,
}) => (
  <div className="relative group">
    <div
      className={`absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300 ${
        focusedField === name ? "opacity-40" : ""
      } pointer-events-none`}
    ></div>
    <div className="relative">
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-teal-500 transition-colors duration-300 z-10">
        <Icon size={20} />
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        required
        className="w-full pl-12 pr-4 py-4 bg-white/90 backdrop-blur-sm rounded-xl border-2 border-transparent focus:border-teal-400 outline-none text-lg text-slate-700 placeholder-gray-400 transition-all duration-300 hover:bg-white/95 focus:bg-white shadow-lg focus:shadow-xl relative z-20"
      />
    </div>
  </div>
);

const PaymentForm = () => {
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const [showWidget, setShowWidget] = useState(false);
  const widgetRef = useRef(null);

  const isValid = amount && phone && email;

  useEffect(() => {
    const scriptId = "kkiapay-widget-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.src = "https://cdn.kkiapay.me/k.js";
      script.async = true;
      script.id = scriptId;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (showWidget && widgetRef.current) {
      widgetRef.current.innerHTML = `
        <kkiapay-widget
          sandbox="true"
          amount="${amount}"
          phone="${phone}"
          email="${email}"
          key="9fec77228f6a898975ad9686e197f1066142da25"
          callback="https://kkiapay-redirect.com"
        ></kkiapay-widget>
      `;
      setTimeout(() => {
        if (window.openKkiapayWidget) {
          window.openKkiapayWidget();
        }
      }, 200);
    }
  }, [showWidget, amount, phone, email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    setShowWidget(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-300/20 to-teal-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-teal-300/20 to-cyan-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20 transform transition-all duration-500 hover:scale-[1.02] space-y-6"
        >
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full mb-4 shadow-lg">
              <CreditCard className="text-white" size={28} />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Payer avec Kkiapay
            </h2>
            <p className="text-gray-600 mt-2">Paiement sécurisé et instantané</p>
          </div>

          <InputField
            type="number"
            placeholder="Montant (FCFA)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            icon={CreditCard}
            name="amount"
            focusedField={focusedField}
            onFocus={() => setFocusedField("amount")}
            onBlur={() => setFocusedField(null)}
          />
          <InputField
            type="tel"
            placeholder="Téléphone (ex: 2290197000000)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            icon={Phone}
            name="phone"
            focusedField={focusedField}
            onFocus={() => setFocusedField("phone")}
            onBlur={() => setFocusedField(null)}
          />
          <InputField
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}
            name="email"
            focusedField={focusedField}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
          />

          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform group relative overflow-hidden ${
              !isValid
                ? "bg-gray-300 cursor-not-allowed text-gray-500"
                : "bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <div className="relative flex items-center justify-center gap-2">
              <span>Valider</span>
              <ArrowRight
                className="transition-transform duration-300 group-hover:translate-x-1"
                size={20}
              />
            </div>
          </button>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-600">
            <CheckCircle className="text-green-500" size={16} />
            <span>Paiement 100% sécurisé</span>
          </div>

          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full opacity-60 animate-bounce delay-300"></div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full opacity-60 animate-bounce delay-700"></div>
        </form>

        {/* Widget container (invisible, nécessaire pour injection) */}
        <div ref={widgetRef}></div>
      </div>
    </div>
  );
};

export default PaymentForm;
