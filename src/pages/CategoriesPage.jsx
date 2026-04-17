import { Link, useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import { JEWELRY_CATEGORIES, formatPrice } from '../utils/constants';
import { getCategoryIcon } from '../components/CategoryGrid';

const CATEGORY_GRADIENTS = {
  Rings: 'from-pink-500/20 to-rose-500/20',
  Necklaces: 'from-amber-500/20 to-yellow-500/20',
  Earrings: 'from-purple-500/20 to-fuchsia-500/20',
  Bracelets: 'from-cyan-500/20 to-blue-500/20',
  Bangles: 'from-orange-500/20 to-amber-500/20',
  Pendants: 'from-teal-500/20 to-emerald-500/20',
  Anklets: 'from-rose-500/20 to-pink-500/20',
  Mangalsutra: 'from-red-500/20 to-orange-500/20',
};

const CategoriesPage = () => {
  const { products, setSelectedCategory, setSearchQuery } = useStore();
  const navigate = useNavigate();

  const getCategoryStats = (category) => {
    const categoryProducts = products.filter((p) => p.category === category);
    const prices = categoryProducts.map((p) => p.price);
    return {
      count: categoryProducts.length,
      minPrice: prices.length > 0 ? Math.min(...prices) : 0,
      maxPrice: prices.length > 0 ? Math.max(...prices) : 0,
    };
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearchQuery('');
    navigate('/');
    // Scroll to the category section after navigation
    setTimeout(() => {
      const el = document.getElementById(`category-${category}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-10 pb-4 border-b-2 border-border">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent-secondary mb-3">Curated for You</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 font-serif uppercase tracking-widest text-text-primary">
          Our Collections
        </h1>
        <p className="text-text-muted text-sm sm:text-base max-w-xl mx-auto">
          Explore our handpicked jewelry across beautiful categories — from everyday elegance to bridal grandeur.
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
        {JEWELRY_CATEGORIES.map((category) => {
          const stats = getCategoryStats(category);
          const icon = getCategoryIcon(category);

          return (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className="bg-white border border-border hover:border-accent hover:border-l-4 transition-all text-left p-6 group cursor-pointer"
              id={`collection-${category}`}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-sm bg-surface-light border border-border flex items-center justify-center mb-4 transition-transform duration-300 text-text-secondary group-hover:text-accent">
                {icon}
              </div>

              {/* Info */}
              <h3 className="text-lg font-bold font-serif uppercase tracking-widest text-text-primary mb-1 group-hover:text-accent transition-colors">
                {category}
              </h3>
              <p className="text-sm text-text-muted mb-4">
                {stats.count} piece{stats.count !== 1 ? 's' : ''} available
              </p>

              {/* Price range */}
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div>
                  <p className="text-[10px] text-text-muted uppercase tracking-wider font-bold">Starting from</p>
                  <p className="text-lg font-bold text-accent-secondary">
                    {stats.minPrice > 0 ? formatPrice(stats.minPrice) : '—'}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-sm bg-white border border-border flex items-center justify-center group-hover:border-accent group-hover:text-accent transition-colors">
                  <svg className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Browse all */}
      <div className="text-center mt-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3 text-sm font-bold uppercase tracking-widest text-white bg-accent rounded-sm border-2 border-accent hover:bg-white hover:text-accent transition-all"
        >
          View All Jewelry
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default CategoriesPage;
