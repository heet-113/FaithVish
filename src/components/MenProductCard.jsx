import { Link } from 'react-router-dom';
import { BADGE_STYLES, formatPrice, getDiscountPercentage, MEN_CATEGORY_LABELS } from '../utils/constants';

const STORE_COLORS = {
  Amazon: { hex: '#FF9900', text: '#1a1a1a' },
  Flipkart: { hex: '#2874F0', text: '#ffffff' },
  Myntra: { hex: '#FF3F6C', text: '#ffffff' },
  Meesho: { hex: '#F43397', text: '#ffffff' },
  Tanishq: { hex: '#832729', text: '#ffffff' },
  CaratLane: { hex: '#5C2D91', text: '#ffffff' },
  BlueStone: { hex: '#003366', text: '#ffffff' },
  Nykaa: { hex: '#FC2779', text: '#ffffff' },
  Salty: { hex: '#C9A96E', text: '#1E1E20' },
};

const MenProductCard = ({ product }) => {
  const discount = getDiscountPercentage(product.price, product.originalPrice);
  const displayCategory = MEN_CATEGORY_LABELS[product.category] || product.category;

  return (
    <Link
      to={`/product/${product.id}`}
      className="block overflow-hidden group transition-all duration-300 men-card"
      id={`product-card-${product.id}`}
      style={{ borderRadius: '2px' }}
    >
      {/* Image section */}
      <div className="relative overflow-hidden aspect-square border-b" style={{ borderColor: '#3A3A3C', backgroundColor: '#222224', padding: '8px' }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Category badge */}
        <div className="absolute top-0 left-0">
          <span
            className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest font-serif border-b border-r"
            style={{ background: '#1E1E20', color: '#C9A96E', borderColor: '#3A3A3C' }}
          >
            {displayCategory}
          </span>
        </div>
        {/* Discount badge */}
        {discount > 0 && (
          <div className="absolute top-0 right-0">
            <span
              className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest font-serif border-b border-l"
              style={{ background: '#C9A96E', color: '#1E1E20', borderColor: '#A8903E' }}
            >
              {discount}% Off
            </span>
          </div>
        )}
        {/* Product badge */}
        {product.badge && (
          <div className="absolute bottom-2 left-2">
            <span
              className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest font-serif"
              style={{ background: '#C9A96E', color: '#1E1E20', borderRadius: '2px' }}
            >
              {product.badge}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Product name */}
        <h3
          className="text-sm font-semibold mb-1.5 line-clamp-2 transition-colors leading-snug"
          style={{ color: '#F5F5F0' }}
          onMouseEnter={e => e.currentTarget.style.color = '#C9A96E'}
          onMouseLeave={e => e.currentTarget.style.color = '#F5F5F0'}
        >
          {product.name}
        </h3>

        {/* Rating */}
        {product.rating != null && (
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  style={{ color: i < Math.floor(product.rating) ? '#C9A96E' : '#3A3A3C' }}
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[11px]" style={{ color: '#6B6B6B' }}>
              {product.rating}{product.reviewCount != null ? ` (${product.reviewCount.toLocaleString()})` : ''}
            </span>
          </div>
        )}

        {/* Price section */}
        <div className="mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold" style={{ color: '#F5F5F0' }}>
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className="text-xs line-through" style={{ color: '#6B6B6B' }}>
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="text-xs font-bold" style={{ color: '#C9A96E' }}>
                  {discount}% off
                </span>
              </>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="pt-3 border-t flex items-center justify-end" style={{ borderColor: '#3A3A3C' }}>
          <span
            className="text-xs font-bold uppercase tracking-widest transition-colors group-hover:opacity-80"
            style={{ color: '#C9A96E' }}
          >
            Shop Now →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default MenProductCard;
