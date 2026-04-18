import { useParams, Link, useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import ProductCard from '../components/ProductCard';
import { STORE_COLORS, BADGE_STYLES, formatPrice, getDiscountPercentage } from '../utils/constants';


const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, getRelatedProducts } = useStore();
  const product = getProductById(id);
  const relatedProducts = getRelatedProducts(id, 4);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="w-20 h-20 rounded-sm bg-surface-card border-b-4 border-b-accent flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold font-serif uppercase tracking-widest text-text-primary mb-2">Product Not Found</h2>
        <p className="text-text-muted mb-6">The jewelry piece you're looking for doesn't exist.</p>
        <Link to="/" className="px-8 py-3 bg-accent text-white border-2 border-accent rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-accent transition-colors">
          Back to Home
        </Link>
      </div>
    );
  }

  const discount = getDiscountPercentage(product.price, product.originalPrice);
  const storeColor = STORE_COLORS[product.store] || { hex: '#6B7280', text: '#ffffff' };
  const badgeStyle = product.badge ? BADGE_STYLES[product.badge] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-text-muted mb-6">
        <Link to="/" className="hover:text-text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link to="/categories" className="hover:text-text-primary transition-colors">{product.category}</Link>
        <span>/</span>
        <span className="text-text-secondary truncate">{product.name}</span>
      </nav>

      {/* Product main section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Image */}
        <div className="bg-white border border-border p-4">
          <div className="relative aspect-square border-2 border-border p-2 bg-white">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/400?text=No+Image'; }}
            />
            {discount > 0 && (
              <div className="absolute top-0 right-0">
                <span className="px-3 py-1.5 text-xs font-bold bg-accent text-white border-b border-l border-accent uppercase tracking-widest font-serif rounded-bl-sm">
                  {discount}% Off
                </span>
              </div>
            )}
            {badgeStyle && (
              <div className="absolute top-0 left-0">
                <span
                  className="px-3 py-1.5 text-xs font-bold uppercase tracking-widest font-serif rounded-br-sm"
                  style={{ backgroundColor: badgeStyle.bg, color: badgeStyle.text }}
                >
                  {product.badge}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          {/* Title and rating */}
          <div>
            <span className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-widest bg-white border border-border text-text-secondary rounded-sm font-serif mb-3">
              {product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-widest uppercase text-text-primary mb-2 leading-tight">
              {product.name}
            </h1>
            <div className="w-16 h-[3px] bg-accent mb-4"></div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-warning' : 'text-border-light'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-text-secondary font-medium">
                {product.rating || 'N/A'}
              </span>
              <span className="text-sm text-text-muted">
                ({(product.reviewCount || 0).toLocaleString()} reviews)
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-text-secondary leading-relaxed">
            {product.description}
          </p>

          {/* Price & Buy Section */}
          <div className="bg-white border border-border p-6">
            <div className="mb-4">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-lg text-text-muted line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="px-2 py-0.5 text-sm font-bold bg-success-bg text-success rounded-sm">
                      {discount}% off
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs text-text-muted mt-1">Inclusive of all taxes</p>
            </div>

            {/* Buy Now Button */}
            <a
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-8 py-4 bg-accent text-white text-center text-sm font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-accent-light transition-all border-2 border-accent hover:shadow-[0_8px_30px_rgba(236,72,153,0.3)]"
              id="buy-now-btn"
            >
              Buy Now on {product.store} →
            </a>
            <p className="text-[10px] text-text-muted text-center mt-2">
              You will be redirected to {product.store}'s website to complete your purchase. As an affiliate, we may earn a small commission at no extra cost to you.
            </p>
          </div>

          {/* Specs */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="bg-white border border-border p-5">
              <h2 className="text-sm font-bold font-serif text-text-primary uppercase tracking-widest mb-4 border-b border-border pb-2">
                Product Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex items-start gap-2">
                    <span className="text-xs text-text-muted whitespace-nowrap min-w-[80px]">{key}</span>
                    <span className="text-xs font-medium text-text-primary">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========== EDITORIAL CONTENT SECTIONS ========== */}

      {/* Our Review */}
      {product.shortReview && (
        <div className="mb-8 bg-white border border-border p-6 sm:p-8" id="product-review">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-sm bg-accent/10 border border-accent/30 flex items-center justify-center">
              <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold font-serif uppercase tracking-widest text-text-primary">Our Review</h2>
              <div className="w-10 h-[2px] bg-accent mt-1"></div>
            </div>
          </div>
          <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
            {product.shortReview}
          </p>
          <p className="text-[10px] text-text-muted mt-4 pt-3 border-t border-border italic">
            This review is based on product specifications, seller descriptions, and verified buyer ratings on {product.store}. FaithVish does not physically test products.
          </p>
        </div>
      )}

      {/* Pros & Cons */}
      {(product.pros?.length > 0 || product.cons?.length > 0) && (
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-5" id="pros-cons">
          {/* Pros */}
          {product.pros?.length > 0 && (
            <div className="bg-white border border-border p-6">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
                <div className="w-8 h-8 rounded-sm bg-green-50 border border-green-200 flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold font-serif uppercase tracking-widest text-green-800">What We Like</h3>
              </div>
              <ul className="space-y-3">
                {product.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-sm text-text-secondary leading-relaxed">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Cons */}
          {product.cons?.length > 0 && (
            <div className="bg-white border border-border p-6">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
                <div className="w-8 h-8 rounded-sm bg-red-50 border border-red-200 flex items-center justify-center">
                  <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold font-serif uppercase tracking-widest text-red-700">Watch Out For</h3>
              </div>
              <ul className="space-y-3">
                {product.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </span>
                    <span className="text-sm text-text-secondary leading-relaxed">{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Who Should Buy */}
      {product.whoShouldBuy && (
        <div className="mb-8 bg-gradient-to-r from-accent/5 to-accent-secondary/5 border border-border p-6 sm:p-8" id="who-should-buy">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-sm bg-accent-secondary/10 border border-accent-secondary/30 flex items-center justify-center">
              <svg className="w-5 h-5 text-accent-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold font-serif uppercase tracking-widest text-text-primary">Who Should Buy This?</h2>
              <div className="w-10 h-[2px] bg-accent-secondary mt-1"></div>
            </div>
          </div>
          <p className="text-sm text-text-secondary leading-relaxed">
            {product.whoShouldBuy}
          </p>
        </div>
      )}

      {/* Second CTA — after editorial content */}
      <div className="mb-12 bg-white border-2 border-accent/20 p-6 text-center" id="cta-bottom">
        <p className="text-sm text-text-secondary mb-3">
          Convinced? Get the <strong className="text-text-primary">{product.name.length > 60 ? product.name.substring(0, 60) + '...' : product.name}</strong> for just <strong className="text-accent">{formatPrice(product.price)}</strong>
          {discount > 0 && <span className="text-success font-semibold"> ({discount}% off)</span>}
        </p>
        <a
          href={product.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-10 py-3.5 bg-accent text-white text-sm font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-accent-light transition-all border-2 border-accent hover:shadow-[0_8px_30px_rgba(236,72,153,0.3)]"
          id="buy-now-btn-bottom"
        >
          Buy Now on {product.store} →
        </a>
        <p className="text-[10px] text-text-muted mt-2">
          Affiliate link — we may earn a commission at no extra cost to you
        </p>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-border">
            <div>
              <h2 className="text-xl font-bold font-serif uppercase tracking-widest text-text-primary">You May Also Like</h2>
              <div className="w-12 h-[3px] bg-accent mt-2"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger-children">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}


      {/* Back button */}
      <div className="text-center mt-12 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="px-8 py-3 text-sm font-bold uppercase tracking-widest text-text-secondary bg-white border-2 border-border rounded-sm hover:border-text-primary hover:text-text-primary transition-all"
        >
          ← Back to Jewelry
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
