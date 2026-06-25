import { Link } from 'react-router-dom';
import { JEWELRY_CATEGORIES, MEN_CATEGORIES, MEN_CATEGORY_LABELS } from '../utils/constants';
import useStore from '../store/useStore';

const Footer = () => {
  const { activeGender } = useStore();
  const isMen = activeGender === 'men';

  return (
    <footer
      className="mt-16"
      style={{
        background: isMen ? '#1A1A1C' : '#F0E8DF',
        borderTop: `1px solid ${isMen ? '#282828' : '#E8DDD1'}`,
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main footer content */}
        <div className="py-10 sm:py-12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src={isMen ? "/FV_Men.png" : "/FV_Women.png"} alt="FaithVish Logo" className="w-8 h-8 object-contain" />
              <span className="text-lg font-semibold font-display tracking-tight">
                {isMen ? (
                  <><span style={{ color: '#C9A96E' }}>Faith</span><span style={{ color: '#C9A96E' }}>Vish</span></>
                ) : (
                  <><span style={{ color: '#B85C6A' }}>Faith</span><span style={{ color: '#C4A882' }}>Vish</span></>
                )}
              </span>
            </div>
            <p className="text-[12px] leading-relaxed" style={{ color: isMen ? '#6B6B6B' : '#8A7E72' }}>
              {isMen
                ? "Aesthetic & affordable men's jewellery, handpicked from India's trusted brands."
                : "Aesthetic & affordable jewelry, handpicked from India's most trusted brands."}
            </p>
            <p className="text-[12px] mt-3" style={{ color: isMen ? '#6B6B6B' : '#8A7E72' }}>
              <a href="mailto:contact@faithvish.com" className="underline transition-colors" style={{ color: isMen ? '#6B6B6B' : '#8A7E72' }}>contact@faithvish.com</a>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[11px] font-semibold mb-4 tracking-wide" style={{ color: isMen ? '#9A9A9A' : '#5A4E42' }}>Quick Links</h3>
            <ul className="space-y-0.5">
              {[
                { to: '/', label: 'Home' },
                { to: '/categories', label: 'Collections' },
                { to: '/gifting-guide', label: 'Gifting Guide' },
                { to: '/buying-guide', label: 'Buying Guide' },
                { to: '/jewellery-care-guide', label: 'Jewellery Care' },
                { to: '/blog', label: 'Journal' },
                { to: '/about', label: 'About' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-[12px] transition-colors block py-2 sm:py-1"
                    style={{ color: isMen ? '#6B6B6B' : '#8A7E72' }}
                    onMouseEnter={e => e.currentTarget.style.color = isMen ? '#C9A96E' : '#B85C6A'}
                    onMouseLeave={e => e.currentTarget.style.color = isMen ? '#6B6B6B' : '#8A7E72'}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h3 className="text-[11px] font-semibold mb-4 tracking-wide" style={{ color: isMen ? '#9A9A9A' : '#5A4E42' }}>Collections</h3>
            <ul className="space-y-0.5">
              {(isMen ? MEN_CATEGORIES : JEWELRY_CATEGORIES.slice(0, 6)).map(cat => (
                <li key={cat}>
                  <Link
                    to={`/categories/${encodeURIComponent(cat)}`}
                    className="text-[12px] transition-colors block py-2 sm:py-1"
                    style={{ color: isMen ? '#6B6B6B' : '#8A7E72' }}
                    onMouseEnter={e => e.currentTarget.style.color = isMen ? '#C9A96E' : '#B85C6A'}
                    onMouseLeave={e => e.currentTarget.style.color = isMen ? '#6B6B6B' : '#8A7E72'}
                  >
                    {isMen ? (MEN_CATEGORY_LABELS[cat] || cat) : cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-[11px] font-semibold mb-4 tracking-wide" style={{ color: isMen ? '#9A9A9A' : '#5A4E42' }}>Information</h3>
            <ul className="space-y-0.5">
              {[
                { to: '/privacy-policy', label: 'Privacy Policy' },
                { to: '/terms', label: 'Terms of Service' },
                { to: '/affiliate-disclosure', label: 'Affiliate Disclosure' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-[12px] transition-colors block py-2 sm:py-1"
                    style={{ color: isMen ? '#6B6B6B' : '#8A7E72' }}
                    onMouseEnter={e => e.currentTarget.style.color = isMen ? '#C9A96E' : '#B85C6A'}
                    onMouseLeave={e => e.currentTarget.style.color = isMen ? '#6B6B6B' : '#8A7E72'}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6" style={{ borderTop: `1px solid ${isMen ? '#282828' : '#E8DDD1'}` }}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[11px]" style={{ color: isMen ? '#6B6B6B' : '#8A7E72' }}>
              © 2026 FaithVish. All rights reserved.
            </p>
            <p className="text-[10px] text-center sm:text-right max-w-md" style={{ color: isMen ? '#4A4A4A' : '#B0A598' }}>
              FaithVish is an affiliate curation website. We may earn a small commission at no extra cost to you.
              Product prices and availability are subject to change.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
