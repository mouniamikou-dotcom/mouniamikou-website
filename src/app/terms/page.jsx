import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

const TermsOfService = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 text-gray-900">
        <div className="bg-primary text-white py-16 text-center">
          <h1 className="text-5xl font-bold">Terms of Service</h1>
        </div>
        <div className="max-w-5xl mx-auto py-12 px-6">
          <section className="mb-10 bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-semibold text-primary mb-4">1. Introduction</h2>
            <p>Welcome to the website of Maître Mounia Mikou, Attorney at Law registered with the Paris Bar (France) and registered with the Lisbon Bar (Portugal). These Terms of Service govern your use of our website and professional services. By accessing or using our site, you acknowledge that you have read, understood, and agree to be bound by these terms.</p>
          </section>

          <section className="mb-10 bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-semibold text-primary mb-4">2. Professional Status and Regulation</h2>
            <ul className="list-disc pl-5">
              <li>Registered with the Paris Bar (France) since 2018</li>
              <li>Registered with the Lisbon Bar (Portugal)</li>
              <li>Subject to the ethical rules and professional regulations of both jurisdictions</li>
              <li>Holder of professional indemnity insurance in compliance with bar requirements</li>
            </ul>
          </section>

          <section className="mb-10 bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-semibold text-primary mb-4">3. Nature of Services</h2>
            <p>We provide legal consulting services in real estate, corporate, and tax law, specializing in:</p>
            <ul className="list-disc pl-5">
              <li>Settling in Portugal (visa applications, relocation assistance)</li>
              <li>Real Estate Investment (property transactions)</li>
              <li>Business Creation (company formation)</li>
            </ul>
            <p>The content provided on this site is for informational purposes only and does not constitute legal advice. No attorney-client relationship is formed merely by accessing this website or contacting the firm without an explicit agreement of representation.</p>
          </section>

          <section className="mb-10 bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-semibold text-primary mb-4">4. Fee Structure and Billing</h2>
            <h3 className="text-2xl font-semibold text-primary-dark mb-3">4.1 Fee Arrangements</h3>
            <p>Our fees are established based on the complexity of the matter, time invested, urgency, and expertise required. Fee structures may include:</p>
            <ul className="list-disc pl-5">
              <li>Fixed fees for certain standardized services</li>
              <li>Hourly rates for custom legal services</li>
            </ul>
            <h3 className="text-2xl font-semibold text-primary-dark mb-3">4.2 Payment Terms</h3>
            <ul className="list-disc pl-5">
              <li>Detailed fee information will be provided prior to engagement</li>
              <li>A formal engagement letter detailing services and fees will be issued before commencing work</li>
              <li>Payment methods include bank transfer and other secure electronic payment options</li>
              <li>For certain matters, an advance payment may be required</li>
            </ul>
          </section>

          <section className="mb-10 bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-semibold text-primary mb-4">5. Confidentiality and Professional Secrecy</h2>
            <h3 className="text-2xl font-semibold text-primary-dark mb-3">5.1 Attorney-Client Privilege</h3>
            <p>All communications between our firm and clients are protected by attorney-client privilege and professional secrecy obligations under both French and Portuguese bar rules.</p>
            <h3 className="text-2xl font-semibold text-primary-dark mb-3">5.2 Exceptions</h3>
            <p>The duty of confidentiality may be limited, notably by legal obligations to report certain activities under applicable law.</p>
          </section>

          <section className="mb-10 bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-semibold text-primary mb-4">6. Data Protection and Privacy</h2>
            <h3 className="text-2xl font-semibold text-primary-dark mb-3">6.1 Data Collection and Use</h3>
            <ul className="list-disc pl-5">
              <li>We collect and process personal data in accordance with the General Data Protection Regulation (GDPR)</li>
              <li>Client data is collected only for legitimate professional purposes</li>
              <li>Data is retained only for the period necessary for the provision of services and compliance with legal obligations</li>
            </ul>
            <h3 className="text-2xl font-semibold text-primary-dark mb-3">6.2 Client Rights</h3>
            <ul className="list-disc pl-5">
              <li>Access their personal data</li>
              <li>Request rectification of inaccurate data</li>
              <li>Request deletion of data when legally permissible</li>
              <li>Withdraw consent to data processing</li>
              <li>File a complaint with relevant data protection authorities</li>
            </ul>
          </section>
          <section className="mb-10 bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-semibold text-primary mb-4">7. Conflict of Interest</h2>
            <p>We conduct conflict checks before accepting new clients or matters. We may decline representation if:</p>
            <ul className="list-disc pl-5">
              <li>A conflict of interest exists with current or former clients</li>
              <li>The representation would breach professional rules of conduct</li>
              <li>The matter falls outside our areas of expertise</li>
            </ul>
          </section>

          <section className="mb-10 bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-semibold text-primary mb-4">8. Electronic Communications</h2>
            <h3 className="text-2xl font-semibold text-primary-dark mb-3">8.1 Security</h3>
            <p>While we implement reasonable security measures, electronic communications cannot be guaranteed as completely secure. By communicating with us electronically, you accept this inherent risk.</p>
            <h3 className="text-2xl font-semibold text-primary-dark mb-3">8.2 Response Time</h3>
            <p>While we strive to respond promptly to all communications, please note that we cannot guarantee immediate responses to electronic communications.</p>
          </section>

          <section className="mb-10 bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-semibold text-primary mb-4">9. Limitation of Liability</h2>
            <h3 className="text-2xl font-semibold text-primary-dark mb-3">9.1 Website Content</h3>
            <p>The information provided on our website is general in nature and may not reflect current legal developments. We strive for accuracy but do not warrant the completeness, reliability, or accuracy of this information.</p>
            <h3 className="text-2xl font-semibold text-primary-dark mb-3">9.2 Professional Services</h3>
            <p>Our professional liability for legal services is limited to the extent permitted by the applicable rules of professional conduct and is covered by professional indemnity insurance.</p>
          </section>

          <section className="mb-10 bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-semibold text-primary mb-4">10. Termination of Services</h2>
            <p>Either party may terminate the attorney-client relationship subject to:</p>
            <ul className="list-disc pl-5">
              <li>Reasonable notice</li>
              <li>Payment of outstanding fees</li>
              <li>Compliance with applicable ethical rules regarding termination</li>
              <li>Return of client documents and property</li>
            </ul>
          </section>

          <section className="mb-10 bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-semibold text-primary mb-4">11. Governing Law and Jurisdiction</h2>
            <p>These Terms of Service are governed by French law. Any disputes arising from the use of our website shall be subject to the exclusive jurisdiction of the courts of Paris, France.</p>
            <p>Disputes related to professional services will be governed by the law specified in the engagement letter, with particular attention to applicable bar rules in relevant jurisdictions.</p>
          </section>

          <section className="mb-10 bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-semibold text-primary mb-4">12. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Users are encouraged to review the terms periodically.</p>
          </section>

          <section className="mb-10 bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-semibold text-primary mb-4">13. Contact Information</h2>
            <p>For any questions regarding these terms, please contact us at:</p>
            <p><strong>Mounia Mikou</strong></p>
            <p>Travessa Cova da Moura 2, R/C dir. 1350-118 Lisboa</p>
            <p>Lisbon, Portugal</p>
            <p>Email: <a href="mailto:mm@mouniamikou.com" className="text-blue-500">mm@mouniamikou.com</a></p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsOfService;
