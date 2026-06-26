import { Link } from 'react-router-dom';
import { BADGE_STYLES, formatPrice, getDiscountPercentage } from '../utils/constants';

const ProductCard = ({ product, isLarge }) => {
  const discount = getDiscountPercentage(product.price, product.originalPrice);
  const badgeStyle = product.badge ? BADGE_STYLES[product.badge] : null;

  return (
    <Link
      to={`/product/${product.id}`}
      className="flex flex-col h-full overflow-hidden group transition-all duration-300"
      style={{
        background: '#FFFFFF',
        border: '1px solid #F0F0F0',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
      }}
      id={`product-card-${product.id}`}
    >
      {/* Image section */}
      <div 
        className={`relative w-full overflow-hidden shrink-0 bg-[#F9F9F9] ${isLarge ? 'aspect-[4/3] sm:aspect-[3/2]' : 'aspect-square'}`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Product badge */}
        {badgeStyle && (
          <div className="absolute top-2 left-2 z-10">
            <span
              className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest rounded-sm shadow-sm"
              style={{ backgroundColor: badgeStyle.bg, color: badgeStyle.text }}
            >
              {product.badge}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 flex flex-col flex-grow text-left">
        {/* Product name */}
        <h3
          className="text-[13px] sm:text-sm font-semibold mb-2 line-clamp-1 leading-snug transition-colors"
          style={{ color: '#1A1A1A' }}
        >
          {product.name}
        </h3>

        {/* Price section */}
        <div className="mt-auto">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[13px] sm:text-sm font-bold" style={{ color: '#1A1A1A' }}>
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className="text-[11px] line-through" style={{ color: '#999999' }}>
                  {formatPrice(product.originalPrice)}
                </span>
                {discount > 0 && (
                  <span 
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded-sm" 
                    style={{ background: '#F0E6F5', color: '#6B4C8A' }}
                  >
                    {discount}% OFF
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
