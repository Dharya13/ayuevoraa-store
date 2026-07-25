import React from "react";
import { ArrowLeft } from "lucide-react";
import { BUSINESS } from "./business.js";

function LegalShell({ title, onBack, children }) {
  return (
    <section style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 90px" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", display: "flex", alignItems: "center", gap: 6, color: "#5A4E3C", cursor: "pointer", marginBottom: 24, fontSize: 13 }}>
        <ArrowLeft size={16} /> Back to shop
      </button>
      <h1 className="yk-serif" style={{ fontSize: 28, fontWeight: 600, marginBottom: 6 }}>{title}</h1>
      <p style={{ fontSize: 12.5, color: "#8A7A5E", marginBottom: 28 }}>Last updated: {BUSINESS.lastUpdated}</p>
      <div style={{ fontSize: 14.5, lineHeight: 1.75, color: "#3A2F22", display: "grid", gap: 16 }}>
        {children}
      </div>
    </section>
  );
}

export function TermsPage({ onBack }) {
  return (
    <LegalShell title="Terms & Conditions" onBack={onBack}>
      <p>
        These terms govern your use of the {BUSINESS.brandName} website, operated by{" "}
        {BUSINESS.legalName}. By placing an order, you agree to these terms.
      </p>
      <p>
        <strong>Products.</strong> All products are Ayurvedic wellness formulations intended to
        support general wellbeing. They are not a substitute for medical diagnosis or treatment.
        Please consult a qualified physician before use, especially if pregnant, nursing, or on
        existing medication.
      </p>
      <p>
        <strong>Orders.</strong> An order is confirmed only once payment is successfully verified.
        We reserve the right to cancel any order due to stock unavailability, pricing errors, or
        suspected fraud, with a full refund issued in such cases.
      </p>
      <p>
        <strong>Pricing.</strong> All prices are listed in INR and are inclusive of applicable taxes
        unless stated otherwise. We may update prices at any time; the price at checkout is final.
      </p>
      <p>
        <strong>Limitation of liability.</strong> {BUSINESS.legalName} is not liable for indirect or
        consequential loss arising from product use. Our liability is limited to the order value.
      </p>
      <p>
        <strong>Governing law.</strong> These terms are governed by the laws of India, with courts
        in {BUSINESS.address} having jurisdiction.
      </p>
      <p>
        Questions? Contact us at {BUSINESS.supportEmail} or {BUSINESS.supportPhone}.
      </p>
    </LegalShell>
  );
}

export function PrivacyPage({ onBack }) {
  return (
    <LegalShell title="Privacy Policy" onBack={onBack}>
      <p>
        {BUSINESS.legalName} ("we", "us") respects your privacy. This policy explains what
        information we collect and how we use it when you shop with {BUSINESS.brandName}.
      </p>
      <p>
        <strong>What we collect.</strong> Name, phone number, delivery address, and pincode at
        checkout. Payment details are handled entirely by Razorpay — we never see or store your
        card, UPI, or bank information.
      </p>
      <p>
        <strong>How we use it.</strong> Solely to process, ship, and communicate about your order.
        We do not sell or rent your personal information to third parties.
      </p>
      <p>
        <strong>Storage.</strong> Order details are retained for as long as needed for accounting,
        warranty, and legal purposes, in line with Indian data protection requirements.
      </p>
      <p>
        <strong>Your rights.</strong> You may request access to, correction of, or deletion of your
        personal data by emailing {BUSINESS.supportEmail}.
      </p>
      <p>
        <strong>Cookies.</strong> This site may use basic cookies to keep your cart working across
        visits. No third-party advertising trackers are used at this time.
      </p>
    </LegalShell>
  );
}

export function RefundPage({ onBack }) {
  return (
    <LegalShell title="Refund & Return Policy" onBack={onBack}>
      <p>
        We want you to feel confident buying from {BUSINESS.brandName}. Because our products are
        consumable wellness items, returns are handled carefully for hygiene and safety reasons.
      </p>
      <p>
        <strong>Eligibility.</strong> Returns are accepted within {BUSINESS.returnWindowDays} days
        of delivery, only for items that are unopened, unused, and in their original sealed
        packaging. Opened consumables cannot be returned unless defective.
      </p>
      <p>
        <strong>Damaged or wrong items.</strong> If you receive a damaged, defective, or incorrect
        item, contact {BUSINESS.supportEmail} within 48 hours of delivery with photos — we'll
        replace it or issue a full refund at no cost to you.
      </p>
      <p>
        <strong>Refund process.</strong> Approved refunds are credited to the original payment
        method via Razorpay within 5–7 business days of us receiving the returned item.
      </p>
      <p>
        <strong>Cancellations.</strong> Orders can be cancelled free of charge before they are
        shipped. Once shipped, the standard return process above applies.
      </p>
    </LegalShell>
  );
}

export function ShippingPage({ onBack }) {
  return (
    <LegalShell title="Shipping Policy" onBack={onBack}>
      <p>
        <strong>Where we ship.</strong> We currently ship to {BUSINESS.shipsTo}.
      </p>
      <p>
        <strong>Delivery time.</strong> Orders are typically delivered within{" "}
        {BUSINESS.deliveryEstimate} of dispatch, depending on your location.
      </p>
      <p>
        <strong>Shipping charges.</strong> {BUSINESS.shippingFee}.
      </p>
      <p>
        <strong>Order tracking.</strong> Once your order ships, you'll receive tracking details via
        the contact information provided at checkout.
      </p>
      <p>
        <strong>Delays.</strong> While we aim to meet the estimates above, delivery times may vary
        due to courier delays, weather, or regional restrictions outside our control.
      </p>
      <p>
        Questions about a specific order? Reach us at {BUSINESS.supportEmail}.
      </p>
    </LegalShell>
  );
}
