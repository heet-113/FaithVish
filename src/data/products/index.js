import rings from './rings.json';
import necklaces from './necklaces.json';
import earrings from './earrings.json';
import bracelets from './bracelets.json';
import bangles from './bangles.json';
import pendants from './pendants.json';
import anklets from './anklets.json';
import mangalsutra from './mangalsutra.json';

/**
 * Product data loader.
 *
 * Each category file contains products WITHOUT `id` or `category` fields.
 * This loader assigns both automatically:
 *   - `category` comes from the filename/key
 *   - `id` is a category-prefixed string (e.g. "rings-1", "necklaces-2")
 *
 * GENDER FIELD:
 *   Each product JSON must include a `gender` field: "women" | "men"
 *   This controls which section the product appears in.
 *   - Women's section: all 8 categories (rings, necklaces, earrings, bracelets, bangles, pendants, anklets, mangalsutra)
 *   - Men's section: rings, necklaces (displayed as "Chains"), bracelets, pendants
 *
 * To add a new product:
 *   1. Open the relevant category JSON file
 *   2. Add your product object at the end of the array
 *   3. Include "gender": "women" or "gender": "men"
 *   4. Save — id and category are auto-assigned
 *
 * To add a new CATEGORY:
 *   1. Create a new JSON file (e.g. "cufflinks.json")
 *   2. Import it above
 *   3. Add it to the `categories` map below
 *   4. Add it to MEN_CATEGORIES or WOMEN_CATEGORIES in utils/constants.js
 */


const categories = {
  Rings: rings,
  Necklaces: necklaces,
  Earrings: earrings,
  Bracelets: bracelets,
  Bangles: bangles,
  Pendants: pendants,
  Anklets: anklets,
  Mangalsutra: mangalsutra,
};

const productsData = [];

for (const [category, items] of Object.entries(categories)) {
  items.forEach((product, index) => {
    productsData.push({
      id: `${category.toLowerCase()}-${index + 1}`,
      category,
      ...product,
    });
  });
}

export default productsData;
