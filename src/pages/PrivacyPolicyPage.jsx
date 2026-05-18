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
          FaithVish contains links to third-party jewelry retailers (such as Amazon, Nykaa Fashion, Flipkart, Tanishq,
          CaratLane, and others). We are not responsible for the privacy practices or content of these external sites.
          Once you leave our site to make a purchase, any information you provide is subject to the third party's privacy
          policy. Please review their policies before submitting any personal data.
        </p>
        <p>
          We also use <strong>Cuelinks</strong>, an affiliate marketing network, which may automatically convert certain
          outbound links on our site into tracked affiliate links. Cuelinks operates independently and has its own privacy
          policy, which can be found at{' '}
          <a href="https://www.cuelinks.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent underline">cuelinks.com/privacy</a>.
        </p>

        <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">4. Affiliate Disclosure</h2>
        <p>
          FaithVish participates in the following affiliate marketing programs:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Amazon Associates Program</strong> — We are a participant in the Amazon Services LLC Associates
            Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees
            by advertising and linking to Amazon.in. As an Amazon Associate, FaithVish earns from qualifying purchases.
          </li>
          <li>
            <strong>Cuelinks Affiliate Network</strong> — We use Cuelinks, which automatically converts eligible
            outbound product links into affiliate-tracked links. This may apply to links pointing to platforms beyond
            Amazon, including other e-commerce websites. Cuelinks uses cookies and similar technologies to track
            referrals and attribute commissions.
          </li>
        </ul>
        <p className="mt-3">
          All commissions are earned from the respective retailers and come at <strong>absolutely no extra cost to
          you</strong>. These tracking mechanisms (cookies) are used solely to track traffic and sales originating
          from our site for commission purposes.
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
