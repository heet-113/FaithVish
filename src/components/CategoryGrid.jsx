/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { Link } from 'react-router-dom';
import { JEWELRY_CATEGORIES } from '../utils/constants';
import useStore from '../store/useStore';

// Category image map
const CATEGORY_IMAGES = {
  Rings: 'https://images.pexels.com/photos/17593587/pexels-photo-17593587.jpeg',
  Necklaces: 'https://images.pexels.com/photos/23495720/pexels-photo-23495720.jpeg',
  Earrings: 'https://images.pexels.com/photos/7541804/pexels-photo-7541804.jpeg',
  Bracelets: 'https://images.pexels.com/photos/16055236/pexels-photo-16055236.jpeg',
  Bangles: 'https://images.pexels.com/photos/37485307/pexels-photo-37485307.jpeg',
  Pendants: 'https://images.pexels.com/photos/32382447/pexels-photo-32382447.jpeg',
  Anklets: 'https://images.pexels.com/photos/28573578/pexels-photo-28573578.jpeg',
  Mangalsutra: 'https://images.pexels.com/photos/7541802/pexels-photo-7541802.jpeg',
  'Jewelry Sets': 'https://images.pexels.com/photos/7093174/pexels-photo-7093174.jpeg',
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
