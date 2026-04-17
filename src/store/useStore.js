import { create } from 'zustand';
import productsData from '../data/products.json';

const useStore = create((set, get) => ({
  // All products loaded from local JSON
  products: productsData,

  // Filters
  searchQuery: '',
  selectedCategory: 'All',
  priceRange: [0, 100000],
  sortBy: 'default',

  // Setters
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setPriceRange: (range) => set({ priceRange: range }),
  setSortBy: (sortBy) => set({ sortBy }),

  resetFilters: () => set({
    searchQuery: '',
    selectedCategory: 'All',
    priceRange: [0, 100000],
    sortBy: 'default',
  }),

  // Get unique categories from products
  getCategories: () => {
    const cats = [...new Set(get().products.map((p) => p.category))];
    return ['All', ...cats.sort()];
  },

  // Filtered products (client-side only)
  getFilteredProducts: () => {
    const { products, searchQuery, selectedCategory, priceRange, sortBy } = get();
    let filtered = [...products];

    // Text search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q)) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(q))) ||
          (p.store && p.store.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Price range filter
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'reviews':
        filtered.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
        break;
      case 'discount':
        filtered.sort((a, b) => {
          const discA = a.originalPrice ? ((a.originalPrice - a.price) / a.originalPrice) : 0;
          const discB = b.originalPrice ? ((b.originalPrice - b.price) / b.originalPrice) : 0;
          return discB - discA;
        });
        break;
      default:
        break;
    }

    return filtered;
  },

  // Get single product
  getProductById: (id) => {
    return get().products.find((p) => String(p.id) === String(id));
  },

  // Get products by category
  getProductsByCategory: (category) => {
    return get().products.filter((p) => p.category === category);
  },

  // Get related products (same category, excluding current)
  getRelatedProducts: (productId, limit = 4) => {
    const product = get().getProductById(productId);
    if (!product) return [];
    return get().products
      .filter((p) => p.category === product.category && String(p.id) !== String(productId))
      .slice(0, limit);
  },
}));

export default useStore;
