const axios = require('axios');
const cheerio = require('cheerio');

const SNAPDEAL_BASE = 'https://www.snapdeal.com';

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

async function searchSnapdeal(query) {
  try {
    const url = `${SNAPDEAL_BASE}/search?keyword=${encodeURIComponent(query)}&sort=rlvncy`;

    console.log(`    [Snapdeal] Fetching: ${url}`);

    const { data } = await axios.get(url, {
      headers: getHeaders(),
      timeout: 20000,
      maxRedirects: 5,
      decompress: true,
    });

    const $ = cheerio.load(data);
    const products = [];

    const pageTitle = $('title').text();
    console.log(`    [Snapdeal] Page title: "${pageTitle}"`);

    // Snapdeal product containers - try multiple selectors
    const productSelectors = [
      'div.product-tuple-listing',
      'div.product-tuple-image',
      'div[data-npi]',
      'div.col-xs-6.favDp',
    ];

    let $products = $([]);
    for (const sel of productSelectors) {
      $products = $(sel);
      if ($products.length > 0) {
        console.log(`    [Snapdeal] Matched selector: "${sel}" (${$products.length} items)`);
        break;
      }
    }

    // Standard product list parsing
    $products.each((i, el) => {
      if (products.length >= 20) return false;

      const $el = $(el);

      // Product name
      const name =
        $el.find('p.product-title').first().text().trim() ||
        $el.find('.product-title').first().text().trim() ||
        $el.find('p.product-desc-rating a').first().text().trim() ||
        $el.find('a[title]').first().attr('title') ||
        '';

      if (!name || name.length < 3) return;

      // Price
      const priceText =
        $el.find('span.lfloat.product-price').first().text().trim() ||
        $el.find('span.product-price').first().text().trim() ||
        $el.find('.product-price').first().text().trim() ||
        '';

      const price = priceText ? parseInt(priceText.replace(/[₹Rs,.\s]/g, '')) : null;
      if (!price || isNaN(price) || price < 10) return;

      // Image
      const image =
        $el.find('img').first().attr('src') ||
        $el.find('img').first().attr('data-src') ||
        $el.find('img').first().attr('data-lazy') ||
        '';

      // Product link
      const link =
        $el.find('a.dp-widget-link').first().attr('href') ||
        $el.find('a[href*="snapdeal.com"]').first().attr('href') ||
        $el.find('a').first().attr('href') ||
        '';
      const productUrl = link.startsWith('http') ? link : `${SNAPDEAL_BASE}${link}`;

      // Rating
      const ratingText = $el.find('.product-rating').first().text().trim();
      const rating = ratingText ? parseFloat(ratingText) : null;

      products.push({
        name: name.substring(0, 200),
        price,
        image,
        url: productUrl,
        rating,
        reviewCount: 0,
        platform: 'Snapdeal',
        inStock: true,
      });
    });

    // Fallback: if no products found, try finding by price pattern
    if (products.length === 0) {
      console.log('    [Snapdeal] Standard selectors failed, trying link-based approach...');
      const seen = new Set();

      $('a[href*="/product/"]').each((i, el) => {
        if (products.length >= 20) return false;

        const $link = $(el);
        const $container = $link.closest('div').parent();

        const name = $link.attr('title') || $link.text().trim();
        if (!name || name.length < 5) return;

        const nameKey = name.substring(0, 40).toLowerCase();
        if (seen.has(nameKey)) return;

        // Find price nearby
        let priceText = '';
        $container.find('span, div').each((_, priceEl) => {
          const text = $(priceEl).text().trim();
          if (/^(Rs\.?\s*|₹)\s*[\d,]+$/.test(text)) {
            priceText = text;
            return false;
          }
        });

        const price = priceText ? parseInt(priceText.replace(/[₹Rs,.\s]/g, '')) : null;
        if (!price || price < 10) return;

        const href = $link.attr('href') || '';
        const productUrl = href.startsWith('http') ? href : `${SNAPDEAL_BASE}${href}`;
        const image = $container.find('img').first().attr('src') ||
                       $container.find('img').first().attr('data-src') || '';

        seen.add(nameKey);
        products.push({
          name: name.substring(0, 200),
          price,
          image,
          url: productUrl,
          rating: null,
          reviewCount: 0,
          platform: 'Snapdeal',
          inStock: true,
        });
      });
    }

    console.log(`    [Snapdeal] Parsed ${products.length} products`);
    return products;
  } catch (error) {
    console.error(`    [Snapdeal] Error: ${error.message}`);
    if (error.response) {
      console.error(`    [Snapdeal] Status: ${error.response.status}`);
    }
    return [];
  }
}

module.exports = { searchSnapdeal };
