import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useStore from '../store/useStore';
import ProductCard from '../components/ProductCard';
import MenProductCard from '../components/MenProductCard';
import FilterSidebar from '../components/FilterSidebar';
import { JEWELRY_CATEGORIES, MEN_CATEGORIES, MEN_CATEGORY_LABELS, formatPrice } from '../utils/constants';

// Category image map for editorial cards
const WOMEN_CATEGORY_IMAGES = {
  Rings: '/categories/rings.jpg',
  Necklaces: '/categories/necklaces.jpg',
  Earrings: '/categories/earrings.jpg',
  Bracelets: '/categories/bracelets.jpg',
  Bangles: '/categories/bangles.jpg',
  Pendants: '/categories/pendants.jpg',
  Anklets: '/categories/anklets.jpg',
  Mangalsutra: '/categories/mangalsutra.jpg',
  'Jewelry Sets': '/categories/jewelry_sets.jpg',
};

const MEN_CATEGORY_IMAGES = {
  Rings: '/categories/men_rings.jpg',
  Necklaces: '/categories/men_chains.jpg',
  Bracelets: '/categories/men_bracelets.jpg',
  Pendants: '/categories/men_pendants.jpg',
};

const CategoriesPage = () => {
  const { products, activeGender } = useStore();
  const navigate = useNavigate();
  const { category: urlCategory } = useParams();
  const isMen = activeGender === 'men';
  const categories = isMen ? MEN_CATEGORIES : JEWELRY_CATEGORIES;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Decode the URL category param
  const selectedCategory = urlCategory ? decodeURIComponent(urlCategory) : null;

  // Men's palette
  const m = {
    bg: '#1E1E20',
    card: '#282828',
    border: '#3A3A3C',
    accent: '#C9A96E',
    textPrimary: '#F5F5F0',
    textSecondary: '#9A9A9A',
    textMuted: '#6B6B6B',
  };

  const getCategoryStats = (category) => {
    const categoryProducts = products.filter(
      (p) => p.category === category && p.gender === activeGender
    );
    const prices = categoryProducts.map((p) => p.price);
    return {
      count: categoryProducts.length,
      minPrice: prices.length > 0 ? Math.min(...prices) : 0,
      maxPrice: prices.length > 0 ? Math.max(...prices) : 0,
    };
  };

  // Get products for the selected category
  const categoryProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory && p.gender === activeGender)
    : [];

  const categoryImages = isMen ? MEN_CATEGORY_IMAGES : WOMEN_CATEGORY_IMAGES;

  // ── Single Category View (when URL has /categories/:category) ───────────
  if (selectedCategory) {
    const displayLabel = isMen ? (MEN_CATEGORY_LABELS[selectedCategory] || selectedCategory) : selectedCategory;

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-8 text-sm">
          <Link
            to="/"
            className="transition-colors"
            style={{ color: isMen ? m.textMuted : 'var(--color-text-muted)' }}
          >
            Home
          </Link>
          <span style={{ color: isMen ? m.textMuted : 'var(--color-text-muted)' }}>/</span>
          <Link
            to="/categories"
            className="transition-colors"
            style={{ color: isMen ? m.textMuted : 'var(--color-text-muted)' }}
          >
            Collections
          </Link>
          <span style={{ color: isMen ? m.textMuted : 'var(--color-text-muted)' }}>/</span>
          <span
            className="font-medium"
            style={{ color: isMen ? m.accent : 'var(--color-accent)' }}
          >
            {displayLabel}
          </span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <h1
            className="text-3xl sm:text-4xl font-display font-medium mb-2"
            style={{ color: isMen ? m.textPrimary : 'var(--color-text-primary)' }}
          >
            {displayLabel}
          </h1>
          <p
            className="text-sm"
            style={{ color: isMen ? m.textMuted : 'var(--color-text-muted)' }}
          >
            {categoryProducts.length} piece{categoryProducts.length !== 1 ? 's' : ''} available
          </p>
        </div>

        {/* Products + Filters */}
        <div className="flex gap-8">
          {/* Filter sidebar */}
          <div className="hidden lg:block shrink-0">
            <FilterSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          </div>
          <div className="lg:hidden">
            <FilterSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          </div>

          {/* Products grid */}
          <div className="flex-1 min-w-0">
            {/* Mobile filter button */}
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <p className="text-sm" style={{ color: isMen ? m.textSecondary : 'var(--color-text-secondary)' }}>
                {categoryProducts.length} piece{categoryProducts.length !== 1 ? 's' : ''}
              </p>
              <button
                onClick={() => setSidebarOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-medium rounded-full transition-all"
                style={{
                  background: isMen ? '#282828' : '#FFFBF7',
                  border: `1px solid ${isMen ? m.border : 'var(--color-border)'}`,
                  color: isMen ? m.textPrimary : 'var(--color-text-primary)',
                }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-4 stagger-children">
              {categoryProducts.map((product) =>
                isMen
                  ? <MenProductCard key={product.id} product={product} />
                  : <ProductCard key={product.id} product={product} />
              )}
            </div>

            {categoryProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-sm" style={{ color: isMen ? m.textMuted : 'var(--color-text-muted)' }}>
                  No {displayLabel.toLowerCase()} found. Check back soon!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── Category Overview (when URL is just /categories) ───────────────────
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">

        <h1
          className="text-3xl sm:text-4xl font-display font-medium mb-3"
          style={{ color: isMen ? m.textPrimary : 'var(--color-text-primary)' }}
        >
          {isMen ? "Men's Collections" : 'Our Collections'}
        </h1>

      </div>

      {/* Editorial Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 stagger-children">
        {categories.map((category) => {
          const stats = getCategoryStats(category);
          const displayLabel = isMen ? (MEN_CATEGORY_LABELS[category] || category) : category;
          const image = categoryImages[category];

          return (
            <Link
              key={category}
              to={`/categories/${encodeURIComponent(category)}`}
              className={`category-editorial-card ${isMen ? 'men-variant' : ''}`}
              style={{ aspectRatio: '3 / 4' }}
              id={`collection-${category}`}
            >
              <img
                src={image}
                alt={displayLabel}
                className="cat-card-image"
                loading="lazy"
              />
              <div className="cat-card-overlay">
                <span className="cat-card-label">{displayLabel}</span>
                <span className="cat-card-count">
                  {stats.count} piece{stats.count !== 1 ? 's' : ''}
                  {stats.minPrice > 0 && ` · From ${formatPrice(stats.minPrice)}`}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Browse all */}
      <div className="text-center mt-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3 text-sm font-medium rounded-full transition-all"
          style={{
            background: isMen ? m.accent : 'var(--color-accent)',
            color: isMen ? m.bg : '#FFFBF7',
          }}
        >
          Back to Home
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default CategoriesPage;
