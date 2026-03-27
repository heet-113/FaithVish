const axios = require('axios');
const cheerio = require('cheerio');

const FLIPKART_BASE = 'https://www.flipkart.com';

const getHeaders = () => ({
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
  'Accept-Language': 'en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7',
  'Accept-Encoding': 'gzip, deflate, br',
  'Cache-Control': 'max-age=0',
  'Sec-Ch-Ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
  'Sec-Ch-Ua-Mobile': '?0',
  'Sec-Ch-Ua-Platform': '"Windows"',
  'Sec-Fetch-Dest': 'document',
  'Sec-Fetch-Mode': 'navigate',
  'Sec-Fetch-Site': 'none',
  'Sec-Fetch-User': '?1',
  'Upgrade-Insecure-Requests': '1',
  'Referer': 'https://www.google.com/',
});

// Clean up product names by stripping embedded ratings, reviews, and price info
function cleanProductName(rawName) {
  if (!rawName) return '';
  let name = rawName;

  // Remove numbered prefix like "1. " or "2. "
  name = name.replace(/^\d+\.\s*/, '');

  // Remove "Add to Compare" prefix
  name = name.replace(/^Add to Compare\s*/i, '');

  // Remove "Coming Soon" prefix
  name = name.replace(/^Coming Soon\s*/i, '');

  // Cut off at rating patterns like "4.1" followed by digits (ratings/reviews block)
  // Match patterns like "4.179,655 Ratings" or "4.62,95,263 Ratings"
  name = name.replace(/\d\.\d[\d,]+\s*Ratings.*$/s, '');

  // Cut off at "₹" (price info)
  name = name.replace(/₹.*$/s, '');

  // Cut off at review patterns
  name = name.replace(/\d+\s*Reviews.*$/s, '');
  name = name.replace(/\d+\s*Ratings.*$/s, '');

  // Remove trailing specs like "(Black, 128 GB)..." but keep first parenthetical
  // Actually, keep the first parenthetical as it often has color/size info

  // Remove "% off" patterns
  name = name.replace(/\d+%\s*off.*$/s, '');

  // Clean up whitespace
  name = name.replace(/\s+/g, ' ').trim();

  // If name still too long, truncate sensibly
  if (name.length > 120) {
    name = name.substring(0, 120).replace(/\s+\S*$/, '...');
  }

  return name;
}

async function searchFlipkart(query) {
  try {
    const url = `${FLIPKART_BASE}/search?q=${encodeURIComponent(query)}`;

    console.log(`    [Flipkart] Fetching: ${url}`);

    const { data } = await axios.get(url, {
      headers: getHeaders(),
      timeout: 20000,
      maxRedirects: 5,
      decompress: true,
    });

    const $ = cheerio.load(data);
    const products = [];

    const pageTitle = $('title').text();
    console.log(`    [Flipkart] Page title: "${pageTitle}"`);

    // Strategy: find all product containers that have both a name and a price.
    // Flipkart's HTML structure varies, so we try multiple approaches.

    // Approach 1: Find product links with /p/ in href (product detail pages)
    const seen = new Set();

    // Look for product containers — try common wrapper patterns
    $('a[href*="/p/"]').each((i, el) => {
      if (products.length >= 20) return false;

      const $link = $(el);
      const href = $link.attr('href') || '';
      const productUrl = href.startsWith('http') ? href : `${FLIPKART_BASE}${href}`;

      // Walk up to find the product card container
      const $card = $link.closest('div[data-id]').length > 0
        ? $link.closest('div[data-id]')
        : $link.parent().parent().parent();

      // Try to get name from the link itself or nearby
      let name = '';

      // Common Flipkart name selectors (class names change frequently)
      const nameSelectors = [
        'div.KzDlHZ', 'div._4rR01T', 'a.s1Q9rs', 'div.syl9yP',
        'a.IRpwTa', 'a.wjcEIp', 'div._2WkVRV',
      ];

      for (const sel of nameSelectors) {
        name = $card.find(sel).first().text().trim() || $link.find(sel).first().text().trim();
        if (name) break;
      }

      // Fallback: check the link's title or any text in the link
      if (!name) {
        name = $link.attr('title') || '';
      }

      if (!name) return;

      // Clean up the name
      name = cleanProductName(name);
      if (!name || name.length < 3) return;

      // Deduplicate by name
      const nameKey = name.substring(0, 50).toLowerCase();
      if (seen.has(nameKey)) return;

      // Price — search in the card container and siblings
      let priceText = '';
      const priceSelectors = [
        'div.Nx9bqj', 'div._30jeq3', 'div._1_WHN1', 'div.hl05eU div.Nx9bqj',
      ];

      for (const sel of priceSelectors) {
        priceText = $card.find(sel).first().text().trim();
        if (priceText) break;
      }

      // Also check siblings of the link
      if (!priceText) {
        for (const sel of priceSelectors) {
          priceText = $link.parents().eq(2).find(sel).first().text().trim();
          if (priceText) break;
        }
      }

      const price = priceText ? parseInt(priceText.replace(/[₹,\s]/g, '')) : null;
      if (!price || isNaN(price)) return;

      // Image
      const image = $card.find('img').first().attr('src') ||
                     $link.find('img').first().attr('src') || '';

      // Rating
      let ratingText = '';
      const ratingSelectors = ['div.XQDdHH', 'div._3LWZlK'];
      for (const sel of ratingSelectors) {
        ratingText = $card.find(sel).first().text().trim();
        if (ratingText) break;
      }
      const rating = ratingText ? parseFloat(ratingText) : null;

      seen.add(nameKey);
      products.push({
        name: cleanProductName(name).substring(0, 200),
        price,
        image,
        url: productUrl,
        rating,
        reviewCount: 0,
        platform: 'Flipkart',
        inStock: true,
      });
    });

    // Approach 2: If approach 1 found nothing, try a broader approach
    if (products.length === 0) {
      console.log('    [Flipkart] Approach 1 found 0, trying broader selectors...');

      // Find any element with a price pattern (₹ followed by numbers)
      $('div, span').each((i, el) => {
        if (products.length >= 20) return false;
        const text = $(el).text().trim();
        if (/^₹[\d,]+$/.test(text)) {
          const $priceEl = $(el);
          const $container = $priceEl.parents().eq(4); // go up several levels

          const price = parseInt(text.replace(/[₹,]/g, ''));
          if (!price || price < 50) return;

          // Find a nearby link to a product page
          const $prodLink = $container.find('a[href*="/p/"]').first();
          if (!$prodLink.length) return;

          const href = $prodLink.attr('href') || '';
          const productUrl = href.startsWith('http') ? href : `${FLIPKART_BASE}${href}`;

          // Find name near the price
          let name = $prodLink.attr('title') || $prodLink.text().trim();
          name = cleanProductName(name);
          if (!name || name.length < 5) return;

          const nameKey = name.substring(0, 50).toLowerCase();
          if (seen.has(nameKey)) return;

          const image = $container.find('img').first().attr('src') || '';

          seen.add(nameKey);
          products.push({
            name: cleanProductName(name).substring(0, 200),
            price,
            image,
            url: productUrl,
            rating: null,
            reviewCount: 0,
            platform: 'Flipkart',
            inStock: true,
          });
        }
      });
    }

    console.log(`    [Flipkart] Parsed ${products.length} products`);
    return products;
  } catch (error) {
    console.error(`    [Flipkart] Error: ${error.message}`);
    if (error.response) {
      console.error(`    [Flipkart] Status: ${error.response.status}`);
    }
    return [];
  }
}

module.exports = { searchFlipkart };
