import React from 'react';
import useStore from '../store/useStore';

const AboutPage = () => {
  const { activeGender } = useStore();
  const isMen = activeGender === 'men';

  const m = {
    bg: '#1E1E20',
    card: '#282828',
    border: '#3A3A3C',
    gold: '#C9A96E',
    textPrimary: '#F5F5F0',
    textSecondary: '#9A9A9A',
    textMuted: '#6B6B6B',
  };

  const theme = {
    textPrimary: isMen ? m.textPrimary : 'var(--color-text-primary)',
    textMuted: isMen ? m.textSecondary : 'var(--color-text-muted)',
    accent: isMen ? m.gold : 'var(--color-accent)',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1
        className="text-3xl font-black mb-6 font-serif uppercase tracking-widest"
        style={{ color: theme.textPrimary }}
      >
        About Us
      </h1>

      <div
        className="prose max-w-none space-y-6"
        style={{ color: theme.textMuted }}
      >
        <p>
          Welcome to <strong style={{ color: theme.accent }}>FaithVish</strong>, your curated destination for discovering beautiful jewelry from India's most trusted brands and retailers.
          We believe that every woman deserves to find the perfect piece of jewelry, whether it's for a special occasion, a wedding, or everyday elegance.
        </p>

        <h2
          className="text-2xl font-bold mt-8 mb-4 font-serif uppercase tracking-wider"
          style={{ color: theme.textPrimary }}
        >
          What We Do
        </h2>
        <p>
          FaithVish handpicks jewelry from top retailers across India, from heritage brands like Tanishq and Kalyan Jewellers to popular online
          destinations like Amazon, Flipkart, Myntra, and CaratLane. We curate the best pieces across every category: rings, necklaces, earrings,
          bracelets, bangles, pendants, anklets, and mangalsutras.
        </p>

        <h2
          className="text-2xl font-bold mt-8 mb-4 font-serif uppercase tracking-wider"
          style={{ color: theme.textPrimary }}
        >
          Why Choose FaithVish?
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong style={{ color: theme.textPrimary }}>Curated Collections:</strong> Every piece is handpicked by our team for quality, design, and value.</li>
          <li><strong style={{ color: theme.textPrimary }}>Trusted Retailers:</strong> We only feature jewelry from well-known, reputed brands and platforms.</li>
          <li><strong style={{ color: theme.textPrimary }}>All Budgets:</strong> From affordable everyday pieces starting at ₹500 to premium investment jewelry.</li>
          <li><strong style={{ color: theme.textPrimary }}>Free to Browse:</strong> Our platform is entirely free. Simply find what you love and shop directly from the retailer.</li>
        </ul>

        <h2
          className="text-2xl font-bold mt-8 mb-4 font-serif uppercase tracking-wider"
          style={{ color: theme.textPrimary }}
        >
          Affiliate Disclosure
        </h2>
        <p>
          FaithVish participates in affiliate marketing programs. When you click on a product link and make a purchase on the retailer's website,
          we may earn a small commission at no additional cost to you. This commission helps us maintain the website and continue curating beautiful
          jewelry for you. We are committed to transparency. Our product recommendations are based on quality and value, not commission rates.
        </p>

        <h2
          className="text-2xl font-bold mt-8 mb-4 font-serif uppercase tracking-wider"
          style={{ color: theme.textPrimary }}
        >
          Our Promise
        </h2>
        <p>
          We are passionate about making jewelry discovery a joyful experience. Every piece featured on FaithVish is chosen with care, and we
          strive to provide accurate pricing and product information. However, since products are sold by third-party retailers, we recommend
          verifying all details on the retailer's website before making a purchase.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
