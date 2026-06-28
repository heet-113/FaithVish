import { Link } from 'react-router-dom';
import { formatPrice, getDiscountPercentage } from '../utils/constants';

const MenProductCard = ({ product, isLarge }) => {
  const discount = getDiscountPercentage(product.price, product.originalPrice);

  return (
    <Link
      to={`/product/${product.id}`}
      className="flex flex-col h-full overflow-hidden group transition-all duration-300 men-card"
      id={`product-card-${product.id}`}
      style={{ 
        background: '#222224', 
        border: '1px solid #3A3A3C',
        borderRadius: '12px'
      }}
    >
      {/* Image section */}
      <div 
        className={`relative w-full overflow-hidden shrink-0 bg-[#1A1A1C] border-b border-[#3A3A3C] ${isLarge ? 'aspect-[4/3] sm:aspect-[3/2]' : 'aspect-square'}`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700"
          loading="lazy"
        />
        
        {/* Product badge */}
        {product.badge && (
          <div className="absolute top-2 left-2 z-10">
            <span
              className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest"
              style={{ background: '#C9A96E', color: '#1E1E20', borderRadius: '2px' }}
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
          style={{ color: '#F5F5F0' }}
        >
          {product.name}
        </h3>

        {/* Price section */}
        <div className="mt-auto">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[13px] sm:text-sm font-bold" style={{ color: '#F5F5F0' }}>
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className="text-[11px] line-through" style={{ color: '#6B6B6B' }}>
                  {formatPrice(product.originalPrice)}
                </span>
                {discount > 0 && (
                  <span 
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded-sm" 
                    style={{ background: 'rgba(201, 169, 110, 0.15)', color: '#C9A96E' }}
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

export default MenProductCard;
