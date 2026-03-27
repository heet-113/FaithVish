const express = require('express');
const cache = require('../utils/cache');
const { searchAmazon } = require('../scrapers/amazon');
const { searchFlipkart } = require('../scrapers/flipkart');
const { searchSnapdeal } = require('../scrapers/snapdeal');
const { searchShopclues } = require('../scrapers/shopclues');
const { searchCroma } = require('../scrapers/croma');
const { searchNykaa } = require('../scrapers/nykaa');
const { searchAjio } = require('../scrapers/ajio');
const { searchTataCliq } = require('../scrapers/tatacliq');

const router = express.Router();

// Predefined popular queries per category
const CATEGORY_QUERIES = {
  'Electronics': ['smartphone', 'laptop', 'headphones', 'smartwatch'],
  'Footwear': ['running shoes', 'sneakers'],
  'Clothing': ['t-shirt men', 'kurta women'],
  'Beauty': ['face serum', 'lipstick'],
  'Books': ['bestseller books', 'novels'],
  'Home & Kitchen': ['cookware set', 'bedsheet'],
  'Accessories': ['sunglasses', 'backpack'],
};

// Scrape a single query across all platforms
async function scrapeQuery(query) {
  const results = await Promise.allSettled([
    searchFlipkart(query),
    searchSnapdeal(query),
    searchShopclues(query),
    searchAmazon(query),
    searchCroma(query),
    searchNykaa(query),
    searchAjio(query),
    searchTataCliq(query),
  ]);

  const products = [];
  const platforms = ['Flipkart', 'Snapdeal', 'Shopclues', 'Amazon', 'Croma', 'Nykaa', 'Ajio', 'Tata CliQ'];

  results.forEach((r, i) => {
    if (r.status === 'fulfilled' && r.value.length > 0) {
      // Take top 5 from each platform
      r.value.slice(0, 5).forEach((product) => {
        products.push(product);
      });
    }
  });

  return products;
}

// Guess category from product name (same as search route)
function guessCategory(name) {
  const n = name.toLowerCase();
  if (/(shoe|sneaker|boot|sandal|slipper|heel|loafer|flip.?flop)/i.test(n)) return 'Footwear';
  if (/(shirt|t-shirt|tshirt|jeans|pant|dress|jacket|hoodie|kurta|saree|top|skirt)/i.test(n)) return 'Clothing';
  if (/(phone|laptop|tablet|headphone|earphone|earbud|speaker|watch|charger|camera|tv|monitor|keyboard|mouse)/i.test(n)) return 'Electronics';
  if (/(cream|serum|lipstick|mascara|foundation|perfume|shampoo|conditioner|moisturizer|sunscreen|face.?wash)/i.test(n)) return 'Beauty';
  if (/(book|novel|edition|paperback|hardcover|author)/i.test(n)) return 'Books';
  if (/(cooker|mixer|grinder|fan|appliance|kitchen|utensil|bedsheet|curtain|pillow|mattress)/i.test(n)) return 'Home & Kitchen';
  if (/(bag|backpack|wallet|belt|sunglass|watch|cap|hat|scarf|glove|jewel|ring|bracelet|necklace)/i.test(n)) return 'Accessories';
  return 'General';
}

// GET /api/featured
router.get('/', async (req, res) => {
  const cacheKey = 'featured:homepage';

  // Check cache
  const cached = cache.get(cacheKey);
  if (cached) {
    console.log('[CACHE HIT] featured');
    return res.json({ source: 'cache', ...cached });
  }

  console.log('[SCRAPING] Featured products across all categories...');

  try {
    // Pick one random query per category and scrape them in parallel
    const categoriesToFetch = Object.entries(CATEGORY_QUERIES);
    const queryPromises = [];
    const queryCategories = [];

    for (const [category, queries] of categoriesToFetch) {
      // Pick a random query from the list
      const query = queries[Math.floor(Math.random() * queries.length)];
      queryPromises.push(scrapeQuery(query));
      queryCategories.push({ category, query });
    }

    const results = await Promise.allSettled(queryPromises);

    // Organize products by category
    const sections = {};
    let totalProducts = 0;

    results.forEach((result, i) => {
      if (result.status !== 'fulfilled') return;
      const products = result.value;
      const { category, query } = queryCategories[i];

      if (products.length === 0) return;

      // Deduplicate by name within category
      const seen = new Set();
      const uniqueProducts = [];

      for (const product of products) {
        const key = product.name.substring(0, 40).toLowerCase();
        if (seen.has(key)) continue;
        seen.add(key);

        uniqueProducts.push({
          id: `featured-${Date.now()}-${totalProducts}`,
          name: product.name,
          category: guessCategory(product.name) || category,
          image: product.image,
          description: `${product.name} — via ${product.platform}`,
          specs: {},
          rating: product.rating || 4.0,
          reviewCount: product.reviewCount || 0,
          platforms: [{
            name: product.platform,
            price: product.price,
            affiliateUrl: product.url,
            inStock: product.inStock,
          }],
          isLive: true,
        });

        totalProducts++;
      }

      if (uniqueProducts.length > 0) {
        if (!sections[category]) {
          sections[category] = { query, products: [] };
        }
        sections[category].products.push(...uniqueProducts);
      }
    });

    const responseData = {
      sections,
      totalProducts,
      timestamp: new Date().toISOString(),
    };

    // Cache for 30 minutes
    cache.set(cacheKey, responseData);

    console.log(`  Featured: ${totalProducts} products across ${Object.keys(sections).length} categories`);

    res.json({ source: 'live', ...responseData });
  } catch (error) {
    console.error('Featured fetch error:', error.message);
    res.status(500).json({
      error: 'Failed to fetch featured products',
      message: error.message,
    });
  }
});

module.exports = router;
