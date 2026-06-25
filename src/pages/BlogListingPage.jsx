import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts, getBlogCategories } from '../data/blog/index.js';
import useStore from '../store/useStore';

const POSTS_PER_PAGE = 6;

const BlogListingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const { activeGender } = useStore();
  const isMen = activeGender === 'men';

  const m = {
    bg: '#1E1E20',
    card: '#282828',
    cardHover: '#303032',
    border: '#3A3A3C',
    gold: '#C9A96E',
    goldLight: '#D4BA82',
    textPrimary: '#F5F5F0',
    textSecondary: '#9A9A9A',
    textMuted: '#6B6B6B',
    surface: '#1A1A1C',
  };

  const theme = {
    textPrimary: isMen ? m.textPrimary : 'var(--color-text-primary)',
    textSecondary: isMen ? m.textSecondary : 'var(--color-text-secondary)',
    textMuted: isMen ? m.textMuted : 'var(--color-text-muted)',
    accent: isMen ? m.gold : 'var(--color-accent)',
    accentHover: isMen ? m.goldLight : 'var(--color-accent-light)',
    cardBg: isMen ? m.card : '#ffffff',
    cardBorder: isMen ? m.border : 'var(--color-border)',
    heroBg: isMen
      ? 'repeating-linear-gradient(45deg,rgba(201,169,110,0.05) 0px,rgba(201,169,110,0.05) 2px,rgba(30,30,32,0.8) 2px,rgba(30,30,32,0.8) 8px)'
      : 'repeating-linear-gradient(45deg,rgba(217,208,193,0.1) 0px,rgba(217,208,193,0.1) 2px,rgba(250,250,247,0.5) 2px,rgba(250,250,247,0.5) 8px)'
  };

  const allPosts = getAllPosts();
  const categories = getBlogCategories();

  const filteredPosts = selectedCategory === 'All'
    ? allPosts
    : allPosts.filter((p) => p.category === selectedCategory);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setVisibleCount(POSTS_PER_PAGE);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Hero */}
      <div
        className="text-center py-14"
      >
        <h1
          className="text-4xl sm:text-5xl font-black font-serif uppercase tracking-widest leading-tight"
          style={{ color: theme.textPrimary }}
        >
          Our Blogs
        </h1>
      </div>

      {/* Posts count */}
      <div className="mb-6 pb-2 border-b" style={{ borderColor: theme.cardBorder }}>
        <p className="text-xs uppercase tracking-wider font-medium" style={{ color: theme.textMuted }}>
          {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
        {visiblePosts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group transition-all overflow-hidden blog-card border rounded-sm"
            style={{
              backgroundColor: theme.cardBg,
              borderColor: theme.cardBorder
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = theme.accent; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.cardBorder; }}
            id={`blog-card-${post.slug}`}
          >
            <div className="aspect-[16/10] overflow-hidden bg-surface relative">
              <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              <div className="absolute top-3 left-3">
                <span
                  className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest border backdrop-blur-sm"
                  style={{
                    backgroundColor: isMen ? 'rgba(40,40,40,0.9)' : 'rgba(255,255,255,0.9)',
                    color: theme.textPrimary,
                    borderColor: theme.cardBorder
                  }}
                >
                  {post.category}
                </span>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] sm:text-[10px] font-bold uppercase tracking-widest" style={{ color: theme.accent }}>
                  {formatDate(post.date)}
                </span>
                <span style={{ color: theme.cardBorder }}>•</span>
                <span className="text-[11px] sm:text-[10px] font-bold uppercase tracking-widest" style={{ color: theme.textMuted }}>
                  {post.readTime}
                </span>
              </div>
              <h2
                className="text-base font-bold font-serif group-hover:text-accent transition-colors leading-snug mb-2 line-clamp-2"
                style={{ color: theme.textPrimary }}
              >
                {post.title}
              </h2>
              <p className="text-sm leading-relaxed line-clamp-3 mb-4" style={{ color: theme.textMuted }}>
                {post.excerpt}
              </p>
              <div
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest group-hover:gap-3 transition-all"
                style={{ color: theme.accent }}
              >
                <span>Read Article</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty state */}
      {filteredPosts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div
            className="w-20 h-20 border flex items-center justify-center mb-4 rounded-sm"
            style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}
          >
            <svg className="w-10 h-10" style={{ color: theme.textMuted }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-1 font-serif uppercase tracking-wider" style={{ color: theme.textPrimary }}>
            No articles yet
          </h3>
          <p className="text-sm max-w-sm" style={{ color: theme.textMuted }}>
            Articles in this category will appear here soon.
          </p>
        </div>
      )}

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setVisibleCount((prev) => prev + POSTS_PER_PAGE)}
            className="px-8 py-3 text-sm font-bold uppercase tracking-widest border-2 transition-all rounded-sm"
            style={{
              backgroundColor: theme.cardBg,
              borderColor: theme.cardBorder,
              color: theme.textSecondary,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = theme.accent;
              e.currentTarget.style.color = theme.accent;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = theme.cardBorder;
              e.currentTarget.style.color = theme.textSecondary;
            }}
            id="blog-load-more"
          >
            Load More Articles
          </button>
        </div>
      )}

      {/* Newsletter-style CTA */}
      <div
        className="mt-16 mb-4 border-2 p-8 sm:p-10 text-center rounded-sm"
        style={{
          backgroundColor: theme.cardBg,
          borderColor: theme.cardBorder
        }}
      >
        <p className="text-[11px] sm:text-[10px] font-bold uppercase tracking-[0.4em] mb-3" style={{ color: theme.accent }}>
          Stay Updated
        </p>
        <h2 className="text-xl sm:text-2xl font-bold font-serif uppercase tracking-widest mb-3" style={{ color: theme.textPrimary }}>
          Follow Us on Pinterest
        </h2>
        <p className="text-sm max-w-lg mx-auto mb-6 leading-relaxed" style={{ color: theme.textMuted }}>
          We share new styling tips, jewellery trends, and curated collections every week. Follow FaithVish on Pinterest for your daily dose of jewellery inspiration.
        </p>
        <a
          href="https://pinterest.com/faithvish06"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3 font-bold uppercase tracking-widest transition-all rounded-sm text-sm"
          style={{
            backgroundColor: theme.accent,
            color: isMen ? m.bg : '#ffffff'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = theme.accentHover; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = theme.accent; }}
          id="blog-pinterest-follow"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
          </svg>
          Follow on Pinterest
        </a>
      </div>
    </div>
  );
};

export default BlogListingPage;
