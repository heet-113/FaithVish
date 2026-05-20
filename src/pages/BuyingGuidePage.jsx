import { Link } from 'react-router-dom';

import useStore from '../store/useStore';

const BuyingGuidePage = () => {
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
    surface: '#1A1A1C',
    alertBg: 'rgba(201, 169, 110, 0.05)',
  };

  const theme = {
    textPrimary: isMen ? m.textPrimary : 'var(--color-text-primary)',
    textSecondary: isMen ? m.textSecondary : 'var(--color-text-secondary)',
    textMuted: isMen ? m.textMuted : 'var(--color-text-muted)',
    accent: isMen ? m.gold : 'var(--color-accent)',
    accentHover: isMen ? m.goldLight : 'var(--color-accent-light)',
    cardBg: isMen ? m.card : '#ffffff',
    cardBorder: isMen ? m.border : 'var(--color-border)',
    surfaceBg: isMen ? m.surface : 'var(--color-surface)',
    alertBg: isMen ? m.alertBg : 'rgba(var(--color-accent-rgb), 0.05)',
  };

  const getBadgeStyle = (type) => {
    if (isMen) {
      switch (type) {
        case 'high': return { backgroundColor: 'rgba(46, 125, 50, 0.2)', color: '#81C784' };
        case 'moderate': return { backgroundColor: 'rgba(245, 158, 11, 0.2)', color: '#FCD34D' };
        case 'low': return { backgroundColor: 'rgba(249, 115, 22, 0.2)', color: '#FFB74D' };
        case 'caution': return { backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#E57373' };
        default: return {};
      }
    } else {
      switch (type) {
        case 'high': return { backgroundColor: '#DCFCE7', color: '#15803D' };
        case 'moderate': return { backgroundColor: '#FEF9C3', color: '#A16207' };
        case 'low': return { backgroundColor: '#FFEDD5', color: '#C2410C' };
        case 'caution': return { backgroundColor: '#FEE2E2', color: '#B91C1C' };
        default: return {};
      }
    }
  };

  const sections = [
    { title: 'Understanding Jewellery Materials', id: 'section-1' },
    { title: 'Gold Plating: What It Really Means', id: 'section-2' },
    { title: 'How to Read Amazon Jewellery Ratings', id: 'section-3' },
    { 
      title: isMen ? 'Chain & Necklace Sizing: The Right Length' : 'Ring Sizing: Getting It Right Online', 
      id: 'section-4' 
    },
    { 
      title: isMen ? 'Kada & Bracelet Sizing: The Indian System' : 'Bangle Sizing: The Indian System', 
      id: 'section-5' 
    },
    { title: 'Red Flags When Shopping Online', id: 'section-6' },
    { 
      title: isMen ? "How to Make Men's Accessories Last Longer" : 'How to Make Budget Jewellery Last Longer', 
      id: 'section-7' 
    },
    { title: 'When to Spend More vs. Save', id: 'section-8' },
    { title: 'Common Buyer Mistakes to Avoid', id: 'section-9' },
    { title: 'Our Recommendation Framework', id: 'section-10' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-6" style={{ color: theme.textMuted }}>
        <Link to="/" className="transition-colors" style={{ color: theme.textMuted }} onMouseEnter={(e) => e.target.style.color = theme.textPrimary} onMouseLeave={(e) => e.target.style.color = theme.textMuted}>Home</Link>
        <span>/</span>
        <span style={{ color: theme.textSecondary }}>Articles</span>
        <span>/</span>
        <span style={{ color: theme.textSecondary }}>Complete Buying Guide</span>
      </nav>

      {/* Hero */}
      <div 
        className="mb-10 text-center py-12 border-y-2"
        style={{
          background: isMen
            ? 'repeating-linear-gradient(45deg, rgba(201,169,110,0.03) 0px, rgba(201,169,110,0.03) 2px, rgba(40,40,40,0.4) 2px, rgba(40,40,40,0.4) 8px)'
            : 'repeating-linear-gradient(45deg,rgba(217,208,193,0.1)_0px,rgba(217,208,193,0.1)_2px,rgba(250,250,247,0.5)_2px,rgba(250,250,247,0.5)_8px)',
          borderColor: theme.cardBorder
        }}
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] mb-3" style={{ color: isMen ? theme.accent : 'var(--color-accent-secondary)' }}>In-Depth Guide</p>
        <h1 className="text-3xl sm:text-4xl font-black mb-4 font-serif uppercase tracking-widest leading-tight" style={{ color: theme.textPrimary }}>
          {isMen ? <>How to Buy Men's Jewellery <span style={{ color: theme.accent }}>Online in India</span></> : <>How to Buy Jewellery <span style={{ color: theme.accent }}>Online in India</span></>}
        </h1>
        <p className="text-sm max-w-2xl mx-auto mt-4 leading-relaxed" style={{ color: theme.textSecondary }}>
          {isMen
            ? "Everything you need to know before buying men's chains, kadas, and bracelets online. Sizing guides, metal durability, styling tips, and common buying mistakes to avoid."
            : "Everything you need to know before spending money on fashion jewellery from Amazon, Flipkart, or any online store. Materials, red flags, sizing, care tips, and how to avoid common mistakes."}
        </p>
        <p className="text-[10px] mt-4 uppercase tracking-wider" style={{ color: theme.textMuted }}>
          Written by the FaithVish Team · April 2026 · {isMen ? '8 min read' : '10 min read'}
        </p>
      </div>

      {/* Why Trust Us */}
      <div 
        className="mb-10 border p-6"
        style={{ 
          background: isMen ? 'rgba(201, 169, 110, 0.02)' : 'linear-gradient(to right, rgba(236,72,153,0.02), rgba(6,182,212,0.02))', 
          borderColor: theme.cardBorder 
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div 
            className="w-10 h-10 rounded-sm flex items-center justify-center border"
            style={{
              backgroundColor: isMen ? 'rgba(201,169,110,0.1)' : 'rgba(236,72,153,0.1)',
              borderColor: isMen ? 'rgba(201,169,110,0.3)' : 'rgba(236,72,153,0.3)'
            }}
          >
            <svg className="w-5 h-5" style={{ color: theme.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-sm font-bold font-serif uppercase tracking-widest" style={{ color: theme.textPrimary }}>Why Trust This Guide?</h2>
        </div>
        <p className="text-sm leading-relaxed mb-3" style={{ color: theme.textSecondary }}>
          FaithVish is an independent editorial team that curates and reviews jewellery from Amazon India. We earn affiliate commissions when you purchase through our links, but <strong style={{ color: theme.textPrimary }}>we are not paid by any brand to feature or promote their products</strong>.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
          <div className="border p-3 text-center" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <p className="text-lg font-black" style={{ color: theme.accent }}>{isMen ? '12+' : '24+'}</p>
            <p className="text-[10px] uppercase tracking-wider" style={{ color: theme.textMuted }}>Products reviewed</p>
          </div>
          <div className="border p-3 text-center" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <p className="text-lg font-black" style={{ color: theme.accent }}>{isMen ? '8,000+' : '20,000+'}</p>
            <p className="text-[10px] uppercase tracking-wider" style={{ color: theme.textMuted }}>Buyer reviews analysed</p>
          </div>
          <div className="border p-3 text-center" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <p className="text-lg font-black" style={{ color: theme.accent }}>₹0</p>
            <p className="text-[10px] uppercase tracking-wider" style={{ color: theme.textMuted }}>Paid by brands for listings</p>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="mb-10 border p-6" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
        <h2 className="text-sm font-bold font-serif uppercase tracking-widest mb-4 pb-2 border-b" style={{ color: theme.textPrimary, borderColor: theme.cardBorder }}>Table of Contents</h2>
        <ol className="space-y-2 text-sm">
          {sections.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span 
                className="w-6 h-6 rounded-sm font-bold text-xs flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: isMen ? 'rgba(201,169,110,0.1)' : 'rgba(236,72,153,0.1)', color: theme.accent }}
              >
                {i + 1}
              </span>
              <a href={`#${item.id}`} className="transition-colors py-0.5" style={{ color: theme.textSecondary }} onMouseEnter={(e) => e.target.style.color = theme.accent} onMouseLeave={(e) => e.target.style.color = theme.textSecondary}>{item.title}</a>
            </li>
          ))}
        </ol>
      </div>

      {/* Article Content */}
      <article className="space-y-10">
        {/* Section 1 */}
        <section id="section-1">
          <h2 className="text-xl font-bold font-serif uppercase tracking-widest mb-4 pb-2 border-b" style={{ color: theme.textPrimary, borderColor: theme.cardBorder }}>
            1. Understanding Jewellery Materials
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: theme.textSecondary }}>
            The single most important factor in any jewellery purchase — online or offline — is the <strong style={{ color: theme.textPrimary }}>base material</strong>.
            It determines how long the piece lasts, how it feels on your skin, whether it causes allergic reactions, and how it looks after a month of wear.
            Here's a breakdown of every material you'll encounter on Amazon India, ranked from most to least durable:
          </p>
          <div className="space-y-4">
            <div className="border p-5" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
              <h3 className="text-sm font-bold mb-2" style={{ color: theme.textPrimary }}>925 Sterling Silver</h3>
              <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                {isMen ? (
                  "The gold standard for premium men's jewellery. Sterling silver is 92.5% pure silver mixed with 7.5% copper for strength. It has premium weight, great metallic feel, and ages with a distinctive masculine character. Perfect for heavy chains, minimalist bands, and structured cuffs. Look for BIS hallmark certification. Brands like Clara use this. Budget: ₹1,500–₹4,000 for a single piece. Lifespan: years, and tarnishing is easily polished away."
                ) : (
                  "The gold standard of online jewellery (ironic, yes). Sterling silver is 92.5% pure silver mixed with 7.5% copper for strength. It's a genuine precious metal — it has weight, substance, and a distinctive feel against skin. Look for BIS hallmark certification. Brands like Clara use this. Budget: ₹1,500–₹3,000 for a single piece. Lifespan: years, with minimal care. Tarnishing happens naturally but is easily reversed with a silver polishing cloth."
                )}
              </p>
            </div>
            <div className="border p-5" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
              <h3 className="text-sm font-bold mb-2" style={{ color: theme.textPrimary }}>Stainless Steel</h3>
              <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                {isMen ? (
                  "The absolute champion of men's lifestyle accessories. Stainless steel doesn't rust, corrode, or tarnish, and is completely hypoallergenic. It's the same material used in luxury sports watches. If you want a chain, Kada, or cuff that survives intense workouts, sweat, rain, and rough daily use without any maintenance — stainless steel is the only choice. Budget: ₹200–₹500. Lifespan: virtually lifetime. Found in brands like Fashion Frill."
                ) : (
                  "The most underrated material in fashion jewellery. Stainless steel doesn't rust, doesn't corrode, doesn't tarnish, and is hypoallergenic. It's the same material used in quality watches and surgical instruments. If you want something that survives gym, rain, and daily rough use — stainless steel is your answer. Budget: ₹150–₹400. Lifespan: essentially indefinite for the base metal. Found in brands like Fashion Frill (rings, bracelets)."
                )}
              </p>
            </div>
            <div className="border p-5" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
              <h3 className="text-sm font-bold mb-2" style={{ color: theme.textPrimary }}>Brass</h3>
              <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                {isMen ? (
                  "A copper-zinc alloy common in mid-range traditional men's accessories (like Punjabi kadas). Brass has a heavy, solid feel and a warm authentic gold tone. The major drawback: high body heat and sweat can cause copper oxidation, leaving a temporary green mark on your skin in humid conditions. Budget: ₹250–₹700. Lifespan: 6–12 months depending on plating quality and sweat exposure."
                ) : (
                  "A copper-zinc alloy that's the backbone of most mid-range Indian fashion jewellery. Brass has a warm tone, decent weight, and holds plating better than lighter alloys. The downside: brass can turn your skin green (copper oxidation) in humid conditions. If you live in a coastal or humid city, keep this in mind. Budget: ₹200–₹600. Lifespan: 3–12 months depending on plating quality and care."
                )}
              </p>
            </div>
            <div className="border p-5" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
              <h3 className="text-sm font-bold mb-2" style={{ color: theme.textPrimary }}>"Metal" / "Alloy" (Unspecified)</h3>
              <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                {isMen ? (
                  "The vaguest listing you'll encounter — and very common in budget men's chains and multi-layered bracelets. It typically means zinc alloy or pot metal. While extremely affordable (₹150–₹250), expect the standard gold or silver plating to wear away in 1–2 months of normal use. Best for occasional wear and party outfits. Avoid if you have sensitive skin."
                ) : (
                  "The vaguest listing you'll encounter — and the most common. When a listing says just 'Metal' or 'Alloy' without specifying what kind, it usually means pot metal, zinc alloy, or the cheapest base available. This isn't necessarily terrible — at ₹150–₹300, you get what you pay for. But set expectations: 1–4 months of wear before visible degradation. Best for one-time event use. Avoid if you have metal allergies."
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section id="section-2">
          <h2 className="text-xl font-bold font-serif uppercase tracking-widest mb-4 pb-2 border-b" style={{ color: theme.textPrimary, borderColor: theme.cardBorder }}>
            2. Gold Plating: What It Really Means
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: theme.textSecondary }}>
            {isMen ? (
              "Almost every gold-toned chain or Kada you see on Amazon under ₹5,000 is gold plated, not real gold. Understanding the differences saves you from disappointment:"
            ) : (
              "Almost every \"gold\" piece you see on Amazon under ₹5,000 is gold plated, not real gold. Understanding the differences saves you from disappointment:"
            )}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="border p-5" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
              <h3 className="text-sm font-bold mb-2" style={{ color: theme.textPrimary }}>Standard Gold Plating</h3>
              <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                {isMen ? (
                  "A very thin layer (0.5–1 micron) of gold applied electrically over base metal. Fades within 1–3 months of daily wear, especially when exposed to men's cologne, aftershave, or sweat. Fine for casual, occasional wear; not for a daily signature piece."
                ) : (
                  "A very thin layer (0.5–1 micron) of gold applied electrically over base metal. Looks great initially. Fades within 1–3 months of daily wear. Most pieces under ₹500 use this. Fine for events. Not for daily wear."
                )}
              </p>
            </div>
            <div className="border p-5" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
              <h3 className="text-sm font-bold mb-2" style={{ color: theme.textPrimary }}>One Gram Gold</h3>
              <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                {isMen ? (
                  "A traditional technique where a thicker gold layer is applied over copper or brass. Highly popular in traditional Punjabi kadas and religious pendants. Lifespan: 4–12 months under standard wear. Good middle-ground for regular festive wear."
                ) : (
                  "A traditional Indian technique where a thicker gold layer is applied over copper or brass. 'One gram' refers to approximately 1 gram of gold used in plating. More durable than standard plating. Common in South Indian and traditional designs. Lifespan: 4–12 months. Good middle-ground for regular occasion wear."
                )}
              </p>
            </div>
            <div className="border p-5" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
              <h3 className="text-sm font-bold mb-2" style={{ color: theme.textPrimary }}>Rhodium Plating</h3>
              <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                {isMen ? (
                  "Rhodium is a rare metal in the platinum family. It's the hardest, most scratch-resistant plating available. Creates a sleek, bright, metallic white-gold finish popular on men's premium chains and bands. Lifespan: 12–24 months. The best white-metal plating option."
                ) : (
                  "Rhodium is a precious metal in the platinum family. It's the hardest, most scratch-resistant plating available. Creates a bright, white, reflective finish. Used on real white gold jewellery — finding it on fashion jewellery at ₹300+ is excellent value. Lifespan: 12–24 months. The best plating you can find in this price range."
                )}
              </p>
            </div>
            <div className="border p-5" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
              <h3 className="text-sm font-bold mb-2" style={{ color: theme.textPrimary }}>Platinum Plating</h3>
              <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                {isMen ? (
                  "Similar to rhodium but with a slightly cooler, heavy-metal silvery tone. Clara uses 2-micron platinum plating (which is very thick). Creates a premium, highly durable white-toned finish for men's premium chains and bands. Lifespan: 12–18 months."
                ) : (
                  "Similar to rhodium but slightly different colour tone — cooler and more silvery. Clara uses 2-micron platinum plating, which is thicker than standard. Creates a premium, white-toned finish. Lifespan: 12–18 months with care. Premium option found on higher-priced fashion jewellery."
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section id="section-3">
          <h2 className="text-xl font-bold font-serif uppercase tracking-widest mb-4 pb-2 border-b" style={{ color: theme.textPrimary, borderColor: theme.cardBorder }}>
            3. How to Read Amazon Jewellery Ratings
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: theme.textSecondary }}>
            Not all 4-star ratings are created equal. Here's how to actually interpret what you see on Amazon:
          </p>
          <div className="space-y-4">
            <div className="border p-5" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 text-xs font-bold rounded-sm" style={getBadgeStyle('high')}>HIGH CONFIDENCE</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                {isMen ? (
                  <><strong style={{ color: theme.textPrimary }}>500+ reviews with 4.0+ stars:</strong> This is the sweet spot. With 500+ reviews, the rating is statistically reliable. You can trust the average. Examples: Fashion Frill men's bracelet (603 reviews, 4.1 stars).</>
                ) : (
                  <><strong style={{ color: theme.textPrimary }}>500+ reviews with 4.0+ stars:</strong> This is the sweet spot. With 500+ reviews, the rating is statistically reliable. You can trust the average. Examples in our collection: ZENEME pendant (521 reviews, 4.2 stars), Fashion Frill men's bracelet (603 reviews, 4.1 stars).</>
                )}
              </p>
            </div>
            <div className="border p-5" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 text-xs font-bold rounded-sm" style={getBadgeStyle('moderate')}>MODERATE CONFIDENCE</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                <strong style={{ color: theme.textPrimary }}>50–500 reviews with 3.8+ stars:</strong> Reasonably trustworthy. The product has been
                tested by enough people to identify major issues. Minor inconsistencies are possible but unlikely to be systematic.
                Most of our recommended products fall here.
              </p>
            </div>
            <div className="border p-5" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 text-xs font-bold rounded-sm" style={getBadgeStyle('low')}>LOW CONFIDENCE</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                <strong style={{ color: theme.textPrimary }}>Under 50 reviews:</strong> Treat ratings as directional, not definitive. A 4.8 rating from 14
                reviews could be genuinely great — or it could moderate to 3.5 as more buyers weigh in. We flag these products clearly.
              </p>
            </div>
            <div className="border p-5" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 text-xs font-bold rounded-sm" style={getBadgeStyle('caution')}>PROCEED WITH CAUTION</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                <strong style={{ color: theme.textPrimary }}>0 reviews:</strong> Completely untested by the public. You're relying solely on the listing
                description, product photos, and brand reputation. Not necessarily bad — but you're an early adopter with no safety net.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        {isMen ? (
          <section id="section-4">
            <h2 className="text-xl font-bold font-serif uppercase tracking-widest mb-4 pb-2 border-b" style={{ color: theme.textPrimary, borderColor: theme.cardBorder }}>
              4. Chain & Necklace Sizing: The Right Length
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: theme.textSecondary }}>
              Choosing the right chain length changes your entire look. Unlike women's necklaces, men's chain sizing is standard and sits differently based on neck size:
            </p>
            <div className="border p-5 mb-4" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
              <h3 className="text-sm font-bold mb-3" style={{ color: theme.textPrimary }}>Understanding Chain Lengths</h3>
              <p className="text-sm leading-relaxed mb-3" style={{ color: theme.textSecondary }}>
                Men's chains generally come in four standard sizes. Here is how they hang on an average build:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { label: '18 Inch (45 cm)', desc: 'Choker style. Sits above the collarbone. Best for slim necks or a minimal subtle chain look.' },
                  { label: '20 Inch (50 cm)', desc: 'Standard length. Sits right at the collarbone. The most versatile length, perfect for wearing under a shirt.' },
                  { label: '22 Inch (55 cm)', desc: 'Mid-chest length. Sits a few inches below the collarbone. Ideal for carrying religious or aesthetic pendants.' },
                  { label: '24 Inch (60 cm)', desc: 'Deep chest length. Sits at the center of the chest. Best for thick heavy chains or statement pieces.' },
                ].map((s, i) => (
                  <div key={i} className="border p-3 text-center flex flex-col justify-between" style={{ backgroundColor: theme.surfaceBg, borderColor: theme.cardBorder }}>
                    <p className="font-bold text-xs" style={{ color: theme.accent }}>{s.label}</p>
                    <p className="mt-2 text-[11px] leading-relaxed" style={{ color: theme.textSecondary }}>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="border p-5" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
              <h3 className="text-sm font-bold mb-3" style={{ color: theme.textPrimary }}>Pro Sizing Tip for Men</h3>
              <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                If you have a broader neck (collar size 16"+), always size up by one standard length. A 20" chain on a broader build will sit like an 18" chain. When in doubt, a 22-inch chain is the safest buy for men as it accommodates all neck sizes comfortably and looks highly classic.
              </p>
            </div>
          </section>
        ) : (
          <section id="section-4">
            <h2 className="text-xl font-bold font-serif uppercase tracking-widest mb-4 pb-2 border-b" style={{ color: theme.textPrimary, borderColor: theme.cardBorder }}>
              4. Ring Sizing: Getting It Right Online
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: theme.textSecondary }}>
              The #1 reason for ring returns is wrong sizing. Here's how to avoid it:
            </p>
            <div className="border p-5 mb-4" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
              <h3 className="text-sm font-bold mb-3" style={{ color: theme.textPrimary }}>Option 1: Buy Adjustable (Recommended)</h3>
              <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                For fashion jewellery under ₹1,000, always prefer adjustable rings. All three budget rings in our collection
                (YouBella, Fashion Frill, Clara set) are adjustable — this is intentional. Adjustable bands eliminate sizing
                guesswork entirely. The only downside: some adjustable rings can feel slightly less snug than fixed-size rings.
              </p>
            </div>
            <div className="border p-5" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
              <h3 className="text-sm font-bold mb-3" style={{ color: theme.textPrimary }}>Option 2: Measure at Home</h3>
              <p className="text-sm leading-relaxed mb-3" style={{ color: theme.textSecondary }}>
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
                  <div key={i} className="border p-2 text-center" style={{ backgroundColor: theme.surfaceBg, borderColor: theme.cardBorder }}>
                    <p className="font-bold" style={{ color: theme.textPrimary }}>{s.mm}</p>
                    <p style={{ color: theme.textMuted }}>{s.size}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Section 5 */}
        {isMen ? (
          <section id="section-5">
            <h2 className="text-xl font-bold font-serif uppercase tracking-widest mb-4 pb-2 border-b" style={{ color: theme.textPrimary, borderColor: theme.cardBorder }}>
              5. Kada & Bracelet Sizing: The Indian System
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: theme.textSecondary }}>
              Men's kadas and link bracelets use a sizing system that needs to accommodate larger wrists and ease of putting them on:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="border p-5 text-center" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                <p className="text-2xl font-black mb-1" style={{ color: theme.accent }}>2.6</p>
                <p className="text-xs uppercase tracking-wider mb-2" style={{ color: theme.textMuted }}>Small</p>
                <p className="text-xs" style={{ color: theme.textSecondary }}>Internal diameter: 65mm. Fits slender wrists. Best for slim or lean builds.</p>
              </div>
              <div 
                className="border-2 p-5 text-center" 
                style={{ 
                  backgroundColor: theme.cardBg, 
                  borderColor: theme.accent,
                  boxShadow: '0 4px 20px rgba(201, 169, 110, 0.15)'
                }}
              >
                <p className="text-2xl font-black mb-1" style={{ color: theme.accent }}>2.8</p>
                <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: theme.accent }}>Most Common</p>
                <p className="text-xs" style={{ color: theme.textSecondary }}>Internal diameter: 70mm. The standard size for most Indian men's kadas and bracelets.</p>
              </div>
              <div className="border p-5 text-center" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                <p className="text-2xl font-black mb-1" style={{ color: theme.accent }}>2.10</p>
                <p className="text-xs uppercase tracking-wider mb-2" style={{ color: theme.textMuted }}>Large</p>
                <p className="text-xs" style={{ color: theme.textSecondary }}>Internal diameter: 75mm. For broader wrists. Less common online but crucial for a comfortable fit.</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mt-4" style={{ color: theme.textSecondary }}>
              <strong style={{ color: theme.textPrimary }}>Pro tip:</strong> If you're between Kada sizes, always size up. A slightly loose Kada is highly wearable and slides elegantly — a too-tight Kada is unwearable. For link bracelets, measure your wrist circumference and add 1.5 cm to 2 cm for a perfect drape.
            </p>
          </section>
        ) : (
          <section id="section-5">
            <h2 className="text-xl font-bold font-serif uppercase tracking-widest mb-4 pb-2 border-b" style={{ color: theme.textPrimary, borderColor: theme.cardBorder }}>
              5. Bangle Sizing: The Indian System
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: theme.textSecondary }}>
              Indian bangles use a unique sizing system measured in <strong style={{ color: theme.textPrimary }}>internal diameter</strong>:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="border p-5 text-center" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                <p className="text-2xl font-black mb-1" style={{ color: theme.accent }}>2.4</p>
                <p className="text-xs uppercase tracking-wider mb-2" style={{ color: theme.textMuted }}>Small / Petite</p>
                <p className="text-xs" style={{ color: theme.textSecondary }}>Internal diameter: 60mm. Fits slender wrists. Difficult to find online — YouBella offers this size.</p>
              </div>
              <div 
                className="border-2 p-5 text-center" 
                style={{ 
                  backgroundColor: theme.cardBg, 
                  borderColor: theme.accent,
                  boxShadow: '0 4px 20px rgba(236, 72, 153, 0.1)'
                }}
              >
                <p className="text-2xl font-black mb-1" style={{ color: theme.accent }}>2.6</p>
                <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: theme.accent }}>Most Common</p>
                <p className="text-xs" style={{ color: theme.textSecondary }}>Internal diameter: 65mm. The standard Indian bangle size. Most online bangles default to this.</p>
              </div>
              <div className="border p-5 text-center" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                <p className="text-2xl font-black mb-1" style={{ color: theme.accent }}>2.8</p>
                <p className="text-xs uppercase tracking-wider mb-2" style={{ color: theme.textMuted }}>Large</p>
                <p className="text-xs" style={{ color: theme.textSecondary }}>Internal diameter: 70mm. For wider wrists. Less common online. Check local stores for better options.</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mt-4" style={{ color: theme.textSecondary }}>
              <strong style={{ color: theme.textPrimary }}>Pro tip:</strong> If you're between sizes, always go one size up. A slightly loose bangle is wearable 
              — a too-tight bangle is not. Bangles can't be adjusted after purchase.
            </p>
          </section>
        )}

        {/* Section 6 */}
        <section id="section-6">
          <h2 className="text-xl font-bold font-serif uppercase tracking-widest mb-4 pb-2 border-b" style={{ color: theme.textPrimary, borderColor: theme.cardBorder }}>
            6. Red Flags When Shopping Online
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: theme.textSecondary }}>
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
              <div key={i} className="border p-5" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                <h3 className="text-sm font-bold mb-2" style={{ color: isMen ? '#EF4444' : '#B91C1C' }}>🚩 {item.flag}</h3>
                <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 7 */}
        <section id="section-7">
          <h2 className="text-xl font-bold font-serif uppercase tracking-widest mb-4 pb-2 border-b" style={{ color: theme.textPrimary, borderColor: theme.cardBorder }}>
            {isMen ? "7. How to Make Men's Accessories Last Longer" : "7. How to Make Budget Jewellery Last Longer"}
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: theme.textSecondary }}>
            {isMen ? "Even a ₹300 steel chain or brass Kada can look brand new for months if you follow these rules:" : "Even a ₹200 ring can last 6+ months if you follow these rules:"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {isMen ? (
              [
                { rule: 'Remove before contact with water', detail: 'Showers, gyms, swimming — water (especially soapy or salty water) is the enemy of plated brass and leather cords. Keep them dry.' },
                { rule: 'Apply colognes & aftershaves BEFORE wearing', detail: 'Spray colognes, aftershaves, and beard oils first. Wait 30 seconds for them to dry before putting on your chain or Kada. Alcohol strips plating.' },
                { rule: 'Keep separate from watches', detail: 'Avoid wearing metal kadas or cuffs on the same wrist as your metal watch. Friction between watch casings and metal bracelets wears down the plating on both.' },
                { rule: 'Wipe down after workouts or sweat', detail: 'Sweat is highly acidic and corrosive to base alloys. A quick wipe with a dry soft micro-fiber cloth after a workout removes sweat salts.' },
                { rule: 'Keep away from sunlight when stored', detail: 'Direct sunlight for extended periods can discolour certain plating and cause leather components to dry and crack.' },
                { rule: 'Store in individual bags or drawers', detail: 'Avoid tossing all chains and kadas in a single tray where they rub against each other. Use small individual zip-locks or separate compartments.' },
              ].map((item, i) => (
                <div key={i} className="border p-5" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                  <h3 className="text-sm font-bold mb-2" style={{ color: theme.accent }}>✓ {item.rule}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>{item.detail}</p>
                </div>
              ))
            ) : (
              [
                { rule: 'Remove before contact with water', detail: 'Showers, dishes, swimming, hand-washing — water (especially soapy water) is the #1 enemy of plated jewellery. The chemicals in soap and chlorine attack plating directly.' },
                { rule: 'Apply perfume BEFORE wearing jewellery', detail: 'Spray perfume, deodorant, and body mist first. Wait 30 seconds for it to dry. Then put on your jewellery. Alcohol in fragrances strips plating.' },
                { rule: 'Store each piece separately', detail: 'Jewellery pieces rubbing against each other causes friction that wears plating. Use a compartmented box, individual pouches, or even small zip-lock bags.' },
                { rule: 'Wipe after every use', detail: 'Your skin\'s natural oils and sweat are acidic. A quick wipe with a soft cloth after removing jewellery removes these corrosive agents before they damage the piece.' },
                { rule: 'Keep away from sunlight when stored', detail: 'Direct sunlight for extended periods can discolour certain plating and cause CZ stones to develop a yellowish tint over time.' },
                { rule: 'Last on, first off', detail: 'Jewellery should be the last thing you put on when getting dressed and the first thing you remove when getting home. Minimise exposure time.' },
              ].map((item, i) => (
                <div key={i} className="border p-5" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                  <h3 className="text-sm font-bold mb-2" style={{ color: theme.accent }}>✓ {item.rule}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>{item.detail}</p>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Section 8 */}
        <section id="section-8">
          <h2 className="text-xl font-bold font-serif uppercase tracking-widest mb-4 pb-2 border-b" style={{ color: theme.textPrimary, borderColor: theme.cardBorder }}>
            8. When to Spend More vs. Save
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div 
              className="border p-5" 
              style={{ 
                backgroundColor: isMen ? 'rgba(46, 125, 50, 0.04)' : '#F0FDF4', 
                borderColor: isMen ? 'rgba(46, 125, 50, 0.2)' : '#BBF7D0' 
              }}
            >
              <h3 className="text-sm font-bold mb-3" style={{ color: isMen ? '#81C784' : '#166534' }}>💰 Save (Under ₹300)</h3>
              <ul className="space-y-2 text-sm" style={{ color: theme.textSecondary }}>
                {isMen ? (
                  <>
                    <li className="flex items-start gap-2"><span style={{ color: '#81C784' }} className="mt-0.5">→</span>Party and event-specific link chains</li>
                    <li className="flex items-start gap-2"><span style={{ color: '#81C784' }} className="mt-0.5">→</span>Trendy casual bead or paracord wraps</li>
                    <li className="flex items-start gap-2"><span style={{ color: '#81C784' }} className="mt-0.5">→</span>Gym-wear high-grade stainless steel bands</li>
                    <li className="flex items-start gap-2"><span style={{ color: '#81C784' }} className="mt-0.5">→</span>Trendy casual bracelets and quick-wear links</li>
                    <li className="flex items-start gap-2"><span style={{ color: '#81C784' }} className="mt-0.5">→</span>Gifting where trendy looks matter more than pure metal longevity</li>
                  </>
                ) : (
                  <>
                    <li className="flex items-start gap-2"><span style={{ color: '#16A34A' }} className="mt-0.5">→</span>Party and event-specific pieces</li>
                    <li className="flex items-start gap-2"><span style={{ color: '#16A34A' }} className="mt-0.5">→</span>Trendy designs that may go out of style</li>
                    <li className="flex items-start gap-2"><span style={{ color: '#16A34A' }} className="mt-0.5">→</span>Vacation and travel jewellery</li>
                    <li className="flex items-start gap-2"><span style={{ color: '#16A34A' }} className="mt-0.5">→</span>Anklets and seasonal accessories</li>
                    <li className="flex items-start gap-2"><span style={{ color: '#16A34A' }} className="mt-0.5">→</span>Gifting where presentation matters more than longevity</li>
                  </>
                )}
              </ul>
            </div>
            <div 
              className="border p-5" 
              style={{ 
                backgroundColor: theme.alertBg, 
                borderColor: isMen ? 'rgba(201, 169, 110, 0.2)' : 'rgba(236, 72, 153, 0.2)' 
              }}
            >
              <h3 className="text-sm font-bold mb-3" style={{ color: theme.accent }}>💎 Spend More (₹1,000+)</h3>
              <ul className="space-y-2 text-sm" style={{ color: theme.textSecondary }}>
                {isMen ? (
                  <>
                    <li className="flex items-start gap-2"><span style={{ color: theme.accent }} className="mt-0.5">→</span>Daily-wear signature Kada or cuffs</li>
                    <li className="flex items-start gap-2"><span style={{ color: theme.accent }} className="mt-0.5">→</span>Gifts for milestone events (anniversaries, birthdays)</li>
                    <li className="flex items-start gap-2"><span style={{ color: theme.accent }} className="mt-0.5">→</span>Sterling silver chains that hold their value over time</li>
                    <li className="flex items-start gap-2"><span style={{ color: theme.accent }} className="mt-0.5">→</span>Professional, structured accessories for workplace outfits</li>
                    <li className="flex items-start gap-2"><span style={{ color: theme.accent }} className="mt-0.5">→</span>Timeless designs (solid Punjabi kadas, sterling silver thick links)</li>
                  </>
                ) : (
                  <>
                    <li className="flex items-start gap-2"><span style={{ color: theme.accent }} className="mt-0.5">→</span>Daily-wear signature pieces</li>
                    <li className="flex items-start gap-2"><span style={{ color: theme.accent }} className="mt-0.5">→</span>Gifts for someone special (anniversaries, proposals)</li>
                    <li className="flex items-start gap-2"><span style={{ color: theme.accent }} className="mt-0.5">→</span>Sterling silver pieces that will age gracefully</li>
                    <li className="flex items-start gap-2"><span style={{ color: theme.accent }} className="mt-0.5">→</span>Pieces you want to wear to work every day</li>
                    <li className="flex items-start gap-2"><span style={{ color: theme.accent }} className="mt-0.5">→</span>Timeless designs (solitaires, studs, simple chains)</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </section>

        {/* Section 9 */}
        <section id="section-9">
          <h2 className="text-xl font-bold font-serif uppercase tracking-widest mb-4 pb-2 border-b" style={{ color: theme.textPrimary, borderColor: theme.cardBorder }}>
            9. Common Buyer Mistakes to Avoid
          </h2>
          <div className="space-y-4">
            {isMen ? (
              [
                { mistake: 'Expecting cheap chains to feel like solid gold', lesson: 'A ₹250 plated chain is light zinc alloy. It won\'t have the heavy luxury drop of a ₹50,000 solid gold chain. Expecting precious metal heft at this budget leads to returns.' },
                { mistake: 'Buying standard plated brass for daily active gym wear', lesson: 'Brass and sweat cause rapid green marking and plating loss. For daily gym, sports, or shower accessories, buy high-grade stainless steel.' },
                { mistake: 'Ignoring chain and Kada measurements', lesson: 'A Kada that is too tight or a chain that sits too short looks mismatched. Always measure your wrist diameter and collar size before order.' },
                { mistake: 'Thinking all silver-colored items are sterling silver', lesson: 'Many budget kadas are simple brass or alloy coated in cheap plating. Always check the description explicitly for "925 Sterling Silver" and BIS Hallmark tags.' },
                { mistake: 'Buying the cheapest option without checking durability', lesson: 'Sometimes investing ₹350 on stainless steel saves you from buying three ₹150 alloy items that oxidize within a month.' },
              ].map((item, i) => (
                <div key={i} className="border p-5" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                  <h3 className="text-sm font-bold mb-2" style={{ color: '#EF4444' }}>❌ {item.mistake}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                    <span style={{ color: '#81C784' }}>✅</span> <em style={{ color: theme.textPrimary }}>{item.lesson}</em>
                  </p>
                </div>
              ))
            ) : (
              [
                { mistake: 'Buying based on discount percentage', lesson: 'A "90% off" product isn\'t 90% off. The MRP is inflated. Judge the selling price against what you\'d expect to pay for the materials and design.' },
                { mistake: 'Ignoring review count', lesson: 'A 4.8-star product with 5 reviews is NOT better than a 4.0-star product with 2,000 reviews. The latter is statistically proven. The former could change dramatically with the next 100 buyers.' },
                { mistake: 'Expecting fashion jewellery to last like real jewellery', lesson: 'A ₹200 ring isn\'t built to last 5 years. Expecting that will only lead to disappointment. Budget jewellery is seasonal and rotational by design.' },
                { mistake: 'Not checking return policies before buying', lesson: 'Return windows vary by seller. Some offer 30 days, some offer 10, some offer none. Check BEFORE buying, especially for items where sizing is a concern.' },
                { mistake: 'Buying the "cheapest" option at all costs', lesson: 'Sometimes spending ₹350 on stainless steel saves you from buying three ₹150 alloy pieces that each die within a month. Per-month cost matters more than per-unit cost.' },
              ].map((item, i) => (
                <div key={i} className="border p-5" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
                  <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>❌ {item.mistake}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                    <span style={{ color: '#16A34A' }}>✅</span> <em style={{ color: theme.textPrimary }}>{item.lesson}</em>
                  </p>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Section 10 */}
        <section id="section-10">
          <h2 className="text-xl font-bold font-serif uppercase tracking-widest mb-4 pb-2 border-b" style={{ color: theme.textPrimary, borderColor: theme.cardBorder }}>
            10. Our Recommendation Framework
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: theme.textSecondary }}>
            Every product on FaithVish is evaluated using this framework:
          </p>
          <div className="border p-6" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <div className="space-y-4">
              {[
                { criterion: 'Material Quality', weight: '30%', detail: isMen ? 'Sterling silver and high-grade stainless steel rank highest. Solid metals rank above unspecified alloys.' : 'Sterling silver and stainless steel rank highest. Specified brass ranks above unspecified alloy. Transparent material declarations beat vague "metal" listings.' },
                { criterion: 'Buyer Validation', weight: '25%', detail: isMen ? 'Review count and star rating together. 500+ reviews at 4.0+ is our gold standard. Zero reviews receive explicit flags.' : 'Review count and star rating together. 500+ reviews at 4.0+ is our gold standard. Zero reviews receive explicit flags and caveated recommendations.' },
                { criterion: 'Value for Money', weight: '20%', detail: isMen ? 'Not just the lowest price — the quality-to-price ratio. A ₹350 steel Kada can be much better value than a ₹150 alloy chain.' : 'Not just the lowest price — the best quality-to-price ratio. A ₹350 stainless steel bracelet can be better value than a ₹150 alloy one.' },
                { criterion: 'Design & Versatility', weight: '15%', detail: isMen ? 'How many masculine outfits and occasions the accessory works with. Versatile cuffs rank higher than niche party chains.' : 'How many occasions and outfits the piece works with. Versatile pieces rank higher than narrow-occasion items.' },
                { criterion: 'Brand Track Record', weight: '10%', detail: isMen ? 'The brand\'s history across their full product range on Amazon. Strong brands provide better manufacturing trust.' : 'The brand\'s history across their full product range on Amazon. A strong brand provides quality assurance even for new listings.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 pb-4 border-b last:border-b-0 last:pb-0" style={{ borderColor: theme.cardBorder }}>
                  <span 
                    className="px-2 py-1 text-xs font-bold rounded-sm shrink-0"
                    style={{ backgroundColor: isMen ? 'rgba(201, 169, 110, 0.1)' : 'rgba(236,72,153,0.1)', color: theme.accent }}
                  >
                    {item.weight}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold" style={{ color: theme.textPrimary }}>{item.criterion}</h3>
                    <p className="text-xs mt-1 leading-relaxed" style={{ color: theme.textSecondary }}>{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </article>

      {/* CTA Section */}
      <div className="mt-12 text-center border-2 p-8" style={{ backgroundColor: theme.cardBg, borderColor: isMen ? theme.accent : 'rgba(236,72,153,0.2)' }}>
        <h2 className="text-lg font-bold font-serif uppercase tracking-widest mb-3" style={{ color: theme.textPrimary }}>Ready to Shop?</h2>
        <p className="text-sm mb-6 max-w-lg mx-auto" style={{ color: theme.textSecondary }}>
          Now that you know how to evaluate online jewellery, browse our curated collection — every product has detailed reviews, pros & cons, and honest recommendations.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="px-8 py-3 text-sm font-bold uppercase tracking-[0.2em] rounded-sm transition-all border-2"
            style={{ 
              backgroundColor: theme.accent, 
              color: isMen ? '#1E1E20' : '#ffffff', 
              borderColor: theme.accent 
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
            Browse Collection →
          </Link>
          {!isMen && (
            <Link
              to="/top-rings-under-1000"
              className="px-8 py-3 border-2 text-sm font-bold uppercase tracking-[0.2em] rounded-sm transition-all"
              style={{ 
                backgroundColor: theme.cardBg, 
                color: theme.textSecondary, 
                borderColor: theme.cardBorder 
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
              Best Rings Under ₹1,000
            </Link>
          )}
        </div>
      </div>

      {/* Author & Affiliate Disclaimer */}
      <div className="mt-8 border p-5" style={{ backgroundColor: theme.surfaceBg, borderColor: theme.cardBorder }}>
        <div className="flex items-center gap-3 mb-3">
          <div 
            className="w-10 h-10 rounded-full border flex items-center justify-center shrink-0"
            style={{ 
              backgroundColor: isMen ? 'rgba(201, 169, 110, 0.1)' : 'rgba(236, 72, 153, 0.1)', 
              borderColor: isMen ? 'rgba(201, 169, 110, 0.3)' : 'rgba(236, 72, 153, 0.3)' 
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
          <strong style={{ color: theme.textSecondary }}>Affiliate Disclosure:</strong> FaithVish is a participant in the Amazon Services LLC Associates Program.
          Links across our site are affiliate links — we may earn a small commission when you buy through them. This costs you nothing extra. Our editorial
          analysis is independent and not influenced by commission rates.{' '}
          <Link to="/affiliate-disclosure" className="underline" style={{ color: theme.accent }}>Full disclosure →</Link>
        </p>
      </div>

      {/* Back button */}
      <div className="text-center mt-10 mb-8">
        <Link
          to="/"
          className="px-8 py-3 text-sm font-bold uppercase tracking-widest border-2 rounded-sm transition-all"
          style={{ 
            backgroundColor: theme.cardBg, 
            color: theme.textSecondary, 
            borderColor: theme.cardBorder 
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

export default BuyingGuidePage;
