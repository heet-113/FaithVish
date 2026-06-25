/* eslint-disable react-refresh/only-export-components */
import { Link } from 'react-router-dom';
import { MEN_CATEGORIES, MEN_CATEGORY_LABELS } from '../utils/constants';
import useStore from '../store/useStore';

// Category image map for men
const MEN_CATEGORY_IMAGES = {
  Rings: '/categories/men_rings.jpg',
  Necklaces: '/categories/men_chains.jpg',
  Bracelets: '/categories/men_bracelets.jpg',
  Pendants: '/categories/men_pendants.jpg',
};

const MenCategoryGrid = () => {
  const { products, activeGender } = useStore();

  const getCategoryCount = (category) => {
    return products.filter((p) => p.category === category && p.gender === activeGender).length;
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
      {MEN_CATEGORIES.map((cat) => {
        const displayLabel = MEN_CATEGORY_LABELS[cat] || cat;
        return (
          <Link
            key={cat}
            to={`/categories/${encodeURIComponent(cat)}`}
            className="category-editorial-card men-variant"
            style={{ aspectRatio: '3 / 4' }}
            id={`men-category-btn-${cat}`}
          >
            <img
              src={MEN_CATEGORY_IMAGES[cat]}
              alt={displayLabel}
              className="cat-card-image"
              loading="lazy"
            />
            <div className="cat-card-overlay">
              <span className="cat-card-label">{displayLabel}</span>
              <span className="cat-card-count">
                {getCategoryCount(cat)} piece{getCategoryCount(cat) !== 1 ? 's' : ''}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default MenCategoryGrid;
