export const PLATFORM_COLORS = {
  Amazon: {
    bg: 'bg-amazon',
    text: 'text-amazon',
    btn: 'btn-amazon',
    border: 'border-amazon',
    hex: '#FF9900',
  },
  Flipkart: {
    bg: 'bg-flipkart',
    text: 'text-flipkart',
    btn: 'btn-flipkart',
    border: 'border-flipkart',
    hex: '#2874F0',
  },
  Myntra: {
    bg: 'bg-myntra',
    text: 'text-myntra',
    btn: 'btn-myntra',
    border: 'border-myntra',
    hex: '#FF3F6C',
  },
  Snapdeal: {
    bg: 'bg-snapdeal',
    text: 'text-snapdeal',
    btn: 'btn-snapdeal',
    border: 'border-snapdeal',
    hex: '#E40046',
  },
  Shopclues: {
    bg: 'bg-shopclues',
    text: 'text-shopclues',
    btn: 'btn-shopclues',
    border: 'border-shopclues',
    hex: '#6C3483',
  },
  Nykaa: {
    bg: 'bg-[#FC2779]',
    text: 'text-[#FC2779]',
    btn: 'btn-nykaa',
    border: 'border-[#FC2779]',
    hex: '#FC2779',
  },
  Ajio: {
    bg: 'bg-[#2C4152]',
    text: 'text-[#2C4152]',
    btn: 'btn-ajio',
    border: 'border-[#2C4152]',
    hex: '#2C4152',
  },
  Meesho: {
    bg: 'bg-[#F43397]',
    text: 'text-[#F43397]',
    btn: 'btn-meesho',
    border: 'border-[#F43397]',
    hex: '#F43397',
  },
  FirstCry: {
    bg: 'bg-[#FF7043]',
    text: 'text-[#FF7043]',
    btn: 'btn-firstcry',
    border: 'border-[#FF7043]',
    hex: '#FF7043',
  },
  IndiaMART: {
    bg: 'bg-[#2E3192]',
    text: 'text-[#2E3192]',
    btn: 'btn-indiamart',
    border: 'border-[#2E3192]',
    hex: '#2E3192',
  },
  'Tata CliQ': {
    bg: 'bg-[#212121]',
    text: 'text-[#212121]',
    btn: 'btn-tatacliq',
    border: 'border-[#212121]',
    hex: '#212121',
  },
  JioMart: {
    bg: 'bg-[#003873]',
    text: 'text-[#003873]',
    btn: 'btn-jiomart',
    border: 'border-[#003873]',
    hex: '#003873',
  },
  Pepperfry: {
    bg: 'bg-[#FF4500]',
    text: 'text-[#FF4500]',
    btn: 'btn-pepperfry',
    border: 'border-[#FF4500]',
    hex: '#FF4500',
  },
  Croma: {
    bg: 'bg-[#00E9BF]',
    text: 'text-black',
    btn: 'btn-croma',
    border: 'border-[#00E9BF]',
    hex: '#00E9BF',
  },
};

export const CATEGORY_ICONS = {
  Electronics: '🔌',
  Footwear: '👟',
  Clothing: '👕',
  'Home & Kitchen': '🏠',
  Beauty: '💄',
  Books: '📚',
  Baby: '👶',
  Furniture: '🛋️',
  Grocery: '🛒',
  Industrial: '🏗️',
  Fashion: '👗',
  General: '📦',
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

export const getLowestPricePlatform = (platforms) => {
  const inStock = platforms.filter((p) => p.inStock);
  if (inStock.length === 0) return null;
  return inStock.reduce((min, p) => (p.price < min.price ? p : min), inStock[0]);
};

export const getSavingsPercentage = (platforms) => {
  const inStock = platforms.filter((p) => p.inStock);
  if (inStock.length < 2) return 0;
  const prices = inStock.map((p) => p.price);
  const max = Math.max(...prices);
  const min = Math.min(...prices);
  return Math.round(((max - min) / max) * 100);
};
