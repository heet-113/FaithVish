import React from 'react';

const BrandSlider = () => {
  const brands = [
    { name: 'Nykaa', color: '#FC2779' },
    { name: 'Ajio', color: '#2C4152' },
    { name: 'Myntra', color: '#FF3F6C' },
    { name: 'Meesho', color: '#F43397' },
    { name: 'FirstCry', color: '#FF7043' },
    { name: 'IndiaMART', color: '#2E3192' },
    { name: 'Tata CliQ', color: '#212121' },
    { name: 'JioMart', color: '#003873' },
    { name: 'Pepperfry', color: '#FF4500' },
    { name: 'Amazon', color: '#FF9900' },
    { name: 'Flipkart', color: '#2874F0' },
  ];

  return (
    <div className="w-full overflow-hidden bg-white py-6 border-y border-border mb-12">
      <div className="flex animate-[scroll_40s_linear_infinite] gap-12 whitespace-nowrap px-12 items-center">
        {[...brands, ...brands, ...brands].map((brand, idx) => (
          <div key={idx} className="flex items-center gap-12 group">
            <span className="text-xl font-bold font-serif uppercase tracking-widest text-text-muted group-hover:text-accent transition-colors">
              {brand.name}
            </span>
            <div className="w-[1px] h-6 bg-border"></div>
          </div>
        ))}
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}} />
    </div>
  );
};

export default BrandSlider;
