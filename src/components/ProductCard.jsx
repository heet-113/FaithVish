import { Link } from 'react-router-dom';
import { STORE_COLORS, BADGE_STYLES, formatPrice, getDiscountPercentage } from '../utils/constants';

const ProductCard = ({ product }) => {
  const discount = getDiscountPercentage(product.price, product.originalPrice);
  const badgeStyle = product.badge ? BADGE_STYLES[product.badge] : null;

  return (
    <Link
      to={`/product/${product.id}`}
      className="flex flex-col h-full overflow-hidden group transition-all duration-400"
      style={{
        background: '#FFFBF7',
        border: '1px solid var(--color-border)',
        borderRadius: '12px',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--color-accent)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(184, 92, 106, 0.08)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--color-border)';
        e.currentTarget.style.boxShadow = 'none';
      }}
      id={`product-card-${product.id}`}
    >
      {/* Image section */}
      <div className="relative w-full overflow-hidden aspect-square p-2 shrink-0" style={{ background: '#FFFBF7', borderBottom: '1px solid var(--color-border)' }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          style={{ borderRadius: '8px' }}
          loading="lazy"
        />
        {/* Category badge */}
        <div className="absolute top-0 left-0">
          <span
            className="px-2.5 py-1 text-[11px] sm:text-[10px] font-medium tracking-wide font-display"
            style={{
              background: '#FFFBF7',
              color: 'var(--color-text-secondary)',
              borderBottom: '1px solid var(--color-border)',
              borderRight: '1px solid var(--color-border)',
              borderRadius: '0 0 8px 0',
            }}
          >
            {product.category}
          </span>
        </div>
        {/* Discount badge */}
        {discount > 0 && (
          <div className="absolute top-0 right-0">
            <span
              className="px-2.5 py-1 text-[11px] sm:text-[10px] font-bold tracking-wide font-display"
              style={{
                background: 'var(--color-accent)',
                color: '#FFFBF7',
                borderBottom: '1px solid var(--color-accent)',
                borderLeft: '1px solid var(--color-accent)',
                borderRadius: '0 0 0 8px',
              }}
            >
              {discount}% Off
            </span>
          </div>
        )}
        {/* Product badge (Bestseller, etc.) */}
        {badgeStyle && (
          <div className="absolute bottom-2 left-2">
            <span
              className="px-2.5 py-1 text-[10px] sm:text-[9px] font-bold uppercase tracking-widest font-display"
              style={{ backgroundColor: badgeStyle.bg, color: badgeStyle.text, borderRadius: '6px' }}
            >
              {product.badge}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col grow">
        {/* Product name */}
        <h3
          className="text-sm font-medium mb-1.5 line-clamp-2 transition-colors leading-snug"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {product.name}
        </h3>

        {/* Rating — only shown when data exists */}
        {product.rating != null && (
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-3 h-3"
                  style={{ color: i < Math.floor(product.rating) ? '#D4A745' : 'var(--color-border-light)' }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>
              {product.rating}{product.reviewCount != null ? ` (${product.reviewCount.toLocaleString()})` : ''}
            </span>
          </div>
        )}

        {/* Price section */}
        <div className="mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className="text-xs line-through" style={{ color: 'var(--color-text-muted)' }}>
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="text-xs font-bold" style={{ color: 'var(--color-success)' }}>
                  {discount}% off
                </span>
              </>
            )}
          </div>
        </div>

        {/* CTA */}
        <div
          className="mt-auto pt-3 flex items-center justify-end min-h-11 sm:min-h-0"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <span
            className="text-xs font-medium tracking-wide transition-colors"
            style={{ color: 'var(--color-accent)' }}
          >
            Shop Now →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
