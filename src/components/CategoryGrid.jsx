import React from 'react';
import { JEWELRY_CATEGORIES } from '../utils/constants';

const getCategoryIcon = (cat) => {
  const commonClasses = "w-6 h-6";
  switch(cat) {
    case 'Rings': return <svg className={commonClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" /></svg>;
    case 'Necklaces': return <svg className={commonClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 22c-4.97 0-9-2.69-9-6v-2c0-3.31 4.03-6 9-6s9 2.69 9 6v2c0 3.31-4.03 6-9 6z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l-1 4h2l-1-4z" /></svg>;
    case 'Earrings': return <svg className={commonClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2v6m0 0a3 3 0 100 6 3 3 0 000-6zm0 6v8m-2 0h4" /></svg>;
    case 'Bracelets': return <svg className={commonClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9" /></svg>;
    case 'Bangles': return <svg className={commonClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="9" strokeWidth={1.5} /><circle cx="12" cy="12" r="5" strokeWidth={1.5} /></svg>;
    case 'Pendants': return <svg className={commonClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2v4m0 0a4 4 0 110 8 4 4 0 010-8zm-3 14l3 4 3-4" /></svg>;
    case 'Anklets': return <svg className={commonClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9 9 0 100-18 9 9 0 000 18z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01" /></svg>;
    case 'Mangalsutra': return <svg className={commonClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>;
    default: return <svg className={commonClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;
  }
};

const CategoryGrid = ({ onCategoryClick, selectedCategory }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-12">
      {JEWELRY_CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryClick(cat)}
          className={`flex flex-col items-center justify-center p-6 bg-white border transition-all duration-200 group relative overflow-hidden ${
            selectedCategory === cat 
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
