import { useParams, Link, useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import { PLATFORM_COLORS, formatPrice, getLowestPricePlatform, getSavingsPercentage } from '../utils/constants';

const MOCK_REVIEWS = [
  { id: 1, user: 'Rahul S.', rating: 5, date: '2 days ago', text: 'Excellent product! Exactly as described. Very happy with my purchase. The quality is outstanding and delivery was quick.' },
  { id: 2, user: 'Priya M.', rating: 4, date: '1 week ago', text: 'Good value for money. Works well and looks great. Minor packaging issue but the product itself is perfect.' },
  { id: 3, user: 'Amit K.', rating: 5, date: '2 weeks ago', text: 'Best purchase I have made in a long time! Highly recommended. Compared prices on multiple sites and got the best deal here.' },
  { id: 4, user: 'Sneha R.', rating: 4, date: '3 weeks ago', text: 'Satisfied with the product. The quality matches the description. Would definitely buy from this brand again.' },
  { id: 5, user: 'Vikram T.', rating: 3, date: '1 month ago', text: 'Decent product for the price. Not the best quality but gets the job done. Good enough for everyday use.' },
];

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById } = useStore();
  const product = getProductById(id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="w-20 h-20 rounded-sm bg-surface-card border-b-4 border-b-accent flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold font-serif uppercase tracking-widest text-text-primary mb-2">Product Not Found</h2>
        <p className="text-text-muted mb-6">The product you're looking for doesn't exist.</p>
        <Link to="/" className="px-8 py-3 bg-accent text-white border-2 border-accent rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-accent transition-colors">
          Back to Home
        </Link>
      </div>
    );
  }

  const lowestPlatform = getLowestPricePlatform(product.platforms);
  const savings = getSavingsPercentage(product.platforms);
  const inStockPlatforms = product.platforms.filter((p) => p.inStock);
  const outOfStockPlatforms = product.platforms.filter((p) => !p.inStock);

  const getPlatformBtnClass = (platformName) => {
    return PLATFORM_COLORS[platformName]?.btn || 'bg-accent text-white';
  };

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
            {savings > 0 && (
              <div className="absolute top-0 right-0">
                <span className="px-3 py-1.5 text-xs font-bold bg-success text-white border-b border-l border-success uppercase tracking-widest font-serif rounded-bl-sm">
                  Save up to {savings}%
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
              <span className="text-sm text-text-secondary font-medium">
                {product.rating || 'N/A'}
              </span>
              <span className="text-sm text-text-muted">
                ({(product.reviewCount || 0).toLocaleString()} reviews)
              </span>
              {product.isLive && (
                <span className="px-2 py-0.5 text-[9px] font-bold border border-success text-success rounded-sm uppercase tracking-widest">
                  Live Data
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-text-secondary leading-relaxed">
            {product.description}
          </p>

          {/* Price comparison table */}
          <div className="bg-white border border-border p-5">
            <div className="flex items-center justify-between mb-4 border-b border-border pb-2">
              <h2 className="text-lg font-bold font-serif text-accent-secondary uppercase tracking-widest">
                Price Comparison
              </h2>
              {lowestPlatform && (
                <span className="text-xs text-success font-bold uppercase tracking-wider">
                  Best: {formatPrice(lowestPlatform.price)}
                </span>
              )}
            </div>

            <div className="space-y-3">
              {/* In stock */}
              {inStockPlatforms
                .sort((a, b) => a.price - b.price)
                .map((platform, idx) => {
                  const isLowest = lowestPlatform && platform.name === lowestPlatform.name;
                  const colors = PLATFORM_COLORS[platform.name];
                  return (
                    <div
                      key={platform.name}
                      className={`flex items-center justify-between p-3 rounded-sm transition-all border ${
                        isLowest
                          ? 'bg-success-bg border-success'
                          : 'bg-white border-transparent hover:border-border'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-2.5 h-2.5 rounded-sm shrink-0 border border-text-primary/20"
                          style={{ backgroundColor: colors?.hex }}
                        />
                        <div>
                          <span className="text-sm font-semibold text-text-primary">{platform.name}</span>
                          {isLowest && (
                            <span className="ml-2 px-2 py-0.5 text-[9px] font-bold bg-success text-white rounded-sm uppercase font-serif tracking-widest">
                              Best Deal
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-base font-bold ${isLowest ? 'text-success' : 'text-text-primary'}`}>
                          {formatPrice(platform.price)}
                        </span>
                        <a
                          href={platform.affiliateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${getPlatformBtnClass(platform.name)} px-4 py-2 text-xs font-bold rounded-sm uppercase tracking-widest border border-transparent hover:border-text-primary transition-all`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          Buy Now
                        </a>
                      </div>
                    </div>
                  );
                })}

              {/* Out of stock */}
              {outOfStockPlatforms.map((platform) => {
                const colors = PLATFORM_COLORS[platform.name];
                return (
                  <div
                    key={platform.name}
                    className="flex items-center justify-between p-3 rounded-sm bg-surface-hover/50 opacity-60 border border-transparent"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-2.5 h-2.5 rounded-sm shrink-0 grayscale opacity-50"
                        style={{ backgroundColor: colors?.hex }}
                      />
                      <span className="text-sm text-text-muted">{platform.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-text-muted line-through">{formatPrice(platform.price)}</span>
                      <span className="px-3 py-2 text-xs font-bold uppercase tracking-widest text-text-muted bg-white border border-border rounded-sm">
                        Out of Stock
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Specs */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="bg-white border border-border p-5">
              <h2 className="text-sm font-bold font-serif text-text-primary uppercase tracking-widest mb-4 border-b border-border pb-2">
                Specifications
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
          ← Back to Products
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
