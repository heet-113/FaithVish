import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostBySlug, getRelatedPosts, getLatestPosts } from '../data/blog/index.js';
import useStore from '../store/useStore.js';
import ProductCard from '../components/ProductCard.jsx';
import MenProductCard from '../components/MenProductCard.jsx';

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const ProductSection = ({ productId }) => {
  const getProductById = useStore((state) => state.getProductById);
  const { activeGender } = useStore();
  const isMen = activeGender === 'men';
  const product = getProductById(productId);
  
  if (!product) return null;

  return (
    <div className="my-8 max-w-sm mx-auto shadow-md hover:shadow-lg transition-shadow">
      {isMen ? (
        <MenProductCard product={product} />
      ) : (
        <ProductCard product={product} />
      )}
    </div>
  );
};

const ContentSection = ({ section, index }) => {
  const { activeGender } = useStore();
  const isMen = activeGender === 'men';

  const m = {
    bg: '#1E1E20',
    card: '#282828',
    border: '#3A3A3C',
    gold: '#C9A96E',
    goldLight: '#D4BA82',
    textPrimary: '#F5F5F0',
    textSecondary: '#9A9A9A',
    textMuted: '#6B6B6B',
  };

  const theme = {
    textPrimary: isMen ? m.textPrimary : 'var(--color-text-primary)',
    textSecondary: isMen ? m.textSecondary : 'var(--color-text-secondary)',
    textMuted: isMen ? m.textMuted : 'var(--color-text-muted)',
    accent: isMen ? m.gold : 'var(--color-accent)',
    accentHover: isMen ? m.goldLight : 'var(--color-accent-light)',
    cardBg: isMen ? m.card : '#ffffff',
    cardBorder: isMen ? m.border : 'var(--color-border)',
    alertBg: isMen ? 'rgba(201, 169, 110, 0.08)' : 'rgba(var(--color-accent-rgb), 0.05)',
    dividerColor: isMen ? m.border : 'var(--color-border)',
  };

  switch (section.type) {
    case 'product':
      return <ProductSection key={index} productId={section.id} />;
    case 'paragraph':
      return (
        <p className="text-[15px] leading-[1.85] mb-5" style={{ color: theme.textSecondary }}>
          {section.text}
        </p>
      );
    case 'heading':
      return (
        <h2 className="text-xl font-bold font-serif mt-8 mb-4 uppercase tracking-wider" style={{ color: theme.textPrimary }}>
          {section.text}
        </h2>
      );
    case 'subheading':
      return (
        <h3 className="text-base font-bold mt-6 mb-3 uppercase tracking-wider" style={{ color: theme.textPrimary }}>
          {section.text}
        </h3>
      );
    case 'image':
      return (
        <figure className="my-6">
          <div className="overflow-hidden border" style={{ borderColor: theme.cardBorder }}>
            <img src={section.src} alt={section.alt || ''} className="w-full h-auto" loading="lazy" />
          </div>
          {section.caption && (
            <figcaption className="text-xs mt-2 text-center italic" style={{ color: theme.textMuted }}>
              {section.caption}
            </figcaption>
          )}
        </figure>
      );
    case 'tip':
      return (
        <div 
          className="my-6 border-l-4 p-4 sm:p-5 rounded-sm"
          style={{ backgroundColor: theme.alertBg, borderLeftColor: theme.accent }}
        >
          <div className="flex items-start gap-2.5">
            <span className="text-lg mt-0.5 shrink-0" style={{ color: theme.accent }}>💡</span>
            <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
              <span className="font-bold" style={{ color: theme.textPrimary }}>Pro Tip: </span>{section.text}
            </p>
          </div>
        </div>
      );
    case 'list':
      return (
        <ul className="my-5 space-y-2 pl-1">
          {section.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[15px] leading-relaxed" style={{ color: theme.textSecondary }}>
              <span className="mt-1 shrink-0" style={{ color: theme.accent }}>→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'numbered-list':
      return (
        <ol className="my-5 space-y-2.5 pl-1">
          {section.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed" style={{ color: theme.textSecondary }}>
              <span 
                className="w-6 h-6 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 rounded-sm"
                style={{ backgroundColor: theme.accent, color: isMen ? m.bg : '#ffffff' }}
              >
                {i + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      );
    case 'quote':
      return (
        <blockquote className="my-8 border-l-4 pl-5 py-2" style={{ borderLeftColor: theme.accent }}>
          <p className="text-base font-serif italic leading-relaxed" style={{ color: theme.textPrimary }}>"{section.text}"</p>
          {section.author && (
            <cite className="block text-xs mt-2 uppercase tracking-wider not-italic" style={{ color: theme.textMuted }}>
              — {section.author}
            </cite>
          )}
        </blockquote>
      );
    case 'divider':
      return (
        <div className="my-8 flex items-center gap-4">
          <div className="flex-1 h-px" style={{ backgroundColor: theme.dividerColor }} />
          <span className="text-xs" style={{ color: theme.accent }}>✦</span>
          <div className="flex-1 h-px" style={{ backgroundColor: theme.dividerColor }} />
        </div>
      );
    case 'cta':
      return (
        <div className="my-8">
          <Link 
            to={section.link} 
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-widest transition-all rounded-sm"
            style={{ backgroundColor: theme.accent, color: isMen ? m.bg : '#ffffff' }}
          >
            {section.text}
          </Link>
        </div>
      );
    default:
      return null;
  }
};

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  const { activeGender } = useStore();
  const isMen = activeGender === 'men';
  const [copiedLink, setCopiedLink] = useState(false);

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
    surfaceBg: isMen ? m.surface : 'var(--color-surface-light)',
    alertBg: isMen ? 'rgba(201, 169, 110, 0.08)' : 'rgba(var(--color-accent-rgb), 0.05)',
  };

  useEffect(() => {
    if (!copiedLink) return undefined;
    const timer = window.setTimeout(() => setCopiedLink(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copiedLink]);

  const copyPostLink = async () => {
    const url = window.location.href;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.setAttribute('readonly', '');
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      setCopiedLink(true);
    } catch (error) {
      window.prompt('Copy this link:', url);
    }
  };

  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div 
          className="w-20 h-20 border flex items-center justify-center mx-auto mb-4 rounded-sm"
          style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}
        >
          <svg className="w-10 h-10" style={{ color: theme.textMuted }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold font-serif mb-2" style={{ color: theme.textPrimary }}>Article Not Found</h1>
        <p className="text-sm mb-6" style={{ color: theme.textMuted }}>The article you're looking for doesn't exist or has been moved.</p>
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-widest transition-all rounded-sm"
          style={{ backgroundColor: theme.accent, color: isMen ? m.bg : '#ffffff' }}
        >
          ← Back to Blog
        </Link>
      </div>
    );
  }

  const relatedPosts = getRelatedPosts(slug, 3);
  const latestPosts = relatedPosts.length >= 2 ? relatedPosts : getLatestPosts(3).filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <article className="animate-fade-in-up">
      {/* Cover Image Hero */}
      <div className="relative w-full h-[220px] sm:h-[360px] md:h-[420px] overflow-hidden">
        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-8 sm:pb-10 w-full">
            <span 
              className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white mb-3"
              style={{ backgroundColor: theme.accent, color: isMen ? m.bg : '#ffffff' }}
            >
              {post.category}
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-serif text-white leading-tight uppercase tracking-wider">{post.title}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <nav 
          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest mb-6 pb-4 border-b"
          style={{ color: theme.textMuted, borderColor: theme.cardBorder }}
        >
          <Link to="/" className="transition-colors hover:underline" style={{ color: theme.textMuted }}>Home</Link>
          <span>→</span>
          <Link to="/blog" className="transition-colors hover:underline" style={{ color: theme.textMuted }}>Blog</Link>
          <span>→</span>
          <span className="truncate max-w-[200px] sm:max-w-none" style={{ color: theme.textPrimary }}>{post.title}</span>
        </nav>

        {/* Meta bar */}
        <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b" style={{ borderColor: theme.cardBorder }}>
          <div className="flex items-center gap-2">
            <div 
              className="w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center rounded-sm border"
              style={{ backgroundColor: theme.alertBg, borderColor: isMen ? m.border : 'rgba(var(--color-accent-rgb), 0.3)' }}
            >
              <svg className="w-4 h-4" style={{ color: theme.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold" style={{ color: theme.textPrimary }}>{post.author}</p>
              <p className="text-[11px] sm:text-[10px]" style={{ color: theme.textMuted }}>{formatDate(post.date)}</p>
            </div>
          </div>
          <span style={{ color: theme.cardBorder }} className="hidden sm:inline">|</span>
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: theme.textSecondary }}>{post.readTime}</span>
          <div className="ml-auto flex items-center gap-2">
            <a 
              href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&media=${encodeURIComponent(window.location.origin + post.coverImage)}&description=${encodeURIComponent(post.title)}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 sm:w-8 sm:h-8 border flex items-center justify-center transition-all group rounded-sm" 
              style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}
              title="Pin on Pinterest"
            >
              <svg className="w-3.5 h-3.5 text-text-muted group-hover:text-accent transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
              </svg>
            </a>
            <button 
              type="button"
              onClick={copyPostLink} 
              className="w-10 h-10 sm:w-8 sm:h-8 border flex items-center justify-center transition-all group rounded-sm" 
              style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}
              title={copiedLink ? 'Link copied' : 'Copy link'}
              aria-label={copiedLink ? 'Link copied' : 'Copy post link'}
            >
              <svg className="w-3.5 h-3.5 text-text-muted group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </button>
            {copiedLink && (
              <span className="hidden sm:inline-flex items-center text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm border" style={{ color: theme.accent, borderColor: theme.cardBorder }}>
                Copied
              </span>
            )}
          </div>
        </div>

        {/* Post Content */}
        <div className="blog-content">
          {post.content.map((section, index) => (<ContentSection key={index} section={section} index={index} />))}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t" style={{ borderColor: theme.cardBorder }}>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] sm:text-[10px] font-bold uppercase tracking-widest mr-2" style={{ color: theme.textMuted }}>Tags:</span>
              {post.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest border rounded-sm"
                  style={{ backgroundColor: theme.surfaceBg, borderColor: theme.cardBorder, color: theme.textSecondary }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Author attribution */}
        <div className="mt-8 border p-5 flex items-center gap-4 rounded-sm animate-fade-in-up" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
          <div 
            className="w-12 h-12 flex items-center justify-center shrink-0 rounded-sm border"
            style={{ backgroundColor: theme.alertBg, borderColor: isMen ? m.border : 'rgba(var(--color-accent-rgb), 0.3)' }}
          >
            <svg className="w-6 h-6" style={{ color: theme.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold" style={{ color: theme.textPrimary }}>{post.author}</p>
            <p className="text-xs mt-0.5" style={{ color: theme.textMuted }}>Curating beautiful, trustworthy jewellery recommendations from India's top brands.</p>
          </div>
        </div>

        {/* Affiliate disclosure */}
        <div className="mt-4 border p-4 rounded-sm" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
          <p className="text-[11px] leading-relaxed" style={{ color: theme.textMuted }}>
            <span className="font-semibold text-warning">⚠️ Disclosure:</span> This article may contain affiliate links. When you click and make a purchase, we may earn a small commission at no extra cost to you. This helps us keep creating free content for you.
          </p>
        </div>
      </div>

      {/* Related Posts */}
      {latestPosts.length > 0 && (
        <div className="border-t mt-8" style={{ backgroundColor: theme.surfaceBg, borderColor: theme.cardBorder }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-8">
              <p className="text-[11px] sm:text-[10px] font-bold uppercase tracking-[0.4em] mb-2" style={{ color: theme.accent }}>Keep Reading</p>
              <h2 className="text-xl font-bold font-serif uppercase tracking-widest" style={{ color: theme.textPrimary }}>More from FaithVish</h2>
              <div className="w-12 h-[3px] mx-auto mt-3" style={{ backgroundColor: theme.accent }} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((relPost) => (
                <Link 
                  key={relPost.slug} 
                  to={`/blog/${relPost.slug}`} 
                  className="group border transition-all overflow-hidden blog-card rounded-sm"
                  style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = theme.accent; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.cardBorder; }}
                >
                  <div className="aspect-[16/10] overflow-hidden bg-surface">
                    <img src={relPost.coverImage} alt={relPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <span className="text-[11px] sm:text-[10px] font-bold uppercase tracking-widest" style={{ color: theme.accent }}>
                      {formatDate(relPost.date)}
                    </span>
                    <h3 
                      className="text-sm font-bold font-serif group-hover:text-accent transition-colors mt-1.5 leading-snug line-clamp-2"
                      style={{ color: theme.textPrimary }}
                    >
                      {relPost.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link 
                to="/blog" 
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest group-hover:gap-3 transition-all"
                style={{ color: theme.accent }}
              >
                View All Articles
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default BlogPostPage;
