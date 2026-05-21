import { Link } from 'react-router-dom';
import { JEWELRY_CATEGORIES, MEN_CATEGORIES, MEN_CATEGORY_LABELS } from '../utils/constants';
import useStore from '../store/useStore';

const Footer = () => {
  const { activeGender } = useStore();
  const isMen = activeGender === 'men';

  return (
    <footer
      className="border-t mt-16"
      style={{
        background: isMen ? '#1A1A1C' : 'var(--color-surface-light)',
        borderColor: isMen ? '#3A3A3C' : 'var(--color-border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/FVicon.svg" alt="FaithVish Logo" className="w-9 h-9 object-contain" />
              <span className="text-xl font-black font-serif tracking-tight">
                {isMen ? (
                  <><span style={{ color: '#C9A96E' }}>Faith</span><span style={{ color: '#C9A96E' }}>Vish</span></>
                ) : (
                  <><span className="text-pink-500">Faith</span><span className="text-cyan-500">Vish</span></>
                )}
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: isMen ? '#6B6B6B' : 'var(--color-text-muted)' }}
            >
              {isMen
                ? "Bold, minimal men's jewellery from India's trusted brands. Handpicked chains, rings & bracelets for every man."
                : "Discover exquisite jewelry from India's most trusted brands. Handpicked collections for every occasion, from daily elegance to bridal grandeur."}
            </p>
            <p className="text-sm mt-3" style={{ color: isMen ? '#6B6B6B' : 'var(--color-text-muted)' }}>
              <strong style={{ color: isMen ? '#9A9A9A' : 'var(--color-text-secondary)' }}>📧</strong>{' '}
              <a href="mailto:contact@faithvish.com" className="underline transition-colors" style={{ color: isMen ? '#6B6B6B' : 'var(--color-text-muted)' }}>contact@faithvish.com</a>
            </p>
            <p className="text-[12px] sm:text-[11px] mt-2 italic" style={{ color: isMen ? '#6B6B6B' : 'var(--color-text-muted)' }}>Written &amp; curated by the FaithVish Editorial Team</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider" style={{ color: isMen ? '#F5F5F0' : 'var(--color-text-primary)' }}>Quick Links</h3>
            <ul className="space-y-1 sm:space-y-2.5">
              {[
                { to: '/', label: 'Home' },
                { to: '/categories', label: 'Collections' },
                { to: '/top-rings-under-1000', label: 'Best Rings Under ₹1,000' },
                { to: '/gifting-guide', label: 'Gifting Guide' },
                { to: '/buying-guide', label: 'Buying Guide' },
                { to: '/jewellery-care-guide', label: 'Jewellery Care' },
                { to: '/blog', label: 'Blog' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact' },
              ].filter(link => !(isMen && link.to === '/top-rings-under-1000')).map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm transition-colors block py-2 sm:py-0"
                    style={{ color: isMen ? '#6B6B6B' : 'var(--color-text-muted)' }}
                    onMouseEnter={e => e.currentTarget.style.color = isMen ? '#C9A96E' : 'var(--color-text-primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = isMen ? '#6B6B6B' : 'var(--color-text-muted)'}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider" style={{ color: isMen ? '#F5F5F0' : 'var(--color-text-primary)' }}>Collections</h3>
            <ul className="space-y-1 sm:space-y-2.5">
              {(isMen ? MEN_CATEGORIES : JEWELRY_CATEGORIES.slice(0, 6)).map(cat => (
                <li key={cat}>
                  <Link to="/categories" className="text-sm transition-colors block py-2 sm:py-0" style={{ color: isMen ? '#6B6B6B' : 'var(--color-text-muted)' }}
                    onMouseEnter={e => e.currentTarget.style.color = isMen ? '#C9A96E' : 'var(--color-text-primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = isMen ? '#6B6B6B' : 'var(--color-text-muted)'}
                  >
                    {isMen ? (MEN_CATEGORY_LABELS[cat] || cat) : cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider" style={{ color: isMen ? '#F5F5F0' : 'var(--color-text-primary)' }}>Information</h3>
            <ul className="space-y-1 sm:space-y-2.5">
              {[
                { to: '/privacy-policy', label: 'Privacy Policy' },
                { to: '/terms', label: 'Terms of Service' },
                { to: '/affiliate-disclosure', label: 'Affiliate Disclosure' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm transition-colors py-1 sm:py-0"
                    style={{ color: isMen ? '#6B6B6B' : 'var(--color-text-muted)' }}
                    onMouseEnter={e => e.currentTarget.style.color = isMen ? '#C9A96E' : 'var(--color-text-primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = isMen ? '#6B6B6B' : 'var(--color-text-muted)'}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Affiliate Disclaimer */}
        <div className="py-4" style={{ borderTop: `1px solid ${isMen ? '#3A3A3C' : 'var(--color-border)'}` }}>
          <div
            className="rounded-sm p-4 mb-4"
            style={{
              background: isMen ? '#282828' : '#ffffff',
              border: `2px solid ${isMen ? '#3A3A3C' : 'var(--color-border)'}`,
            }}
          >
            <p className="text-xs leading-relaxed" style={{ color: isMen ? '#6B6B6B' : 'var(--color-text-muted)' }}>
              <span className="font-semibold" style={{ color: isMen ? '#C9A96E' : 'var(--color-warning)' }}>⚠️ Affiliate Disclaimer:</span> FaithVish is a jewelry curation and affiliate marketing website. 
              When you click on product links and make a purchase, we may earn a small commission at no extra cost to you. This helps us keep the site running 
              and continue curating beautiful jewelry for you. Product prices and availability are subject to change. We recommend verifying details on the 
              respective retailer's website before purchasing. All product names, logos, and brands are property of their respective owners.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs" style={{ color: isMen ? '#6B6B6B' : 'var(--color-text-muted)' }}>
              © 2026 FaithVish. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {[
                { to: '/privacy-policy', label: 'Privacy Policy' },
                { to: '/terms', label: 'Terms of Service' },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-xs transition-colors"
                  style={{ color: isMen ? '#6B6B6B' : 'var(--color-text-muted)' }}
                  onMouseEnter={e => e.currentTarget.style.color = isMen ? '#C9A96E' : 'var(--color-text-primary)'}
                  onMouseLeave={e => e.currentTarget.style.color = isMen ? '#6B6B6B' : 'var(--color-text-muted)'}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
