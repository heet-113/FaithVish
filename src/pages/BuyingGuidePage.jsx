import { Link } from 'react-router-dom';

const BuyingGuidePage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-text-muted mb-6">
        <Link to="/" className="hover:text-text-primary transition-colors">Home</Link>
        <span>/</span>
        <span className="text-text-secondary">Articles</span>
        <span>/</span>
        <span className="text-text-secondary">Complete Buying Guide</span>
      </nav>

      {/* Hero */}
      <div className="mb-10 text-center py-12 bg-[repeating-linear-gradient(45deg,rgba(217,208,193,0.1)_0px,rgba(217,208,193,0.1)_2px,rgba(250,250,247,0.5)_2px,rgba(250,250,247,0.5)_8px)] border-y-2 border-border">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent-secondary mb-3">In-Depth Guide</p>
        <h1 className="text-3xl sm:text-4xl font-black mb-4 font-serif uppercase tracking-widest text-text-primary leading-tight">
          How to Buy Jewellery <span className="text-accent">Online in India</span>
        </h1>
        <p className="text-text-secondary text-sm max-w-2xl mx-auto mt-4 leading-relaxed">
          Everything you need to know before spending money on fashion jewellery from Amazon, Flipkart, or any online store.
          Materials, red flags, sizing, care tips, and how to avoid common mistakes.
        </p>
        <p className="text-[10px] text-text-muted mt-4 uppercase tracking-wider">
          Written by the FaithVish Team · April 2026 · 10 min read
        </p>
      </div>

      {/* Why Trust Us */}
      <div className="mb-10 bg-gradient-to-r from-accent/5 to-accent-secondary/5 border border-border p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-sm bg-accent/10 border border-accent/30 flex items-center justify-center">
            <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-sm font-bold font-serif uppercase tracking-widest text-text-primary">Why Trust This Guide?</h2>
        </div>
        <p className="text-sm text-text-secondary leading-relaxed mb-3">
          FaithVish is an independent editorial team that curates and reviews jewellery from Amazon India. We earn affiliate commissions when you purchase through our links, but <strong className="text-text-primary">we are not paid by any brand to feature or promote their products</strong>.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
          <div className="bg-white border border-border p-3 text-center">
            <p className="text-lg font-black text-accent">24+</p>
            <p className="text-[10px] text-text-muted uppercase tracking-wider">Products reviewed</p>
          </div>
          <div className="bg-white border border-border p-3 text-center">
            <p className="text-lg font-black text-accent">20,000+</p>
            <p className="text-[10px] text-text-muted uppercase tracking-wider">Buyer reviews analysed</p>
          </div>
          <div className="bg-white border border-border p-3 text-center">
            <p className="text-lg font-black text-accent">₹0</p>
            <p className="text-[10px] text-text-muted uppercase tracking-wider">Paid by brands for listings</p>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="mb-10 bg-white border border-border p-6">
        <h2 className="text-sm font-bold font-serif uppercase tracking-widest text-text-primary mb-4 pb-2 border-b border-border">Table of Contents</h2>
        <ol className="space-y-2 text-sm">
          {[
            'Understanding Jewellery Materials',
            'Gold Plating: What It Really Means',
            'How to Read Amazon Jewellery Ratings',
            'Ring Sizing: Getting It Right Online',
            'Bangle Sizing: The Indian System',
            'Red Flags When Shopping Online',
            'How to Make Budget Jewellery Last Longer',
            'When to Spend More vs. Save',
            'Common Buyer Mistakes to Avoid',
            'Our Recommendation Framework',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-sm bg-accent/10 text-accent font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
              <a href={`#section-${i + 1}`} className="text-text-secondary hover:text-accent transition-colors">{item}</a>
            </li>
          ))}
        </ol>
      </div>

      {/* Article Content */}
      <article className="space-y-10">
        {/* Section 1 */}
        <section id="section-1">
          <h2 className="text-xl font-bold font-serif uppercase tracking-widest text-text-primary mb-4 pb-2 border-b border-border">
            1. Understanding Jewellery Materials
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed mb-4">
            The single most important factor in any jewellery purchase — online or offline — is the <strong className="text-text-primary">base material</strong>.
            It determines how long the piece lasts, how it feels on your skin, whether it causes allergic reactions, and how it looks after a month of wear.
            Here's a breakdown of every material you'll encounter on Amazon India, ranked from most to least durable:
          </p>
          <div className="space-y-4">
            <div className="bg-white border border-border p-5">
              <h3 className="text-sm font-bold text-text-primary mb-2">925 Sterling Silver</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                The gold standard of online jewellery (ironic, yes). Sterling silver is 92.5% pure silver mixed with 7.5% copper for
                strength. It's a genuine precious metal — it has weight, substance, and a distinctive feel against skin. Look for BIS hallmark
                certification. Brands like Clara use this. Budget: ₹1,500–₹3,000 for a single piece. Lifespan: years, with minimal care.
                Tarnishing happens naturally but is easily reversed with a silver polishing cloth.
              </p>
            </div>
            <div className="bg-white border border-border p-5">
              <h3 className="text-sm font-bold text-text-primary mb-2">Stainless Steel</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                The most underrated material in fashion jewellery. Stainless steel doesn't rust, doesn't corrode, doesn't tarnish,
                and is hypoallergenic. It's the same material used in quality watches and surgical instruments. If you want
                something that survives gym, rain, and daily rough use — stainless steel is your answer. Budget: ₹150–₹400.
                Lifespan: essentially indefinite for the base metal. Found in brands like Fashion Frill (rings, bracelets).
              </p>
            </div>
            <div className="bg-white border border-border p-5">
              <h3 className="text-sm font-bold text-text-primary mb-2">Brass</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                A copper-zinc alloy that's the backbone of most mid-range Indian fashion jewellery. Brass has a warm tone,
                decent weight, and holds plating better than lighter alloys. The downside: brass can turn your skin green
                (copper oxidation) in humid conditions. If you live in a coastal or humid city, keep this in mind.
                Budget: ₹200–₹600. Lifespan: 3–12 months depending on plating quality and care.
              </p>
            </div>
            <div className="bg-white border border-border p-5">
              <h3 className="text-sm font-bold text-text-primary mb-2">"Metal" / "Alloy" (Unspecified)</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                The vaguest listing you'll encounter — and the most common. When a listing says just "Metal" or "Alloy" without
                specifying what kind, it usually means pot metal, zinc alloy, or the cheapest base available. This isn't
                necessarily terrible — at ₹150–₹300, you get what you pay for. But set expectations: 1–4 months of wear
                before visible degradation. Best for one-time event use. Avoid if you have metal allergies.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section id="section-2">
          <h2 className="text-xl font-bold font-serif uppercase tracking-widest text-text-primary mb-4 pb-2 border-b border-border">
            2. Gold Plating: What It Really Means
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed mb-4">
            Almost every "gold" piece you see on Amazon under ₹5,000 is <strong className="text-text-primary">gold plated</strong>, not real gold.
            Understanding the differences saves you from disappointment:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="bg-white border border-border p-5">
              <h3 className="text-sm font-bold text-text-primary mb-2">Standard Gold Plating</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                A very thin layer (0.5–1 micron) of gold applied electrically over base metal.
                Looks great initially. Fades within 1–3 months of daily wear. Most pieces under ₹500 use this.
                <strong className="text-text-primary"> Fine for events. Not for daily wear.</strong>
              </p>
            </div>
            <div className="bg-white border border-border p-5">
              <h3 className="text-sm font-bold text-text-primary mb-2">One Gram Gold</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                A traditional Indian technique where a thicker gold layer is applied over copper or brass.
                'One gram' refers to approximately 1 gram of gold used in plating. More durable than standard plating.
                Common in South Indian and traditional designs. Lifespan: 4–12 months.
                <strong className="text-text-primary"> Good middle-ground for regular occasion wear.</strong>
              </p>
            </div>
            <div className="bg-white border border-border p-5">
              <h3 className="text-sm font-bold text-text-primary mb-2">Rhodium Plating</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Rhodium is a precious metal in the platinum family. It's the hardest, most scratch-resistant plating
                available. Creates a bright, white, reflective finish. Used on real white gold jewellery — finding it
                on fashion jewellery at ₹300+ is excellent value. Lifespan: 12–24 months.
                <strong className="text-text-primary"> The best plating you can find in this price range.</strong>
              </p>
            </div>
            <div className="bg-white border border-border p-5">
              <h3 className="text-sm font-bold text-text-primary mb-2">Platinum Plating</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Similar to rhodium but slightly different colour tone — cooler and more silvery. Clara uses
                2-micron platinum plating, which is thicker than standard. Creates a premium, white-toned finish.
                Lifespan: 12–18 months with care.
                <strong className="text-text-primary"> Premium option found on higher-priced fashion jewellery.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section id="section-3">
          <h2 className="text-xl font-bold font-serif uppercase tracking-widest text-text-primary mb-4 pb-2 border-b border-border">
            3. How to Read Amazon Jewellery Ratings
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed mb-4">
            Not all 4-star ratings are created equal. Here's how to actually interpret what you see on Amazon:
          </p>
          <div className="space-y-4">
            <div className="bg-white border border-border p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 text-xs font-bold bg-green-100 text-green-700 rounded-sm">HIGH CONFIDENCE</span>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                <strong className="text-text-primary">500+ reviews with 4.0+ stars:</strong> This is the sweet spot. With 500+ reviews, the rating
                is statistically reliable. You can trust the average. Examples in our collection: ZENEME pendant (521 reviews, 4.2 stars),
                Fashion Frill men's bracelet (603 reviews, 4.1 stars).
              </p>
            </div>
            <div className="bg-white border border-border p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 text-xs font-bold bg-yellow-100 text-yellow-700 rounded-sm">MODERATE CONFIDENCE</span>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                <strong className="text-text-primary">50–500 reviews with 3.8+ stars:</strong> Reasonably trustworthy. The product has been
                tested by enough people to identify major issues. Minor inconsistencies are possible but unlikely to be systematic.
                Most of our recommended products fall here.
              </p>
            </div>
            <div className="bg-white border border-border p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 text-xs font-bold bg-orange-100 text-orange-700 rounded-sm">LOW CONFIDENCE</span>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                <strong className="text-text-primary">Under 50 reviews:</strong> Treat ratings as directional, not definitive. A 4.8 rating from 14
                reviews could be genuinely great — or it could moderate to 3.5 as more buyers weigh in. We flag these products clearly.
              </p>
            </div>
            <div className="bg-white border border-border p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 text-xs font-bold bg-red-100 text-red-700 rounded-sm">PROCEED WITH CAUTION</span>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                <strong className="text-text-primary">0 reviews:</strong> Completely untested by the public. You're relying solely on the listing
                description, product photos, and brand reputation. Not necessarily bad — but you're an early adopter with no safety net.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section id="section-4">
          <h2 className="text-xl font-bold font-serif uppercase tracking-widest text-text-primary mb-4 pb-2 border-b border-border">
            4. Ring Sizing: Getting It Right Online
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed mb-4">
            The #1 reason for ring returns is wrong sizing. Here's how to avoid it:
          </p>
          <div className="bg-white border border-border p-5 mb-4">
            <h3 className="text-sm font-bold text-text-primary mb-3">Option 1: Buy Adjustable (Recommended)</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              For fashion jewellery under ₹1,000, always prefer adjustable rings. All three budget rings in our collection
              (YouBella, Fashion Frill, Clara set) are adjustable — this is intentional. Adjustable bands eliminate sizing
              guesswork entirely. The only downside: some adjustable rings can feel slightly less snug than fixed-size rings.
            </p>
          </div>
          <div className="bg-white border border-border p-5">
            <h3 className="text-sm font-bold text-text-primary mb-3">Option 2: Measure at Home</h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-3">
              Wrap a thin strip of paper around the base of the finger you'll wear the ring on. Mark where the paper overlaps.
              Measure the length in millimetres. Use this conversion:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {[
                { mm: '48.7mm', size: 'Size 5 (US)' },
                { mm: '50.0mm', size: 'Size 5.5' },
                { mm: '51.3mm', size: 'Size 6' },
                { mm: '52.5mm', size: 'Size 6.5' },
                { mm: '53.8mm', size: 'Size 7' },
                { mm: '55.1mm', size: 'Size 7.5' },
                { mm: '56.3mm', size: 'Size 8' },
                { mm: '57.6mm', size: 'Size 8.5' },
              ].map((s, i) => (
                <div key={i} className="bg-surface border border-border p-2 text-center">
                  <p className="font-bold text-text-primary">{s.mm}</p>
                  <p className="text-text-muted">{s.size}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section id="section-5">
          <h2 className="text-xl font-bold font-serif uppercase tracking-widest text-text-primary mb-4 pb-2 border-b border-border">
            5. Bangle Sizing: The Indian System
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed mb-4">
            Indian bangles use a unique sizing system measured in <strong className="text-text-primary">internal diameter</strong>:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-border p-5 text-center">
              <p className="text-2xl font-black text-accent mb-1">2.4</p>
              <p className="text-xs text-text-muted uppercase tracking-wider mb-2">Small / Petite</p>
              <p className="text-xs text-text-secondary">Internal diameter: 60mm. Fits slender wrists. Difficult to find online — YouBella offers this size.</p>
            </div>
            <div className="bg-white border border-border p-5 text-center border-2 border-accent">
              <p className="text-2xl font-black text-accent mb-1">2.6</p>
              <p className="text-xs font-bold text-accent uppercase tracking-wider mb-2">Most Common</p>
              <p className="text-xs text-text-secondary">Internal diameter: 65mm. The standard Indian bangle size. Most online bangles default to this.</p>
            </div>
            <div className="bg-white border border-border p-5 text-center">
              <p className="text-2xl font-black text-accent mb-1">2.8</p>
              <p className="text-xs text-text-muted uppercase tracking-wider mb-2">Large</p>
              <p className="text-xs text-text-secondary">Internal diameter: 70mm. For wider wrists. Less common online. Check local stores for better options.</p>
            </div>
          </div>
          <p className="text-sm text-text-secondary leading-relaxed mt-4">
            <strong className="text-text-primary">Pro tip:</strong> If you're between sizes, always go one size up. A slightly loose bangle is wearable 
            — a too-tight bangle is not. Bangles can't be adjusted after purchase.
          </p>
        </section>

        {/* Section 6 */}
        <section id="section-6">
          <h2 className="text-xl font-bold font-serif uppercase tracking-widest text-text-primary mb-4 pb-2 border-b border-border">
            6. Red Flags When Shopping Online
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed mb-4">
            After analysing hundreds of jewellery listings, here are the warning signs we look for:
          </p>
          <div className="space-y-3">
            {[
              { flag: '"90% off MRP" claims', detail: 'If a product\'s MRP is listed as ₹1,999 and selling at ₹199, the MRP is almost certainly inflated. No genuine ₹2,000 product sells for ₹200 at a profit. Judge the product by its selling price, not the discount percentage.' },
              { flag: 'No material specification', detail: 'A listing that says just "metal" without specifying brass, stainless steel, alloy, or silver is hiding something. Reputable brands name their materials because it\'s a selling point.' },
              { flag: 'Stock photos that look too good', detail: 'If every product photo is studio-lit with professional modelling and there are zero buyer photos in reviews, be cautious. The gap between studio photos and reality can be significant in budget jewellery.' },
              { flag: 'Zero reviews on a "Best Seller" tag', detail: 'Amazon\'s "Best Seller" tag in narrow sub-categories can be misleading. A product can be a "best seller" in a very niche category with minimal sales. Always check actual review counts.' },
              { flag: 'No brand name or unknown brand', detail: 'Brands like YouBella, Shining Diva, Clara, and Sukkhi have thousands of products and millions of reviews across their range. An unbranded listing has no reputation to protect.' },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-border p-5">
                <h3 className="text-sm font-bold text-red-600 mb-2">🚩 {item.flag}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 7 */}
        <section id="section-7">
          <h2 className="text-xl font-bold font-serif uppercase tracking-widest text-text-primary mb-4 pb-2 border-b border-border">
            7. How to Make Budget Jewellery Last Longer
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed mb-4">
            Even a ₹200 ring can last 6+ months if you follow these rules:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { rule: 'Remove before contact with water', detail: 'Showers, dishes, swimming, hand-washing — water (especially soapy water) is the #1 enemy of plated jewellery. The chemicals in soap and chlorine attack plating directly.' },
              { rule: 'Apply perfume BEFORE wearing jewellery', detail: 'Spray perfume, deodorant, and body mist first. Wait 30 seconds for it to dry. Then put on your jewellery. Alcohol in fragrances strips plating.' },
              { rule: 'Store each piece separately', detail: 'Jewellery pieces rubbing against each other causes friction that wears plating. Use a compartmented box, individual pouches, or even small zip-lock bags.' },
              { rule: 'Wipe after every use', detail: 'Your skin\'s natural oils and sweat are acidic. A quick wipe with a soft cloth after removing jewellery removes these corrosive agents before they damage the piece.' },
              { rule: 'Keep away from sunlight when stored', detail: 'Direct sunlight for extended periods can discolour certain plating and cause CZ stones to develop a yellowish tint over time.' },
              { rule: 'Last on, first off', detail: 'Jewellery should be the last thing you put on when getting dressed and the first thing you remove when getting home. Minimise exposure time.' },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-border p-5">
                <h3 className="text-sm font-bold text-text-primary mb-2">✓ {item.rule}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 8 */}
        <section id="section-8">
          <h2 className="text-xl font-bold font-serif uppercase tracking-widest text-text-primary mb-4 pb-2 border-b border-border">
            8. When to Spend More vs. Save
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-green-50 border border-green-200 p-5">
              <h3 className="text-sm font-bold text-green-800 mb-3">💰 Save (Under ₹300)</h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex items-start gap-2"><span className="text-green-600 mt-0.5">→</span>Party and event-specific pieces</li>
                <li className="flex items-start gap-2"><span className="text-green-600 mt-0.5">→</span>Trendy designs that may go out of style</li>
                <li className="flex items-start gap-2"><span className="text-green-600 mt-0.5">→</span>Vacation and travel jewellery</li>
                <li className="flex items-start gap-2"><span className="text-green-600 mt-0.5">→</span>Anklets and seasonal accessories</li>
                <li className="flex items-start gap-2"><span className="text-green-600 mt-0.5">→</span>Gifting where presentation matters more than longevity</li>
              </ul>
            </div>
            <div className="bg-accent/5 border border-accent/20 p-5">
              <h3 className="text-sm font-bold text-accent mb-3">💎 Spend More (₹1,000+)</h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex items-start gap-2"><span className="text-accent mt-0.5">→</span>Daily-wear signature pieces</li>
                <li className="flex items-start gap-2"><span className="text-accent mt-0.5">→</span>Gifts for someone special (anniversaries, proposals)</li>
                <li className="flex items-start gap-2"><span className="text-accent mt-0.5">→</span>Sterling silver pieces that will age gracefully</li>
                <li className="flex items-start gap-2"><span className="text-accent mt-0.5">→</span>Pieces you want to wear to work every day</li>
                <li className="flex items-start gap-2"><span className="text-accent mt-0.5">→</span>Timeless designs (solitaires, studs, simple chains)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 9 */}
        <section id="section-9">
          <h2 className="text-xl font-bold font-serif uppercase tracking-widest text-text-primary mb-4 pb-2 border-b border-border">
            9. Common Buyer Mistakes to Avoid
          </h2>
          <div className="space-y-4">
            {[
              { mistake: 'Buying based on discount percentage', lesson: 'A "90% off" product isn\'t 90% off. The MRP is inflated. Judge the selling price against what you\'d expect to pay for the materials and design.' },
              { mistake: 'Ignoring review count', lesson: 'A 4.8-star product with 5 reviews is NOT better than a 4.0-star product with 2,000 reviews. The latter is statistically proven. The former could change dramatically with the next 100 buyers.' },
              { mistake: 'Expecting fashion jewellery to last like real jewellery', lesson: 'A ₹200 ring isn\'t built to last 5 years. Expecting that will only lead to disappointment. Budget jewellery is seasonal and rotational by design.' },
              { mistake: 'Not checking return policies before buying', lesson: 'Return windows vary by seller. Some offer 30 days, some offer 10, some offer none. Check BEFORE buying, especially for items where sizing is a concern.' },
              { mistake: 'Buying the "cheapest" option at all costs', lesson: 'Sometimes spending ₹350 on stainless steel saves you from buying three ₹150 alloy pieces that each die within a month. Per-month cost matters more than per-unit cost.' },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-border p-5">
                <h3 className="text-sm font-bold text-text-primary mb-2">❌ {item.mistake}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">✅ <em>{item.lesson}</em></p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 10 */}
        <section id="section-10">
          <h2 className="text-xl font-bold font-serif uppercase tracking-widest text-text-primary mb-4 pb-2 border-b border-border">
            10. Our Recommendation Framework
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed mb-4">
            Every product on FaithVish is evaluated using this framework:
          </p>
          <div className="bg-white border border-border p-6">
            <div className="space-y-4">
              {[
                { criterion: 'Material Quality', weight: '30%', detail: 'Sterling silver and stainless steel rank highest. Specified brass ranks above unspecified alloy. Transparent material declarations beat vague "metal" listings.' },
                { criterion: 'Buyer Validation', weight: '25%', detail: 'Review count and star rating together. 500+ reviews at 4.0+ is our gold standard. Zero reviews receive explicit flags and caveated recommendations.' },
                { criterion: 'Value for Money', weight: '20%', detail: 'Not just the lowest price — the best quality-to-price ratio. A ₹350 stainless steel bracelet can be better value than a ₹150 alloy one.' },
                { criterion: 'Design & Versatility', weight: '15%', detail: 'How many occasions and outfits the piece works with. Versatile pieces rank higher than narrow-occasion items.' },
                { criterion: 'Brand Track Record', weight: '10%', detail: 'The brand\'s history across their full product range on Amazon. A strong brand provides quality assurance even for new listings.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 pb-4 border-b border-border last:border-b-0 last:pb-0">
                  <span className="px-2 py-1 text-xs font-bold bg-accent/10 text-accent rounded-sm shrink-0">{item.weight}</span>
                  <div>
                    <h3 className="text-sm font-bold text-text-primary">{item.criterion}</h3>
                    <p className="text-xs text-text-secondary mt-1 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </article>

      {/* CTA Section */}
      <div className="mt-12 text-center bg-white border-2 border-accent/20 p-8">
        <h2 className="text-lg font-bold font-serif uppercase tracking-widest text-text-primary mb-3">Ready to Shop?</h2>
        <p className="text-sm text-text-secondary mb-6 max-w-lg mx-auto">
          Now that you know how to evaluate online jewellery, browse our curated collection — every product has detailed reviews, pros & cons, and honest recommendations.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="px-8 py-3 bg-accent text-white text-sm font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-accent-light transition-all border-2 border-accent"
          >
            Browse Collection →
          </Link>
          <Link
            to="/top-rings-under-1000"
            className="px-8 py-3 bg-white text-text-secondary border-2 border-border text-sm font-bold uppercase tracking-[0.2em] rounded-sm hover:border-accent hover:text-accent transition-all"
          >
            Best Rings Under ₹1,000
          </Link>
        </div>
      </div>

      {/* Author & Affiliate Disclaimer */}
      <div className="mt-8 bg-surface border border-border p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
            <span className="text-sm font-bold text-accent">FV</span>
          </div>
          <div>
            <p className="text-xs font-bold text-text-primary">Written by the FaithVish Editorial Team</p>
            <p className="text-[10px] text-text-muted">Last updated: April 2026 · contact@faithvish.com</p>
          </div>
        </div>
        <p className="text-[10px] text-text-muted leading-relaxed mt-2">
          <strong className="text-text-secondary">Affiliate Disclosure:</strong> FaithVish is a participant in the Amazon Services LLC Associates Program.
          Links across our site are affiliate links — we may earn a small commission when you buy through them. This costs you nothing extra. Our editorial
          analysis is independent and not influenced by commission rates.{' '}
          <Link to="/affiliate-disclosure" className="text-accent underline">Full disclosure →</Link>
        </p>
      </div>

      {/* Back button */}
      <div className="text-center mt-10 mb-8">
        <Link
          to="/"
          className="px-8 py-3 text-sm font-bold uppercase tracking-widest text-text-secondary bg-white border-2 border-border rounded-sm hover:border-text-primary hover:text-text-primary transition-all"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default BuyingGuidePage;
