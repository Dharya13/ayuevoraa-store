// Vercel serverless function — runs on the server, never in the browser.
// This is where your Razorpay Key SECRET lives (as an env var), so it's
// never exposed to anyone visiting the site.
import Razorpay from "razorpay";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { items } = req.body; // [{ id, qty }]
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "No items provided" });
    }

    // Prices are looked up server-side from a trusted source, never trusted
    // from the browser — this stops anyone tampering with the checkout total.
    // Keep this in sync with PRODUCTS in src/App.jsx and api/verify-payment.js.
    const PRODUCTS = {
      p1: 198,  // Livovoraa Syrup
      p2: 298,  // Livovoraa Capsules
      p3: 320,  // Orthovoraa Syrup
      p4: 330,  // Orthovoraa Capsules
      p5: 230,  // Cystovoraa Syrup
      p6: 310,  // Cystovoraa Capsules
      p7: 570,  // Diavoraa Juice
      p8: 300,  // Diavoraa Capsules
      p9: 210,  // Fortifemvoraa Syrup
      p10: 375, // Cardiovoraa Syrup
    };

    const amountRupees = items.reduce((sum, i) => {
      const price = PRODUCTS[i.id];
      if (!price) throw new Error(`Unknown product: ${i.id}`);
      return sum + price * (i.qty || 1);
    }, 0);

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: amountRupees * 100, // paise
      currency: "INR",
      receipt: "rcpt_" + Date.now(),
    });

    return res.status(200).json({ orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Could not create order" });
  }
}
