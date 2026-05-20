import { Link } from 'react-router-dom';
import useStore from '../store/useStore';

const JewelleryCareGuidePage = () => {
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
    surfaceBg: isMen ? m.surface : 'var(--color-surface-light)',
    borderStyle: isMen ? `1px solid ${m.border}` : '1px solid var(--color-border)',
    alertBg: isMen ? 'rgba(201, 169, 110, 0.05)' : 'rgba(var(--color-accent-rgb), 0.05)',
  };

  const getBadgeStyle = (type) => {
    if (isMen) {
      switch (type) {
        case 'easy': return { backgroundColor: 'rgba(46, 125, 50, 0.2)', color: '#81C784' };
        case 'moderate': return { backgroundColor: 'rgba(245, 158, 11, 0.2)', color: '#FCD34D' };
        case 'high': return { backgroundColor: 'rgba(249, 115, 22, 0.2)', color: '#FFB74D' };
        case 'fragile': return { backgroundColor: 'rgba(168, 85, 247, 0.2)', color: '#D8B4FE' };
        default: return {};
      }
    } else {
      switch (type) {
        case 'easy': return { backgroundColor: '#DCFCE7', color: '#15803D' };
        case 'moderate': return { backgroundColor: '#FEF9C3', color: '#A16207' };
        case 'high': return { backgroundColor: '#FFEDD5', color: '#C2410C' };
        case 'fragile': return { backgroundColor: '#F3E8FF', color: '#7E22CE' };
        default: return {};
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8" style={{ color: theme.textSecondary }}>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-6" style={{ color: theme.textMuted }}>
        <Link to="/" className="transition-colors" style={{ color: theme.textMuted }} onMouseEnter={(e) => e.target.style.color = theme.textPrimary} onMouseLeave={(e) => e.target.style.color = theme.textMuted}>Home</Link>
        <span>/</span>
        <span style={{ color: theme.textSecondary }}>Articles</span>
        <span>/</span>
        <span style={{ color: theme.textSecondary }}>Jewellery Care Guide</span>
      </nav>

      {/* Hero */}
      <div 
        className="mb-10 text-center py-12 border-y-2"
        style={{
          borderColor: theme.cardBorder,
          backgroundImage: isMen
            ? 'repeating-linear-gradient(45deg, rgba(201, 169, 110, 0.03) 0px, rgba(201, 169, 110, 0.03) 2px, rgba(40, 40, 40, 0.4) 2px, rgba(40, 40, 40, 0.4) 8px)'
            : 'repeating-linear-gradient(45deg, rgba(217,208,193,0.1) 0px, rgba(217,208,193,0.1) 2px, rgba(250,250,247,0.5) 2px, rgba(250,250,247,0.5) 8px)'
        }}
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] mb-3" style={{ color: theme.accent }}>Educational Guide</p>
        <h1 className="text-3xl sm:text-4xl font-black mb-4 font-serif uppercase tracking-widest leading-tight" style={{ color: theme.textPrimary }}>
          {isMen ? <>How to Care for Men's <span style={{ color: theme.accent }}>Accessories</span></> : <>How to Care for Your <span style={{ color: theme.accent }}>Fashion Jewellery</span></>}
        </h1>
        <p className="text-sm max-w-2xl mx-auto mt-4 leading-relaxed" style={{ color: theme.textSecondary }}>
          {isMen 
            ? "Why your kadas turn green, why your steel chains get scratched, and exactly what to do about it. A practical, no-nonsense care guide for men's rings, chains, kadas, and bracelets."
            : "Why your plated jewellery turns black, why your rings leave green marks, and exactly what to do about it. A practical, no-nonsense care guide for every type of fashion jewellery."}
        </p>
        <p className="text-[10px] mt-4 uppercase tracking-wider" style={{ color: theme.textMuted }}>
          Written by the FaithVish Team · April 2026 · {isMen ? '6 min read' : '8 min read'}
        </p>
      </div>

      {/* Why Trust Us */}
      <div 
        className="mb-10 border p-6"
        style={{ 
          backgroundColor: isMen ? 'rgba(201, 169, 110, 0.03)' : 'rgba(var(--color-accent-rgb), 0.02)',
          borderColor: theme.cardBorder
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div 
            className="w-10 h-10 rounded-sm border flex items-center justify-center"
            style={{
              backgroundColor: isMen ? 'rgba(201, 169, 110, 0.1)' : 'rgba(var(--color-accent-rgb), 0.1)',
              borderColor: isMen ? 'rgba(201, 169, 110, 0.3)' : 'rgba(var(--color-accent-rgb), 0.3)',
            }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: theme.accent }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-sm font-bold font-serif uppercase tracking-widest" style={{ color: theme.textPrimary }}>Why Trust This Guide?</h2>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
          This guide is based on material science, manufacturer recommendations, and practical advice from analysing thousands of buyer reviews. 
          We've catalogued the most common complaints about fashion jewellery degradation and traced each to its cause. 
          <strong style={{ color: theme.textPrimary }}> No brand has paid us to write any part of this guide.</strong>
        </p>
      </div>

      {/* Article Content */}
      <article className="space-y-10">
        {/* Why Fashion Jewellery Degrades */}
        <section>
          <h2 
            className="text-xl font-bold font-serif uppercase tracking-widest mb-4 pb-2 border-b"
            style={{ color: theme.textPrimary, borderColor: theme.cardBorder }}
          >
            {isMen ? "Why Men's Accessories Degrade — The Science" : "Why Fashion Jewellery Degrades — The Science"}
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: theme.textSecondary }}>
            Before we talk about prevention, let's understand why a piece that looked gorgeous initially now looks like it survived a shipwreck.
            It comes down to three chemical processes:
          </p>
          <div className="space-y-4">
            <div className="border p-5" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
              <h3 className="text-sm font-bold mb-2" style={{ color: theme.textPrimary }}>1. Oxidation</h3>
              <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                {isMen ? (
                  "When metal is exposed to oxygen and moisture, it oxidizes. For copper-based kadas or cuffs, this produces copper carbonate — the green substance you see on your skin after wearing cheap base-alloy bracelets. Sterling silver also oxidizes, but produces a dark vintage patina rather than green marks. Stainless steel and rhodium-plated chains are nearly immune to oxidation, which is why they last significantly longer."
                ) : (
                  "When metal is exposed to oxygen and moisture, it oxidizes. For copper-based jewellery (which includes brass), this produces copper carbonate — the green substance you see on old copper roofs and, unfortunately, on your skin after wearing cheap rings. Sterling silver also oxidizes, but produces a dark patina rather than green marks. Stainless steel and rhodium-plated pieces are nearly immune to oxidation, which is why they last significantly longer."
                )}
              </p>
            </div>
            <div className="border p-5" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
              <h3 className="text-sm font-bold mb-2" style={{ color: theme.textPrimary }}>2. Plating Erosion</h3>
              <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                {isMen ? (
                  "Gold or silver plating is a microscopically thin layer (0.5–2 microns) applied over the base metal. For perspective, a human hair is about 70 microns thick — so plating is 35–140 times thinner than a single hair. Every point of friction — link connections, cuffs rubbing against your work desk, watch buckle friction, or keys in your pocket — slowly wears through this layer. Once the base metal is exposed, degradation accelerates rapidly."
                ) : (
                  "Gold or silver plating is a microscopically thin layer (0.5–2 microns) applied over the base metal. For perspective, a human hair is about 70 microns thick — so plating is 35–140 times thinner than a single hair. Every point of friction — clasps, areas where jewellery touches your desk, the spot where a ring touches adjacent fingers — slowly wears through this layer. Once the base metal is exposed, degradation accelerates rapidly."
                )}
              </p>
            </div>
            <div className="border p-5" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
              <h3 className="text-sm font-bold mb-2" style={{ color: theme.textPrimary }}>3. Chemical Attack</h3>
              <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                {isMen ? (
                  "Your skin's natural pH is slightly acidic (around 5.5). Sweat, aftershaves, beard oils, heavy colognes, soap, and chlorine in swimming pools — all contain chemicals that attack plated surfaces. This is why jewellery worn during heavy gym sessions, or exposed to colognes and grooming products, degrades faster than pieces worn only for events. The #1 chemical enemy of plated metal is chlorine — avoid pools entirely when wearing accessories."
                ) : (
                  "Your skin's natural pH is slightly acidic (around 5.5). Sweat, perfume, soap, hand sanitizer, chlorine in swimming pools, and even the detergent on your freshly washed clothes — all contain chemicals that attack plated surfaces. This is why jewellery worn during exercise, cooking, or cleaning degrades faster than pieces worn only for events. The #1 chemical enemy of plated jewellery is chlorine — avoid pools and hot tubs entirely."
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Material-by-Material Care */}
        <section>
          <h2 
            className="text-xl font-bold font-serif uppercase tracking-widest mb-4 pb-2 border-b"
            style={{ color: theme.textPrimary, borderColor: theme.cardBorder }}
          >
            Material-by-Material Care Instructions
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: theme.textSecondary }}>
            Different materials need different care. Here's a specific guide for every material type:
          </p>

          <div className="space-y-4">
            <div className="border p-5" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 text-xs font-bold rounded-sm" style={getBadgeStyle('easy')}>EASY CARE</span>
                <h3 className="text-sm font-bold" style={{ color: theme.textPrimary }}>Stainless Steel</h3>
              </div>
              <p className="text-sm leading-relaxed mb-3" style={{ color: theme.textSecondary }}>
                {isMen 
                  ? "Products like the Fashion Frill link bracelets and solid stainless steel kadas. This is the lowest-maintenance material."
                  : "The lowest-maintenance material. Products like the Fashion Frill Butterfly Ring and men's bracelet are stainless steel."}
              </p>
              <ul className="space-y-1.5 text-sm" style={{ color: theme.textSecondary }}>
                <li className="flex items-start gap-2"><span className="text-green-600">✓</span>Can be worn in water (showers, rain) without damage</li>
                <li className="flex items-start gap-2"><span className="text-green-600">✓</span>Clean with soap and water, dry with a soft cloth</li>
                <li className="flex items-start gap-2"><span className="text-green-600">✓</span>Safe for gym, sports, and physical work</li>
                <li className="flex items-start gap-2"><span className="text-red-500">✗</span>Avoid harsh abrasives (steel wool, rough scrubbers) — they'll scratch the surface</li>
                <li className="flex items-start gap-2"><span className="text-red-500">✗</span>Avoid prolonged saltwater exposure (ocean swimming) — while resistant, salt can cause pitting over time</li>
              </ul>
            </div>

            <div className="border p-5" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 text-xs font-bold rounded-sm" style={getBadgeStyle('moderate')}>MODERATE CARE</span>
                <h3 className="text-sm font-bold" style={{ color: theme.textPrimary }}>Sterling Silver (925)</h3>
              </div>
              <p className="text-sm leading-relaxed mb-3" style={{ color: theme.textSecondary }}>
                {isMen 
                  ? "Products like Clara's premium chains and bands. Real silver requires more attention but rewards you with years of wear."
                  : "Products like Clara's pendant and earrings. Real silver requires more attention but rewards you with years of wear."}
              </p>
              <ul className="space-y-1.5 text-sm" style={{ color: theme.textSecondary }}>
                <li className="flex items-start gap-2"><span className="text-green-600">✓</span>Store in an airtight bag or box — silver tarnishes from air exposure</li>
                <li className="flex items-start gap-2"><span className="text-green-600">✓</span>Clean with a dedicated silver polishing cloth (available for ₹50–₹100 online)</li>
                <li className="flex items-start gap-2"><span className="text-green-600">✓</span>Wear it regularly — the oils from your skin actually help prevent tarnishing</li>
                <li className="flex items-start gap-2"><span className="text-red-500">✗</span>Never use toothpaste to clean silver (common bad advice) — it's abrasive and creates micro-scratches</li>
                <li className="flex items-start gap-2"><span className="text-red-500">✗</span>Remove before swimming — chlorine causes irreversible darkening of silver</li>
                <li className="flex items-start gap-2"><span className="text-red-500">✗</span>Keep away from rubber bands — rubber contains sulphur which blackens silver</li>
              </ul>
            </div>

            <div className="border p-5" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 text-xs font-bold rounded-sm" style={getBadgeStyle('high')}>HIGH CARE</span>
                <h3 className="text-sm font-bold" style={{ color: theme.textPrimary }}>Gold/Silver Plated Metal</h3>
              </div>
              <p className="text-sm leading-relaxed mb-3" style={{ color: theme.textSecondary }}>
                {isMen
                  ? "Plated brass kadas and casual gold-toned link chains. Plated items need the most careful treatment."
                  : "The majority of jewellery under ₹500 in our collection. Plated jewellery needs the most careful treatment."}
              </p>
              <ul className="space-y-1.5 text-sm" style={{ color: theme.textSecondary }}>
                <li className="flex items-start gap-2"><span className="text-green-600">✓</span>Remove BEFORE washing hands, showering, cooking, cleaning, or exercising</li>
                <li className="flex items-start gap-2"><span className="text-green-600">✓</span>Apply all skincare, perfume, and hairspray BEFORE putting on jewellery</li>
                <li className="flex items-start gap-2"><span className="text-green-600">✓</span>Wipe with a soft, dry cloth after every wear — remove skin oils and sweat</li>
                <li className="flex items-start gap-2"><span className="text-green-600">✓</span>Store in individual compartments or pouches — pieces rubbing together strips plating</li>
                <li className="flex items-start gap-2"><span className="text-red-500">✗</span>Never clean with chemical cleaners, alcohol, or vinegar — they destroy thin plating</li>
                <li className="flex items-start gap-2"><span className="text-red-500">✗</span>Don't wear during monsoon season rains without protection — humidity accelerates tarnish</li>
                <li className="flex items-start gap-2"><span className="text-red-500">✗</span>Avoid wearing the same plated piece every single day — rotation extends each piece's life</li>
              </ul>
            </div>

            <div className="border p-5" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 text-xs font-bold rounded-sm" style={getBadgeStyle('fragile')}>
                  {isMen ? 'FRAGILE' : 'FRAGILE'}
                </span>
                <h3 className="text-sm font-bold" style={{ color: theme.textPrimary }}>
                  {isMen ? "Leather & Braided Cord Bracelets" : "Glass, Bead & Shell Jewellery"}
                </h3>
              </div>
              <p className="text-sm leading-relaxed mb-3" style={{ color: theme.textSecondary }}>
                {isMen 
                  ? "Products like casual multi-layer leather wraps or braided cords. These need protection from moisture to prevent rot."
                  : "Products like the crackle glass bracelets and shell anklet. These need gentle handling."}
              </p>
              {isMen ? (
                <ul className="space-y-1.5 text-sm" style={{ color: theme.textSecondary }}>
                  <li className="flex items-start gap-2"><span className="text-green-600">✓</span>Clean with a dry or very slightly damp microfiber cloth if needed</li>
                  <li className="flex items-start gap-2"><span className="text-green-600">✓</span>Let it dry naturally away from direct high heat or sunlight</li>
                  <li className="flex items-start gap-2"><span className="text-green-600">✓</span>Apply leather conditioner sparingly once every few months to keep it supple</li>
                  <li className="flex items-start gap-2"><span className="text-red-500">✗</span>Never submerge in water (showers, swimming) — wet leather cracks, stretches, and develops a foul odor</li>
                  <li className="flex items-start gap-2"><span className="text-red-500">✗</span>Don't wear during heavy workouts where it gets soaked in sweat</li>
                </ul>
              ) : (
                <ul className="space-y-1.5 text-sm" style={{ color: theme.textSecondary }}>
                  <li className="flex items-start gap-2"><span className="text-green-600">✓</span>Handle gently — glass cracks on impact with hard surfaces</li>
                  <li className="flex items-start gap-2"><span className="text-green-600">✓</span>Store flat to prevent beads from rolling and stretching elastic</li>
                  <li className="flex items-start gap-2"><span className="text-green-600">✓</span>Clean by wiping with a slightly damp cloth, then dry immediately</li>
                  <li className="flex items-start gap-2"><span className="text-red-500">✗</span>Never submerge in water — it weakens elastic stringing and adhesives holding charms</li>
                  <li className="flex items-start gap-2"><span className="text-red-500">✗</span>Don't wear during exercise or physical activity — movement stress loosens beads</li>
                </ul>
              )}
            </div>
          </div>
        </section>

        {/* Troubleshooting Common Issues */}
        <section>
          <h2 
            className="text-xl font-bold font-serif uppercase tracking-widest mb-4 pb-2 border-b"
            style={{ color: theme.textPrimary, borderColor: theme.cardBorder }}
          >
            Troubleshooting: Common Issues & Fixes
          </h2>
          <div className="space-y-4">
            {isMen ? (
              [
                {
                  problem: 'My Kada or bracelet is leaving green marks on my skin',
                  cause: 'The base metal (usually copper or brass in traditional kadas) is oxidizing against sweat. This is common when wearing cheap cuffs or after standard plating wears thin.',
                  fix: 'Apply a thin layer of clear nail polish to the inside of the bracelet where it touches your skin. Reapply every 2–3 weeks. Alternatively, switch to high-grade stainless steel kadas.',
                },
                {
                  problem: 'My gold-plated chain or cuff has turned dark/black',
                  cause: 'The plating has been chemically attacked, usually by cologne, aftershave, or sweat. Once the plating is compromised, the base metal oxidizes rapidly.',
                  fix: 'For early-stage tarnish, gently rub with a soft cloth dampened with a tiny amount of baby oil. For severe blackening, the plating is likely gone — replating is possible at local jewellers or simply replace the piece.',
                },
                {
                  problem: 'My metal bracelet or chain is causing itching or redness',
                  cause: 'You\'re likely reacting to nickel, a common component in cheap metal alloys. This is a contact allergy affecting 10–20% of the population.',
                  fix: 'Switch to hypoallergenic materials: stainless steel, sterling silver (925), or titanium. As a temporary fix, coat inner surfaces with clear nail polish.',
                },
                {
                  problem: 'My chain keeps catching or tangling',
                  cause: 'Store chains thrown together in a drawer will inevitably tangle and catch on each other\'s links.',
                  fix: 'Store chains hung up or individually in small zip-lock bags. Squeeze out the air to prevent moving. Alternatively, choose box or curb chains which are structurally tangle-resistant.',
                },
                {
                  problem: 'The clasp on my link bracelet or Kada joint is getting loose',
                  cause: 'Frequent clicking, manual work, or heavy wear relaxes the tension in kadas or wears out standard fold-over clasps.',
                  fix: 'For kadas, gently squeeze the sides to restore the circular shape. For loose clasps, use small pliers to slightly compress the catch loop. Avoid using heavy force.',
                },
              ].map((item, i) => (
                <div key={i} className="border p-5" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                  <h3 className="text-sm font-bold mb-2" style={{ color: theme.textPrimary }}>❓ {item.problem}</h3>
                  <p className="text-sm leading-relaxed mb-2" style={{ color: theme.textMuted }}><strong style={{ color: theme.textSecondary }}>Cause:</strong> {item.cause}</p>
                  <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}><strong style={{ color: '#81C784' }}>Fix:</strong> {item.fix}</p>
                </div>
              ))
            ) : (
              [
                {
                  problem: 'My ring/bracelet is leaving green marks on my skin',
                  cause: 'The base metal (usually copper or brass) is oxidizing against your skin. This happens faster when you sweat or when the plating has worn through.',
                  fix: 'Apply a thin layer of clear nail polish to the inside of the ring/bracelet where it touches your skin. Reapply every 2–3 weeks. Alternatively, upgrade to stainless steel pieces which don\'t cause this.',
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
                <div key={i} className="border p-5" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                  <h3 className="text-sm font-bold mb-2" style={{ color: theme.textPrimary }}>❓ {item.problem}</h3>
                  <p className="text-sm leading-relaxed mb-2" style={{ color: theme.textMuted }}><strong style={{ color: theme.textSecondary }}>Cause:</strong> {item.cause}</p>
                  <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}><strong style={{ color: '#15803D' }}>Fix:</strong> {item.fix}</p>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Seasonal Care Calendar */}
        <section>
          <h2 
            className="text-xl font-bold font-serif uppercase tracking-widest mb-4 pb-2 border-b"
            style={{ color: theme.textPrimary, borderColor: theme.cardBorder }}
          >
            Seasonal Care for Indian Climate
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: theme.textSecondary }}>
            India's varied climate creates specific challenges for accessories. Here's a season-by-season guide:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border p-5" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
              <h3 className="text-sm font-bold mb-2" style={{ color: theme.textPrimary }}>☀️ Summer (Mar–Jun)</h3>
              <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                <strong style={{ color: theme.textPrimary }}>Main threat: Sweat.</strong> High temperatures mean more perspiration, which is acidic and attacks plating aggressively.
                Keep plated accessories minimal during summer or choose stainless steel. Wipe pieces after wearing in heat. Store in cool, dry places away from direct sunlight.
              </p>
            </div>
            <div className="border p-5" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
              <h3 className="text-sm font-bold mb-2" style={{ color: theme.textPrimary }}>🌧️ Monsoon (Jul–Sep)</h3>
              <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                <strong style={{ color: theme.textPrimary }}>Main threat: Humidity.</strong> The moisture in the air itself can cause oxidation even when you're not wearing the accessory.
                Store all accessories in airtight containers with silica gel packets during monsoon. Add a chalk piece to your storage box — it absorbs moisture.
              </p>
            </div>
            <div className="border p-5" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
              <h3 className="text-sm font-bold mb-2" style={{ color: theme.textPrimary }}>🍂 Festival Season (Oct–Dec)</h3>
              <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                <strong style={{ color: theme.textPrimary }}>Main challenge: Heavy use.</strong> Diwali, Dussehra, weddings — your accessories get maximum wear during this period.
                Buy fresh event pieces at the start of the season. Don't rely on last year's plated pieces that have been sitting in humid storage.
              </p>
            </div>
            <div className="border p-5" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
              <h3 className="text-sm font-bold mb-2" style={{ color: theme.textPrimary }}>❄️ Winter (Jan–Feb)</h3>
              <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                <strong style={{ color: theme.textPrimary }}>Best season for fashion accessories.</strong> Lower humidity and less sweating mean plating lasts longest during winter.
                This is the ideal time to buy and break in new pieces. {isMen ? "Winter is also when dry skin can cause metal friction — apply moisturizer before wearing tight kadas." : "Winter is also when dry skin can cause metal friction — apply moisturizer before wearing tight bangles."}
              </p>
            </div>
          </div>
        </section>

        {/* Storage */}
        <section>
          <h2 
            className="text-xl font-bold font-serif uppercase tracking-widest mb-4 pb-2 border-b"
            style={{ color: theme.textPrimary, borderColor: theme.cardBorder }}
          >
            The Budget Accessories Storage System
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: theme.textSecondary }}>
            You don't need expensive jewellery boxes. Here's a practical, affordable storage system:
          </p>
          <div className="border p-5" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <div className="space-y-4">
              {[
                { item: 'Small zip-lock bags (₹50 for 100 bags)', use: 'One piece per bag. Squeeze out air before sealing. This is the simplest anti-tarnish solution — low air exposure = less oxidation.' },
                { item: 'Silica gel packets (₹100 for 20)', use: 'Toss 2–3 packets into your drawer or box. Replace every 3 months. These absorb ambient humidity.' },
                { item: 'Chalk sticks (₹30 for a box)', use: 'Place 2–3 chalk sticks near your stored items. Chalk absorbs moisture naturally. Replace when the chalk starts crumbling.' },
                { item: 'Drinking straws', use: 'Thread delicate chains through straws to prevent tangling. Cut straw to chain length, thread the chain through, and clasp.' },
                { 
                  item: isMen ? 'Separated drawer tray or watch box' : 'Egg carton or ice cube tray', 
                  use: isMen 
                    ? 'Use watch organizers or accessory compartments to store cuffs, heavy chains, and kadas individually to prevent scratching.' 
                    : 'Use the compartments to separate rings, studs, and small pieces. Each compartment holds one item, preventing pieces from rubbing together.' 
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 pb-3 border-b last:border-b-0 last:pb-0" style={{ borderColor: theme.cardBorder }}>
                  <span 
                    className="w-6 h-6 rounded-sm font-bold text-xs flex items-center justify-center shrink-0 mt-0.5"
                    style={{
                      backgroundColor: isMen ? 'rgba(201, 169, 110, 0.1)' : 'rgba(var(--color-accent-rgb), 0.1)',
                      color: theme.accent
                    }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-bold" style={{ color: theme.textPrimary }}>{item.item}</p>
                    <p className="text-xs mt-1 leading-relaxed" style={{ color: theme.textSecondary }}>{item.use}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-sm mt-3 italic" style={{ color: theme.textMuted }}>
            Total cost for this entire storage system: under ₹200. Will extend the life of your entire collection.
          </p>
        </section>

        {/* Key Takeaways */}
        <section>
          <h2 
            className="text-xl font-bold font-serif uppercase tracking-widest mb-4 pb-2 border-b"
            style={{ color: theme.textPrimary, borderColor: theme.cardBorder }}
          >
            Key Takeaways
          </h2>
          <div 
            className="border p-6"
            style={{ 
              backgroundColor: isMen ? 'rgba(201, 169, 110, 0.03)' : 'rgba(var(--color-accent-rgb), 0.05)',
              borderColor: isMen ? 'rgba(201, 169, 110, 0.2)' : 'rgba(var(--color-accent-rgb), 0.2)'
            }}
          >
            <ul className="space-y-3 text-sm" style={{ color: theme.textSecondary }}>
              {[
                isMen ? 'Fashion accessories have a lifespan by design — plan for rotation, not permanence.' : 'Fashion jewellery has a lifespan by design — plan for rotation, not permanence.',
                isMen ? 'The three enemies of plated metals are water, chemical products, and friction.' : 'The three enemies of plated jewellery are water, chemicals, and friction. Minimise all three.',
                'Stainless steel and sterling silver are the only "buy once" materials in budget accessories.',
                'Store accessories in individual airtight containers with moisture-absorbing agents.',
                isMen ? 'Green skin marks aren\'t harmful — they\'re copper oxidation and wipe off easily.' : 'Green skin marks aren\'t harmful — they\'re copper oxidation and wipe off easily.',
                'If you have metal allergies, invest in 925 silver or stainless steel — the premium pays for itself.',
                isMen ? 'Clear nail polish on inner surfaces is the most practical hack for extending Kada/cuff life.' : 'Clear nail polish on inner surfaces is the most practical hack for extending plated jewellery life.',
                'India\'s monsoon season is the harshest on metal — store extra carefully during Jul–Sep.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0 font-bold" style={{ color: theme.accent }}>→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </article>

      {/* CTA */}
      <div 
        className="mt-12 text-center border-2 p-8"
        style={{ 
          backgroundColor: theme.cardBg,
          borderColor: isMen ? 'rgba(201, 169, 110, 0.2)' : 'rgba(var(--color-accent-rgb), 0.2)'
        }}
      >
        <h2 className="text-lg font-bold font-serif uppercase tracking-widest mb-3" style={{ color: theme.textPrimary }}>Ready to Shop Smarter?</h2>
        <p className="text-sm mb-6 max-w-lg mx-auto" style={{ color: theme.textSecondary }}>
          Now you know how to make your accessories last. Check our buying guide to learn how to choose the right pieces in the first place.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/buying-guide"
            className="px-8 py-3 text-sm font-bold uppercase tracking-[0.2em] rounded-sm transition-all border-2"
            style={{
              backgroundColor: theme.accent,
              color: isMen ? '#1E1E20' : '#ffffff',
              borderColor: theme.accent,
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = theme.accentHover;
              e.target.style.borderColor = theme.accentHover;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = theme.accent;
              e.target.style.borderColor = theme.accent;
            }}
          >
            Complete Buying Guide →
          </Link>
          <Link
            to="/"
            className="px-8 py-3 border-2 text-sm font-bold uppercase tracking-[0.2em] rounded-sm transition-all"
            style={{
              backgroundColor: isMen ? 'transparent' : '#ffffff',
              color: theme.textSecondary,
              borderColor: theme.cardBorder,
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = theme.accent;
              e.target.style.color = theme.accent;
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = theme.cardBorder;
              e.target.style.color = theme.textSecondary;
            }}
          >
            Browse Collection
          </Link>
        </div>
      </div>

      {/* Author & Disclaimer */}
      <div className="mt-8 border p-5" style={{ backgroundColor: theme.surfaceBg, borderColor: theme.cardBorder }}>
        <div className="flex items-center gap-3 mb-3">
          <div 
            className="w-10 h-10 rounded-full border flex items-center justify-center"
            style={{
              backgroundColor: isMen ? 'rgba(201, 169, 110, 0.1)' : 'rgba(var(--color-accent-rgb), 0.1)',
              borderColor: isMen ? 'rgba(201, 169, 110, 0.3)' : 'rgba(var(--color-accent-rgb), 0.3)'
            }}
          >
            <span className="text-sm font-bold" style={{ color: theme.accent }}>FV</span>
          </div>
          <div>
            <p className="text-xs font-bold" style={{ color: theme.textPrimary }}>Written by the FaithVish Editorial Team</p>
            <p className="text-[10px]" style={{ color: theme.textMuted }}>Last updated: April 2026 · contact@faithvish.com</p>
          </div>
        </div>
        <p className="text-[10px] leading-relaxed mt-2" style={{ color: theme.textMuted }}>
          <strong style={{ color: theme.textSecondary }}>Disclaimer:</strong> This care guide is based on general material science and manufacturer 
          best practices. Individual results may vary depending on your local climate, skin chemistry, and specific product properties. 
          When in doubt, follow the care instructions provided by the specific product manufacturer.{' '}
          <Link to="/affiliate-disclosure" className="underline" style={{ color: theme.accent }} onMouseEnter={(e) => e.target.style.color = theme.accentHover} onMouseLeave={(e) => e.target.style.color = theme.accent}>Affiliate disclosure →</Link>
        </p>
      </div>

      {/* Back button */}
      <div className="text-center mt-10 mb-8">
        <Link
          to="/"
          className="px-8 py-3 text-sm font-bold uppercase tracking-widest border-2 rounded-sm transition-all"
          style={{
            backgroundColor: isMen ? 'transparent' : '#ffffff',
            color: theme.textSecondary,
            borderColor: theme.cardBorder,
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = theme.textPrimary;
            e.target.style.color = theme.textPrimary;
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = theme.cardBorder;
            e.target.style.color = theme.textSecondary;
          }}
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default JewelleryCareGuidePage;
