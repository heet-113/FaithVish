/**
 * Blog Data Registry — Auto-Discovery Edition
 * 
 * HOW TO ADD A NEW BLOG POST:
 * ===========================
 * 1. Create a new .md file in the /src/data/blog/posts/ folder
 * 2. Place your cover image in /public/blog/ folder
 * 3. Add YAML frontmatter at the top of the file — that's it!
 * 
 * FRONTMATTER TEMPLATE:
 * ---
 * title: "Your Blog Post Title"
 * excerpt: "A short summary for the listing page..."
 * coverImage: "/blog/your-image.jpg"
 * date: "2026-05-10"
 * author: "FaithVish Team"
 * category: "Styling Tips"
 * tags: ["tag1", "tag2", "tag3"]
 * readTime: "5 min read"
 * featured: false
 * ---
 * 
 * CONTENT FORMAT (Markdown):
 * Write your content in standard Markdown below the frontmatter.
 * 
 * Available syntax:
 *   ## Heading
 *   ### Subheading
 *   Regular paragraph text...
 *   - Bullet list item
 *   1. Numbered list item
 *   > "A blockquote"
 *   > — Author Name
 *   ![alt text](/blog/image.jpg "optional caption")
 *   :::tip
 *   Your pro tip text here...
 *   :::
 *   :::cta[Button Text](/link)
 *   ---  (horizontal divider)
 * 
 * BLOG CATEGORIES:
 * Use any of these (or add new ones):
 *   "Styling Tips", "Buying Advice", "Trends", "Jewellery Care", "Gift Ideas"
 */

import { parseMarkdownToSections } from './markdownParser.js';

/**
 * Lightweight frontmatter parser (no external dependencies).
 * Splits --- delimited YAML header from the Markdown body.
 */
function parseFrontmatter(raw) {
  const match = raw.match(/^\uFEFF?\s*---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { attributes: {}, body: raw };
  const body = match[2];
  const attributes = {};
  for (const line of match[1].split('\n')) {
    const trimmed = line.trim();
    const m = trimmed.match(/^([\w-]+):\s*(.+)$/);
    if (!m) continue;
    let value = m[2].trim();
    // Parse arrays: ["a", "b"]
    if (value.startsWith('[')) {
      try { value = JSON.parse(value); } catch { /* keep as string */ }
    }
    // Parse booleans
    else if (value === 'true') value = true;
    else if (value === 'false') value = false;
    // Strip surrounding quotes
    else if (/^".*"$/.test(value) || /^'.*'$/.test(value)) {
      value = value.slice(1, -1);
    }
    attributes[m[1]] = value;
  }
  return { attributes, body };
}

// Auto-discover all .md files in the posts/ directory at build time
const markdownFiles = import.meta.glob('./posts/*.md', { eager: true, query: '?raw', import: 'default' });

/**
 * Parse all discovered markdown files into post objects
 */
const posts = Object.entries(markdownFiles).map(([filepath, rawContent]) => {
  // Extract slug from filename: ./posts/my-post.md → my-post
  const slug = filepath.replace('./posts/', '').replace('.md', '');
  
  // Parse frontmatter and body
  let { attributes, body } = parseFrontmatter(rawContent);

  // If parsing failed, log a helpful warning and try a simple fallback
  if (!attributes || Object.keys(attributes).length === 0) {
    // Extra targeted debug for known problematic file
    if (filepath.includes('how-to-select-jewelry-style-for-yourself.md')) {
      try {
        console.warn('[blog][debug] Raw content snippet for problematic file:', filepath);
        const snippet = rawContent.slice(0, 240);
        console.warn(snippet);
        const codes = Array.from(snippet).map((c, i) => `${i}:${c.charCodeAt(0)}`).slice(0, 40);
        console.warn('[blog][debug] Char codes (first 40):', codes.join(', '));
      } catch (e) {
        console.error('[blog][debug] Error printing raw snippet', e);
      }
    }
    try {
      console.warn('[blog] Frontmatter parse failed — attempting fallback for:', filepath);
      console.warn(rawContent.slice(0, 600));

      const firstSep = rawContent.indexOf('---');
      const secondSep = rawContent.indexOf('---', firstSep + 3);
      if (firstSep !== -1 && secondSep !== -1) {
        const yamlBlock = rawContent.slice(firstSep + 3, secondSep).trim();
        const altAttributes = {};
        for (const line of yamlBlock.split(/\r?\n/)) {
          const m = line.match(/^([\w-]+):\s*(.+)$/);
          if (!m) continue;
          let value = m[2].trim();
          if (value.startsWith('[')) {
            try { value = JSON.parse(value); } catch { }
          } else if (value === 'true') value = true;
          else if (value === 'false') value = false;
          else if ((/^\".*\"$/).test(value) || (/^'.*'$/).test(value)) {
            value = value.slice(1, -1);
          }
          altAttributes[m[1]] = value;
        }
        if (Object.keys(altAttributes).length > 0) {
          attributes = altAttributes;
          body = rawContent.slice(secondSep + 3);
          console.info('[blog] Frontmatter fallback succeeded for:', filepath);
        }
      }
    } catch (e) {
      console.error('[blog] Error during frontmatter fallback parse for:', filepath, e);
    }
  }
  
  // Convert markdown body to content sections
  const content = parseMarkdownToSections(body);
  
  return {
    slug,
    title: attributes.title,
    excerpt: attributes.excerpt,
    coverImage: attributes.coverImage,
    date: attributes.date,
    author: attributes.author || 'FaithVish Team',
    category: attributes.category,
    tags: attributes.tags || [],
    readTime: attributes.readTime || '5 min read',
    featured: attributes.featured || false,
    content,
  };
});

// Debug: show parsed posts summary during dev to help diagnose frontmatter issues
try {
  if (typeof window !== 'undefined' && window.location && window.location.hostname) {
    // running in browser dev server
    // Print minimal summary so console is readable
    console.info('[blog] Parsed posts summary:', posts.map(p => ({
      slug: p.slug,
      title: p.title,
      coverImage: p.coverImage,
      category: p.category,
      readTime: p.readTime
    })));
  }
} catch (e) {
  // ignore in non-browser environments
}

/**
 * Get all blog posts, sorted by date (newest first)
 */
export const getAllPosts = () => {
  return [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
};

/**
 * Get a single post by its slug
 */
export const getPostBySlug = (slug) => {
  return posts.find((p) => p.slug === slug) || null;
};

/**
 * Get all unique blog categories
 */
export const getBlogCategories = () => {
  const categories = posts
    .map((p) => p.category)
    .filter((category) => Boolean(category));
  return ['All', ...new Set(categories)];
};

/**
 * Get featured posts (for homepage)
 */
export const getFeaturedPosts = (limit = 3) => {
  return getAllPosts()
    .filter((p) => p.featured)
    .slice(0, limit);
};

/**
 * Get related posts (same category, excluding current)
 */
export const getRelatedPosts = (slug, limit = 3) => {
  const current = getPostBySlug(slug);
  if (!current) return [];
  return getAllPosts()
    .filter((p) => p.slug !== slug && p.category === current.category)
    .slice(0, limit);
};

/**
 * Get latest posts
 */
export const getLatestPosts = (limit = 6) => {
  return getAllPosts().slice(0, limit);
};

export default posts;
