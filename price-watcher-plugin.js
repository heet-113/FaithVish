import fs from 'fs';
import path from 'path';

/**
 * Vite plugin: Price Change Watcher
 *
 * Watches all JSON files in src/data/products/.
 * When you save a file, it compares each product's `price` to what it was
 * before the save. If a price changed (or `lastUpdated` is missing), it
 * automatically stamps `lastUpdated` with today's date (YYYY-MM-DD).
 *
 * You never have to touch `lastUpdated` manually.
 */
export default function priceWatcherPlugin() {
  // Cache: filepath → { id/name → price } from the last known state
  const priceCache = new Map();

  function getToday() {
    return new Date().toISOString().split('T')[0]; // "2026-05-18"
  }

  function buildKey(product, index) {
    // Use `id` if present, otherwise fall back to name+index as a stable key
    return product.id ?? `${product.name}__${index}`;
  }

  function loadCache(filePath) {
    try {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const products = JSON.parse(raw);
      if (!Array.isArray(products)) return;
      const map = {};
      products.forEach((p, i) => {
        map[buildKey(p, i)] = p.price;
      });
      priceCache.set(filePath, map);
    } catch {
      // File unreadable or not valid JSON — skip silently
    }
  }

  function stampChangedPrices(filePath) {
    let raw;
    try {
      raw = fs.readFileSync(filePath, 'utf-8');
    } catch {
      return;
    }

    let products;
    try {
      products = JSON.parse(raw);
    } catch {
      return; // Not valid JSON (mid-edit) — skip
    }

    if (!Array.isArray(products)) return;

    const oldPrices = priceCache.get(filePath) ?? {};
    const today = getToday();
    let changed = false;

    const updated = products.map((product, i) => {
      const key = buildKey(product, i);
      const oldPrice = oldPrices[key];
      const newPrice = product.price;

      const priceChanged = oldPrice !== undefined && oldPrice !== newPrice;
      const missingDate = !product.lastUpdated;

      if (priceChanged || missingDate) {
        changed = true;
        return { ...product, lastUpdated: today };
      }
      return product;
    });

    if (changed) {
      // Preserve original formatting (2-space indent, trailing newline)
      const newRaw = JSON.stringify(updated, null, 2) + '\n';
      fs.writeFileSync(filePath, newRaw, 'utf-8');
      console.log(`[price-watcher] ✅ Stamped lastUpdated in ${path.basename(filePath)}`);
    }

    // Always refresh cache after processing
    const newCache = {};
    (changed ? updated : products).forEach((p, i) => {
      newCache[buildKey(p, i)] = p.price;
    });
    priceCache.set(filePath, newCache);
  }

  return {
    name: 'price-watcher',

    // Called once when the dev server starts — build the initial cache
    buildStart() {
      const productsDir = path.resolve('src/data/products');
      if (!fs.existsSync(productsDir)) return;
      const files = fs.readdirSync(productsDir).filter(f => f.endsWith('.json'));
      files.forEach(file => {
        const fullPath = path.join(productsDir, file);
        loadCache(fullPath);
        // Also stamp any products that are already missing lastUpdated on startup
        stampChangedPrices(fullPath);
      });
    },

    // Called by Vite's dev server file-watcher on every file change
    configureServer(server) {
      const productsDir = path.resolve('src/data/products');
      if (!fs.existsSync(productsDir)) return;

      // Pre-load cache for all existing files
      const files = fs.readdirSync(productsDir).filter(f => f.endsWith('.json'));
      files.forEach(file => loadCache(path.join(productsDir, file)));

      server.watcher.on('change', (changedPath) => {
        const normalized = path.normalize(changedPath);
        const normalizedDir = path.normalize(productsDir);

        if (
          normalized.startsWith(normalizedDir) &&
          normalized.endsWith('.json')
        ) {
          // Small delay to let the editor finish writing the file
          setTimeout(() => stampChangedPrices(normalized), 150);
        }
      });

      // Watch for new files added to the products directory
      server.watcher.on('add', (addedPath) => {
        const normalized = path.normalize(addedPath);
        const normalizedDir = path.normalize(productsDir);

        if (
          normalized.startsWith(normalizedDir) &&
          normalized.endsWith('.json')
        ) {
          setTimeout(() => {
            loadCache(normalized);
            stampChangedPrices(normalized);
          }, 150);
        }
      });
    },
  };
}
