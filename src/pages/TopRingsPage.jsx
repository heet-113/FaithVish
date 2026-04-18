import { Link } from 'react-router-dom';
import useStore from '../store/useStore';
import { formatPrice, getDiscountPercentage } from '../utils/constants';

const TopRingsPage = () => {
  const { products } = useStore();

  // Get rings under ₹1000, sorted by rating (descending), then by reviewCount
  const affordableRings = products
    .filter((p) => p.category === 'Rings' && p.price <= 1000)
    .sort((a, b) => {
      const ratingDiff = (b.rating || 0) - (a.rating || 0);
      if (ratingDiff !== 0) return ratingDiff;
      return (b.reviewCount || 0) - (a.reviewCount || 0);
    });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-text-muted mb-6">
        <Link to="/" className="hover:text-text-primary transition-colors">Home</Link>
        <span>/</span>
        <span className="text-text-secondary">Buying Guides</span>
        <span>/</span>
        <span className="text-text-secondary">Best Rings Under ₹1,000</span>
      </nav>

      {/* Hero */}
      <div className="mb-10 text-center py-12 bg-[repeating-linear-gradient(45deg,rgba(217,208,193,0.1)_0px,rgba(217,208,193,0.1)_2px,rgba(250,250,247,0.5)_2px,rgba(250,250,247,0.5)_8px)] border-y-2 border-border">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent-secondary mb-3">Buying Guide</p>
        <h1 className="text-3xl sm:text-4xl font-black mb-4 font-serif uppercase tracking-widest text-text-primary leading-tight">
          Best Rings Under <span className="text-accent">₹1,000</span>
        </h1>
        <p className="text-text-secondary text-sm max-w-2xl mx-auto mt-4 leading-relaxed">
          Looking for a stylish ring without breaking the bank? We've analysed ratings, buyer reviews, materials, and value
          to rank the best affordable rings available on Amazon India right now. All prices verified at the time of writing.
        </p>
        <p className="text-[10px] text-text-muted mt-4 uppercase tracking-wider">
          Last updated: April 2026 · {affordableRings.length} rings reviewed
        </p>
      </div>

      {/* Quick Summary */}
      <div className="mb-10 bg-white border border-border p-6">
        <h2 className="text-sm font-bold font-serif uppercase tracking-widest text-text-primary mb-4 pb-2 border-b border-border">
          Quick Summary
        </h2>
        <div className="space-y-3">
          {affordableRings.map((ring, index) => (
            <div key={ring.id} className="flex items-center gap-3 text-sm">
              <span className="w-6 h-6 rounded-sm bg-accent/10 text-accent font-bold text-xs flex items-center justify-center shrink-0">
                {index + 1}
              </span>
              <span className="text-text-primary font-medium flex-1 truncate">{ring.name}</span>
              <span className="text-accent font-bold shrink-0">{formatPrice(ring.price)}</span>
              <span className="text-text-muted text-xs shrink-0">
                {ring.rating ? `★ ${ring.rating}` : 'No rating'}
              </span>
            </div>
          ))}
        </div>
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
          Our rankings are based entirely on publicly available Amazon India data — star ratings, review counts, material specifications, and pricing. 
          <strong className="text-text-primary"> No brand has paid us to feature or rank their product higher.</strong> We earn affiliate commissions 
          when you buy through our links, but commission rates do not influence our rankings.
        </p>
        <p className="text-[10px] text-text-muted mt-3 italic">Written by the FaithVish Editorial Team · contact@faithvish.com</p>
      </div>

      {/* How We Ranked */}
      <div className="mb-10 bg-gradient-to-r from-accent-secondary/5 to-accent/5 border border-border p-6">
        <h2 className="text-sm font-bold font-serif uppercase tracking-widest text-text-primary mb-3">
          How We Ranked These Rings
        </h2>
        <p className="text-sm text-text-secondary leading-relaxed mb-3">
          Our ranking considers four factors based on publicly available Amazon India data:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Buyer Rating', desc: 'Amazon star rating from verified buyers' },
            { label: 'Review Volume', desc: 'Number of buyer reviews — more reviews = more trust' },
            { label: 'Material Quality', desc: 'Stainless steel & silver rank above unspecified alloys' },
            { label: 'Value for Money', desc: 'What you get relative to what you pay' },
          ].map((factor, i) => (
            <div key={i} className="bg-white border border-border p-3 text-center">
              <p className="text-xs font-bold text-text-primary mb-1">{factor.label}</p>
              <p className="text-[10px] text-text-muted">{factor.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Reviews */}
      <div className="space-y-8">
        {affordableRings.map((ring, index) => {
          const discount = getDiscountPercentage(ring.price, ring.originalPrice);

          return (
            <article key={ring.id} className="bg-white border border-border overflow-hidden" id={`ring-${ring.id}`}>
              {/* Rank Header */}
              <div className="bg-surface px-6 py-3 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-sm bg-accent text-white font-bold text-sm flex items-center justify-center">
                    #{index + 1}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">
                    {index === 0 ? 'Best Overall' : index === 1 ? 'Most Popular' : 'Great Value'}
                  </span>
                </div>
                {ring.rating && (
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-warning" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-bold text-text-primary">{ring.rating}</span>
                    <span className="text-xs text-text-muted">({(ring.reviewCount || 0).toLocaleString()} reviews)</span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* Image */}
                  <div className="sm:col-span-1">
                    <Link to={`/product/${ring.id}`}>
                      <div className="aspect-square border border-border p-2 bg-white hover:border-accent transition-colors">
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
                      <h3 className="text-base font-bold text-text-primary hover:text-accent transition-colors leading-snug">
                        {ring.name}
                      </h3>
                    </Link>

                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-text-primary">{formatPrice(ring.price)}</span>
                      {ring.originalPrice && ring.originalPrice > ring.price && (
                        <>
                          <span className="text-sm text-text-muted line-through">{formatPrice(ring.originalPrice)}</span>
                          <span className="text-xs font-bold text-success">{discount}% off</span>
                        </>
                      )}
                    </div>

                    {/* Specs Summary */}
                    <div className="flex flex-wrap gap-2">
                      {ring.specs && Object.entries(ring.specs).map(([key, val]) => (
                        <span key={key} className="px-2 py-1 text-[10px] font-medium uppercase tracking-wider bg-surface border border-border text-text-secondary">
                          {key}: {val}
                        </span>
                      ))}
                    </div>

                    {/* Short Review */}
                    {ring.shortReview && (
                      <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
                        {ring.shortReview}
                      </p>
                    )}

                    {/* Pros/Cons Inline */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {ring.pros && ring.pros.slice(0, 3).map((pro, i) => (
                        <div key={`pro-${i}`} className="flex items-start gap-2">
                          <span className="text-green-600 mt-0.5">✓</span>
                          <span className="text-text-secondary">{pro}</span>
                        </div>
                      ))}
                      {ring.cons && ring.cons.slice(0, 2).map((con, i) => (
                        <div key={`con-${i}`} className="flex items-start gap-2">
                          <span className="text-red-500 mt-0.5">✗</span>
                          <span className="text-text-secondary">{con}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTAs */}
                    <div className="flex items-center gap-3 pt-3 border-t border-border">
                      <a
                        href={ring.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2.5 bg-accent text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-accent-light transition-all"
                      >
                        Buy on Amazon →
                      </a>
                      <Link
                        to={`/product/${ring.id}`}
                        className="px-4 py-2.5 bg-white text-text-secondary border border-border text-xs font-bold uppercase tracking-widest rounded-sm hover:border-accent hover:text-accent transition-all"
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
      <div className="mt-10 bg-white border border-border p-6">
        <h2 className="text-sm font-bold font-serif uppercase tracking-widest text-text-primary mb-3">
          A Note on Budget Rings
        </h2>
        <p className="text-sm text-text-secondary leading-relaxed mb-3">
          Rings under ₹1,000 are fashion jewellery — they use plated metals and decorative stones rather than precious metals and gemstones.
          This doesn't make them bad; it means they're designed for style at an accessible price point. Here's what to expect:
        </p>
        <ul className="space-y-2 text-sm text-text-secondary">
          <li className="flex items-start gap-2">
            <span className="text-accent-secondary font-bold">→</span>
            <span><strong>Lifespan:</strong> Plating typically lasts 3–12 months of regular wear, depending on care.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-secondary font-bold">→</span>
            <span><strong>Skin sensitivity:</strong> If you have metal allergies, look for stainless steel or sterling silver options.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-secondary font-bold">→</span>
            <span><strong>Care tips:</strong> Remove before washing hands, bathing, or applying perfume. Store in a dry place.</span>
          </li>
        </ul>
      </div>

      {/* Affiliate Disclaimer */}
      <div className="mt-6 p-4 bg-surface border border-border">
        <p className="text-[10px] text-text-muted leading-relaxed">
          <strong className="text-text-secondary">Affiliate Disclosure:</strong> FaithVish is a participant in the Amazon Services LLC Associates Program.
          Links on this page are affiliate links — when you buy through them, we may earn a small commission at no extra cost to you. Our rankings are
          based on publicly available Amazon data (ratings, reviews, specifications) and our editorial analysis. We are not paid to rank any product higher.
        </p>
      </div>

      {/* Back button */}
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

export default TopRingsPage;
