import { Link } from 'react-router-dom';
import useStore from '../store/useStore';
import { formatPrice, getDiscountPercentage } from '../utils/constants';

const TopRingsPage = () => {
  const { products, activeGender } = useStore();
  const isMen = activeGender === 'men';

  const m = {
    bg: '#1E1E20',
    card: '#282828',
    cardHover: '#303032',
    border: '#3A3A3C',
    gold: '#C9A96E',
    goldLight: '#D4BA82',
    textPrimary: '#F5F5F0',
    textSecondary: '#9A9A9A',
    textMuted: '#6B6B6B',
    surface: '#1A1A1C',
  };

  const theme = {
    textPrimary: isMen ? m.textPrimary : 'var(--color-text-primary)',
    textSecondary: isMen ? m.textSecondary : 'var(--color-text-secondary)',
    textMuted: isMen ? m.textMuted : 'var(--color-text-muted)',
    accent: isMen ? m.gold : 'var(--color-accent)',
    accentHover: isMen ? m.goldLight : 'var(--color-accent-light)',
    cardBg: isMen ? m.card : '#ffffff',
    cardBorder: isMen ? m.border : 'var(--color-border)',
    surfaceBg: isMen ? m.surface : 'var(--color-surface-light)',
    borderStyle: isMen ? `1px solid ${m.border}` : '1px solid var(--color-border)',
    alertBg: isMen ? 'rgba(201, 169, 110, 0.05)' : 'rgba(var(--color-accent-rgb), 0.05)',
  };

  // Get rings under ₹1000, sorted by rating (descending), then by reviewCount
  const affordableRings = products
    .filter((p) => p.category === 'Rings' && p.price <= 1000)
    .sort((a, b) => {
      const ratingDiff = (b.rating || 0) - (a.rating || 0);
      if (ratingDiff !== 0) return ratingDiff;
      return (b.reviewCount || 0) - (a.reviewCount || 0);
    });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8" style={{ color: theme.textSecondary }}>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-6" style={{ color: theme.textMuted }}>
        <Link to="/" className="transition-colors" style={{ color: theme.textMuted }} onMouseEnter={(e) => e.target.style.color = theme.textPrimary} onMouseLeave={(e) => e.target.style.color = theme.textMuted}>Home</Link>
        <span>/</span>
        <span>Buying Guides</span>
        <span>/</span>
        <span style={{ color: theme.textSecondary }}>Best Rings Under ₹1,000</span>
      </nav>

      {/* Hero */}
      <div 
        className="mb-10 text-center py-12 border-y-2"
        style={{ 
          borderColor: theme.cardBorder,
          backgroundImage: isMen 
            ? 'repeating-linear-gradient(45deg, rgba(201, 169, 110, 0.03) 0px, rgba(201, 169, 110, 0.03) 2px, rgba(40, 40, 40, 0.4) 2px, rgba(40, 40, 40, 0.4) 8px)'
            : 'repeating-linear-gradient(45deg, rgba(217,208,193,0.1) 0px, rgba(217,208,193,0.1) 2px, rgba(250,250,247,0.5) 2px, rgba(250,250,247,0.5) 8px)'
        }}
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] mb-3" style={{ color: theme.accent }}>Buying Guide</p>
        <h1 className="text-3xl sm:text-4xl font-black mb-4 font-serif uppercase tracking-widest leading-tight" style={{ color: theme.textPrimary }}>
          Best Rings Under <span style={{ color: theme.accent }}>₹1,000</span>
        </h1>
        <p className="text-sm max-w-2xl mx-auto mt-4 leading-relaxed" style={{ color: theme.textSecondary }}>
          Looking for a stylish ring without breaking the bank? We've analysed ratings, buyer reviews, materials, and value
          to rank the best affordable rings available on Amazon India right now. All prices verified at the time of writing.
        </p>
        <p className="text-[10px] mt-4 uppercase tracking-wider" style={{ color: theme.textMuted }}>
          Last updated: April 2026 · {affordableRings.length} rings reviewed
        </p>
      </div>

      {/* Quick Summary */}
      <div className="mb-10 p-6 border" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
        <h2 className="text-sm font-bold font-serif uppercase tracking-widest mb-4 pb-2 border-b" style={{ color: theme.textPrimary, borderColor: theme.cardBorder }}>
          Quick Summary
        </h2>
        <div className="space-y-3">
          {affordableRings.map((ring, index) => (
            <div key={ring.id} className="flex items-center gap-3 text-sm">
              <span 
                className="w-6 h-6 rounded-sm font-bold text-xs flex items-center justify-center shrink-0"
                style={{ 
                  backgroundColor: isMen ? 'rgba(201, 169, 110, 0.15)' : 'rgba(var(--color-accent-rgb), 0.1)', 
                  color: theme.accent 
                }}
              >
                {index + 1}
              </span>
              <span className="font-medium flex-1 truncate" style={{ color: theme.textPrimary }}>{ring.name}</span>
              <span className="font-bold shrink-0" style={{ color: theme.accent }}>{formatPrice(ring.price)}</span>
              <span className="text-xs shrink-0" style={{ color: theme.textMuted }}>
                {ring.rating ? `★ ${ring.rating}` : 'No rating'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Why Trust Us */}
      <div 
        className="mb-10 border p-6"
        style={{ 
          backgroundColor: theme.alertBg, 
          borderColor: theme.cardBorder
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div 
            className="w-10 h-10 rounded-sm flex items-center justify-center border"
            style={{ 
              backgroundColor: isMen ? 'rgba(201, 169, 110, 0.15)' : 'rgba(var(--color-accent-rgb), 0.1)',
              borderColor: isMen ? 'rgba(201, 169, 110, 0.3)' : 'rgba(var(--color-accent-rgb), 0.3)'
            }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: theme.accent }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-sm font-bold font-serif uppercase tracking-widest" style={{ color: theme.textPrimary }}>Why Trust This Guide?</h2>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
          Our rankings are based entirely on publicly available Amazon India data — star ratings, review counts, material specifications, and pricing. 
          <strong style={{ color: theme.textPrimary }}> No brand has paid us to feature or rank their product higher.</strong> We earn affiliate commissions 
          when you buy through our links, but commission rates do not influence our rankings.
        </p>
        <p className="text-[10px] mt-3 italic" style={{ color: theme.textMuted }}>Written by the FaithVish Editorial Team · contact@faithvish.com</p>
      </div>

      {/* How We Ranked */}
      <div 
        className="mb-10 border p-6"
        style={{ 
          backgroundColor: theme.alertBg, 
          borderColor: theme.cardBorder
        }}
      >
        <h2 className="text-sm font-bold font-serif uppercase tracking-widest mb-3" style={{ color: theme.textPrimary }}>
          How We Ranked These Rings
        </h2>
        <p className="text-sm leading-relaxed mb-3" style={{ color: theme.textSecondary }}>
          Our ranking considers four factors based on publicly available Amazon India data:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Buyer Rating', desc: 'Amazon star rating from verified buyers' },
            { label: 'Review Volume', desc: 'Number of buyer reviews — more reviews = more trust' },
            { label: 'Material Quality', desc: 'Stainless steel & silver rank above unspecified alloys' },
            { label: 'Value for Money', desc: 'What you get relative to what you pay' },
          ].map((factor, i) => (
            <div 
              key={i} 
              className="border p-3 text-center"
              style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}
            >
              <p className="text-xs font-bold mb-1" style={{ color: theme.textPrimary }}>{factor.label}</p>
              <p className="text-[10px]" style={{ color: theme.textMuted }}>{factor.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Reviews */}
      <div className="space-y-8">
        {affordableRings.map((ring, index) => {
          const discount = getDiscountPercentage(ring.price, ring.originalPrice);

          return (
            <article 
              key={ring.id} 
              className="border overflow-hidden" 
              id={`ring-${ring.id}`}
              style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}
            >
              {/* Rank Header */}
              <div 
                className="px-6 py-3 border-b flex items-center justify-between"
                style={{ backgroundColor: theme.surfaceBg, borderColor: theme.cardBorder }}
              >
                <div className="flex items-center gap-3">
                  <span 
                    className="w-8 h-8 rounded-sm font-bold text-sm flex items-center justify-center"
                    style={{ 
                      backgroundColor: theme.accent, 
                      color: isMen ? m.bg : '#ffffff' 
                    }}
                  >
                    #{index + 1}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: theme.textSecondary }}>
                    {index === 0 ? 'Best Overall' : index === 1 ? 'Most Popular' : 'Great Value'}
                  </span>
                </div>
                {ring.rating && (
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-warning" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-bold" style={{ color: theme.textPrimary }}>{ring.rating}</span>
                    <span className="text-xs" style={{ color: theme.textMuted }}>({(ring.reviewCount || 0).toLocaleString()} reviews)</span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* Image */}
                  <div className="sm:col-span-1">
                    <Link to={`/product/${ring.id}`}>
                      <div 
                        className="aspect-square border p-2 hover:border-accent transition-colors"
                        style={{ 
                          backgroundColor: isMen ? m.surface : '#ffffff', 
                          borderColor: theme.cardBorder 
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = theme.accent}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = theme.cardBorder}
                      >
                        <img
                          src={ring.image}
                          alt={ring.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </Link>
                  </div>

                  {/* Content */}
                  <div className="sm:col-span-2 space-y-4">
                    <Link to={`/product/${ring.id}`}>
                      <h3 
                        className="text-base font-bold transition-colors leading-snug"
                        style={{ color: theme.textPrimary }}
                        onMouseEnter={(e) => e.target.style.color = theme.accent}
                        onMouseLeave={(e) => e.target.style.color = theme.textPrimary}
                      >
                        {ring.name}
                      </h3>
                    </Link>

                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black" style={{ color: theme.textPrimary }}>{formatPrice(ring.price)}</span>
                      {ring.originalPrice && ring.originalPrice > ring.price && (
                        <>
                          <span className="text-sm line-through" style={{ color: theme.textMuted }}>{formatPrice(ring.originalPrice)}</span>
                          <span className="text-xs font-bold text-success">{discount}% off</span>
                        </>
                      )}
                    </div>

                    {/* Specs Summary */}
                    <div className="flex flex-wrap gap-2">
                      {ring.specs && Object.entries(ring.specs).map(([key, val]) => (
                        <span 
                          key={key} 
                          className="px-2 py-1 text-[10px] font-medium uppercase tracking-wider border"
                          style={{ 
                            backgroundColor: theme.surfaceBg, 
                            borderColor: theme.cardBorder, 
                            color: theme.textSecondary 
                          }}
                        >
                          {key}: {val}
                        </span>
                      ))}
                    </div>

                    {/* Short Review */}
                    {ring.shortReview && (
                      <p className="text-sm leading-relaxed line-clamp-3" style={{ color: theme.textSecondary }}>
                        {ring.shortReview}
                      </p>
                    )}

                    {/* Pros/Cons Inline */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {ring.pros && ring.pros.slice(0, 3).map((pro, i) => (
                        <div key={`pro-${i}`} className="flex items-start gap-2">
                          <span className="text-green-600 mt-0.5">✓</span>
                          <span style={{ color: theme.textSecondary }}>{pro}</span>
                        </div>
                      ))}
                      {ring.cons && ring.cons.slice(0, 2).map((con, i) => (
                        <div key={`con-${i}`} className="flex items-start gap-2">
                          <span className="text-red-500 mt-0.5">✗</span>
                          <span style={{ color: theme.textSecondary }}>{con}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTAs */}
                    <div className="flex items-center gap-3 pt-3 border-t" style={{ borderColor: theme.cardBorder }}>
                      <a
                        href={ring.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest rounded-sm transition-all"
                        style={{ 
                          backgroundColor: theme.accent, 
                          color: isMen ? m.bg : '#ffffff' 
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = theme.accentHover;
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = theme.accent;
                        }}
                      >
                        Buy on Amazon →
                      </a>
                      <Link
                        to={`/product/${ring.id}`}
                        className="px-4 py-2.5 border text-xs font-bold uppercase tracking-widest rounded-sm transition-all"
                        style={{ 
                          backgroundColor: theme.cardBg, 
                          borderColor: theme.cardBorder, 
                          color: theme.textSecondary 
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.borderColor = theme.accent;
                          e.target.style.color = theme.accent;
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.borderColor = theme.cardBorder;
                          e.target.style.color = theme.textSecondary;
                        }}
                      >
                        Full Review
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Bottom Note */}
      <div className="mt-10 p-6 border" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
        <h2 className="text-sm font-bold font-serif uppercase tracking-widest mb-3" style={{ color: theme.textPrimary }}>
          A Note on Budget Rings
        </h2>
        <p className="text-sm leading-relaxed mb-3" style={{ color: theme.textSecondary }}>
          Rings under ₹1,000 are fashion jewellery — they use plated metals and decorative stones rather than precious metals and gemstones.
          This doesn't make them bad; it means they're designed for style at an accessible price point. Here's what to expect:
        </p>
        <ul className="space-y-2 text-sm" style={{ color: theme.textSecondary }}>
          <li className="flex items-start gap-2">
            <span style={{ color: theme.accent }}>→</span>
            <span><strong style={{ color: theme.textPrimary }}>Lifespan:</strong> Plating typically lasts 3–12 months of regular wear, depending on care.</span>
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: theme.accent }}>→</span>
            <span><strong style={{ color: theme.textPrimary }}>Skin sensitivity:</strong> If you have metal allergies, look for stainless steel or sterling silver options.</span>
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: theme.accent }}>→</span>
            <span><strong style={{ color: theme.textPrimary }}>Care tips:</strong> Remove before washing hands, bathing, or applying perfume. Store in a dry place.</span>
          </li>
        </ul>
      </div>

      {/* Affiliate Disclaimer */}
      <div className="mt-6 p-4 border" style={{ backgroundColor: theme.surfaceBg, borderColor: theme.cardBorder }}>
        <p className="text-[10px] leading-relaxed" style={{ color: theme.textMuted }}>
          <strong style={{ color: theme.textSecondary }}>Affiliate Disclosure:</strong> FaithVish is a participant in the Amazon Services LLC Associates Program.
          Links on this page are affiliate links — when you buy through them, we may earn a small commission at no extra cost to you. Our rankings are
          based on publicly available Amazon data (ratings, reviews, specifications) and our editorial analysis. We are not paid to rank any product higher.
        </p>
      </div>

      {/* Back button */}
      <div className="text-center mt-10 mb-8">
        <Link
          to="/"
          className="px-8 py-3 text-sm font-bold uppercase tracking-widest border-2 rounded-sm transition-all"
          style={{ 
            backgroundColor: theme.cardBg, 
            borderColor: theme.cardBorder, 
            color: theme.textSecondary 
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = theme.textPrimary;
            e.target.style.color = theme.textPrimary;
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = theme.cardBorder;
            e.target.style.color = theme.textSecondary;
          }}
        >
          ← Back to All Jewelry
        </Link>
      </div>
    </div>
  );
};

export default TopRingsPage;

