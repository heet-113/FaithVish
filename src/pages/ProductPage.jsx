import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import ProductCard from '../components/ProductCard';
import MenProductCard from '../components/MenProductCard';
import { STORE_COLORS, BADGE_STYLES, formatPrice, getDiscountPercentage } from '../utils/constants';

// Define Card component outside render to avoid static component lint error
const Card = ({ children, className = '', style = {} }) => {
  const { id } = useParams();
  const { getProductById, activeGender } = useStore();
  const product = getProductById(id);
  const isMen = product ? product.gender === 'men' : activeGender === 'men';

  return (
    <div
      className={className}
      style={{
        background: isMen ? '#282828' : '#ffffff',
        border: `1px solid ${isMen ? '#3A3A3C' : 'var(--color-border)'}`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, getRelatedProducts, activeGender, setActiveGender } = useStore();
  const product = getProductById(id);
  const relatedProducts = getRelatedProducts(id, 4);

  useEffect(() => {
    if (product && product.gender && product.gender !== activeGender) {
      setActiveGender(product.gender);
    }
  }, [product, activeGender, setActiveGender]);

  const isMen = product ? product.gender === 'men' : activeGender === 'men';

  // Men's palette
  const m = {
    bg: '#1E1E20',
    card: '#282828',
    cardHover: '#303032',
    border: '#3A3A3C',
    accent: '#C9A96E',
    accentLight: '#D4BA82',
    textPrimary: '#F5F5F0',
    textSecondary: '#9A9A9A',
    textMuted: '#6B6B6B',
    surface: '#1A1A1C',
  };

  if (!product) {
    return (
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"
        style={isMen ? { background: m.bg, minHeight: '60vh' } : {}}
      >
        <div
          className="w-20 h-20 rounded-sm flex items-center justify-center mx-auto mb-4"
          style={{
            background: isMen ? m.card : 'var(--color-surface-card)',
            borderBottom: `4px solid ${isMen ? m.accent : 'var(--color-accent)'}`,
          }}
        >
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: isMen ? m.textMuted : 'var(--color-text-muted)' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold font-serif uppercase tracking-widest mb-2" style={{ color: isMen ? m.textPrimary : 'var(--color-text-primary)' }}>Product Not Found</h2>
        <p className="mb-6" style={{ color: isMen ? m.textMuted : 'var(--color-text-muted)' }}>The jewelry piece you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="px-8 py-3 rounded-sm text-sm font-bold uppercase tracking-widest transition-colors"
          style={{
            background: isMen ? m.accent : 'var(--color-accent)',
            color: isMen ? m.bg : '#ffffff',
            border: `2px solid ${isMen ? m.accent : 'var(--color-accent)'}`,
          }}
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const discount = getDiscountPercentage(product.price, product.originalPrice);
  const badgeStyle = product.badge ? BADGE_STYLES[product.badge] : null;



  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-6 flex-wrap overflow-hidden" style={{ color: isMen ? m.textMuted : 'var(--color-text-muted)' }}>
        <Link to="/" className="transition-colors" style={{ color: isMen ? m.textMuted : undefined }} onMouseEnter={e => e.currentTarget.style.color = isMen ? m.accent : ''} onMouseLeave={e => e.currentTarget.style.color = isMen ? m.textMuted : ''}>Home</Link>
        <span>/</span>
        <Link to="/categories" className="transition-colors" style={{ color: isMen ? m.textMuted : undefined }} onMouseEnter={e => e.currentTarget.style.color = isMen ? m.accent : ''} onMouseLeave={e => e.currentTarget.style.color = isMen ? m.textMuted : ''}>{product.category}</Link>
        <span>/</span>
        <span className="truncate" style={{ color: isMen ? m.textSecondary : 'var(--color-text-secondary)' }}>{product.name}</span>
      </nav>

      {/* Product main section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Image */}
        <Card className="p-4">
          <div
            className="relative aspect-square p-2"
            style={{
              border: `2px solid ${isMen ? m.border : 'var(--color-border)'}`,
              background: isMen ? '#222224' : '#ffffff',
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/400?text=No+Image'; }}
            />
            {discount > 0 && (
              <div className="absolute top-0 right-0">
                <span
                  className="px-3 py-1.5 text-xs font-bold uppercase tracking-widest font-serif rounded-bl-sm"
                  style={{
                    background: isMen ? m.accent : 'var(--color-accent)',
                    color: isMen ? m.bg : '#ffffff',
                    borderBottom: `1px solid ${isMen ? m.accent : 'var(--color-accent)'}`,
                    borderLeft: `1px solid ${isMen ? m.accent : 'var(--color-accent)'}`,
                  }}
                >
                  {discount}% Off
                </span>
              </div>
            )}
            {badgeStyle && (
              <div className="absolute top-0 left-0">
                <span
                  className="px-3 py-1.5 text-xs font-bold uppercase tracking-widest font-serif rounded-br-sm"
                  style={isMen
                    ? { background: m.accent, color: m.bg }
                    : { backgroundColor: badgeStyle.bg, color: badgeStyle.text }
                  }
                >
                  {product.badge}
                </span>
              </div>
            )}
          </div>
        </Card>

        {/* Info */}
        <div className="space-y-6">
          {/* Title and rating */}
          <div>
            <span
              className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-widest rounded-sm font-serif mb-3"
              style={{
                background: isMen ? m.card : '#ffffff',
                border: `1px solid ${isMen ? m.border : 'var(--color-border)'}`,
                color: isMen ? m.textSecondary : 'var(--color-text-secondary)',
              }}
            >
              {product.category}
            </span>
            <h1
              className="text-2xl sm:text-3xl font-extrabold font-serif tracking-widest uppercase mb-2 leading-tight"
              style={{ color: isMen ? m.textPrimary : 'var(--color-text-primary)' }}
            >
              {product.name}
            </h1>
            <div className="w-16 h-[3px] mb-4" style={{ background: isMen ? m.accent : 'var(--color-accent)' }} />
            {product.rating != null && (
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      style={{ color: i < Math.floor(product.rating) ? (isMen ? m.accent : 'var(--color-warning)') : (isMen ? m.border : 'var(--color-border-light)') }}
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-medium" style={{ color: isMen ? m.textSecondary : 'var(--color-text-secondary)' }}>
                  {product.rating}
                </span>
                {product.reviewCount != null && (
                  <span className="text-sm" style={{ color: isMen ? m.textMuted : 'var(--color-text-muted)' }}>
                    ({product.reviewCount.toLocaleString()} reviews)
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed" style={{ color: isMen ? m.textSecondary : 'var(--color-text-secondary)' }}>
            {product.description}
          </p>

          {/* Price Disclaimer */}
          <div
            className="flex items-start gap-3 rounded-sm px-4 py-3"
            style={{
              background: isMen ? '#2C2820' : '#FFFBEB',
              border: `1px solid ${isMen ? '#4A4030' : '#FDE68A'}`,
            }}
            id="price-disclaimer"
          >
            <svg className="w-5 h-5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" style={{ color: isMen ? m.accent : '#F59E0B' }}>
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: isMen ? m.accent : '#B45309' }}>Price May Have Changed</p>
              <p className="text-[11px] leading-relaxed" style={{ color: isMen ? '#9A8A6A' : '#D97706' }}>
                Prices on our site are updated manually and may not reflect the current price. Always check the <strong style={{ color: isMen ? m.textPrimary : undefined }}>final price on {product.store}</strong> before completing your purchase.
              </p>
            </div>
          </div>

          {/* Price & Buy Section */}
          <Card className="p-6">
            <div className="mb-4">
              <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
                <span className="text-3xl font-black" style={{ color: isMen ? m.textPrimary : 'var(--color-text-primary)' }}>
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-lg line-through" style={{ color: isMen ? m.textMuted : 'var(--color-text-muted)' }}>
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span
                      className="px-2 py-0.5 text-sm font-bold rounded-sm"
                      style={{
                        background: isMen ? 'rgba(201,169,110,0.15)' : 'var(--color-success-bg)',
                        color: isMen ? m.accent : 'var(--color-success)',
                      }}
                    >
                      {discount}% off
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs mt-1" style={{ color: isMen ? m.textMuted : 'var(--color-text-muted)' }}>Inclusive of all taxes</p>
              {product.lastUpdated && (
                <p className="flex items-center gap-1 text-[11px] mt-1" style={{ color: isMen ? '#9A8A6A' : '#D97706' }}>
                  <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Price last verified:{' '}
                  <span className="font-semibold">
                    {new Date(product.lastUpdated + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </p>
              )}
            </div>

            {/* Buy Now Button */}
            <a
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-8 py-4 text-center text-sm font-bold uppercase tracking-[0.2em] rounded-sm transition-all"
              style={{
                background: isMen ? m.accent : 'var(--color-accent)',
                color: isMen ? m.bg : '#ffffff',
                border: `2px solid ${isMen ? m.accent : 'var(--color-accent)'}`,
              }}
              id="buy-now-btn"
            >
              Buy Now on {product.store} →
            </a>
            <p className="text-[11px] sm:text-[10px] text-center mt-2" style={{ color: isMen ? m.textMuted : 'var(--color-text-muted)' }}>
              You will be redirected to {product.store}'s website to complete your purchase. As an affiliate, we may earn a small commission at no extra cost to you.
            </p>
          </Card>

          {/* Specs */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <Card className="p-5">
              <h2
                className="text-sm font-bold font-serif uppercase tracking-widest mb-4 pb-2"
                style={{
                  color: isMen ? m.textPrimary : 'var(--color-text-primary)',
                  borderBottom: `1px solid ${isMen ? m.border : 'var(--color-border)'}`,
                }}
              >
                Product Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex items-start gap-2">
                    <span className="text-xs whitespace-nowrap min-w-[80px]" style={{ color: isMen ? m.textMuted : 'var(--color-text-muted)' }}>{key}</span>
                    <span className="text-xs font-medium" style={{ color: isMen ? m.textPrimary : 'var(--color-text-primary)' }}>{value}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* ========== EDITORIAL CONTENT SECTIONS ========== */}

      {/* Our Review */}
      {product.shortReview && (
        <Card className="mb-8 p-6 sm:p-8" id="product-review">
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-10 h-10 rounded-sm flex items-center justify-center"
              style={{
                background: isMen ? 'rgba(201,169,110,0.1)' : 'var(--color-accent-10, rgba(236,72,153,0.1))',
                border: `1px solid ${isMen ? 'rgba(201,169,110,0.3)' : 'var(--color-accent-30, rgba(236,72,153,0.3))'}`,
              }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: isMen ? m.accent : 'var(--color-accent)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold font-serif uppercase tracking-widest" style={{ color: isMen ? m.textPrimary : 'var(--color-text-primary)' }}>Our Review</h2>
              <div className="w-10 h-[2px] mt-1" style={{ background: isMen ? m.accent : 'var(--color-accent)' }} />
            </div>
          </div>
          <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: isMen ? m.textSecondary : 'var(--color-text-secondary)' }}>
            {product.shortReview}
          </p>
          <p
            className="text-[11px] sm:text-[10px] mt-4 pt-3 italic"
            style={{
              color: isMen ? m.textMuted : 'var(--color-text-muted)',
              borderTop: `1px solid ${isMen ? m.border : 'var(--color-border)'}`,
            }}
          >
            This review is based on product specifications, seller descriptions, and verified buyer ratings on {product.store}. FaithVish does not physically test products.
          </p>
        </Card>
      )}

      {/* Pros & Cons */}
      {(product.pros?.length > 0 || product.cons?.length > 0) && (
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-5" id="pros-cons">
          {product.pros?.length > 0 && (
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: `1px solid ${isMen ? m.border : 'var(--color-border)'}` }}>
                <div
                  className="w-8 h-8 rounded-sm flex items-center justify-center"
                  style={{
                    background: isMen ? 'rgba(34,197,94,0.1)' : '#F0FDF4',
                    border: `1px solid ${isMen ? 'rgba(34,197,94,0.2)' : '#BBF7D0'}`,
                  }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#22C55E' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold font-serif uppercase tracking-widest" style={{ color: isMen ? '#4ADE80' : '#166534' }}>What We Like</h3>
              </div>
              <ul className="space-y-3">
                {product.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: isMen ? 'rgba(34,197,94,0.15)' : '#DCFCE7' }}>
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#22C55E' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-sm leading-relaxed" style={{ color: isMen ? m.textSecondary : 'var(--color-text-secondary)' }}>{pro}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
          {product.cons?.length > 0 && (
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: `1px solid ${isMen ? m.border : 'var(--color-border)'}` }}>
                <div
                  className="w-8 h-8 rounded-sm flex items-center justify-center"
                  style={{
                    background: isMen ? 'rgba(239,68,68,0.1)' : '#FEF2F2',
                    border: `1px solid ${isMen ? 'rgba(239,68,68,0.2)' : '#FECACA'}`,
                  }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#EF4444' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold font-serif uppercase tracking-widest" style={{ color: isMen ? '#F87171' : '#991B1B' }}>Watch Out For</h3>
              </div>
              <ul className="space-y-3">
                {product.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: isMen ? 'rgba(239,68,68,0.15)' : '#FEE2E2' }}>
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#EF4444' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </span>
                    <span className="text-sm leading-relaxed" style={{ color: isMen ? m.textSecondary : 'var(--color-text-secondary)' }}>{con}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      )}

      {/* Who Should Buy */}
      {product.whoShouldBuy && (
        <Card className="mb-8 p-6 sm:p-8" id="who-should-buy">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-sm flex items-center justify-center"
              style={{
                background: isMen ? 'rgba(201,169,110,0.1)' : 'var(--color-accent-secondary-10, rgba(6,182,212,0.1))',
                border: `1px solid ${isMen ? 'rgba(201,169,110,0.3)' : 'var(--color-accent-secondary-30, rgba(6,182,212,0.3))'}`,
              }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: isMen ? m.accent : 'var(--color-accent-secondary)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold font-serif uppercase tracking-widest" style={{ color: isMen ? m.textPrimary : 'var(--color-text-primary)' }}>Who Should Buy This?</h2>
              <div className="w-10 h-[2px] mt-1" style={{ background: isMen ? m.accent : 'var(--color-accent-secondary)' }} />
            </div>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: isMen ? m.textSecondary : 'var(--color-text-secondary)' }}>
            {product.whoShouldBuy}
          </p>
        </Card>
      )}

      {/* Second CTA */}
      <Card className="mb-12 p-6 text-center" id="cta-bottom" style={{
        background: isMen ? m.card : '#ffffff',
        border: `2px solid ${isMen ? 'rgba(201,169,110,0.3)' : 'rgba(236,72,153,0.2)'}`,
      }}>
        <p className="text-sm mb-3" style={{ color: isMen ? m.textSecondary : 'var(--color-text-secondary)' }}>
          Convinced? Get the <strong style={{ color: isMen ? m.textPrimary : 'var(--color-text-primary)' }}>{product.name.length > 60 ? product.name.substring(0, 60) + '...' : product.name}</strong> for just <strong style={{ color: isMen ? m.accent : 'var(--color-accent)' }}>{formatPrice(product.price)}</strong>
          {discount > 0 && <span className="font-semibold" style={{ color: isMen ? '#4ADE80' : 'var(--color-success)' }}> ({discount}% off)</span>}
        </p>
        <a
          href={product.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-10 py-3.5 w-full sm:w-auto text-sm font-bold uppercase tracking-[0.2em] rounded-sm transition-all"
          style={{
            background: isMen ? m.accent : 'var(--color-accent)',
            color: isMen ? m.bg : '#ffffff',
            border: `2px solid ${isMen ? m.accent : 'var(--color-accent)'}`,
          }}
          id="buy-now-btn-bottom"
        >
          Buy Now on {product.store} →
        </a>
        <p className="text-[11px] sm:text-[10px] mt-2" style={{ color: isMen ? m.textMuted : 'var(--color-text-muted)' }}>
          Affiliate link — we may earn a commission at no extra cost to you
        </p>
      </Card>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6 pb-2" style={{ borderBottom: `1px solid ${isMen ? m.border : 'var(--color-border)'}` }}>
            <div>
              <h2 className="text-xl font-bold font-serif uppercase tracking-widest" style={{ color: isMen ? m.textPrimary : 'var(--color-text-primary)' }}>You May Also Like</h2>
              <div className="w-12 h-[3px] mt-2" style={{ background: isMen ? m.accent : 'var(--color-accent)' }} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger-children">
            {relatedProducts.map((p) => (
              isMen ? <MenProductCard key={p.id} product={p} /> : <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Back button */}
      <div className="text-center mt-12 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="px-8 py-3 text-sm font-bold uppercase tracking-widest rounded-sm transition-all"
          style={{
            background: isMen ? m.card : '#ffffff',
            border: `2px solid ${isMen ? m.border : 'var(--color-border)'}`,
            color: isMen ? m.textSecondary : 'var(--color-text-secondary)',
          }}
        >
          ← Back to Jewelry
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
