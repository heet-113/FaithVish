import { Link } from 'react-router-dom';

const AffiliateDisclosurePage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-text-muted mb-6">
        <Link to="/" className="hover:text-text-primary transition-colors">Home</Link>
        <span>/</span>
        <span className="text-text-secondary">Affiliate Disclosure</span>
      </nav>

      <h1 className="text-3xl font-black text-text-primary mb-2 font-serif uppercase tracking-widest">Affiliate Disclosure</h1>
      <div className="w-16 h-[3px] bg-accent mb-6"></div>

      <div className="prose max-w-none text-text-muted space-y-6">
        <p><strong className="text-text-primary">Last Updated:</strong> April 2026</p>

        <div className="bg-accent/5 border-l-4 border-accent p-5 my-6">
          <p className="text-sm text-text-secondary leading-relaxed font-medium">
            <strong className="text-text-primary">In plain language:</strong> FaithVish earns money when you click our product links and buy something on Amazon.
            This costs you absolutely nothing extra. We only recommend products we genuinely believe are worth your money,
            and we clearly disclose this relationship on every page.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4 font-serif uppercase tracking-wider">What Are Affiliate Links?</h2>
        <p>
          Throughout this website, you'll find links to products on Amazon India and other retail platforms.
          These are special tracking links called "affiliate links." When you click on one of these links and make a purchase
          on the retailer's website, FaithVish may receive a small referral commission from the retailer.
        </p>
        <p>
          <strong className="text-text-primary">This commission comes from the retailer, not from you.</strong> The price you pay is exactly the same
          whether you use our link or go directly to the retailer's website. Affiliate marketing is a standard online business model
          used by most product review and recommendation websites.
        </p>

        <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4 font-serif uppercase tracking-wider">Affiliate Programs We Participate In</h2>
        {/* <div className="bg-white border border-border p-5 my-4">
          <h3 className="text-sm font-bold text-text-primary mb-3 uppercase tracking-wider">Amazon Associates Program</h3>
          <p className="text-sm leading-relaxed">
            FaithVish is a participant in the <strong>Amazon Services LLC Associates Program</strong>, an affiliate advertising program
            designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.in.
          </p>
          <p className="text-sm leading-relaxed mt-2">
            As an Amazon Associate, FaithVish earns from qualifying purchases. Amazon, the Amazon logo, and all related marks
            are trademarks of Amazon.com, Inc. or its affiliates.
          </p>
        </div> */}
        <div className="bg-white border border-border p-5 my-4">
          <h3 className="text-sm font-bold text-text-primary mb-3 uppercase tracking-wider">Cuelinks</h3>
          <p className="text-sm leading-relaxed">
            We also use Cuelinks, an affiliate network that automatically converts eligible product links into affiliate links.
            This may apply to links pointing to platforms beyond Amazon, including other e-commerce websites.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4 font-serif uppercase tracking-wider">How This Affects Our Content</h2>
        <p>
          Our product recommendations, reviews, and rankings are based on the following real, publicly available data:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Amazon buyer ratings</strong> — the star ratings given by verified purchasers</li>
          <li><strong>Review volume</strong> — the number of buyer reviews, indicating how well-tested a product is</li>
          <li><strong>Product specifications</strong> — materials, construction, and features as listed by the seller</li>
          <li><strong>Price and value</strong> — what you get relative to what you pay</li>
          <li><strong>Our editorial analysis</strong> — based on the above data points, not hands-on testing</li>
        </ul>
        <p className="font-semibold text-text-primary mt-4">
          We do not accept payment from any brand, seller, or manufacturer to feature, rank, or positively review their products.
          Commission rates do not influence which products we recommend or how we rank them.
        </p>

        <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4 font-serif uppercase tracking-wider">What We Don't Do</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>We <strong>do not</strong> physically test or handle the products we review. Our reviews are editorial, based on available data.</li>
          <li>We <strong>do not</strong> sell any products directly. All purchases happen on the retailer's website.</li>
          <li>We <strong>do not</strong> guarantee product quality, pricing accuracy, or availability. These change on the retailer's end.</li>
          <li>We <strong>do not</strong> accept sponsored placements or paid rankings.</li>
        </ul>

        <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4 font-serif uppercase tracking-wider">Your Trust Matters</h2>
        <p>
          FaithVish exists to help you make informed jewellery buying decisions. Our business model only works if you trust our recommendations.
          That's why we:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Include honest pros <em>and</em> cons for every product — we don't hide negatives</li>
          <li>Show real buyer ratings and review counts from Amazon</li>
          <li>Flag products with low ratings or limited reviews</li>
          <li>Clearly label all outbound links as leading to the retailer's website</li>
          <li>Display this affiliate disclosure prominently across the site</li>
        </ul>

        <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4 font-serif uppercase tracking-wider">Questions?</h2>
        <p>
          If you have any questions about our affiliate relationships or how we make money, feel free to reach out:
        </p>
        <p>
          <Link to="/contact" className="text-accent underline font-medium hover:text-accent-light transition-colors">
            Contact Us →
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AffiliateDisclosurePage;
