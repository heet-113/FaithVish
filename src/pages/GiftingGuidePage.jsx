import { Link } from 'react-router-dom';
import useStore from '../store/useStore';
import { formatPrice, getDiscountPercentage } from '../utils/constants';

// Gift category definitions with product selection logic
const GIFT_SECTIONS = [
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

const GiftCard = ({ product }) => {
  const discount = getDiscountPercentage(product.price, product.originalPrice);

  return (
    <div className="bg-white border border-border overflow-hidden group hover:border-accent transition-all">
      {/* Image */}
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-square border-b border-border p-2 bg-white">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {discount > 0 && (
            <span className="absolute top-0 right-0 px-2 py-1 text-[10px] font-bold bg-accent text-white uppercase tracking-widest font-serif">
              {discount}% Off
            </span>
          )}
        </div>
      </Link>

      <div className="p-4 space-y-3">
        <Link to={`/product/${product.id}`}>
          <h4 className="text-sm font-semibold text-text-primary line-clamp-2 hover:text-accent transition-colors leading-snug">
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
                  className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-warning' : 'text-border-light'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[11px] text-text-muted">
              {product.rating} ({(product.reviewCount || 0).toLocaleString()})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-text-primary">{formatPrice(product.price)}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs text-text-muted line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        {/* Why it's a good gift */}
        {product.whoShouldBuy && (
          <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
            {product.whoShouldBuy}
          </p>
        )}

        {/* CTA */}
        <div className="flex gap-2 pt-2 border-t border-border">
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-3 py-2 bg-accent text-white text-center text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-accent-light transition-all"
          >
            Buy on Amazon
          </a>
          <Link
            to={`/product/${product.id}`}
            className="px-3 py-2 bg-white text-text-secondary border border-border text-[10px] font-bold uppercase tracking-widest rounded-sm hover:border-accent hover:text-accent transition-all"
          >
            Review
          </Link>
        </div>
      </div>
    </div>
  );
};

const GiftingGuidePage = () => {
  const { products } = useStore();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-text-muted mb-6">
        <Link to="/" className="hover:text-text-primary transition-colors">Home</Link>
        <span>/</span>
        <span className="text-text-secondary">Buying Guides</span>
        <span>/</span>
        <span className="text-text-secondary">Best Jewelry for Gifting</span>
      </nav>

      {/* Hero */}
      <div className="mb-10 text-center py-12 bg-[repeating-linear-gradient(45deg,rgba(217,208,193,0.1)_0px,rgba(217,208,193,0.1)_2px,rgba(250,250,247,0.5)_2px,rgba(250,250,247,0.5)_8px)] border-y-2 border-border">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent-secondary mb-3">Gift Guide</p>
        <h1 className="text-3xl sm:text-4xl font-black mb-4 font-serif uppercase tracking-widest text-text-primary leading-tight">
          Best Jewelry for <span className="text-accent">Gifting</span>
        </h1>
        <p className="text-text-secondary text-sm max-w-2xl mx-auto mt-4 leading-relaxed">
          Choosing jewellery as a gift can be overwhelming — wrong size, wrong style, wrong budget. We've organised our
          collection into practical gift categories so you can find the right piece in minutes, not hours.
        </p>
        <p className="text-[10px] text-text-muted mt-4 uppercase tracking-wider">
          All products available on Amazon India · Prices verified April 2026
        </p>
      </div>

      {/* Why Trust Us */}
      <div className="mb-10 bg-gradient-to-r from-accent/5 to-accent-secondary/5 border border-border p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-sm bg-accent/10 border border-accent/30 flex items-center justify-center">
            <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-sm font-bold font-serif uppercase tracking-widest text-text-primary">Why Trust This Guide?</h2>
        </div>
        <p className="text-sm text-text-secondary leading-relaxed">
          Our gift recommendations are based on real Amazon India data — buyer ratings, review volumes, material specs, and price-to-value ratio. 
          <strong className="text-text-primary"> No brand has paid us to feature their products as gift picks.</strong> We earn affiliate 
          commissions on purchases, but our selections are editorially independent.
        </p>
        <p className="text-[10px] text-text-muted mt-3 italic">Written by the FaithVish Editorial Team · contact@faithvish.com</p>
      </div>

      {/* Gift Buying Tips */}
      <div className="mb-10 bg-gradient-to-r from-accent/5 to-accent-secondary/5 border border-border p-6 sm:p-8">
        <h2 className="text-sm font-bold font-serif uppercase tracking-widest text-text-primary mb-4">
          5 Tips for Gifting Jewelry
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { num: '1', tip: 'Choose adjustable sizes', detail: 'Rings and bracelets with adjustable sizing eliminate the guessing game.' },
            { num: '2', tip: 'Stick to versatile designs', detail: 'Solitaires, studs, and simple chains work with any wardrobe.' },
            { num: '3', tip: 'Check the review count', detail: 'Products with 100+ reviews are safer bets than trending newcomers.' },
            { num: '4', tip: 'Sets feel more premium', detail: 'A matching set (necklace + earrings) feels more special than a single piece.' },
            { num: '5', tip: 'Consider the occasion', detail: 'Traditional designs for weddings, modern for birthdays and casual events.' },
          ].map((item) => (
            <div key={item.num} className="bg-white border border-border p-4">
              <span className="w-6 h-6 rounded-sm bg-accent text-white font-bold text-xs flex items-center justify-center mb-2">
                {item.num}
              </span>
              <p className="text-xs font-bold text-text-primary mb-1">{item.tip}</p>
              <p className="text-[10px] text-text-muted leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Gift Sections */}
      {GIFT_SECTIONS.map((section, sectionIndex) => {
        const sectionProducts = section.filter(products);
        if (sectionProducts.length === 0) return null;

        return (
          <section key={sectionIndex} className="mb-12" id={`gift-section-${sectionIndex}`}>
            {/* Section Header */}
            <div className="mb-6 pb-3 border-b border-border">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{section.icon}</span>
                <h2 className="text-xl font-bold font-serif uppercase tracking-widest text-text-primary">
                  {section.title}
                </h2>
              </div>
              <p className="text-xs font-medium uppercase tracking-wider text-accent-secondary mb-2">
                {section.subtitle}
              </p>
              <p className="text-sm text-text-secondary leading-relaxed max-w-3xl">
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
      <div className="mt-10 bg-white border border-border p-6 sm:p-8">
        <h2 className="text-sm font-bold font-serif uppercase tracking-widest text-text-primary mb-4 pb-2 border-b border-border">
          Jewelry Gifting FAQ
        </h2>
        <div className="space-y-5">
          <div>
            <h3 className="text-sm font-bold text-text-primary mb-1">What if I don't know their ring or bangle size?</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Choose adjustable rings — all the rings we feature have adjustable sizing. For bangles, size 2.4 is considered small and size 2.6 is medium/standard for Indian women.
              When in doubt, go with a pendant, bracelet, or earrings instead — they don't require sizing.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold text-text-primary mb-1">Is fashion jewellery appropriate as a gift?</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Absolutely. Fashion jewellery from brands like YouBella, Shining Diva, and Clara is widely accepted and appreciated.
              For added credibility, choose products with high review counts — it shows the item is well-liked by many buyers.
              Sterling silver pieces (like Clara's range) feel more premium if your budget allows.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold text-text-primary mb-1">Can I return jewellery bought on Amazon?</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Return policies vary by seller. Most fashion jewellery on Amazon India has a 10–30 day return window.
              Check the specific product listing for return policies before buying. Prime-eligible items typically have smoother return processes.
            </p>
          </div>
        </div>
      </div>

      {/* Affiliate Disclaimer */}
      <div className="mt-6 p-4 bg-surface border border-border">
        <p className="text-[10px] text-text-muted leading-relaxed">
          <strong className="text-text-secondary">Affiliate Disclosure:</strong> FaithVish is a participant in the Amazon Services LLC Associates Program.
          Links on this page are affiliate links — when you buy through them, we may earn a small commission at no extra cost to you. Our gift recommendations
          are based on publicly available Amazon data (prices, ratings, reviews) and our editorial judgement. We are not paid to feature any product.
        </p>
      </div>

      {/* Back */}
      <div className="text-center mt-10 mb-8">
        <Link
          to="/"
          className="px-8 py-3 text-sm font-bold uppercase tracking-widest text-text-secondary bg-white border-2 border-border rounded-sm hover:border-text-primary hover:text-text-primary transition-all"
        >
          ← Back to All Jewelry
        </Link>
      </div>
    </div>
  );
};

export default GiftingGuidePage;
