const express = require('express');
const cache = require('../utils/cache');
const { generateAffiliateLink } = require('../utils/affiliate');
const { searchAmazon } = require('../scrapers/amazon');
const { searchFlipkart } = require('../scrapers/flipkart');
const { searchSnapdeal } = require('../scrapers/snapdeal');
const { searchShopclues } = require('../scrapers/shopclues');
const { searchCroma } = require('../scrapers/croma');
const { searchNykaa } = require('../scrapers/nykaa');
const { searchAjio } = require('../scrapers/ajio');
const { searchTataCliq } = require('../scrapers/tatacliq');

const router = express.Router();

// Helper: group scraped results by similar product name
function groupByProduct(allResults) {
  const groups = [];

  for (const result of allResults) {
    // Try to match with an existing group by finding similar names
    const nameWords = result.name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter((w) => w.length > 2);

    let bestMatch = null;
    let bestScore = 0;

    for (const group of groups) {
      const groupWords = group.matchName.split(/\s+/);
      const commonWords = nameWords.filter((w) => groupWords.includes(w));
      const score = commonWords.length / Math.max(nameWords.length, groupWords.length);

      if (score > 0.4 && score > bestScore) {
        bestScore = score;
        bestMatch = group;
      }
    }

    if (bestMatch && !bestMatch.platforms.some((p) => p.platform === result.platform)) {
      bestMatch.platforms.push({
        name: result.platform,
        price: result.price,
        affiliateUrl: generateAffiliateLink(result.platform, result.url),
        inStock: result.inStock,
      });
      // Use higher quality image if available
      if (result.image && (!bestMatch.image || result.image.length > bestMatch.image.length)) {
        bestMatch.image = result.image;
      }
      if (result.rating && (!bestMatch.rating || result.rating > bestMatch.rating)) {
        bestMatch.rating = result.rating;
      }
    } else {
      groups.push({
        name: result.name,
        matchName: result.name
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, ''),
        image: result.image,
        rating: result.rating,
        reviewCount: result.reviewCount || 0,
        platforms: [
          {
            name: result.platform,
            price: result.price,
            affiliateUrl: generateAffiliateLink(result.platform, result.url),
            inStock: result.inStock,
          },
        ],
      });
    }
  }

  return groups;
}

// GET /api/search?q=nike+shoes
router.get('/', async (req, res) => {
  const { q } = req.query;

  if (!q || q.trim().length < 2) {
    return res.status(400).json({ error: 'Query must be at least 2 characters' });
  }

  const query = q.trim();
  const cacheKey = `search:${query.toLowerCase()}`;

  // Check cache first
  const cached = cache.get(cacheKey);
  if (cached) {
    console.log(`[CACHE HIT] "${query}"`);
    return res.json({
      source: 'cache',
      query,
      products: cached,
      timestamp: new Date().toISOString(),
    });
  }

  console.log(`[SCRAPING] "${query}" from Amazon + Flipkart + Snapdeal + Shopclues...`);

  try {
    // Scrape all platforms in parallel
    const [amazonResults, flipkartResults, snapdealResults, shopcluesResults, cromaResults, nykaaResults, ajioResults, tatacliqResults] = await Promise.allSettled([
      searchAmazon(query),
      searchFlipkart(query),
      searchSnapdeal(query),
      searchShopclues(query),
      searchCroma(query),
      searchNykaa(query),
      searchAjio(query),
      searchTataCliq(query),
    ]);

    const amazon = amazonResults.status === 'fulfilled' ? amazonResults.value : [];
    const flipkart = flipkartResults.status === 'fulfilled' ? flipkartResults.value : [];
    const snapdeal = snapdealResults.status === 'fulfilled' ? snapdealResults.value : [];
    const shopclues = shopcluesResults.status === 'fulfilled' ? shopcluesResults.value : [];
    const croma = cromaResults.status === 'fulfilled' ? cromaResults.value : [];
    const nykaa = nykaaResults.status === 'fulfilled' ? nykaaResults.value : [];
    const ajio = ajioResults.status === 'fulfilled' ? ajioResults.value : [];
    const tatacliq = tatacliqResults.status === 'fulfilled' ? tatacliqResults.value : [];

    console.log(`  Amazon: ${amazon.length}, Flipkart: ${flipkart.length}, Snapdeal: ${snapdeal.length}, Shopclues: ${shopclues.length}, Croma: ${croma.length}, Nykaa: ${nykaa.length}, Ajio: ${ajio.length}, TataCliq: ${tatacliq.length}`);

    const allResults = [...amazon, ...flipkart, ...snapdeal, ...shopclues, ...croma, ...nykaa, ...ajio, ...tatacliq];

    // Group similar products across platforms
    const grouped = groupByProduct(allResults);

    // Assign IDs and determine category
    const products = grouped.map((group, index) => ({
      id: `live-${Date.now()}-${index}`,
      name: group.name,
      category: guessCategory(group.name),
      image: group.image,
      description: `${group.name} — available on ${group.platforms.map((p) => p.name).join(', ')}`,
      specs: {},
      rating: group.rating || 4.0,
      reviewCount: group.reviewCount || 0,
      platforms: group.platforms,
      isLive: true,
    }));

    // Cache results
    cache.set(cacheKey, products);

    res.json({
      source: 'live',
      query,
      products,
      resultCounts: {
        amazon: amazon.length,
        flipkart: flipkart.length,
        snapdeal: snapdeal.length,
        shopclues: shopclues.length,
        croma: croma.length,
        nykaa: nykaa.length,
        ajio: ajio.length,
        tatacliq: tatacliq.length,
        grouped: products.length,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Search error:', error.message);
    res.status(500).json({
      error: 'Failed to fetch prices',
      message: error.message,
    });
  }
});

// Simple category guesser based on keywords
function guessCategory(name) {
  const n = name.toLowerCase();
  if (/(shoe|sneaker|boot|sandal|slipper|heel|loafer|flip.?flop)/i.test(n)) return 'Footwear';
  if (/(shirt|t-shirt|tshirt|jeans|pant|dress|jacket|hoodie|kurta|saree|top|skirt)/i.test(n)) return 'Clothing';
  if (/(phone|laptop|tablet|headphone|earphone|earbud|speaker|watch|charger|camera|tv|monitor|keyboard|mouse)/i.test(n)) return 'Electronics';
  if (/(cream|serum|lipstick|mascara|foundation|perfume|shampoo|conditioner|moisturizer|sunscreen|face.?wash)/i.test(n)) return 'Beauty';
  if (/(book|novel|edition|paperback|hardcover|author)/i.test(n)) return 'Books';
  if (/(cooker|mixer|grinder|fan|appliance|kitchen|utensil|bedsheet|curtain|pillow|mattress)/i.test(n)) return 'Home & Kitchen';
  return 'General';
}

module.exports = router;
