import { Link } from 'react-router-dom';
import useStore from '../store/useStore';
import { formatPrice, getDiscountPercentage } from '../utils/constants';

// Gift category definitions with product selection logic
const getGiftSections = (isMen) => {
  if (isMen) {
    return [
      {
        title: 'Best Gifts Under ₹250',
        subtitle: 'Thoughtful gifts that won\'t strain your wallet',
        description: 'A thoughtful token of appreciation for brothers, friends, or colleagues. These budget-friendly picks prove that style doesn\'t have to be expensive.',
        filter: (products) => products
          .filter((p) => p.price <= 250)
          .sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))
          .slice(0, 4),
        icon: '💰',
      },
      {
        title: 'Best Gifts Under ₹500',
        subtitle: 'The sweet spot of value and quality',
        description: 'Sleek chains and cuffs under ₹500. Ideal for Raksha Bandhan, Father\'s Day, birthdays, and secret Santa gifting.',
        filter: (products) => products
          .filter((p) => p.price > 250 && p.price <= 500)
          .sort((a, b) => (b.rating || 0) - (a.rating || 0))
          .slice(0, 4),
        icon: '🎁',
      },
      {
        title: 'Best Premium Chains & Bracelets',
        subtitle: 'Timeless pieces for daily style',
        description: 'Bold chains and structured wrist wear that elevate any outfit. A reliable gift that adds sharp definition to his wardrobe.',
        filter: (products) => products
          .filter((p) => p.category === 'chains' || p.category === 'bracelets' || p.name.toLowerCase().includes('kada') || p.name.toLowerCase().includes('bracelet') || p.name.toLowerCase().includes('chain'))
          .sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))
          .slice(0, 4),
        icon: '✨',
      },
      {
        title: 'Highest Rated Gifts',
        subtitle: 'The safest picks based on real buyer satisfaction',
        description: 'When in doubt, go with what other men love. These products have the highest ratings with meaningful review volumes — the closest thing to a guarantee in online shopping.',
        filter: (products) => products
          .filter((p) => p.rating >= 4.0 && (p.reviewCount || 0) >= 10)
          .sort((a, b) => {
            const ratingDiff = (b.rating || 0) - (a.rating || 0);
            if (ratingDiff !== 0) return ratingDiff;
            return (b.reviewCount || 0) - (a.reviewCount || 0);
          })
          .slice(0, 4),
        icon: '⭐',
      },
    ];
  } else {
    return [
      {
        title: 'Best Gifts Under ₹250',
        subtitle: 'Thoughtful gifts that won\'t strain your wallet',
        description: 'Perfect for birthdays, friendship day, or "just because" moments. These picks prove you don\'t need to spend big to give something beautiful.',
        filter: (products) => products
          .filter((p) => p.price <= 250)
          .sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))
          .slice(0, 4),
        icon: '💰',
      },
      {
        title: 'Best Gifts Under ₹500',
        subtitle: 'The sweet spot of value and quality',
        description: 'Under ₹500 opens up options with better materials and designs. Ideal for Raksha Bandhan, Mother\'s Day, minor anniversaries, and office secret Santa.',
        filter: (products) => products
          .filter((p) => p.price > 250 && p.price <= 500)
          .sort((a, b) => (b.rating || 0) - (a.rating || 0))
          .slice(0, 4),
        icon: '🎁',
      },
      {
        title: 'Best Jewelry Sets for Gifting',
        subtitle: 'Complete sets make the most impressive gifts',
        description: 'A matching jewellery set (necklace + earrings or pendant + chain) feels more substantial than a single piece. These sets offer the best unboxing experience for the recipient.',
        filter: (products) => products
          .filter((p) =>
            p.name.toLowerCase().includes('set') ||
            p.name.toLowerCase().includes('combo') ||
            (p.name.toLowerCase().includes('earring') && p.name.toLowerCase().includes('necklace')) ||
            (p.name.toLowerCase().includes('pendant') && p.name.toLowerCase().includes('earring'))
          )
          .sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))
          .slice(0, 4),
        icon: '✨',
      },
      {
        title: 'Highest Rated Gifts',
        subtitle: 'The safest picks based on real buyer satisfaction',
        description: 'When in doubt, go with what other buyers love. These products have the highest ratings with meaningful review volumes — the closest thing to a guarantee in online shopping.',
        filter: (products) => products
          .filter((p) => p.rating >= 4.0 && (p.reviewCount || 0) >= 25)
          .sort((a, b) => {
            const ratingDiff = (b.rating || 0) - (a.rating || 0);
            if (ratingDiff !== 0) return ratingDiff;
            return (b.reviewCount || 0) - (a.reviewCount || 0);
          })
          .slice(0, 4),
        icon: '⭐',
      },
    ];
  }
};


const GiftCard = ({ product }) => {
  const { activeGender } = useStore();
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
  };

  const theme = {
    textPrimary: isMen ? m.textPrimary : 'var(--color-text-primary)',
    textSecondary: isMen ? m.textSecondary : 'var(--color-text-secondary)',
    textMuted: isMen ? m.textMuted : 'var(--color-text-muted)',
    accent: isMen ? m.gold : 'var(--color-accent)',
    accentHover: isMen ? m.goldLight : 'var(--color-accent-light)',
    cardBg: isMen ? m.card : '#ffffff',
    cardBorder: isMen ? m.border : 'var(--color-border)',
    cardBorderHover: isMen ? m.gold : 'var(--color-accent)',
    surfaceBg: isMen ? '#1A1A1C' : 'var(--color-surface-light)',
  };

  const discount = getDiscountPercentage(product.price, product.originalPrice);

  return (
    <div
      className="border overflow-hidden group transition-all"
      style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = theme.cardBorderHover}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = theme.cardBorder}
    >
      {/* Image */}
      <Link to={`/product/${product.id}`}>
        <div
          className="relative aspect-square border-b p-2"
          style={{
            backgroundColor: isMen ? '#1A1A1C' : '#ffffff',
            borderColor: theme.cardBorder
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500"
            loading="lazy"
          />
          {discount > 0 && (
            <span
              className="absolute top-0 right-0 px-2 py-1 text-[11px] sm:text-[10px] font-bold uppercase tracking-widest font-serif"
              style={{
                backgroundColor: theme.accent,
                color: isMen ? m.bg : '#ffffff'
              }}
            >
              {discount}% Off
            </span>
          )}
        </div>
      </Link>

      <div className="p-4 space-y-3">
        <Link to={`/product/${product.id}`}>
          <h4
            className="text-sm font-semibold line-clamp-2 transition-colors leading-snug"
            style={{ color: theme.textPrimary }}
            onMouseEnter={(e) => e.target.style.color = theme.accent}
            onMouseLeave={(e) => e.target.style.color = theme.textPrimary}
          >
            {product.name}
          </h4>
        </Link>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  style={{ color: i < Math.floor(product.rating) ? 'var(--color-warning)' : (isMen ? m.border : 'var(--color-border)') }}
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[11px]" style={{ color: theme.textMuted }}>
              {product.rating} ({(product.reviewCount || 0).toLocaleString()})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold" style={{ color: theme.textPrimary }}>{formatPrice(product.price)}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs line-through" style={{ color: theme.textMuted }}>{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        {/* Why it's a good gift */}
        {product.whoShouldBuy && (
          <p className="text-xs leading-relaxed line-clamp-2" style={{ color: theme.textMuted }}>
            {product.whoShouldBuy}
          </p>
        )}

        {/* CTA */}
        <div className="flex gap-2 pt-2 border-t" style={{ borderColor: theme.cardBorder }}>
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-3 py-2.5 sm:py-2 text-center text-[11px] sm:text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all"
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
            Buy on {product.store || 'Store'}
          </a>
          <Link
            to={`/product/${product.id}`}
            className="px-3 py-2.5 sm:py-2 border text-[11px] sm:text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all"
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
            Review
          </Link>
        </div>
      </div>
    </div>
  );
};

const GiftingGuidePage = () => {
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

  const giftSections = getGiftSections(isMen);
  const genderFilteredProducts = products.filter(p => isMen ? p.gender === 'men' : p.gender !== 'men');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" style={{ color: theme.textSecondary }}>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-6" style={{ color: theme.textMuted }}>
        <Link to="/" className="transition-colors" style={{ color: theme.textMuted }} onMouseEnter={(e) => e.target.style.color = theme.textPrimary} onMouseLeave={(e) => e.target.style.color = theme.textMuted}>Home</Link>
        <span>/</span>
        <span>Buying Guides</span>
        <span>/</span>
        <span style={{ color: theme.textSecondary }}>{isMen ? "Best Men's Jewelry for Gifting" : "Best Jewelry for Gifting"}</span>
      </nav>

      {/* Hero */}
      <div className="text-center py-12">
        <h1 className="text-3xl sm:text-4xl font-black mb-4 font-serif uppercase tracking-widest leading-tight" style={{ color: theme.textPrimary }}>
          Best {isMen ? "Men's Jewelry" : "Jewelry"} for Gifting
        </h1>
      </div>

      {/* Gift Buying Tips */}
      <div
        className="mb-10 border p-6 sm:p-8"
        style={{
          backgroundColor: theme.alertBg,
          borderColor: theme.cardBorder
        }}
      >
        <h2 className="text-sm font-bold font-serif uppercase tracking-widest mb-4" style={{ color: theme.textPrimary }}>
          {isMen ? "5 Tips for Gifting Men's Jewelry" : "5 Tips for Gifting Jewelry"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {(isMen ? [
            { num: '1', tip: 'Choose open-cuff bands', detail: 'Open cuffs and adjustable link chains eliminate sizing guesswork.' },
            { num: '2', tip: 'Stick to minimal designs', detail: 'Simple cuban links, solid steel kadas, and matte cuffs go with any wardrobe.' },
            { num: '3', tip: 'Prioritize steel/brass', detail: 'Men\'s jewelry gets heavy wear; durable metals like stainless steel last longer.' },
            { num: '4', tip: 'Chains are the safest bet', detail: 'A classic 20-22 inch chain fits almost any man comfortably without issue.' },
            { num: '5', tip: 'Match his current watch', detail: 'If he wears a silver watch, choose silver/steel jewelry. If gold, go for gold-toned.' },
          ] : [
            { num: '1', tip: 'Choose adjustable sizes', detail: 'Rings and bracelets with adjustable sizing eliminate the guessing game.' },
            { num: '2', tip: 'Stick to versatile designs', detail: 'Solitaires, studs, and simple chains work with any wardrobe.' },
            { num: '3', tip: 'Check the review count', detail: 'Products with 100+ reviews are safer bets than trending newcomers.' },
            { num: '4', tip: 'Sets feel more premium', detail: 'A matching set (necklace + earrings) feels more special than a single piece.' },
            { num: '5', tip: 'Consider the occasion', detail: 'Traditional designs for weddings, modern for birthdays and casual events.' },
          ]).map((item) => (
            <div
              key={item.num}
              className="border p-4"
              style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}
            >
              <span
                className="w-6 h-6 rounded-sm font-bold text-xs flex items-center justify-center mb-2"
                style={{
                  backgroundColor: theme.accent,
                  color: isMen ? m.bg : '#ffffff'
                }}
              >
                {item.num}
              </span>
              <p className="text-xs font-bold mb-1" style={{ color: theme.textPrimary }}>{item.tip}</p>
              <p className="text-[11px] sm:text-[10px] leading-relaxed" style={{ color: theme.textMuted }}>{item.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Gift Sections */}
      {giftSections.map((section, sectionIndex) => {
        const sectionProducts = section.filter(genderFilteredProducts);
        if (sectionProducts.length === 0) return null;

        return (
          <section key={sectionIndex} className="mb-12" id={`gift-section-${sectionIndex}`}>
            {/* Section Header */}
            <div className="mb-6 pb-3 border-b" style={{ borderColor: theme.cardBorder }}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{section.icon}</span>
                <h2 className="text-xl font-bold font-serif uppercase tracking-widest" style={{ color: theme.textPrimary }}>
                  {section.title}
                </h2>
              </div>
              <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: theme.accent }}>
                {section.subtitle}
              </p>
              <p className="text-sm leading-relaxed max-w-3xl" style={{ color: theme.textSecondary }}>
                {section.description}
              </p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger-children">
              {sectionProducts.map((product) => (
                <GiftCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        );
      })}

      {/* Bottom Educational Content */}
      <div className="mt-10 p-6 sm:p-8 border" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
        <h2 className="text-sm font-bold font-serif uppercase tracking-widest mb-4 pb-2 border-b" style={{ color: theme.textPrimary, borderColor: theme.cardBorder }}>
          {isMen ? "Men's Jewelry Gifting FAQ" : "Jewelry Gifting FAQ"}
        </h2>
        <div className="space-y-5">
          {isMen ? (
            <>
              <div>
                <h3 className="text-sm font-bold mb-1" style={{ color: theme.textPrimary }}>What if I don't know his wrist or Kada size?</h3>
                <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                  Choose open-cuff bracelets or classic 20-22 inch neck chains, which fit almost all men comfortably. For solid Kadas,
                  standard men's sizes are 2.6 (small-medium) and 2.8 (medium-large). When in doubt, a classic neck chain is the safest option as it requires no sizing.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold mb-1" style={{ color: theme.textPrimary }}>Is modern fashion jewelry appropriate as a gift for men?</h3>
                <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                  Absolutely. Modern men's fashion jewelry made from premium surgical stainless steel or rhodium plating looks highly sophisticated.
                  Cuff bracelets, Kada bands, and Cuban link chains are extremely popular. Look for high review counts to buy with confidence.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold mb-1" style={{ color: theme.textPrimary }}>Can I return jewelry bought online?</h3>
                <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                  Return policies vary by seller and platform. Most fashion jewelry has a 10–30 day return window.
                  Check the specific product listing on the store's website for return policies before buying.
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h3 className="text-sm font-bold mb-1" style={{ color: theme.textPrimary }}>What if I don't know their ring or bangle size?</h3>
                <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                  Choose adjustable rings. All the rings we feature have adjustable sizing. For bangles, size 2.4 is considered small and size 2.6 is medium/standard for Indian women.
                  When in doubt, go with a pendant, bracelet, or earrings instead. They don't require sizing.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold mb-1" style={{ color: theme.textPrimary }}>Is fashion jewellery appropriate as a gift?</h3>
                <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                  Absolutely. Fashion jewellery from brands like YouBella, Shining Diva, and Clara is widely accepted and appreciated.
                  For added credibility, choose products with high review counts. It shows the item is well-liked by many buyers.
                  Sterling silver pieces (like Clara's range) feel more premium if your budget allows.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold mb-1" style={{ color: theme.textPrimary }}>Can I return jewellery bought online?</h3>
                <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                  Return policies vary by seller and platform. Most fashion jewellery has a 10–30 day return window.
                  Check the specific product listing on the store's website for return policies before buying.
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Affiliate Disclaimer */}
      <div className="mt-6 p-4 border" style={{ backgroundColor: theme.surfaceBg, borderColor: theme.cardBorder }}>
        <p className="text-[11px] sm:text-[10px] leading-relaxed" style={{ color: theme.textMuted }}>
          <strong style={{ color: theme.textSecondary }}>Affiliate Disclosure:</strong> FaithVish participates in affiliate programs including the Amazon Services LLC Associates Program and others.
          Links on this page are affiliate links. When you buy through them, we may earn a small commission at no extra cost to you. Our gift recommendations
          are based on publicly available data (prices, ratings, reviews) and our editorial judgement. We are not paid to feature any product.
        </p>
      </div>

      {/* Back */}
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

export default GiftingGuidePage;
