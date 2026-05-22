import { create } from 'zustand';
import productsData from '../data/products/index.js';

const useStore = create((set, get) => ({
  // All products loaded from local JSON
  products: productsData,

  // Active gender section: 'women' | 'men'
  activeGender: 'women',

  // Filters
  searchQuery: '',
  selectedCategory: 'All',
  priceRange: [0, 100000],
  sortBy: 'default',

  // Setters
  setActiveGender: (gender) => set({ activeGender: gender, selectedCategory: 'All', searchQuery: '' }),
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

  // Get unique categories from products (for current gender)
  getCategories: () => {
    const { products, activeGender } = get();
    const genderProducts = products.filter((p) => p.gender === activeGender);
    const cats = [...new Set(genderProducts.map((p) => p.category))];
    return ['All', ...cats.sort()];
  },

  // Filtered products (client-side only), respects active gender
  getFilteredProducts: () => {
    const { products, searchQuery, selectedCategory, priceRange, sortBy, activeGender } = get();
    let filtered = products.filter((p) => p.gender === activeGender);

    // Text search — multi-word tokenized relevance scoring with word-boundary awareness
    if (searchQuery.trim()) {
      // Split query into individual tokens (words), remove empty strings
      const tokens = searchQuery.toLowerCase().trim().split(/\s+/).filter(Boolean);

      // Build word-boundary regex for each token to prevent substring false positives
      // e.g. "ring" should match "ring", "rings" but NOT "earring", "earrings"
      const tokenRegexes = tokens.map((token) => {
        const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return new RegExp(`\\b${escaped}`, 'i');
      });

      // Build a scored, filterable list
      const scored = filtered
        .map((p) => {
          // Flatten all searchable text fields into weighted buckets
          const highPriority = [
            p.name || '',
            p.category || '',
            (p.tags || []).join(' '),
            p.badge || '',
          ].join(' ').toLowerCase();

          const medPriority = [
            p.description || '',
            p.shortReview || '',
            p.whoShouldBuy || '',
            p.store || '',
          ].join(' ').toLowerCase();

          const lowPriority = [
            (p.pros || []).join(' '),
            (p.cons || []).join(' '),
            Object.values(p.specs || {}).join(' '),
          ].join(' ').toLowerCase();

          let score = 0;
          let matchedTokens = 0;

          for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            const regex = tokenRegexes[i];
            let tokenMatched = false;

            // High priority: use word-boundary regex to avoid substring matches
            // (e.g. "ring" should NOT match "earring" in name/category/tags)
            if (regex.test(highPriority)) {
              score += 3;
              tokenMatched = true;

              // Bonus: exact category match (e.g. searching "rings" when category is "Rings")
              if (regex.test((p.category || '').toLowerCase())) {
                score += 5;
              }
              // Bonus: word appears in name (strong signal)
              if (regex.test((p.name || '').toLowerCase())) {
                score += 2;
              }
            }
            // Medium priority: use word-boundary regex for descriptions too
            if (regex.test(medPriority)) {
              score += 2;
              tokenMatched = true;
            }
            // Low priority: use word-boundary regex
            if (regex.test(lowPriority)) {
              score += 1;
              tokenMatched = true;
            }
            if (tokenMatched) matchedTokens++;
          }

          return { product: p, score, matchedTokens };
        })
        // Keep products that match at least ONE token
        .filter(({ matchedTokens }) => matchedTokens > 0)
        // Sort by score descending (most relevant first)
        .sort((a, b) => b.score - a.score);

      filtered = scored.map(({ product }) => product);
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

  // Get single product (gender-agnostic for product detail pages)
  getProductById: (id) => {
    return get().products.find((p) => String(p.id) === String(id));
  },

  // Get products by category and active gender
  getProductsByCategory: (category) => {
    const { products, activeGender } = get();
    return products.filter((p) => p.category === category && p.gender === activeGender);
  },

  // Get products by gender only
  getProductsByGender: (gender) => {
    return get().products.filter((p) => p.gender === gender);
  },

  // Get products by category and explicit gender
  getProductsByCategoryAndGender: (category, gender) => {
    return get().products.filter((p) => p.category === category && p.gender === gender);
  },

  // Get related products (same category and gender, excluding current)
  getRelatedProducts: (productId, limit = 4) => {
    const product = get().getProductById(productId);
    if (!product) return [];
    return get().products
      .filter((p) => p.category === product.category && p.gender === product.gender && String(p.id) !== String(productId))
      .slice(0, limit);
  },
}));

export default useStore;
