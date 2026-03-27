import { Link } from 'react-router-dom';
import { PLATFORM_COLORS, formatPrice, getLowestPricePlatform, getSavingsPercentage } from '../utils/constants';

const ProductCard = ({ product }) => {
  const lowestPlatform = getLowestPricePlatform(product.platforms);
  const savings = getSavingsPercentage(product.platforms);
  const inStockPlatforms = product.platforms.filter((p) => p.inStock);

  return (
    <Link to={`/product/${product.id}`} className="bg-white border hover:border-accent border-border block overflow-hidden group transition-colors">
      {/* Image section */}
      <div className="relative overflow-hidden aspect-square bg-white border-b border-border p-2">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Category badge */}
        <div className="absolute top-0 left-0 flex items-center gap-1.5">
          <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-widest bg-white text-text-secondary border-b border-r border-border rounded-br-sm font-serif">
            {product.category}
          </span>
          {product.isLive && (
            <span className="px-2 py-1 text-[10px] font-bold bg-accent text-white uppercase tracking-widest font-serif">
              Live
            </span>
          )}
        </div>
        {/* Savings badge */}
        {savings > 0 && (
          <div className="absolute top-0 right-0">
            <span className="px-2 py-1 text-[10px] font-bold bg-success text-white border-b border-l border-success uppercase tracking-widest font-serif rounded-bl-sm">
              Save {savings}%
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Product name */}
        <h3 className="text-sm font-semibold text-text-primary mb-1 line-clamp-2 group-hover:text-accent-light transition-colors">
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

        {/* Price comparison mini */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {inStockPlatforms.slice(0, 3).map((platform) => {
            const isLowest = lowestPlatform && platform.name === lowestPlatform.name;
            const colors = PLATFORM_COLORS[platform.name];
            return (
              <div 
                key={platform.name} 
                className={`flex flex-col items-center p-2 rounded-sm border-2 transition-all ${
                  isLowest ? 'bg-success-bg border-success' : 'bg-white border-border'
                }`}
              >
                <div 
                  className="w-6 h-6 flex items-center justify-center text-[10px] font-black text-white mb-1 rounded-sm"
                  style={{ backgroundColor: colors?.hex || '#6B7280' }}
                >
                  {platform.name[0]}
                </div>
                <span className={`text-[10px] font-bold mt-1 ${isLowest ? 'text-success' : 'text-text-primary'}`}>
                  ₹{platform.price}
                </span>
              </div>
            );
          })}
        </div>

        {/* Bottom section */}
        {lowestPlatform && (
          <div className="pt-3 border-t border-border flex items-center justify-between">
            <div>
              <p className="text-[10px] text-text-muted">Best price on</p>
              <p className="text-xs font-semibold" style={{ color: PLATFORM_COLORS[lowestPlatform.name]?.hex }}>
                {lowestPlatform.name}
              </p>
            </div>
            <span className="text-lg font-bold text-success">
              {formatPrice(lowestPlatform.price)}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
