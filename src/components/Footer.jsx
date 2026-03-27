import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-surface-light border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-sm bg-accent flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <span className="text-xl font-black text-accent font-serif tracking-tight">PriceWise</span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              Compare prices across India's top e-commerce platforms. Find the best deals and save money on every purchase.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5">
              <li><Link to="/" className="text-sm text-text-muted hover:text-text-primary transition-colors">Home</Link></li>
              <li><Link to="/categories" className="text-sm text-text-muted hover:text-text-primary transition-colors">Categories</Link></li>
              <li><a href="#" className="text-sm text-text-muted hover:text-text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="text-sm text-text-muted hover:text-text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Platforms */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">Platforms</h3>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm text-amazon hover:text-amazon-dark transition-colors">Amazon</a></li>
              <li><a href="#" className="text-sm text-flipkart hover:text-flipkart-dark transition-colors">Flipkart</a></li>
              <li><a href="#" className="text-sm text-myntra hover:text-myntra-dark transition-colors">Myntra</a></li>
              <li><a href="#" className="text-sm text-[#FC2779] hover:opacity-80 transition-opacity">Nykaa</a></li>
              <li><a href="#" className="text-sm text-[#2C4152] hover:opacity-80 transition-opacity">Ajio</a></li>
              <li><a href="#" className="text-sm text-[#212121] hover:opacity-80 transition-opacity">Tata CliQ</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">Categories</h3>
            <ul className="space-y-2.5">
              <li><Link to="/" className="text-sm text-text-muted hover:text-text-primary transition-colors">Electronics</Link></li>
              <li><Link to="/" className="text-sm text-text-muted hover:text-text-primary transition-colors">Footwear</Link></li>
              <li><Link to="/" className="text-sm text-text-muted hover:text-text-primary transition-colors">Clothing</Link></li>
              <li><Link to="/" className="text-sm text-text-muted hover:text-text-primary transition-colors">Home & Kitchen</Link></li>
              <li><Link to="/" className="text-sm text-text-muted hover:text-text-primary transition-colors">Beauty</Link></li>
              <li><Link to="/" className="text-sm text-text-muted hover:text-text-primary transition-colors">Books</Link></li>
            </ul>
          </div>
        </div>

        {/* Affiliate Disclaimer */}
        <div className="py-4 border-t border-border">
          <div className="bg-white border-2 border-border rounded-sm p-4 mb-4">
            <p className="text-xs text-text-muted leading-relaxed">
              <span className="font-semibold text-warning">⚠️ Affiliate Disclaimer:</span> PriceWise is a price comparison platform. 
              We may earn affiliate commissions when you make purchases through our links. This does not affect the prices you pay. 
              Product prices and availability are subject to change. We strive to keep information accurate but recommend verifying 
              prices on the respective platforms before purchasing. All product names, logos, and brands are property of their 
              respective owners.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-text-muted">
              © 2026 PriceWise. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-xs text-text-muted hover:text-text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="text-xs text-text-muted hover:text-text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
