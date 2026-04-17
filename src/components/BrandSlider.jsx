import React from 'react';

const BrandSlider = () => {
  const stores = [
    'Tanishq', 'CaratLane', 'BlueStone', 'Amazon', 'Flipkart',
    'Myntra', 'Meesho', 'Nykaa', 'Kalyan Jewellers', 'Malabar Gold',
    'PC Jeweller', 'Senco Gold',
  ];

  return (
    <div className="w-full overflow-hidden bg-white py-6 border-y border-border mb-12">
      <p className="text-center text-[10px] font-bold uppercase tracking-[0.3em] text-text-muted mb-4">Shop from Trusted Jewellers</p>
      <div className="flex animate-[scroll_40s_linear_infinite] gap-12 whitespace-nowrap px-12 items-center">
        {[...stores, ...stores, ...stores].map((store, idx) => (
          <div key={idx} className="flex items-center gap-12 group">
            <span className="text-lg font-bold font-serif uppercase tracking-widest text-text-muted group-hover:text-accent transition-colors cursor-default">
              {store}
            </span>
            <div className="w-[1px] h-6 bg-border"></div>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}} />
    </div>
  );
};

export default BrandSlider;
