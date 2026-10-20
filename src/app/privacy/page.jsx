import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 text-gray-900">
        <div className="bg-primary text-white pt-24 pb-12 text-center">
          <h1 className="text-5xl font-bold">Privacy Policy</h1>
        </div>
        <div className="max-w-4xl mx-auto py-12 px-6">
          <section className="mb-10 bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold text-primary mb-4">1. Introduction</h2>
            <p>This Privacy Policy explains how Mounia Mikou, Attorney at Law registered with the Paris Bar and the Lisbon Bar, collects, uses, and protects your personal data when you visit our website or use our legal services.</p>
          </section>

          <section className="mb-10 bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold text-primary mb-4">2. Data Controller</h2>
            <p><strong>Controller:</strong> Mounia Mikou</p>
            <p><strong>Address:</strong> Travessa Cova da Moura 2, R/C dir. 1350-118 Lisboa, Portugal</p>
            <p><strong>Email:</strong> mm@mouniamikou.com</p>
          </section>

          <section className="mb-10 bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold text-primary mb-4">3. Data We Collect</h2>
            <ul className="list-disc pl-5">
              <li>Contact information (name, email, phone number)</li>
              <li>Information related to your legal needs</li>
              <li>Navigation data and cookies</li>
            </ul>
          </section>

          <section className="mb-10 bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold text-primary mb-4">4. Legal Basis</h2>
            <ul className="list-disc pl-5">
              <li>Contract performance</li>
              <li>Consent</li>
              <li>Legitimate interest</li>
              <li>Legal obligations</li>
            </ul>
          </section>

          <section className="mb-10 bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold text-primary mb-4">5. How We Use Your Data</h2>
            <ul className="list-disc pl-5">
              <li>To provide legal services</li>
              <li>To respond to your inquiries</li>
              <li>To comply with legal and professional obligations</li>
              <li>To improve our services</li>
            </ul>
          </section>

          <section className="mb-10 bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold text-primary mb-4">6. Professional Secrecy</h2>
            <p>All information shared with us is protected by attorney-client privilege in accordance with the rules of the Paris and Lisbon Bars.</p>
          </section>

          <section className="mb-10 bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold text-primary mb-4">7. Data Recipients</h2>
            <ul className="list-disc pl-5">
              <li>Authorized personnel</li>
              <li>Technical service providers</li>
              <li>Public authorities when legally required</li>
              <li>Other legal professionals with your prior consent</li>
            </ul>
          </section>

          <section className="mb-10 bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold text-primary mb-4">8. Data Retention</h2>
            <ul className="list-disc pl-5">
              <li>Prospective clients: 3 years from last contact</li>
              <li>Clients: 5 years after end of services for management data, up to 10 years for legal documents</li>
              <li>Navigation data: up to 13 months</li>
            </ul>
          </section>

          <section className="mb-10 bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold text-primary mb-4">9. Your Rights</h2>
            <ul className="list-disc pl-5">
              <li>Access, rectification, and erasure of your data</li>
              <li>Limitation of processing</li>
              <li>Data portability</li>
              <li>Objection to processing</li>
              <li>Withdrawal of consent</li>
            </ul>
            <p>To exercise these rights, contact <strong>mm@mouniamikou.com</strong>.</p>
          </section>

          <section className="mb-10 bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold text-primary mb-4">10. Security Measures</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access or alteration.</p>
          </section>

          <section className="mb-10 bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold text-primary mb-4">11. Updates</h2>
            <p>We may update this policy periodically. Any changes will be posted on this page.</p>
            <p><strong>Last updated:</strong> March 25, 2025</p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
