import React from 'react';
import useStore from '../store/useStore';

const PrivacyPolicyPage = () => {
  const { activeGender } = useStore();
  const isMen = activeGender === 'men';

  const m = {
    bg: '#1E1E20',
    card: '#282828',
    border: '#3A3A3C',
    gold: '#C9A96E',
    goldLight: '#D4BA82',
    textPrimary: '#F5F5F0',
    textSecondary: '#9A9A9A',
    textMuted: '#6B6B6B',
  };

  const theme = {
    textPrimary: isMen ? m.textPrimary : 'var(--color-text-primary)',
    textMuted: isMen ? m.textSecondary : 'var(--color-text-muted)',
    accent: isMen ? m.gold : 'var(--color-accent)',
    accentHover: isMen ? m.goldLight : 'var(--color-accent-hover)',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 
        className="text-3xl font-black mb-6 font-serif uppercase tracking-widest"
        style={{ color: theme.textPrimary }}
      >
        Privacy Policy
      </h1>
      
      <div 
        className="prose max-w-none space-y-6"
        style={{ color: theme.textMuted }}
      >
        <p><strong style={{ color: theme.textPrimary }}>Effective Date:</strong> {new Date().toLocaleDateString()}</p>
        
        <p>
          Welcome to FaithVish. Your privacy is important to us. This Privacy Policy explains how we collect, 
          use, disclose, and safeguard your information when you visit our website.
        </p>

        <h2 
          className="text-2xl font-bold mt-8 mb-4 font-serif uppercase tracking-wider"
          style={{ color: theme.textPrimary }}
        >
          1. Information We Collect
        </h2>
        <p>
          We may collect certain information automatically when you visit our site, including:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong style={{ color: theme.textPrimary }}>Usage Data:</strong> We may collect information about how you navigate and use our site, including search queries, page views, and click interactions.</li>
          <li><strong style={{ color: theme.textPrimary }}>Device Information:</strong> We may collect IP addresses, browser types, and device identifiers to ensure optimal platform experience.</li>
          <li><strong style={{ color: theme.textPrimary }}>Cookies and Tracking Technologies:</strong> We use cookies to improve user experience and analyze site traffic. You can manage cookie preferences through your browser settings.</li>
        </ul>

        <h2 
          className="text-2xl font-bold mt-8 mb-4 font-serif uppercase tracking-wider"
          style={{ color: theme.textPrimary }}
        >
          2. How We Use Your Data
        </h2>
        <p>Your information is primarily used to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Provide, operate, and maintain our jewelry curation platform.</li>
          <li>Improve, personalize, and expand our website.</li>
          <li>Understand and analyze how you use our site.</li>
          <li>Monitor analytics and usage patterns.</li>
        </ul>
        <p className="font-semibold mt-4" style={{ color: theme.textPrimary }}>
          Note: We do not sell any personally identifiable information (PII) to third parties.
        </p>

        <h2 
          className="text-2xl font-bold mt-8 mb-4 font-serif uppercase tracking-wider"
          style={{ color: theme.textPrimary }}
        >
          3. Third-Party Links & Disclaimer
        </h2>
        <p>
          FaithVish contains links to third-party jewelry retailers (such as Amazon, Nykaa Fashion, Flipkart, Tanishq,
          CaratLane, and others). We are not responsible for the privacy practices or content of these external sites.
          Once you leave our site to make a purchase, any information you provide is subject to the third party's privacy
          policy. Please review their policies before submitting any personal data.
        </p>
        <p>
          We also use <strong>Cuelinks</strong> and <strong>INRDeals</strong>, affiliate marketing networks, which may automatically convert certain
          outbound links on our site into tracked affiliate links. They operate independently and have their own privacy
          policies, which can be found at{' '}
          <a 
            href="https://www.cuelinks.com/privacy" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="underline transition-colors mr-2"
            style={{ color: theme.accent }}
          >
            cuelinks.com/privacy
          </a>{' '}
          and{' '}
          <a 
            href="https://inrdeals.com/privacy-policy" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="underline transition-colors ml-1"
            style={{ color: theme.accent }}
          >
            inrdeals.com/privacy-policy
          </a>.
        </p>

        <h2 
          className="text-2xl font-bold mt-8 mb-4 font-serif uppercase tracking-wider"
          style={{ color: theme.textPrimary }}
        >
          4. Affiliate Disclosure
        </h2>
        <p>
          FaithVish participates in the following affiliate marketing programs:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong style={{ color: theme.textPrimary }}>Amazon Associates Program</strong> — We are a participant in the Amazon Services LLC Associates
            Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees
            by advertising and linking to Amazon.in. As an Amazon Associate, FaithVish earns from qualifying purchases.
          </li>
          <li>
            <strong style={{ color: theme.textPrimary }}>Cuelinks Affiliate Network</strong> — We use Cuelinks, which automatically converts eligible
            outbound product links into affiliate-tracked links. This may apply to links pointing to platforms beyond
            Amazon, including other e-commerce websites. Cuelinks uses cookies and similar technologies to track
            referrals and attribute commissions.
          </li>
          <li>
            <strong style={{ color: theme.textPrimary }}>INRDeals Platform</strong> — We utilize INRDeals, which automatically converts eligible
            outbound links into affiliate links pointing to various e-commerce retailers, tracking user clicks and
            attributing referral commissions. INRDeals uses cookies and tracking technologies to attribute sales and referrals to our website.
          </li>
        </ul>
        <p className="mt-3">
          All commissions are earned from the respective retailers and come at <strong style={{ color: theme.textPrimary }}>absolutely no extra cost to
          you</strong>. These tracking mechanisms (cookies) are used solely to track traffic and sales originating
          from our site for commission purposes.
        </p>

        <h2 
          className="text-2xl font-bold mt-8 mb-4 font-serif uppercase tracking-wider"
          style={{ color: theme.textPrimary }}
        >
          5. Contact Us
        </h2>
        <p>
          If you have any questions or concerns regarding this Privacy Policy or our data practices, please contact us at:
        </p>
        <p>
          <a 
            href="mailto:privacy@faithvish.com" 
            className="underline font-medium transition-colors"
            style={{ color: theme.accent }}
          >
            privacy@faithvish.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
