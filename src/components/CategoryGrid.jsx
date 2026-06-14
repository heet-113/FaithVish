/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { JEWELRY_CATEGORIES } from '../utils/constants';
import { GiBigDiamondRing, GiDoubleNecklace, GiDropEarrings, GiHeartNecklace } from "react-icons/gi";
import { RiJewelryLine } from "react-icons/ri";

const getCategoryIcon = (cat) => {
  const commonClasses = "w-6 h-6";
  switch (cat) {
    case 'Rings': return <GiBigDiamondRing className={commonClasses} />;
    case 'Necklaces': return <GiDoubleNecklace className={commonClasses} />;
    case 'Earrings': return <GiDropEarrings className={commonClasses} />;
    case 'Bracelets': return <img className={commonClasses} src='/bracelet_icon.png' />;
    case 'Bangles': return <img className={commonClasses} src='/bangle_icon.png' />;
    case 'Pendants': return <GiHeartNecklace className={commonClasses} />;
    case 'Anklets': return <img className={commonClasses} src='/anklet_icon.png' />;
    case 'Mangalsutra': return <img src='/mangalsutra_icon.jpg' className={commonClasses} />;
    case 'Jewelry Sets': return (
      <RiJewelryLine className={commonClasses} />
    );
    default: return <svg className={commonClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;
  }
};

const CategoryGrid = ({ onCategoryClick, selectedCategory }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-12">
      {JEWELRY_CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryClick(cat)}
          className={`flex flex-col items-center justify-center p-3 sm:p-6 bg-white border transition-all duration-200 group relative overflow-hidden ${selectedCategory === cat
            ? 'border-l-4 border-l-accent border-y-border border-r-border shadow-sm'
            : 'border-border hover:border-l-4 hover:border-l-accent hover:shadow-sm'
            }`}
          id={`category-btn-${cat}`}
        >
          <span className={`text-3xl mb-3 transition-colors ${selectedCategory === cat ? 'text-accent' : 'text-text-secondary group-hover:text-accent'}`}>
            {getCategoryIcon(cat)}
          </span>
          <span className={`text-xs font-bold uppercase tracking-widest font-serif transition-colors ${selectedCategory === cat ? 'text-accent' : 'text-text-primary group-hover:text-accent'}`}>
            {cat}
          </span>
        </button>
      ))}
    </div>
  );
};

export { getCategoryIcon };
export default CategoryGrid;
