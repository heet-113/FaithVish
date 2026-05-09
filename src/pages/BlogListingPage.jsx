import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts, getBlogCategories } from '../data/blog/index.js';

const POSTS_PER_PAGE = 6;

const BlogListingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

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
      <div className="mb-10 text-center py-14 bg-[repeating-linear-gradient(45deg,rgba(217,208,193,0.1)_0px,rgba(217,208,193,0.1)_2px,rgba(250,250,247,0.5)_2px,rgba(250,250,247,0.5)_8px)] border-y-2 border-border">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent-secondary mb-4">FaithVish Journal</p>
        <h1 className="text-4xl sm:text-5xl font-black mb-4 font-serif uppercase tracking-widest text-text-primary leading-tight">
          Our <span className="text-accent underline decoration-4 underline-offset-8">Blog</span>
        </h1>
        <p className="text-text-secondary text-sm sm:text-base max-w-2xl mx-auto font-medium mt-6 uppercase tracking-widest">
          Styling tips, buying advice, and jewellery trends — curated by our editorial team.
        </p>
      </div>

      {/* Category Filters */}
      <div className="mb-8 flex flex-wrap gap-2 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border-2 transition-all ${
              selectedCategory === cat
                ? 'bg-accent text-white border-accent'
                : 'bg-white text-text-secondary border-border hover:border-accent hover:text-accent'
            }`}
            id={`blog-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts count */}
      <div className="mb-6 pb-2 border-b border-border">
        <p className="text-xs text-text-muted uppercase tracking-wider font-medium">
          {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
        {visiblePosts.map((post) => (
          <Link key={post.slug} to={`/blog/${post.slug}`} className="group bg-white border border-border hover:border-accent transition-all overflow-hidden blog-card" id={`blog-card-${post.slug}`}>
            <div className="aspect-[16/10] overflow-hidden bg-surface relative">
              <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-white/90 backdrop-blur-sm text-text-primary border border-border">{post.category}</span>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent-secondary">{formatDate(post.date)}</span>
                <span className="text-border">•</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">{post.readTime}</span>
              </div>
              <h2 className="text-base font-bold font-serif text-text-primary group-hover:text-accent transition-colors leading-snug mb-2 line-clamp-2">{post.title}</h2>
              <p className="text-sm text-text-muted leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent group-hover:gap-3 transition-all">
                <span>Read Article</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty state */}
      {filteredPosts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 bg-white border border-border flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-1">No articles yet</h3>
          <p className="text-sm text-text-muted max-w-sm">Articles in this category will appear here soon.</p>
        </div>
      )}

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center mt-10">
          <button onClick={() => setVisibleCount((prev) => prev + POSTS_PER_PAGE)} className="px-8 py-3 text-sm font-bold uppercase tracking-widest bg-white border-2 border-border hover:border-accent hover:text-accent text-text-secondary transition-all" id="blog-load-more">
            Load More Articles
          </button>
        </div>
      )}

      {/* Newsletter-style CTA */}
      <div className="mt-16 mb-4 bg-white border-2 border-border p-8 sm:p-10 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent-secondary mb-3">Stay Updated</p>
        <h2 className="text-xl sm:text-2xl font-bold font-serif uppercase tracking-widest text-text-primary mb-3">Follow Us on Pinterest</h2>
        <p className="text-sm text-text-muted max-w-lg mx-auto mb-6">We share new styling tips, jewellery trends, and curated collections every week. Follow FaithVish on Pinterest for your daily dose of jewellery inspiration.</p>
        <a href="https://pinterest.com/faithvish" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-white text-sm font-bold uppercase tracking-widest hover:bg-accent-light transition-all" id="blog-pinterest-follow">
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
