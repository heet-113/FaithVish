const axios = require('axios');
const cheerio = require('cheerio');

const SHOPCLUES_BASE = 'https://www.shopclues.com';

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

async function searchShopclues(query) {
  try {
    const url = `${SHOPCLUES_BASE}/search?q=${encodeURIComponent(query)}`;

    console.log(`    [Shopclues] Fetching: ${url}`);

    const { data } = await axios.get(url, {
      headers: getHeaders(),
      timeout: 20000,
      maxRedirects: 5,
      decompress: true,
    });

    const $ = cheerio.load(data);
    const products = [];

    const pageTitle = $('title').text();
    console.log(`    [Shopclues] Page title: "${pageTitle}"`);

    // Shopclues product containers
    const productSelectors = [
      'div.column.col3',
      'div.search_blocks',
      'li.column.col3',
      'div.product_grid',
    ];

    let $products = $([]);
    for (const sel of productSelectors) {
      $products = $(sel);
      if ($products.length > 0) {
        console.log(`    [Shopclues] Matched selector: "${sel}" (${$products.length} items)`);
        break;
      }
    }

    $products.each((i, el) => {
      if (products.length >= 20) return false;

      const $el = $(el);

      // Product name
      const name =
        $el.find('h2').first().text().trim() ||
        $el.find('.product_title').first().text().trim() ||
        $el.find('a[title]').first().attr('title') ||
        $el.find('a').first().text().trim() ||
        '';

      if (!name || name.length < 3) return;

      // Price
      const priceText =
        $el.find('.p_price').first().text().trim() ||
        $el.find('.sell_price').first().text().trim() ||
        $el.find('span[class*="price"]').first().text().trim() ||
        '';

      const price = priceText ? parseInt(priceText.replace(/[₹Rs,.\s]/g, '')) : null;
      if (!price || isNaN(price) || price < 10) return;

      // Image
      const image =
        $el.find('img').first().attr('src') ||
        $el.find('img').first().attr('data-img') ||
        '';

      // Product link
      const link = $el.find('a').first().attr('href') || '';
      const productUrl = link.startsWith('http') ? link : `${SHOPCLUES_BASE}${link}`;

      // Rating
      const ratingText = $el.find('.rating, .ratingStar').first().text().trim();
      const rating = ratingText ? parseFloat(ratingText) : null;

      products.push({
        name: name.substring(0, 200),
        price,
        image,
        url: productUrl,
        rating,
        reviewCount: 0,
        platform: 'Shopclues',
        inStock: true,
      });
    });

    // Fallback: find all links with prices
    if (products.length === 0) {
      console.log('    [Shopclues] Standard selectors failed, trying fallback...');
      const seen = new Set();

      $('a[href*="/product/"], a[href*=".html"]').each((i, el) => {
        if (products.length >= 20) return false;

        const $link = $(el);
        const $container = $link.closest('div, li');

        const name = $link.attr('title') || $link.text().trim();
        if (!name || name.length < 5 || name.length > 300) return;

        const nameKey = name.substring(0, 40).toLowerCase();
        if (seen.has(nameKey)) return;

        // Find price
        let priceText = '';
        $container.find('span, div, p').each((_, priceEl) => {
          const text = $(priceEl).text().trim();
          if (/^(Rs\.?\s*|₹)\s*[\d,]+$/.test(text)) {
            priceText = text;
            return false;
          }
        });

        const price = priceText ? parseInt(priceText.replace(/[₹Rs,.\s]/g, '')) : null;
        if (!price || price < 10) return;

        const href = $link.attr('href') || '';
        const productUrl = href.startsWith('http') ? href : `${SHOPCLUES_BASE}${href}`;
        const image = $container.find('img').first().attr('src') || '';

        seen.add(nameKey);
        products.push({
          name: name.substring(0, 200),
          price,
          image,
          url: productUrl,
          rating: null,
          reviewCount: 0,
          platform: 'Shopclues',
          inStock: true,
        });
      });
    }

    console.log(`    [Shopclues] Parsed ${products.length} products`);
    return products;
  } catch (error) {
    console.error(`    [Shopclues] Error: ${error.message}`);
    if (error.response) {
      console.error(`    [Shopclues] Status: ${error.response.status}`);
    }
    return [];
  }
}

module.exports = { searchShopclues };
