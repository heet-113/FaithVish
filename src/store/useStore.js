import { create } from 'zustand';
import { searchProductsLive, fetchFeaturedProducts, checkServerHealth } from '../services/api';

const useStore = create((set, get) => ({
  products: [],
  searchQuery: '',
  selectedCategory: 'All',
  selectedPlatform: 'All',
  priceRange: [0, 100000],
  sortBy: 'default',

  // Live search state
  liveMode: true,
  liveProducts: [],
  isLoading: false,
  liveError: null,
  serverOnline: false,
  lastFetchedAt: null,
  liveResultCounts: null,

  // Featured/homepage state
  featuredSections: {},
  featuredLoading: false,
  featuredLoaded: false,

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedPlatform: (platform) => set({ selectedPlatform: platform }),
  setPriceRange: (range) => set({ priceRange: range }),
  setSortBy: (sortBy) => set({ sortBy }),
  setLiveMode: (mode) => set({ liveMode: mode }),

  resetFilters: () => set({
    searchQuery: '',
    selectedCategory: 'All',
    selectedPlatform: 'All',
    priceRange: [0, 100000],
    sortBy: 'default',
  }),

  // Check if backend server is reachable
  checkServer: async () => {
    const online = await checkServerHealth();
    set({ serverOnline: online });
    return online;
  },

  // Fetch live prices from backend scrapers
  searchLive: async (query) => {
    if (!query || query.trim().length < 2) return;

    set({ isLoading: true, liveError: null });

    try {
      const data = await searchProductsLive(query);
      set({
        liveProducts: data.products || [],
        isLoading: false,
        lastFetchedAt: data.timestamp,
        liveResultCounts: data.resultCounts || null,
      });
    } catch (error) {
      console.error('Live search error:', error);
      set({
        isLoading: false,
        liveError: error.message || 'Failed to fetch live prices',
      });
    }
  },

  clearLiveResults: () => set({ liveProducts: [], liveError: null, liveResultCounts: null }),

  // Load featured products for homepage
  loadFeatured: async () => {
    if (get().featuredLoaded || get().featuredLoading) return;

    set({ featuredLoading: true });
    try {
      const data = await fetchFeaturedProducts();
      set({
        featuredSections: data.sections || {},
        featuredLoading: false,
        featuredLoaded: true,
      });
    } catch (error) {
      console.error('Featured load error:', error);
      set({ featuredLoading: false });
    }
  },

  getCategories: () => {
    const allProducts = get().liveMode && get().liveProducts.length > 0
      ? get().liveProducts
      : get().products;
    const cats = [...new Set(allProducts.map((p) => p.category))];
    return ['All', ...cats.sort()];
  },

  getPlatforms: () => {
    const allProducts = get().liveMode && get().liveProducts.length > 0
      ? get().liveProducts
      : get().products;
    const platforms = new Set();
    allProducts.forEach((p) =>
      p.platforms.forEach((pl) => platforms.add(pl.name))
    );
    return ['All', ...Array.from(platforms).sort()];
  },

  getFilteredProducts: () => {
    const { products, liveProducts, liveMode, searchQuery, selectedCategory, selectedPlatform, priceRange, sortBy } = get();

    // Use live results if in live mode and we have results
    let source = liveMode && liveProducts.length > 0 ? liveProducts : products;
    let filtered = [...source];

    // Search filter (only for mock data — live data is already searched)
    if (searchQuery.trim() && !(liveMode && liveProducts.length > 0)) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Platform filter
    if (selectedPlatform !== 'All') {
      filtered = filtered.filter((p) =>
        p.platforms.some((pl) => pl.name === selectedPlatform && pl.inStock)
      );
    }

    // Price range filter (based on lowest available price)
    filtered = filtered.filter((p) => {
      const inStockPrices = p.platforms.filter((pl) => pl.inStock).map((pl) => pl.price);
      if (inStockPrices.length === 0) return false;
      const lowestPrice = Math.min(...inStockPrices);
      return lowestPrice >= priceRange[0] && lowestPrice <= priceRange[1];
    });

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => {
          const aMin = Math.min(...a.platforms.filter((pl) => pl.inStock).map((pl) => pl.price));
          const bMin = Math.min(...b.platforms.filter((pl) => pl.inStock).map((pl) => pl.price));
          return aMin - bMin;
        });
        break;
      case 'price-high':
        filtered.sort((a, b) => {
          const aMin = Math.min(...a.platforms.filter((pl) => pl.inStock).map((pl) => pl.price));
          const bMin = Math.min(...b.platforms.filter((pl) => pl.inStock).map((pl) => pl.price));
          return bMin - aMin;
        });
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'reviews':
        filtered.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
        break;
      default:
        break;
    }

    return filtered;
  },

  getProductById: (id) => {
    const { products, liveProducts, featuredSections } = get();
    // Check live products first
    const fromLive = liveProducts.find((p) => String(p.id) === String(id));
    if (fromLive) return fromLive;
    // Check featured products
    for (const section of Object.values(featuredSections)) {
      const found = section.products?.find((p) => String(p.id) === String(id));
      if (found) return found;
    }
    return products.find((p) => p.id === parseInt(id));
  },

  getLowestPrice: (product) => {
    const inStockPlatforms = product.platforms.filter((p) => p.inStock);
    if (inStockPlatforms.length === 0) return null;
    return Math.min(...inStockPlatforms.map((p) => p.price));
  },

  getProductsByCategory: (category) => {
    return get().products.filter((p) => p.category === category);
  },
}));

export default useStore;
