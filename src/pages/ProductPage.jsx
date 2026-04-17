import { useParams, Link, useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import ProductCard from '../components/ProductCard';
import { STORE_COLORS, BADGE_STYLES, formatPrice, getDiscountPercentage } from '../utils/constants';

const MOCK_REVIEWS = [
  { id: 1, user: 'Meera S.', rating: 5, date: '2 days ago', text: 'Absolutely gorgeous piece! The craftsmanship is impeccable and it looks even more beautiful in person. Received so many compliments at my friend\'s wedding. Worth every penny!' },
  { id: 2, user: 'Priya M.', rating: 4, date: '1 week ago', text: 'Beautiful design and great quality. The packaging was very premium — perfect for gifting. Only giving 4 stars because the delivery took a bit longer than expected.' },
  { id: 3, user: 'Ananya K.', rating: 5, date: '2 weeks ago', text: 'This is my third purchase from this brand and I\'m never disappointed. The finish is flawless and it\'s very comfortable to wear daily. Highly recommended!' },
  { id: 4, user: 'Sneha R.', rating: 4, date: '3 weeks ago', text: 'Lovely piece that matches perfectly with both traditional and western outfits. The stone quality is excellent and the gold plating looks very rich.' },
  { id: 5, user: 'Divya T.', rating: 5, date: '1 month ago', text: 'Bought this as an anniversary gift for my wife and she absolutely loved it! The quality exceeds the price point. Will definitely be shopping here again.' },
];

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

            {/* Store Info */}
            <div className="flex items-center gap-2 mb-5 pb-4 border-b border-border">
              <div
                className="w-7 h-7 rounded-sm flex items-center justify-center text-[10px] font-black shrink-0"
                style={{ backgroundColor: storeColor.hex, color: storeColor.text }}
              >
                {product.store?.[0]}
              </div>
              <span className="text-sm text-text-secondary">
                Available on <strong>{product.store}</strong>
              </span>
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
              You will be redirected to {product.store}'s website to complete your purchase.
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

      {/* Reviews Section */}
      <div className="bg-white border border-border p-6 mb-8">
        <div className="flex items-center justify-between mb-6 border-b border-border pb-2">
          <div>
            <h2 className="text-xl font-bold font-serif uppercase tracking-widest text-text-primary">Customer Reviews</h2>
            <div className="w-12 h-[3px] bg-accent mt-2"></div>
          </div>
          <div className="flex items-center gap-2">
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
            <span className="text-sm font-medium text-text-primary">{product.rating} / 5</span>
          </div>
        </div>

        <div className="space-y-4">
          {MOCK_REVIEWS.map((review) => (
            <div key={review.id} className="p-4 bg-white rounded-sm border border-border">
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-sm bg-border flex items-center justify-center">
                    <span className="text-xs font-bold font-serif text-text-primary">{review.user.charAt(0)}</span>
                  </div>
                  <div>
                    <span className="text-sm font-bold font-serif uppercase tracking-widest text-text-primary">{review.user}</span>
                    <p className="text-[11px] text-text-muted font-bold uppercase">{review.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-3 h-3 ${i < review.rating ? 'text-warning' : 'text-border-light'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>
      </div>

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
