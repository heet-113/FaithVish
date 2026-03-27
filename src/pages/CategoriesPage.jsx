import { Link, useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';

const CATEGORY_GRADIENTS = {
  Electronics: 'from-blue-500/20 to-cyan-500/20',
  Footwear: 'from-orange-500/20 to-amber-500/20',
  Clothing: 'from-purple-500/20 to-pink-500/20',
  'Home & Kitchen': 'from-green-500/20 to-emerald-500/20',
  Beauty: 'from-rose-500/20 to-pink-500/20',
  Books: 'from-amber-500/20 to-yellow-500/20',
};

const CATEGORY_ACCENT = {
  Electronics: 'text-blue-400',
  Footwear: 'text-orange-400',
  Clothing: 'text-purple-400',
  'Home & Kitchen': 'text-green-400',
  Beauty: 'text-rose-400',
  Books: 'text-amber-400',
};

const getCategoryIcon = (cat) => {
  const commonClasses = "w-6 h-6 text-current";
  switch(cat) {
    case 'Electronics': return <svg className={commonClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
    case 'Fashion':
    case 'Clothing': return <svg className={commonClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
    case 'Footwear': return <svg className={commonClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>;
    case 'Beauty': return <svg className={commonClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    case 'Home & Kitchen':
    case 'Furniture': return <svg className={commonClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
    case 'Books': return <svg className={commonClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
    default: return <svg className={commonClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
  }
};

const CategoriesPage = () => {
  const { products, setSelectedCategory } = useStore();
  const navigate = useNavigate();

  const categories = [...new Set(products.map((p) => p.category))].sort();

  const getCategoryStats = (category) => {
    const categoryProducts = products.filter((p) => p.category === category);
    const allPrices = categoryProducts.flatMap((p) =>
      p.platforms.filter((pl) => pl.inStock).map((pl) => pl.price)
    );
    return {
      count: categoryProducts.length,
      minPrice: allPrices.length > 0 ? Math.min(...allPrices) : 0,
      maxPrice: allPrices.length > 0 ? Math.max(...allPrices) : 0,
    };
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    navigate('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-10 pb-4 border-b-2 border-border">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 font-serif uppercase tracking-widest text-text-primary">
          Browse Categories
        </h1>
        <p className="text-text-muted text-sm sm:text-base max-w-xl mx-auto">
          Explore our curated collection of products across popular categories.
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
        {categories.map((category) => {
          const stats = getCategoryStats(category);
          const icon = getCategoryIcon(category);
          const gradient = CATEGORY_GRADIENTS[category] || 'from-gray-500/20 to-gray-600/20';
          const accent = CATEGORY_ACCENT[category] || 'text-gray-400';

          return (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className="bg-white border border-border hover:border-accent hover:border-l-4 transition-all text-left p-6 group cursor-pointer"
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-sm bg-surface-light border border-border flex items-center justify-center mb-4 transition-transform duration-300 text-text-secondary group-hover:text-accent`}>
                {icon}
              </div>

              {/* Info */}
              <h3 className="text-lg font-bold font-serif uppercase tracking-widest text-text-primary mb-1 group-hover:text-accent transition-colors">
                {category}
              </h3>
              <p className="text-sm text-text-muted mb-4">
                {stats.count} product{stats.count !== 1 ? 's' : ''} available
              </p>

              {/* Price range */}
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div>
                  <p className="text-[10px] text-text-muted uppercase tracking-wider font-bold">Starting from</p>
                  <p className={`text-lg font-bold text-accent-secondary`}>
                    ₹{stats.minPrice.toLocaleString()}
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
          View All Products
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default CategoriesPage;
