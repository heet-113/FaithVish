import React from 'react';

const CATEGORIES = [
  'Electronics', 'Fashion', 'Footwear', 'Clothing', 'Beauty', 
  'Baby', 'Furniture', 'Home & Kitchen', 'Grocery', 'Industrial', 
  'Books', 'Accessories'
];

const getCategoryIcon = (cat) => {
  const commonClasses = "w-6 h-6";
  switch(cat) {
    case 'Electronics': return <svg className={commonClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
    case 'Fashion':
    case 'Clothing': return <svg className={commonClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
    case 'Footwear': return <svg className={commonClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>; 
    case 'Beauty': return <svg className={commonClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    case 'Home & Kitchen':
    case 'Furniture': return <svg className={commonClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
    case 'Books': return <svg className={commonClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
    default: return <svg className={commonClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
  }
};

const CategoryGrid = ({ onCategoryClick, selectedCategory }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryClick(cat)}
          className={`flex flex-col items-center justify-center p-6 bg-white border transition-all duration-200 group relative overflow-hidden ${
            selectedCategory === cat 
              ? 'border-l-4 border-l-accent border-y-border border-r-border shadow-sm' 
              : 'border-border hover:border-l-4 hover:border-l-accent hover:shadow-sm'
          }`}
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

export default CategoryGrid;
