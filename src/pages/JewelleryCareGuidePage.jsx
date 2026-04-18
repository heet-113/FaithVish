import { Link } from 'react-router-dom';

const JewelleryCareGuidePage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-text-muted mb-6">
        <Link to="/" className="hover:text-text-primary transition-colors">Home</Link>
        <span>/</span>
        <span className="text-text-secondary">Articles</span>
        <span>/</span>
        <span className="text-text-secondary">Jewellery Care Guide</span>
      </nav>

      {/* Hero */}
      <div className="mb-10 text-center py-12 bg-[repeating-linear-gradient(45deg,rgba(217,208,193,0.1)_0px,rgba(217,208,193,0.1)_2px,rgba(250,250,247,0.5)_2px,rgba(250,250,247,0.5)_8px)] border-y-2 border-border">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent-secondary mb-3">Educational Guide</p>
        <h1 className="text-3xl sm:text-4xl font-black mb-4 font-serif uppercase tracking-widest text-text-primary leading-tight">
          How to Care for Your <span className="text-accent">Fashion Jewellery</span>
        </h1>
        <p className="text-text-secondary text-sm max-w-2xl mx-auto mt-4 leading-relaxed">
          Why your plated jewellery turns black, why your rings leave green marks, and exactly what to do about it.
          A practical, no-nonsense care guide for every type of fashion jewellery.
        </p>
        <p className="text-[10px] text-text-muted mt-4 uppercase tracking-wider">
          Written by the FaithVish Team · April 2026 · 8 min read
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
        <p className="text-sm text-text-secondary leading-relaxed">
          This guide is based on material science, manufacturer recommendations, and practical advice from analysing thousands of buyer reviews. 
          We've catalogued the most common complaints about fashion jewellery degradation and traced each to its cause. 
          <strong className="text-text-primary"> No brand has paid us to write any part of this guide.</strong>
        </p>
      </div>

      {/* Article Content */}
      <article className="space-y-10">
        {/* Why Fashion Jewellery Degrades */}
        <section>
          <h2 className="text-xl font-bold font-serif uppercase tracking-widest text-text-primary mb-4 pb-2 border-b border-border">
            Why Fashion Jewellery Degrades — The Science
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed mb-4">
            Before we talk about prevention, let's understand why your ₹300 pendant that looked gorgeous last Diwali now looks like it survived a shipwreck.
            It comes down to three chemical processes:
          </p>
          <div className="space-y-4">
            <div className="bg-white border border-border p-5">
              <h3 className="text-sm font-bold text-text-primary mb-2">1. Oxidation</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                When metal is exposed to oxygen and moisture, it oxidizes. For copper-based jewellery (which includes brass), this produces
                <strong className="text-text-primary"> copper carbonate — the green substance</strong> you see on old copper roofs and, unfortunately, on your skin after wearing
                cheap rings. Sterling silver also oxidizes, but produces a dark patina rather than green marks. Stainless steel and rhodium-plated pieces
                are nearly immune to oxidation, which is why they last significantly longer.
              </p>
            </div>
            <div className="bg-white border border-border p-5">
              <h3 className="text-sm font-bold text-text-primary mb-2">2. Plating Erosion</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Gold or silver plating is a microscopically thin layer (0.5–2 microns) applied over the base metal. For perspective,
                a human hair is about 70 microns thick — so plating is <strong className="text-text-primary">35–140 times thinner than a single hair</strong>. Every point of friction — clasps,
                areas where jewellery touches your desk, the spot where a ring touches adjacent fingers — slowly wears through this
                layer. Once the base metal is exposed, degradation accelerates rapidly.
              </p>
            </div>
            <div className="bg-white border border-border p-5">
              <h3 className="text-sm font-bold text-text-primary mb-2">3. Chemical Attack</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Your skin's natural pH is slightly acidic (around 5.5). Sweat, perfume, soap, hand sanitizer, chlorine in swimming pools,
                and even the detergent on your freshly washed clothes — all contain chemicals that attack plated surfaces. This is why
                jewellery worn during exercise, cooking, or cleaning degrades faster than pieces worn only for events.
                <strong className="text-text-primary"> The #1 chemical enemy of plated jewellery is chlorine</strong> — avoid pools and hot tubs entirely.
              </p>
            </div>
          </div>
        </section>

        {/* Material-by-Material Care */}
        <section>
          <h2 className="text-xl font-bold font-serif uppercase tracking-widest text-text-primary mb-4 pb-2 border-b border-border">
            Material-by-Material Care Instructions
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed mb-4">
            Different materials need different care. Here's a specific guide for every material type you'll find in our collection:
          </p>

          <div className="space-y-4">
            <div className="bg-white border border-border p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 text-xs font-bold bg-green-100 text-green-700 rounded-sm">EASY CARE</span>
                <h3 className="text-sm font-bold text-text-primary">Stainless Steel</h3>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed mb-3">
                The lowest-maintenance material. Products like the Fashion Frill Butterfly Ring and men's bracelet are stainless steel.
              </p>
              <ul className="space-y-1.5 text-sm text-text-secondary">
                <li className="flex items-start gap-2"><span className="text-green-600">✓</span>Can be worn in water (showers, rain) without damage</li>
                <li className="flex items-start gap-2"><span className="text-green-600">✓</span>Clean with soap and water, dry with a soft cloth</li>
                <li className="flex items-start gap-2"><span className="text-green-600">✓</span>Safe for gym, sports, and physical work</li>
                <li className="flex items-start gap-2"><span className="text-red-500">✗</span>Avoid harsh abrasives (steel wool, rough scrubbers) — they'll scratch the surface</li>
                <li className="flex items-start gap-2"><span className="text-red-500">✗</span>Avoid prolonged saltwater exposure (ocean swimming) — while resistant, salt can cause pitting over time</li>
              </ul>
            </div>

            <div className="bg-white border border-border p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 text-xs font-bold bg-yellow-100 text-yellow-700 rounded-sm">MODERATE CARE</span>
                <h3 className="text-sm font-bold text-text-primary">Sterling Silver (925)</h3>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed mb-3">
                Products like Clara's pendant and earrings. Real silver requires more attention but rewards you with years of wear.
              </p>
              <ul className="space-y-1.5 text-sm text-text-secondary">
                <li className="flex items-start gap-2"><span className="text-green-600">✓</span>Store in an airtight bag or box — silver tarnishes from air exposure</li>
                <li className="flex items-start gap-2"><span className="text-green-600">✓</span>Clean with a dedicated silver polishing cloth (available for ₹50–₹100 online)</li>
                <li className="flex items-start gap-2"><span className="text-green-600">✓</span>Wear it regularly — the oils from your skin actually help prevent tarnishing</li>
                <li className="flex items-start gap-2"><span className="text-red-500">✗</span>Never use toothpaste to clean silver (common bad advice) — it's abrasive and creates micro-scratches</li>
                <li className="flex items-start gap-2"><span className="text-red-500">✗</span>Remove before swimming — chlorine causes irreversible darkening of silver</li>
                <li className="flex items-start gap-2"><span className="text-red-500">✗</span>Keep away from rubber bands — rubber contains sulphur which blackens silver</li>
              </ul>
            </div>

            <div className="bg-white border border-border p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 text-xs font-bold bg-orange-100 text-orange-700 rounded-sm">HIGH CARE</span>
                <h3 className="text-sm font-bold text-text-primary">Gold/Silver Plated Metal</h3>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed mb-3">
                The majority of jewellery under ₹500 in our collection. Plated jewellery needs the most careful treatment.
              </p>
              <ul className="space-y-1.5 text-sm text-text-secondary">
                <li className="flex items-start gap-2"><span className="text-green-600">✓</span>Remove BEFORE washing hands, showering, cooking, cleaning, or exercising</li>
                <li className="flex items-start gap-2"><span className="text-green-600">✓</span>Apply all skincare, perfume, and hairspray BEFORE putting on jewellery</li>
                <li className="flex items-start gap-2"><span className="text-green-600">✓</span>Wipe with a soft, dry cloth after every wear — remove skin oils and sweat</li>
                <li className="flex items-start gap-2"><span className="text-green-600">✓</span>Store in individual compartments or pouches — pieces rubbing together strips plating</li>
                <li className="flex items-start gap-2"><span className="text-red-500">✗</span>Never clean with chemical cleaners, alcohol, or vinegar — they destroy thin plating</li>
                <li className="flex items-start gap-2"><span className="text-red-500">✗</span>Don't wear during monsoon season rains without protection — humidity accelerates tarnish</li>
                <li className="flex items-start gap-2"><span className="text-red-500">✗</span>Avoid wearing the same plated piece every single day — rotation extends each piece's life</li>
              </ul>
            </div>

            <div className="bg-white border border-border p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 text-xs font-bold bg-purple-100 text-purple-700 rounded-sm">FRAGILE</span>
                <h3 className="text-sm font-bold text-text-primary">Glass, Bead & Shell Jewellery</h3>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed mb-3">
                Products like the crackle glass bracelets and shell anklet. These need gentle handling.
              </p>
              <ul className="space-y-1.5 text-sm text-text-secondary">
                <li className="flex items-start gap-2"><span className="text-green-600">✓</span>Handle gently — glass cracks on impact with hard surfaces</li>
                <li className="flex items-start gap-2"><span className="text-green-600">✓</span>Store flat to prevent beads from rolling and stretching elastic</li>
                <li className="flex items-start gap-2"><span className="text-green-600">✓</span>Clean by wiping with a slightly damp cloth, then dry immediately</li>
                <li className="flex items-start gap-2"><span className="text-red-500">✗</span>Never submerge in water — it weakens elastic stringing and adhesives holding charms</li>
                <li className="flex items-start gap-2"><span className="text-red-500">✗</span>Don't wear during exercise or physical activity — movement stress loosens beads</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Troubleshooting Common Issues */}
        <section>
          <h2 className="text-xl font-bold font-serif uppercase tracking-widest text-text-primary mb-4 pb-2 border-b border-border">
            Troubleshooting: Common Issues & Fixes
          </h2>
          <div className="space-y-4">
            {[
              {
                problem: 'My ring/bracelet is leaving green marks on my skin',
                cause: 'The base metal (usually copper or brass) is oxidizing against your skin. This happens faster when you sweat or when the plating has worn through.',
                fix: 'Apply a thin layer of clear nail polish to the inside of the ring/bracelet where it touches your skin. This creates a barrier between the copper and your skin. Reapply every 2–3 weeks. Alternatively, upgrade to stainless steel pieces which don\'t cause this.',
              },
              {
                problem: 'My gold-plated necklace/earrings have turned dark/black',
                cause: 'The plating has been chemically attacked, usually by perfume, hand sanitizer, or sweat. Once the plating is compromised, the base metal oxidizes rapidly.',
                fix: 'For early-stage tarnish, gently rub with a soft cloth dampened with a tiny amount of baby oil. For severe blackening, the plating is likely gone — replating is possible at local jewellers (₹100–₹300) or simply replace the piece.',
              },
              {
                problem: 'My earrings are causing itching or redness',
                cause: 'You\'re likely reacting to nickel, a common component in cheap metal alloys. This is a contact allergy affecting 10–20% of the population.',
                fix: 'Switch to hypoallergenic materials: stainless steel, sterling silver (925), or titanium. As a temporary fix, coat earring posts with clear nail polish. If reactions persist with all metals, consult a dermatologist.',
              },
              {
                problem: 'My pendant chain keeps tangling',
                cause: 'Cable chains (the most common type in budget jewellery) are inherently tangle-prone due to their link structure.',
                fix: 'When storing, thread the chain through a drinking straw and clasp the ends together. This prevents tangling. Alternatively, choose box chains (like Clara pendants use) which are structurally tangle-resistant.',
              },
              {
                problem: 'The stones in my ring are falling out',
                cause: 'Budget jewellery typically uses glue or minimal prong settings. Physical activity, temperature changes, and daily wear loosen these over time.',
                fix: 'If a stone is loose but not yet fallen, apply a tiny drop of clear super glue (Fevi Kwik) using a toothpick. For prevention, avoid wearing stone-set rings during hand-intensive activities.',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-border p-5">
                <h3 className="text-sm font-bold text-text-primary mb-2">❓ {item.problem}</h3>
                <p className="text-sm text-text-muted leading-relaxed mb-2"><strong>Cause:</strong> {item.cause}</p>
                <p className="text-sm text-text-secondary leading-relaxed"><strong className="text-green-700">Fix:</strong> {item.fix}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Seasonal Care Calendar */}
        <section>
          <h2 className="text-xl font-bold font-serif uppercase tracking-widest text-text-primary mb-4 pb-2 border-b border-border">
            Seasonal Care for Indian Climate
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed mb-4">
            India's varied climate creates specific challenges for fashion jewellery. Here's a season-by-season guide:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-border p-5">
              <h3 className="text-sm font-bold text-text-primary mb-2">☀️ Summer (Mar–Jun)</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                <strong>Main threat: Sweat.</strong> High temperatures mean more perspiration, which is acidic and attacks plating aggressively.
                Keep plated jewellery minimal during summer or choose stainless steel. Wipe pieces after wearing in heat. Store in cool, dry places away from direct sunlight.
              </p>
            </div>
            <div className="bg-white border border-border p-5">
              <h3 className="text-sm font-bold text-text-primary mb-2">🌧️ Monsoon (Jul–Sep)</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                <strong>Main threat: Humidity.</strong> The moisture in the air itself can cause oxidation even when you're not wearing the jewellery.
                Store all fashion jewellery in airtight containers with silica gel packets during monsoon. Add a chalk piece to your jewellery box — it absorbs moisture.
              </p>
            </div>
            <div className="bg-white border border-border p-5">
              <h3 className="text-sm font-bold text-text-primary mb-2">🍂 Festival Season (Oct–Dec)</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                <strong>Main challenge: Heavy use.</strong> Navratri, Diwali, Dussehra, Christmas, weddings — your jewellery gets maximum wear during this period.
                Buy fresh event pieces at the start of the season. Don't rely on last year's plated pieces that have been sitting in humid storage.
              </p>
            </div>
            <div className="bg-white border border-border p-5">
              <h3 className="text-sm font-bold text-text-primary mb-2">❄️ Winter (Jan–Feb)</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                <strong>Best season for fashion jewellery.</strong> Lower humidity and less sweating mean plating lasts longest during winter.
                This is the ideal time to buy and break in new pieces. Winter is also when dry skin can cause metal friction — apply moisturizer before wearing tight bangles.
              </p>
            </div>
          </div>
        </section>

        {/* Storage */}
        <section>
          <h2 className="text-xl font-bold font-serif uppercase tracking-widest text-text-primary mb-4 pb-2 border-b border-border">
            The Budget Jewellery Storage System
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed mb-4">
            You don't need expensive jewellery boxes. Here's a practical, affordable storage system:
          </p>
          <div className="bg-white border border-border p-5">
            <div className="space-y-4">
              {[
                { item: 'Small zip-lock bags (₹50 for 100 bags)', use: 'One piece per bag. Squeeze out air before sealing. This is the simplest anti-tarnish solution — low air exposure = less oxidation.' },
                { item: 'Silica gel packets (₹100 for 20)', use: 'Toss 2–3 packets into your jewellery drawer or box. Replace every 3 months. These absorb ambient humidity.' },
                { item: 'Chalk sticks (₹30 for a box)', use: 'Place 2–3 chalk sticks near your stored jewellery. Chalk absorbs moisture naturally. Replace when the chalk starts crumbling.' },
                { item: 'Drinking straws', use: 'Thread delicate chains through straws to prevent tangling. Cut straw to necklace length, thread the chain through, and clasp.' },
                { item: 'Egg carton or ice cube tray', use: 'Use the compartments to separate rings, studs, and small pieces. Each compartment holds one item, preventing pieces from rubbing together.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 pb-3 border-b border-border last:border-b-0 last:pb-0">
                  <span className="w-6 h-6 rounded-sm bg-accent/10 text-accent font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <div>
                    <p className="text-sm font-bold text-text-primary">{item.item}</p>
                    <p className="text-xs text-text-secondary mt-1 leading-relaxed">{item.use}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-sm text-text-muted mt-3 italic">
            Total cost for this entire storage system: under ₹200. Will extend the life of your entire jewellery collection.
          </p>
        </section>

        {/* Key Takeaways */}
        <section>
          <h2 className="text-xl font-bold font-serif uppercase tracking-widest text-text-primary mb-4 pb-2 border-b border-border">
            Key Takeaways
          </h2>
          <div className="bg-accent/5 border border-accent/20 p-6">
            <ul className="space-y-3 text-sm text-text-secondary">
              {[
                'Fashion jewellery has a lifespan by design — plan for rotation, not permanence.',
                'The three enemies of plated jewellery are water, chemicals, and friction. Minimise all three.',
                'Stainless steel and sterling silver are the only "buy once" materials in budget jewellery.',
                'Store jewellery in individual airtight containers with moisture-absorbing agents.',
                'Green skin marks aren\'t harmful — they\'re copper oxidation and wipe off easily.',
                'If you have metal allergies, invest in 925 silver or stainless steel — the premium pays for itself.',
                'Clear nail polish on inner surfaces is the most practical hack for extending plated jewellery life.',
                'India\'s monsoon season is the harshest on jewellery — store extra carefully during Jul–Sep.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-accent mt-0.5 shrink-0 font-bold">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </article>

      {/* CTA */}
      <div className="mt-12 text-center bg-white border-2 border-accent/20 p-8">
        <h2 className="text-lg font-bold font-serif uppercase tracking-widest text-text-primary mb-3">Ready to Shop Smarter?</h2>
        <p className="text-sm text-text-secondary mb-6 max-w-lg mx-auto">
          Now you know how to make your jewellery last. Check our buying guide to learn how to choose the right pieces in the first place.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/buying-guide"
            className="px-8 py-3 bg-accent text-white text-sm font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-accent-light transition-all border-2 border-accent"
          >
            Complete Buying Guide →
          </Link>
          <Link
            to="/"
            className="px-8 py-3 bg-white text-text-secondary border-2 border-border text-sm font-bold uppercase tracking-[0.2em] rounded-sm hover:border-accent hover:text-accent transition-all"
          >
            Browse Collection
          </Link>
        </div>
      </div>

      {/* Author & Disclaimer */}
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
          <strong className="text-text-secondary">Disclaimer:</strong> This care guide is based on general material science and manufacturer 
          best practices. Individual results may vary depending on your local climate, skin chemistry, and specific product properties. 
          When in doubt, follow the care instructions provided by the specific product manufacturer.{' '}
          <Link to="/affiliate-disclosure" className="text-accent underline">Affiliate disclosure →</Link>
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

export default JewelleryCareGuidePage;
