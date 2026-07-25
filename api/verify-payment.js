// Verifies that a payment really came from Razorpay and wasn't faked
// by someone calling your success handler directly from the browser console.
// Then emails you (via Resend, free tier) a summary of the order.
import crypto from "crypto";

// Keep this in sync with the PRODUCTS list in create-order.js and App.jsx.
const PRODUCTS = {
  p1: { name: "Livovoraa Syrup", price: 198 },
  p2: { name: "Livovoraa Capsules", price: 298 },
  p3: { name: "Orthovoraa Syrup", price: 320 },
  p4: { name: "Orthovoraa Capsules", price: 330 },
  p5: { name: "Cystovoraa Syrup", price: 230 },
  p6: { name: "Cystovoraa Capsules", price: 310 },
  p7: { name: "Diavoraa Juice", price: 570 },
  p8: { name: "Diavoraa Capsules", price: 300 },
  p9: { name: "Fortifemvoraa Syrup", price: 210 },
  p10: { name: "Cardiovoraa Syrup", price: 375 },
};

async function sendOrderEmail({ orderId, items, customer, total }) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_NOTIFICATION_EMAIL;
  if (!apiKey || !to) {
    console.warn("RESEND_API_KEY or ORDER_NOTIFICATION_EMAIL not set — skipping email.");
    return;
  }

  const lines = items
    .map((i) => {
      const p = PRODUCTS[i.id];
      return p ? `${p.name} x${i.qty} — ₹${p.price * i.qty}` : `${i.id} x${i.qty}`;
    })
    .join("<br/>");

  const html = `
    <h2>New order — ${orderId}</h2>
    <p><strong>Total:</strong> ₹${total}</p>
    <p><strong>Items:</strong><br/>${lines}</p>
    <p><strong>Customer:</strong><br/>
      ${customer?.name || "-"}<br/>
      ${customer?.phone || "-"}<br/>
      ${customer?.address || "-"}, ${customer?.pincode || "-"}
    </p>
  `;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      // Resend's shared test sender — swap for a verified domain address later.
      from: "orders@resend.dev",
      to,
      subject: `New Ayuevoraa order — ${orderId}`,
      html,
    }),
  }).catch((e) => console.error("Resend email failed:", e));
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, items, customer } = req.body;
    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expected !== razorpay_signature) {
      return res.status(400).json({ verified: false, error: "Signature mismatch" });
    }

    // Signature is valid — this is a genuine, paid order. Total is recomputed
    // here from trusted server-side prices, not trusted from the client.
    const total = (items || []).reduce((sum, i) => {
      const p = PRODUCTS[i.id];
      return p ? sum + p.price * (i.qty || 1) : sum;
    }, 0);

    await sendOrderEmail({ orderId: razorpay_order_id, items: items || [], customer, total });

    return res.status(200).json({ verified: true, orderId: razorpay_order_id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ verified: false, error: "Verification failed" });
  }
}
