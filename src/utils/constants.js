// Jewelry Categories with display info
export const JEWELRY_CATEGORIES = [
  'Rings', 'Necklaces', 'Earrings', 'Bracelets',
  'Bangles', 'Pendants', 'Anklets', 'Mangalsutra'
];

// Store brand colors (for affiliate badges)
export const STORE_COLORS = {
  Amazon: { hex: '#FF9900', text: '#1a1a1a' },
  Flipkart: { hex: '#2874F0', text: '#ffffff' },
  Myntra: { hex: '#FF3F6C', text: '#ffffff' },
  Meesho: { hex: '#F43397', text: '#ffffff' },
  Tanishq: { hex: '#832729', text: '#ffffff' },
  CaratLane: { hex: '#5C2D91', text: '#ffffff' },
  BlueStone: { hex: '#003366', text: '#ffffff' },
  Nykaa: { hex: '#FC2779', text: '#ffffff' },
};

// Badge colors
export const BADGE_STYLES = {
  Bestseller: { bg: '#2E7D32', text: '#ffffff' },
  Trending: { bg: '#F59E0B', text: '#1a1a1a' },
  'New Arrival': { bg: '#06B6D4', text: '#ffffff' },
  Premium: { bg: '#1C1C1C', text: '#D4AF37' },
  'Limited Edition': { bg: '#9333EA', text: '#ffffff' },
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

export const getDiscountPercentage = (price, originalPrice) => {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
};
