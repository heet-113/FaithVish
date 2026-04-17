import React from 'react';

const TermsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-black text-text-primary mb-6">Terms of Service</h1>
      
      <div className="prose max-w-none text-text-muted space-y-6">
        <p><strong>Effective Date:</strong> {new Date().toLocaleDateString()}</p>
        
        <p>
          Welcome to FaithVish. By accessing or using our website, you agree to comply with and be bound by the 
          following Terms of Service. If you do not agree, please do not use our site.
        </p>

        <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">1. Nature of the Service</h2>
        <p>
          FaithVish is a jewelry curation and affiliate marketing website. <strong>We are not a retailer, distributor, or manufacturer.</strong> 
          We do not directly sell any products, manage inventory, or handle payment processing and order fulfillment. 
          Any transactions you make are strictly with the respective third-party jewelry retailers.
        </p>

        <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">2. Accuracy of Information</h2>
        <p>
          While we strive to keep pricing and product availability information as accurate and up-to-date as possible, 
          these details change rapidly on third-party sites. As a result:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>We are <strong>not responsible for the price accuracy</strong> on third-party sites.</li>
          <li>We make <strong>no warranties or guarantees</strong> regarding product availability, specifications, or pricing.</li>
          <li>Always verify the final price, shipping costs, and conditions directly on the retailer's checkout page before completing a purchase.</li>
        </ul>

        <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">3. Affiliate Relationship Disclosure</h2>
        <p>
          FaithVish participates in affiliate marketing programs. <strong>We may earn a commission when you click links to retailer sites and make a purchase.</strong> 
          This comes at no extra cost to you. Our participation in these programs does not influence which jewelry pieces we feature, 
          as our primary goal is to curate beautiful and trustworthy jewelry for you.
        </p>

        <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">4. Age Restrictions</h2>
        <p>
          By using our service, you affirm that you are at least 18 years of age, or have the legal consent of a parent or guardian. 
          Use of our platform by minors without parental consent is prohibited.
        </p>

        <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">5. Governing Law</h2>
        <p>
          These Terms of Service and any separate agreements whereby we provide you services shall be governed by and 
          construed in accordance with the laws of India. Any disputes arising out of the use of our service shall be 
          subject to the exclusive jurisdiction of the courts located within India.
        </p>

        <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">6. Contact Us</h2>
        <p>
          For any questions regarding these Terms, please contact us at:
        </p>
        <p>
          <a href="mailto:privacy@faithvish.com" className="text-accent underline font-medium hover:text-accent-hover transition-colors">
            privacy@faithvish.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default TermsPage;
