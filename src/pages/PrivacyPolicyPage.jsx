import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-black text-text-primary mb-6">Privacy Policy</h1>
      
      <div className="prose max-w-none text-text-muted space-y-6">
        <p><strong>Effective Date:</strong> {new Date().toLocaleDateString()}</p>
        
        <p>
          Welcome to FaithVish. Your privacy is important to us. This Privacy Policy explains how we collect, 
          use, disclose, and safeguard your information when you visit our website.
        </p>

        <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">1. Information We Collect</h2>
        <p>
          We may collect certain information automatically when you visit our site, including:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Usage Data:</strong> We may collect information about how you navigate and use our site, including search queries, page views, and click interactions.</li>
          <li><strong>Device Information:</strong> We may collect IP addresses, browser types, and device identifiers to ensure optimal platform experience.</li>
          <li><strong>Cookies and Tracking Technologies:</strong> We use cookies to improve user experience and analyze site traffic. You can manage cookie preferences through your browser settings.</li>
        </ul>

        <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">2. How We Use Your Data</h2>
        <p>Your information is primarily used to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Provide, operate, and maintain our jewelry curation platform.</li>
          <li>Improve, personalize, and expand our website.</li>
          <li>Understand and analyze how you use our site.</li>
          <li>Monitor analytics and usage patterns.</li>
        </ul>
        <p className="font-semibold text-text-primary mt-4">
          Note: We do not sell any personally identifiable information (PII) to third parties.
        </p>

        <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">3. Third-Party Links & Disclaimer</h2>
        <p>
          FaithVish contains links to third-party jewelry retailers (such as Amazon, Flipkart, Tanishq, CaratLane, etc.). 
          We are not responsible for the privacy practices or content of these external sites. Once you leave our site 
          to make a purchase, any information you provide is subject to the third party's privacy policy. Please review 
          their policies before submitting any personal data.
        </p>

        <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">4. Affiliate Disclosure</h2>
        <p>
          FaithVish participates in various affiliate marketing programs. We may earn a commission when you click on 
          links to retailer sites and make a qualifying purchase. This occurs at absolutely no extra cost to you. 
          Tracking mechanisms (like cookies) are used by these affiliate programs to track traffic and sales originating 
          from our site.
        </p>

        <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">5. Contact Us</h2>
        <p>
          If you have any questions or concerns regarding this Privacy Policy or our data practices, please contact us at:
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

export default PrivacyPolicyPage;
