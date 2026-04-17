import { Link } from 'react-router-dom';
import { STORE_COLORS, BADGE_STYLES, formatPrice, getDiscountPercentage } from '../utils/constants';

const ProductCard = ({ product }) => {
  const discount = getDiscountPercentage(product.price, product.originalPrice);
  const storeColor = STORE_COLORS[product.store] || { hex: '#6B7280', text: '#ffffff' };
  const badgeStyle = product.badge ? BADGE_STYLES[product.badge] : null;

  return (
    <Link to={`/product/${product.id}`} className="bg-white border hover:border-accent border-border block overflow-hidden group transition-all duration-300 hover:shadow-[0_8px_30px_rgba(236,72,153,0.12)]" id={`product-card-${product.id}`}>
      {/* Image section */}
      <div className="relative overflow-hidden aspect-square bg-white border-b border-border p-2">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Category badge */}
        <div className="absolute top-0 left-0">
          <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-white text-text-secondary border-b border-r border-border rounded-br-sm font-serif">
            {product.category}
          </span>
        </div>
        {/* Discount badge */}
        {discount > 0 && (
          <div className="absolute top-0 right-0">
            <span className="px-2.5 py-1 text-[10px] font-bold bg-accent text-white border-b border-l border-accent uppercase tracking-widest font-serif rounded-bl-sm">
              {discount}% Off
            </span>
          </div>
        )}
        {/* Product badge (Bestseller, etc.) */}
        {badgeStyle && (
          <div className="absolute bottom-2 left-2">
            <span
              className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest rounded-sm font-serif"
              style={{ backgroundColor: badgeStyle.bg, color: badgeStyle.text }}
            >
              {product.badge}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Product name */}
        <h3 className="text-sm font-semibold text-text-primary mb-1.5 line-clamp-2 group-hover:text-accent transition-colors leading-snug">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
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
            {product.rating || 'N/A'} ({(product.reviewCount || 0).toLocaleString()})
          </span>
        </div>

        {/* Price section */}
        <div className="mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-text-primary">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className="text-xs text-text-muted line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="text-xs font-bold text-success">
                  {discount}% off
                </span>
              </>
            )}
          </div>
        </div>

        {/* Store + CTA */}
        <div className="pt-3 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div
              className="w-5 h-5 rounded-sm flex items-center justify-center text-[8px] font-black shrink-0"
              style={{ backgroundColor: storeColor.hex, color: storeColor.text }}
            >
              {product.store?.[0]}
            </div>
            <span className="text-[11px] text-text-muted">{product.store}</span>
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-accent group-hover:text-accent-light transition-colors">
            Shop Now →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
