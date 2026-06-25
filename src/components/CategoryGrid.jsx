/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { Link } from 'react-router-dom';
import { JEWELRY_CATEGORIES } from '../utils/constants';
import useStore from '../store/useStore';

// Category image map
const CATEGORY_IMAGES = {
  Rings: '/categories/rings.jpg',
  Necklaces: '/categories/necklaces.jpg',
  Earrings: '/categories/earrings.jpg',
  Bracelets: '/categories/bracelets.jpg',
  Bangles: '/categories/bangles.jpg',
  Pendants: '/categories/pendants.jpg',
  Anklets: '/categories/anklets.jpg',
  Mangalsutra: '/categories/mangalsutra.jpg',
  'Jewelry Sets': '/categories/jewelry_sets.jpg',
};

const CategoryGrid = () => {
  const { products, activeGender } = useStore();

  const getCategoryCount = (category) => {
    return products.filter((p) => p.category === category && p.gender === activeGender).length;
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {JEWELRY_CATEGORIES.map((cat) => (
        <Link
          key={cat}
          to={`/categories/${encodeURIComponent(cat)}`}
          className="category-editorial-card"
          style={{ aspectRatio: '3 / 4' }}
          id={`category-btn-${cat}`}
        >
          <img
            src={CATEGORY_IMAGES[cat]}
            alt={cat}
            className="cat-card-image"
            loading="lazy"
          />
          <div className="cat-card-overlay">
            <span className="cat-card-label">{cat}</span>
            <span className="cat-card-count">
              {getCategoryCount(cat)} piece{getCategoryCount(cat) !== 1 ? 's' : ''}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryGrid;
