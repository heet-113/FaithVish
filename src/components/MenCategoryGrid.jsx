/* eslint-disable react-refresh/only-export-components */
import { MEN_CATEGORIES, MEN_CATEGORY_LABELS } from '../utils/constants';
import { GiBigDiamondRing } from "react-icons/gi";

const getMenCategoryIcon = (cat) => {
  const cls = "w-6 h-6";
  switch (cat) {
    case 'Rings':
      return (
        <GiBigDiamondRing className={cls} />
      );
    case 'Necklaces': // Chains for men
      return (
        <img src='/chain_icon.png' className={cls} />
      );
    case 'Bracelets':
      return (
        <img src='/menBracelet_icon.png' className={cls} />
      );
    case 'Pendants':
      return (
        <img src='/menPendant_icon.png' className={cls} />
      );
    default:
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      );
  }
};

const MenCategoryGrid = ({ onCategoryClick, selectedCategory }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-12">
      {MEN_CATEGORIES.map((cat) => {
        const isActive = selectedCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onCategoryClick(cat)}
            className="flex flex-col items-center justify-center p-4 sm:p-6 transition-all duration-200 group relative overflow-hidden"
            style={{
              background: isActive ? '#303032' : '#282828',
              border: isActive ? '1px solid #C9A96E' : '1px solid #3A3A3C',
              borderLeft: isActive ? '4px solid #C9A96E' : '1px solid #3A3A3C',
              borderRadius: '2px',
            }}
            id={`men-category-btn-${cat}`}
            onMouseEnter={e => {
              if (!isActive) {
                e.currentTarget.style.borderLeft = '4px solid #C9A96E';
                e.currentTarget.style.background = '#303032';
              }
            }}
            onMouseLeave={e => {
              if (!isActive) {
                e.currentTarget.style.borderLeft = '1px solid #3A3A3C';
                e.currentTarget.style.background = '#282828';
              }
            }}
          >
            {/* Geometric corner accent */}
            <div
              className="absolute top-0 right-0 w-6 h-6"
              style={{
                background: 'linear-gradient(135deg, transparent 50%, rgba(184,167,122,0.15) 50%)',
              }}
            />
            <span
              className="text-3xl mb-3 transition-colors"
              style={{ color: isActive ? '#C9A96E' : '#C9A96E' }}
            >
              {getMenCategoryIcon(cat)}
            </span>
            <span
              className="text-xs font-bold uppercase tracking-widest font-serif transition-colors"
              style={{ color: isActive ? '#C9A96E' : '#F5F5F0' }}
            >
              {MEN_CATEGORY_LABELS[cat] || cat}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export { getMenCategoryIcon };
export default MenCategoryGrid;
