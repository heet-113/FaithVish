import { Link } from 'react-router-dom';
import useStore from '../store/useStore';

const AffiliateDisclosurePage = () => {
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
    textSecondary: isMen ? m.textSecondary : 'var(--color-text-secondary)',
    textMuted: isMen ? m.textMuted : 'var(--color-text-muted)',
    accent: isMen ? m.gold : 'var(--color-accent)',
    accentHover: isMen ? m.goldLight : 'var(--color-accent-light)',
    cardBg: isMen ? m.card : '#ffffff',
    cardBorder: isMen ? m.border : 'var(--color-border)',
    alertBg: isMen ? 'rgba(201, 169, 110, 0.08)' : 'rgba(var(--color-accent-rgb), 0.05)',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-6" style={{ color: theme.textMuted }}>
        <Link 
          to="/" 
          className="transition-colors"
          style={{ color: theme.textMuted }}
          onMouseEnter={(e) => e.target.style.color = theme.textPrimary}
          onMouseLeave={(e) => e.target.style.color = theme.textMuted}
        >
          Home
        </Link>
        <span>/</span>
        <span style={{ color: theme.textSecondary }}>Affiliate Disclosure</span>
      </nav>

      <h1 
        className="text-3xl font-black mb-2 font-serif uppercase tracking-widest"
        style={{ color: theme.textPrimary }}
      >
        Affiliate Disclosure
      </h1>
      <div className="w-16 h-[3px] mb-6" style={{ backgroundColor: theme.accent }}></div>

      <div className="prose max-w-none space-y-6" style={{ color: theme.textMuted }}>
        <p><strong style={{ color: theme.textPrimary }}>Last Updated:</strong> April 2026</p>

        <div 
          className="border-l-4 p-5 my-6"
          style={{ 
            backgroundColor: theme.alertBg, 
            borderLeftColor: theme.accent 
          }}
        >
          <p className="text-sm leading-relaxed font-medium" style={{ color: theme.textSecondary }}>
            <strong style={{ color: theme.textPrimary }}>In plain language:</strong> FaithVish earns money when you click our product links and buy something on Amazon.
            This costs you absolutely nothing extra. We only recommend products we genuinely believe are worth your money,
            and we clearly disclose this relationship on every page.
          </p>
        </div>

        <h2 
          className="text-2xl font-bold mt-8 mb-4 font-serif uppercase tracking-wider"
          style={{ color: theme.textPrimary }}
        >
          What Are Affiliate Links?
        </h2>
        <p>
          Throughout this website, you'll find links to products on Amazon India and other retail platforms.
          These are special tracking links called "affiliate links." When you click on one of these links and make a purchase
          on the retailer's website, FaithVish may receive a small referral commission from the retailer.
        </p>
        <p>
          <strong style={{ color: theme.textPrimary }}>This commission comes from the retailer, not from you.</strong> The price you pay is exactly the same
          whether you use our link or go directly to the retailer's website. Affiliate marketing is a standard online business model
          used by most product review and recommendation websites.
        </p>

        <h2 
          className="text-2xl font-bold mt-8 mb-4 font-serif uppercase tracking-wider"
          style={{ color: theme.textPrimary }}
        >
          Affiliate Programs We Participate In
        </h2>
        <div className="border p-5 my-4 rounded-sm animate-fade-in-up" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
          <h3 className="text-sm font-bold mb-3 uppercase tracking-wider font-serif" style={{ color: theme.textPrimary }}>Cuelinks</h3>
          <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
            We also use Cuelinks, an affiliate network that automatically converts eligible product links into affiliate links.
            This may apply to links pointing to platforms beyond Amazon, including other e-commerce websites.
          </p>
        </div>

        <div className="border p-5 my-4 rounded-sm animate-fade-in-up" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
          <h3 className="text-sm font-bold mb-3 uppercase tracking-wider font-serif" style={{ color: theme.textPrimary }}>INRDeals</h3>
          <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
            We also utilize INRDeals, an affiliate marketing platform that automatically transforms eligible outbound product links into affiliate links. 
            This allows us to earn referral commissions when you shop on partnered retail websites.
          </p>
        </div>

        <h2 
          className="text-2xl font-bold mt-8 mb-4 font-serif uppercase tracking-wider"
          style={{ color: theme.textPrimary }}
        >
          How This Affects Our Content
        </h2>
        <p>
          Our product recommendations, reviews, and rankings are based on the following real, publicly available data:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong style={{ color: theme.textPrimary }}>Amazon buyer ratings</strong> — the star ratings given by verified purchasers</li>
          <li><strong style={{ color: theme.textPrimary }}>Review volume</strong> — the number of buyer reviews, indicating how well-tested a product is</li>
          <li><strong style={{ color: theme.textPrimary }}>Product specifications</strong> — materials, construction, and features as listed by the seller</li>
          <li><strong style={{ color: theme.textPrimary }}>Price and value</strong> — what you get relative to what you pay</li>
          <li><strong style={{ color: theme.textPrimary }}>Our editorial analysis</strong> — based on the above data points, not hands-on testing</li>
        </ul>
        <p className="font-semibold mt-4" style={{ color: theme.textPrimary }}>
          We do not accept payment from any brand, seller, or manufacturer to feature, rank, or positively review their products.
          Commission rates do not influence which products we recommend or how we rank them.
        </p>

        <h2 
          className="text-2xl font-bold mt-8 mb-4 font-serif uppercase tracking-wider"
          style={{ color: theme.textPrimary }}
        >
          What We Don't Do
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>We <strong>do not</strong> physically test or handle the products we review. Our reviews are editorial, based on available data.</li>
          <li>We <strong>do not</strong> sell any products directly. All purchases happen on the retailer's website.</li>
          <li>We <strong>do not</strong> guarantee product quality, pricing accuracy, or availability. These change on the retailer's end.</li>
          <li>We <strong>do not</strong> accept sponsored placements or paid rankings.</li>
        </ul>

        <h2 
          className="text-2xl font-bold mt-8 mb-4 font-serif uppercase tracking-wider"
          style={{ color: theme.textPrimary }}
        >
          Your Trust Matters
        </h2>
        <p>
          FaithVish exists to help you make informed jewellery buying decisions. Our business model only works if you trust our recommendations.
          That's why we:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Include honest pros <em>and</em> cons for every product — we don't hide negatives</li>
          <li>Show real buyer ratings and review counts from Amazon</li>
          <li>Flag products with low ratings or limited reviews</li>
          <li>Clearly label all outbound links as leading to the retailer's website</li>
          <li>Display this affiliate disclosure prominently across the site</li>
        </ul>

        <h2 
          className="text-2xl font-bold mt-8 mb-4 font-serif uppercase tracking-wider"
          style={{ color: theme.textPrimary }}
        >
          Questions?
        </h2>
        <p>
          If you have any questions about our affiliate relationships or how we make money, feel free to reach out:
        </p>
        <p>
          <Link 
            to="/contact" 
            className="underline font-medium transition-colors"
            style={{ color: theme.accent }}
          >
            Contact Us →
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AffiliateDisclosurePage;
