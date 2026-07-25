import React, { useState, useEffect, useRef } from "react";
import { ShoppingBag, X, Plus, Minus, Leaf, ChevronRight, Star, Check, ArrowLeft } from "lucide-react";
import { TermsPage, PrivacyPage, RefundPage, ShippingPage } from "./LegalPages.jsx";
import { BUSINESS } from "./business.js";

/* ---------------------------------------------------------
   AYUEVORAA WELLNESS — Crafting health with nature's finest herbs
   Palette matched to brand logo: deep forest green + brass gold
--------------------------------------------------------- */

const BRAND = {
  name: "Ayuevoraa",
  suffix: "Wellness",
  tagline: "Crafting health with nature's finest herbs",
};

// Real product lineup. Ingredient lists below are standard herbs typically
// used in this product category as a starting reference — replace with your
// actual formulation for label accuracy before launch.
const PRODUCTS = [
  {
    id: "p1",
    name: "Livovoraa Syrup",
    category: "Liver Care",
    format: "Syrup",
    size: "200 ml",
    tagline: "Daily liver support",
    price: 198,
    oldPrice: null,
    badge: "Bestseller",
    short: "A traditional Ayurvedic syrup formulated to support healthy liver function as part of your daily routine.",
    ingredients: ["Bhumyamalaki", "Kutki", "Punarnava", "Kalmegh"],
    ritual: [
      "Take 10ml (two teaspoons) twice daily, after meals",
      "Shake well before use",
      "Use within 2 months of opening",
    ],
  },
  {
    id: "p2",
    name: "Livovoraa Capsules",
    category: "Liver Care",
    format: "Capsules",
    size: "30 capsules",
    tagline: "Liver detox, in capsule form",
    price: 298,
    oldPrice: null,
    badge: null,
    short: "A concentrated capsule blend to support the body's natural detoxification and healthy digestion.",
    ingredients: ["Bhumyamalaki", "Kutki", "Punarnava", "Kalmegh"],
    ritual: [
      "Take 1–2 capsules twice daily, after meals, with water",
      "Continue for 60 days for best results",
      "Store in a cool, dry place",
    ],
  },
  {
    id: "p3",
    name: "Orthovoraa Syrup",
    category: "Ortho Care",
    format: "Syrup",
    size: "200 ml",
    tagline: "Joint & bone comfort",
    price: 320,
    oldPrice: null,
    badge: null,
    short: "An Ayurvedic syrup blended to support joint flexibility and everyday bone comfort.",
    ingredients: ["Shallaki (Boswellia)", "Nirgundi", "Guggul", "Ashwagandha"],
    ritual: [
      "Take 10ml (two teaspoons) twice daily, after meals",
      "Shake well before use",
      "Pair with gentle daily movement for best results",
    ],
  },
  {
    id: "p4",
    name: "Orthovoraa Capsules",
    category: "Ortho Care",
    format: "Capsules",
    size: "30 capsules",
    tagline: "Joint & bone comfort, concentrated",
    price: 330,
    oldPrice: null,
    badge: null,
    short: "A capsule formula to support joint comfort and mobility as part of an active routine.",
    ingredients: ["Shallaki (Boswellia)", "Nirgundi", "Guggul", "Ashwagandha"],
    ritual: [
      "Take 1–2 capsules twice daily, after meals, with water",
      "Continue for 60 days for best results",
      "Store in a cool, dry place",
    ],
  },
  {
    id: "p5",
    name: "Cystovoraa Syrup",
    category: "Women's Wellness",
    format: "Syrup",
    size: "200 ml",
    tagline: "Cyclical & hormonal wellness",
    price: 230,
    oldPrice: null,
    badge: null,
    short: "A traditional syrup blend formulated to support women's hormonal balance and cyclical wellness.",
    ingredients: ["Ashoka", "Lodhra", "Shatavari", "Turmeric"],
    ritual: [
      "Take 10ml (two teaspoons) twice daily, after meals",
      "Shake well before use",
      "Best taken consistently through the month",
    ],
  },
  {
    id: "p6",
    name: "Cystovoraa Capsules",
    category: "Women's Wellness",
    format: "Capsules",
    size: "30 capsules",
    tagline: "Hormonal wellness, concentrated",
    price: 310,
    oldPrice: null,
    badge: null,
    short: "A capsule formula to support hormonal balance and women's cyclical wellness.",
    ingredients: ["Ashoka", "Lodhra", "Shatavari", "Turmeric"],
    ritual: [
      "Take 1–2 capsules twice daily, after meals, with water",
      "Continue for 60–90 days for best results",
      "Store in a cool, dry place",
    ],
  },
  {
    id: "p7",
    name: "Diavoraa Juice",
    category: "Diabetes Care",
    format: "Juice",
    size: "500 ml",
    tagline: "Support for healthy blood sugar",
    price: 570,
    oldPrice: null,
    badge: "New",
    short: "A bitter-herb juice blend formulated to support already-healthy blood sugar levels.",
    ingredients: ["Karela (Bitter gourd)", "Jamun", "Gudmar (Gymnema)", "Methi (Fenugreek)"],
    ritual: [
      "Take 20–30ml diluted in water, once daily before breakfast",
      "Shake well before use",
      "Refrigerate after opening",
    ],
  },
  {
    id: "p8",
    name: "Diavoraa Capsules",
    category: "Diabetes Care",
    format: "Capsules",
    size: "30 capsules",
    tagline: "Blood sugar support, concentrated",
    price: 300,
    oldPrice: null,
    badge: null,
    short: "A capsule blend to support healthy blood sugar levels as part of a balanced routine.",
    ingredients: ["Karela (Bitter gourd)", "Jamun", "Gudmar (Gymnema)", "Methi (Fenugreek)"],
    ritual: [
      "Take 1–2 capsules twice daily, after meals, with water",
      "Continue consistently for best results",
      "Store in a cool, dry place",
    ],
  },
  {
    id: "p9",
    name: "Fortifemvoraa Syrup",
    category: "Women's Wellness",
    format: "Syrup",
    size: "200 ml",
    tagline: "Everyday women's wellness",
    price: 210,
    oldPrice: null,
    badge: null,
    short: "A daily Ayurvedic tonic formulated to support women's overall strength, energy, and wellness.",
    ingredients: ["Shatavari", "Ashwagandha", "Lodhra", "Amla"],
    ritual: [
      "Take 10ml (two teaspoons) twice daily, after meals",
      "Shake well before use",
      "Continue as part of your daily routine",
    ],
  },
  {
    id: "p10",
    name: "Cardiovoraa Syrup",
    category: "Heart Care",
    format: "Syrup",
    size: "200 ml",
    tagline: "Everyday heart wellness",
    price: 375,
    oldPrice: null,
    badge: "Signature",
    short: "An Arjuna-based Ayurvedic syrup formulated to support healthy heart function and circulation.",
    ingredients: ["Arjuna", "Pushkarmool", "Punarnava", "Garlic extract"],
    ritual: [
      "Take 10ml (two teaspoons) twice daily, after meals",
      "Shake well before use",
      "Best paired with a heart-healthy lifestyle",
    ],
  },
];

const CATEGORIES = ["All", "Liver Care", "Ortho Care", "Women's Wellness", "Diabetes Care", "Heart Care"];

const money = (n) => `\u20B9${n.toLocaleString("en-IN")}`;
const CART_KEY = "ayuevoraa-cart";

// Set this in your Vercel project's environment variables as
// VITE_RAZORPAY_KEY_ID (the public Key ID, never the Secret).
const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || "";

function LeafPattern({ opacity = 0.08, color = "#C9A063" }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, opacity, pointerEvents: "none" }}>
      <defs>
        <pattern id="leafpat" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M40 10 C 55 20, 55 40, 40 55 C 25 40, 25 20, 40 10 Z" fill="none" stroke={color} strokeWidth="1" />
          <line x1="40" y1="10" x2="40" y2="55" stroke={color} strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="400" height="400" fill="url(#leafpat)" />
    </svg>
  );
}

function BottleArt() {
  return (
    <svg viewBox="0 0 220 320" width="100%" height="100%" style={{ maxWidth: 260 }}>
      <defs>
        <linearGradient id="bottleGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#254537" />
          <stop offset="100%" stopColor="#0F2E22" />
        </linearGradient>
      </defs>
      <rect x="85" y="10" width="50" height="35" rx="4" fill="#C9A063" />
      <rect x="90" y="0" width="40" height="14" rx="3" fill="#8A6B3D" />
      <path d="M85 45 L85 75 Q 55 100 55 150 L55 280 Q55 300 75 300 L145 300 Q165 300 165 280 L165 150 Q165 100 135 75 L135 45 Z"
        fill="url(#bottleGrad)" stroke="#C9A063" strokeWidth="2" />
      <rect x="60" y="150" width="100" height="90" fill="#F4EFE4" opacity="0.95" />
      <line x1="60" y1="150" x2="160" y2="150" stroke="#C9A063" strokeWidth="1.5" />
      <line x1="60" y1="240" x2="160" y2="240" stroke="#C9A063" strokeWidth="1.5" />
      <text x="110" y="182" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="11" fill="#0F2E22" fontStyle="italic">Ayuevoraa</text>
      <text x="110" y="198" textAnchor="middle" fontFamily="Manrope, sans-serif" fontSize="6.5" letterSpacing="1.5" fill="#5C4A2A">WELLNESS</text>
      <circle cx="110" cy="220" r="14" fill="none" stroke="#C9A063" strokeWidth="1" />
      <path d="M104 220 l4 4 l8 -9" stroke="#C9A063" strokeWidth="1.5" fill="none" />
      <path d="M78 80 C 90 90, 95 105, 88 120" stroke="#7C9070" strokeWidth="2" fill="none" opacity="0.7" />
      <path d="M142 80 C 130 90, 125 105, 132 120" stroke="#7C9070" strokeWidth="2" fill="none" opacity="0.7" />
    </svg>
  );
}

function WaxBadge({ text }) {
  return (
    <div style={{
      position: "absolute", top: 14, left: 14, background: "#5C1F1F",
      color: "#F4EFE4", fontFamily: "Manrope, sans-serif", fontSize: 11,
      letterSpacing: 1, padding: "5px 12px", borderRadius: 3,
      boxShadow: "0 2px 6px rgba(0,0,0,0.35)", zIndex: 2,
    }}>
      {text.toUpperCase()}
    </div>
  );
}

export default function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [view, setView] = useState("shop");
  const [orderId, setOrderId] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", address: "", pincode: "" });
  const [loaded, setLoaded] = useState(false);
  const [toast, setToast] = useState(null);
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const toastTimer = useRef(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      if (raw) setCart(JSON.parse(raw));
    } catch (e) {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, loaded]);

  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  };

  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { id: product.id, qty }];
    });
    showToast(`${product.name} added to your basket`);
  };

  const updateQty = (id, qty) => {
    setCart((prev) => {
      if (qty <= 0) return prev.filter((i) => i.id !== id);
      return prev.map((i) => (i.id === id ? { ...i, qty } : i));
    });
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const cartItems = cart
    .map((i) => ({ ...i, product: PRODUCTS.find((p) => p.id === i.id) }))
    .filter((i) => i.product);
  const subtotal = cartItems.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const itemCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  const payWithRazorpay = async () => {
    setPayError("");
    if (!RAZORPAY_KEY_ID) {
      setPayError("Payments aren't configured yet — add VITE_RAZORPAY_KEY_ID and deploy the /api functions with your Razorpay keys.");
      return;
    }
    setPaying(true);
    try {
      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems.map((i) => ({ id: i.id, qty: i.qty })) }),
      });
      if (!orderRes.ok) throw new Error("Could not create order");
      const order = await orderRes.json();

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: `${BRAND.name} ${BRAND.suffix}`,
        description: "Order payment",
        order_id: order.orderId,
        prefill: { name: form.name, contact: form.phone },
        theme: { color: "#0F2E22" },
        handler: async (response) => {
          try {
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
                items: cartItems.map((i) => ({ id: i.id, qty: i.qty })),
                customer: form,
              }),
            });
            const result = await verifyRes.json();
            if (result.verified) {
              setOrderId(response.razorpay_order_id);
              setCart([]);
              setView("confirmation");
            } else {
              setPayError("Payment could not be verified. Please contact support before retrying.");
            }
          } catch (e) {
            setPayError("Payment succeeded but verification failed — please contact support with your payment ID.");
          }
        },
        modal: { ondismiss: () => setPaying(false) },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => setPayError("Payment failed. Please try again."));
      rzp.open();
    } catch (e) {
      setPayError("Something went wrong starting checkout. Please try again.");
    } finally {
      setPaying(false);
    }
  };

  return (
    <div style={{ fontFamily: "Manrope, sans-serif", background: "#F4EFE4", color: "#241C14", minHeight: "100%" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,500&family=Manrope:wght@400;500;600;700;800&display=swap');
        .yk-serif { font-family: 'Fraunces', serif; }
        .yk-btn-gold { background: #C9A063; color: #0F2E22; border: none; font-weight: 700; letter-spacing: 0.4px; transition: all 0.25s ease; cursor: pointer; }
        .yk-btn-gold:hover { background: #DDBB86; transform: translateY(-1px); }
        .yk-btn-gold:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
        .yk-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .yk-card:hover { transform: translateY(-4px); box-shadow: 0 18px 40px rgba(15,46,34,0.18); }
        .yk-fade-in { animation: ykFadeIn 0.6s ease both; }
        @keyframes ykFadeIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .yk-drawer { animation: ykSlideIn 0.35s cubic-bezier(.2,.8,.2,1) both; }
        @keyframes ykSlideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .yk-scrollbar::-webkit-scrollbar { width: 6px; }
        .yk-scrollbar::-webkit-scrollbar-thumb { background: #C9A063; border-radius: 3px; }
        input:focus, textarea:focus { outline: 2px solid #C9A063; outline-offset: 1px; }
        button:focus-visible { outline: 2px solid #C9A063; outline-offset: 2px; }
        @media (max-width: 640px) { .yk-nav-label { display: none; } }
      `}</style>

      <header style={{
        position: "sticky", top: 0, zIndex: 30, background: "#0F2E22", color: "#F4EFE4",
        padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: "1px solid rgba(201,160,99,0.3)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setView("shop")}>
          <img src="/logo.jpg" alt={`${BRAND.name} ${BRAND.suffix}`} style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }} />
          <div>
            <div className="yk-serif" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.1 }}>{BRAND.name}</div>
            <div style={{ fontSize: 9.5, letterSpacing: 2, opacity: 0.75 }}>{BRAND.suffix.toUpperCase()}</div>
          </div>
        </div>
        <nav style={{ display: "flex", gap: 28, alignItems: "center" }}>
          <span className="yk-nav-label" style={{ fontSize: 12, letterSpacing: 1, opacity: 0.8 }}>
            {BRAND.tagline.toUpperCase()}
          </span>
          <button onClick={() => setCartOpen(true)} aria-label="Open cart"
            style={{ background: "none", border: "none", color: "#F4EFE4", cursor: "pointer", position: "relative", padding: 6 }}>
            <ShoppingBag size={22} />
            {itemCount > 0 && (
              <span style={{ position: "absolute", top: -4, right: -4, background: "#C9A063", color: "#0F2E22", fontSize: 10, fontWeight: 800, borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {itemCount}
              </span>
            )}
          </button>
        </nav>
      </header>

      {view === "shop" && (
        <>
          <section style={{ position: "relative", overflow: "hidden", background: "#0F2E22", color: "#F4EFE4", padding: "72px 24px 88px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 48 }}>
            <LeafPattern opacity={0.06} />
            <div className="yk-fade-in" style={{ maxWidth: 480, position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: 12, letterSpacing: 3, color: "#C9A063", marginBottom: 18, fontWeight: 700 }}>
                {BRAND.tagline.toUpperCase()}
              </div>
              <h1 className="yk-serif" style={{ fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.08, fontWeight: 600, marginBottom: 20 }}>
                Ayurveda, <span style={{ fontStyle: "italic", color: "#C9A063" }}>dosed for modern life.</span>
              </h1>
              <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.85, marginBottom: 32, maxWidth: 420 }}>
                From liver and joint care to women's wellness, blood sugar, and heart health —
                {" "}{BRAND.name} blends traditional herbs into daily rituals built for real routines.
              </p>
              <button className="yk-btn-gold" style={{ padding: "14px 32px", fontSize: 14, borderRadius: 2 }}
                onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })}>
                SHOP THE COLLECTION
              </button>
            </div>
            <div className="yk-fade-in" style={{ position: "relative", zIndex: 1, animationDelay: "0.15s" }}>
              <BottleArt />
            </div>
          </section>

          <section style={{ padding: "64px 24px", maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 44 }}>
              <div style={{ fontSize: 12, letterSpacing: 2, color: "#8A6B3D", fontWeight: 700, marginBottom: 10 }}>WHAT WE SUPPORT</div>
              <h2 className="yk-serif" style={{ fontSize: 32, fontWeight: 600 }}>Five concerns, one tradition</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
              {[
                { t: "Liver Care", d: "Daily support for healthy liver function and digestion." },
                { t: "Ortho Care", d: "Joint flexibility and everyday bone comfort." },
                { t: "Women's Wellness", d: "Hormonal balance and cyclical wellness." },
                { t: "Diabetes Care", d: "Support for healthy, balanced blood sugar." },
                { t: "Heart Care", d: "Everyday support for heart function and circulation." },
              ].map((c, idx) => (
                <div key={idx} className="yk-card" style={{ background: "#ECE4D3", padding: "26px 22px", borderRadius: 6, borderLeft: "3px solid #C9A063", cursor: "pointer" }}
                  onClick={() => { setActiveCategory(c.t); document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" }); }}>
                  <Leaf size={18} color="#7C9070" style={{ marginBottom: 12 }} />
                  <h3 className="yk-serif" style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{c.t}</h3>
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: "#4A3E2E" }}>{c.d}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="collection" style={{ padding: "20px 24px 80px", maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={{ fontSize: 12, letterSpacing: 2, color: "#8A6B3D", fontWeight: 700, marginBottom: 10 }}>THE COLLECTION</div>
              <h2 className="yk-serif" style={{ fontSize: 32, fontWeight: 600 }}>Ten rituals, five concerns</h2>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 36 }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: "8px 18px", borderRadius: 20, fontSize: 12.5, cursor: "pointer",
                    border: activeCategory === cat ? "1.5px solid #0F2E22" : "1.5px solid #D6C7A8",
                    background: activeCategory === cat ? "#0F2E22" : "transparent",
                    color: activeCategory === cat ? "#F4EFE4" : "#5A4E3C",
                    fontWeight: 600, transition: "all 0.2s ease",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 26 }}>
              {PRODUCTS.filter((p) => activeCategory === "All" || p.category === activeCategory).map((p) => (
                <div key={p.id} className="yk-card" style={{ background: "#fff", borderRadius: 8, overflow: "hidden", border: "1px solid #E4D9C3", position: "relative", display: "flex", flexDirection: "column" }}>
                  {p.badge && <WaxBadge text={p.badge} />}
                  <div onClick={() => setActiveProduct(p)} style={{ cursor: "pointer", background: "#0F2E22", height: 200, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                    <LeafPattern opacity={0.1} />
                    <div style={{ transform: "scale(0.75)" }}><BottleArt /></div>
                  </div>
                  <div style={{ padding: "20px 20px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                      <span style={{ fontSize: 11, letterSpacing: 1, color: "#7C9070", fontWeight: 700 }}>{p.tagline.toUpperCase()}</span>
                      <span style={{ fontSize: 10.5, color: "#A99B85", fontWeight: 600 }}>{p.format} · {p.size}</span>
                    </div>
                    <h3 className="yk-serif" onClick={() => setActiveProduct(p)} style={{ fontSize: 20, fontWeight: 600, marginBottom: 8, cursor: "pointer" }}>{p.name}</h3>
                    <p style={{ fontSize: 13.5, color: "#5A4E3C", lineHeight: 1.55, marginBottom: 16, flex: 1 }}>{p.short}</p>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 14 }}>
                      <span className="yk-serif" style={{ fontSize: 19, fontWeight: 600 }}>{money(p.price)}</span>
                      {p.oldPrice && <span style={{ fontSize: 13, color: "#A99B85", textDecoration: "line-through" }}>{money(p.oldPrice)}</span>}
                    </div>
                    <button className="yk-btn-gold" style={{ padding: "11px 0", fontSize: 13, borderRadius: 2, width: "100%" }} onClick={() => addToCart(p, 1)}>
                      ADD TO BASKET
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section style={{ background: "#0F2E22", color: "#F4EFE4", padding: "56px 24px" }}>
            <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 32, textAlign: "center" }}>
              {[
                { k: "100%", v: "Plant-derived formulas" },
                { k: "5,000+", v: "Daily rituals shipped" },
                { k: "4.8", v: "Average rating", icon: true },
              ].map((s, i) => (
                <div key={i}>
                  <div className="yk-serif" style={{ fontSize: 34, color: "#C9A063", fontWeight: 600, display: "flex", justifyContent: "center", alignItems: "center", gap: 6 }}>
                    {s.k} {s.icon && <Star size={20} fill="#C9A063" color="#C9A063" />}
                  </div>
                  <div style={{ fontSize: 13, opacity: 0.75, marginTop: 6, letterSpacing: 0.5 }}>{s.v}</div>
                </div>
              ))}
            </div>
          </section>

          <footer style={{ padding: "40px 24px", textAlign: "center", background: "#0A2018", color: "#B8A88C", fontSize: 12.5 }}>
            <img src="/logo.jpg" alt={BRAND.name} style={{ width: 44, height: 44, borderRadius: "50%", margin: "0 auto 12px", objectFit: "cover" }} />
            <div className="yk-serif" style={{ fontSize: 18, fontStyle: "italic", color: "#F4EFE4", marginBottom: 4 }}>{BRAND.name} {BRAND.suffix}</div>
            <p>{BRAND.tagline}. Consult a physician before starting any new herbal regimen.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 18, justifyContent: "center", margin: "18px 0", fontSize: 12 }}>
              {[
                ["Terms & Conditions", "terms"],
                ["Privacy Policy", "privacy"],
                ["Refund & Returns", "refund"],
                ["Shipping Policy", "shipping"],
              ].map(([label, key]) => (
                <button key={key} onClick={() => setView(key)} style={{ background: "none", border: "none", color: "#C9A063", cursor: "pointer", fontSize: 12, textDecoration: "underline", padding: 0 }}>
                  {label}
                </button>
              ))}
            </div>
            <p style={{ fontSize: 11, opacity: 0.7 }}>FSSAI/AYUSH License: {BUSINESS.fssaiLicense}</p>
            <p style={{ marginTop: 10, opacity: 0.6 }}>&copy; {new Date().getFullYear()} {BRAND.name} {BRAND.suffix}. All rights reserved.</p>
          </footer>
        </>
      )}

      {view === "terms" && <TermsPage onBack={() => setView("shop")} />}
      {view === "privacy" && <PrivacyPage onBack={() => setView("shop")} />}
      {view === "refund" && <RefundPage onBack={() => setView("shop")} />}
      {view === "shipping" && <ShippingPage onBack={() => setView("shop")} />}

      {view === "checkout" && (
        <section style={{ maxWidth: 560, margin: "0 auto", padding: "48px 24px 80px" }}>
          <button onClick={() => setView("shop")} style={{ background: "none", border: "none", display: "flex", alignItems: "center", gap: 6, color: "#5A4E3C", cursor: "pointer", marginBottom: 24, fontSize: 13 }}>
            <ArrowLeft size={16} /> Back to shop
          </button>
          <h2 className="yk-serif" style={{ fontSize: 28, fontWeight: 600, marginBottom: 6 }}>Checkout</h2>
          <p style={{ fontSize: 13.5, color: "#5A4E3C", marginBottom: 28 }}>Secure payment via Razorpay.</p>

          <div style={{ background: "#ECE4D3", borderRadius: 6, padding: 20, marginBottom: 28 }}>
            {cartItems.map((i) => (
              <div key={i.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, marginBottom: 8 }}>
                <span>{i.product.name} &times; {i.qty}</span>
                <span>{money(i.product.price * i.qty)}</span>
              </div>
            ))}
            <div style={{ borderTop: "1px solid #D6C7A8", marginTop: 10, paddingTop: 10, display: "flex", justifyContent: "space-between", fontWeight: 700 }}>
              <span>Total</span><span>{money(subtotal)}</span>
            </div>
          </div>

          <div style={{ display: "grid", gap: 14 }}>
            {[
              { key: "name", label: "Full name" },
              { key: "phone", label: "Phone number" },
              { key: "address", label: "Delivery address" },
              { key: "pincode", label: "Pincode" },
            ].map((f) => (
              <div key={f.key}>
                <label style={{ fontSize: 12, letterSpacing: 0.5, color: "#5A4E3C", display: "block", marginBottom: 5 }}>{f.label}</label>
                <input value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  style={{ width: "100%", padding: "11px 12px", border: "1px solid #D6C7A8", borderRadius: 4, fontSize: 14, background: "#fff" }} />
              </div>
            ))}
          </div>

          {payError && (
            <div style={{ marginTop: 16, padding: "12px 14px", background: "#F4DCD6", color: "#7A2A1E", borderRadius: 4, fontSize: 13 }}>
              {payError}
            </div>
          )}

          <button className="yk-btn-gold" disabled={!form.name || !form.phone || !form.address || cartItems.length === 0 || paying}
            style={{ width: "100%", padding: "14px 0", marginTop: 20, borderRadius: 2, fontSize: 14 }}
            onClick={payWithRazorpay}>
            {paying ? "OPENING SECURE CHECKOUT..." : `PAY ${money(subtotal)} WITH RAZORPAY`}
          </button>
        </section>
      )}

      {view === "confirmation" && (
        <section style={{ maxWidth: 480, margin: "0 auto", padding: "100px 24px", textAlign: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#7C9070", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <Check color="#fff" size={28} />
          </div>
          <h2 className="yk-serif" style={{ fontSize: 26, fontWeight: 600, marginBottom: 10 }}>Payment confirmed</h2>
          <p style={{ fontSize: 14, color: "#5A4E3C", marginBottom: 6 }}>Order ID: <strong>{orderId}</strong></p>
          <p style={{ fontSize: 13.5, color: "#8A7A5E", marginBottom: 32 }}>A confirmation has been recorded. Save this order ID for reference.</p>
          <button className="yk-btn-gold" style={{ padding: "12px 28px", borderRadius: 2, fontSize: 13 }} onClick={() => setView("shop")}>
            CONTINUE SHOPPING
          </button>
        </section>
      )}

      {cartOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", justifyContent: "flex-end" }}>
          <div onClick={() => setCartOpen(false)} style={{ position: "absolute", inset: 0, background: "rgba(15,46,34,0.5)" }} />
          <div className="yk-drawer yk-scrollbar" style={{ position: "relative", width: "min(400px, 92vw)", background: "#F4EFE4", height: "100%", padding: 24, overflowY: "auto", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 className="yk-serif" style={{ fontSize: 22, fontWeight: 600 }}>Your basket</h3>
              <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={20} /></button>
            </div>
            {cartItems.length === 0 && <p style={{ color: "#8A7A5E", fontSize: 14 }}>Your basket is empty. Add a ritual to begin.</p>}
            <div style={{ flex: 1 }}>
              {cartItems.map((i) => (
                <div key={i.id} style={{ display: "flex", gap: 12, padding: "14px 0", borderBottom: "1px solid #E4D9C3" }}>
                  <div style={{ width: 52, height: 52, background: "#0F2E22", borderRadius: 4, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Leaf size={20} color="#C9A063" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{i.product.name}</div>
                    <div style={{ fontSize: 13, color: "#8A7A5E", marginBottom: 8 }}>{money(i.product.price)}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <button onClick={() => updateQty(i.id, i.qty - 1)} style={{ border: "1px solid #D6C7A8", background: "#fff", borderRadius: 4, width: 24, height: 24, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Minus size={12} /></button>
                      <span style={{ fontSize: 13, minWidth: 14, textAlign: "center" }}>{i.qty}</span>
                      <button onClick={() => updateQty(i.id, i.qty + 1)} style={{ border: "1px solid #D6C7A8", background: "#fff", borderRadius: 4, width: 24, height: 24, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Plus size={12} /></button>
                      <button onClick={() => removeFromCart(i.id)} style={{ marginLeft: "auto", background: "none", border: "none", color: "#A9432E", fontSize: 12, cursor: "pointer" }}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {cartItems.length > 0 && (
              <div style={{ paddingTop: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, fontWeight: 700, marginBottom: 16 }}>
                  <span>Subtotal</span><span>{money(subtotal)}</span>
                </div>
                <button className="yk-btn-gold" style={{ width: "100%", padding: "13px 0", borderRadius: 2, fontSize: 13.5, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
                  onClick={() => { setCartOpen(false); setView("checkout"); }}>
                  CHECKOUT <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {activeProduct && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div onClick={() => setActiveProduct(null)} style={{ position: "absolute", inset: 0, background: "rgba(15,46,34,0.6)" }} />
          <div className="yk-scrollbar" style={{ position: "relative", background: "#F4EFE4", maxWidth: 640, width: "100%", maxHeight: "85vh", overflowY: "auto", borderRadius: 8, display: "flex", flexWrap: "wrap" }}>
            <button onClick={() => setActiveProduct(null)} style={{ position: "absolute", top: 14, right: 14, background: "rgba(255,255,255,0.85)", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", zIndex: 2 }}>
              <X size={16} />
            </button>
            <div style={{ flex: "1 1 240px", background: "#0F2E22", minHeight: 260, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <LeafPattern opacity={0.1} />
              <BottleArt />
            </div>
            <div style={{ flex: "1 1 300px", padding: 32 }}>
              <div style={{ fontSize: 11, letterSpacing: 1, color: "#7C9070", fontWeight: 700, marginBottom: 6 }}>{activeProduct.tagline.toUpperCase()} · {activeProduct.format}, {activeProduct.size}</div>
              <h2 className="yk-serif" style={{ fontSize: 26, fontWeight: 600, marginBottom: 10 }}>{activeProduct.name}</h2>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: "#4A3E2E", marginBottom: 18 }}>{activeProduct.short}</p>
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "#8A6B3D", marginBottom: 8 }}>INGREDIENTS</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {activeProduct.ingredients.map((ing) => (
                    <span key={ing} style={{ fontSize: 12, background: "#ECE4D3", padding: "5px 10px", borderRadius: 20, color: "#4A3E2E" }}>{ing}</span>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 22 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "#8A6B3D", marginBottom: 10 }}>THE RITUAL</div>
                {activeProduct.ritual.map((step, idx) => (
                  <div key={idx} style={{ display: "flex", gap: 10, fontSize: 13.5, marginBottom: 8, color: "#4A3E2E" }}>
                    <span className="yk-serif" style={{ color: "#C9A063", fontWeight: 600 }}>{String(idx + 1).padStart(2, "0")}</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 18 }}>
                <span className="yk-serif" style={{ fontSize: 22, fontWeight: 600 }}>{money(activeProduct.price)}</span>
                {activeProduct.oldPrice && <span style={{ fontSize: 14, color: "#A99B85", textDecoration: "line-through" }}>{money(activeProduct.oldPrice)}</span>}
              </div>
              <button className="yk-btn-gold" style={{ width: "100%", padding: "13px 0", borderRadius: 2, fontSize: 13.5 }}
                onClick={() => { addToCart(activeProduct, 1); setActiveProduct(null); }}>
                ADD TO BASKET
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: "#0F2E22", color: "#F4EFE4", padding: "12px 22px", borderRadius: 4, fontSize: 13, zIndex: 60, boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }}>
          {toast}
        </div>
      )}
    </div>
  );
}
