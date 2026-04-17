import { Link } from 'react-router-dom';
import { JEWELRY_CATEGORIES } from '../utils/constants';

const Footer = () => {
  return (
    <footer className="bg-surface-light border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/FVicon.svg" alt="FaithVish Logo" className="w-9 h-9 object-contain" />
              <span className="text-xl font-black font-serif tracking-tight">
                <span className="text-pink-500">Faith</span><span className="text-cyan-500">Vish</span>
              </span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              Discover exquisite jewelry from India's most trusted brands. Handpicked collections for every occasion — from daily elegance to bridal grandeur.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5">
              <li><Link to="/" className="text-sm text-text-muted hover:text-text-primary transition-colors">Home</Link></li>
              <li><Link to="/categories" className="text-sm text-text-muted hover:text-text-primary transition-colors">Collections</Link></li>
              <li><Link to="/about" className="text-sm text-text-muted hover:text-text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-sm text-text-muted hover:text-text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">Collections</h3>
            <ul className="space-y-2.5">
              {JEWELRY_CATEGORIES.slice(0, 6).map(cat => (
                <li key={cat}>
                  <Link to="/categories" className="text-sm text-text-muted hover:text-text-primary transition-colors">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">Information</h3>
            <ul className="space-y-2.5">
              <li><Link to="/privacy-policy" className="text-sm text-text-muted hover:text-text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-text-muted hover:text-text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/about" className="text-sm text-text-muted hover:text-text-primary transition-colors">Affiliate Disclosure</Link></li>
            </ul>
          </div>
        </div>

        {/* Affiliate Disclaimer */}
        <div className="py-4 border-t border-border">
          <div className="bg-white border-2 border-border rounded-sm p-4 mb-4">
            <p className="text-xs text-text-muted leading-relaxed">
              <span className="font-semibold text-warning">⚠️ Affiliate Disclaimer:</span> FaithVish is a jewelry curation and affiliate marketing website. 
              When you click on product links and make a purchase, we may earn a small commission at no extra cost to you. This helps us keep the site running 
              and continue curating beautiful jewelry for you. Product prices and availability are subject to change. We recommend verifying details on the 
              respective retailer's website before purchasing. All product names, logos, and brands are property of their respective owners.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-text-muted">
              © 2026 FaithVish. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/privacy-policy" className="text-xs text-text-muted hover:text-text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-xs text-text-muted hover:text-text-primary transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
