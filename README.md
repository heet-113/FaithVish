# PriceWise

PriceWise is a classic, editorial-style Indian e-commerce price comparison platform. It allows users to search for products and instantly compare prices across major Indian online retailers, helping them find the best deals available. 

## Features

- **Comprehensive Price Comparison**: Aggregates product details and prices from top Indian e-commerce platforms.
- **Featured Categories**: Explore curated, category-specific products directly from the homepage.
- **Classic UI Aesthetic**: A clean, editorial-inspired design focusing on typography and content, utilizing a warm off-white, deep Indian red, and navy blue color palette. 
- **Real-Time Web Scraping**: Fetches live data to ensure pricing accuracy.
- **In-Memory Caching**: Minimizes redundant scraping requests and speeds up search times and rate limits.

## Supported Retailers

PriceWise currently supports searching and comparing products on:
- Amazon India
- Flipkart
- Ajio
- Tata CLiQ
- Croma
- Nykaa
- Snapdeal
- Shopclues

## Tech Stack

**Frontend**:
- React 19
- Vite
- Tailwind CSS v4
- Zustand (State Management)
- React Router DOM

**Backend**:
- Node.js
- Express
- Axios (HTTP client for fetching HTML)
- Cheerio (HTML parsing and scraping)

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd "New folder"
   ```

2. **Install Frontend Dependencies**:
   ```bash
   npm install
   ```

3. **Install Backend Dependencies**:
   ```bash
   cd server
   npm install
   ```

### Running the Application

You will need to run both the backend server and the frontend development server simultaneously.

**Start the Backend Server**:
```bash
cd server
npm run dev
```
The scraping server will run on `http://localhost:3001`.

**Start the Frontend Server**:
Open a new terminal window/tab:
```bash
npm run dev
```
The React app will be available at `http://localhost:5173`.

## API Endpoints

The backend Express server exposes the following main endpoints:

- `GET /api/search?q=<search_term>`: Scrapes and returns price comparison results for the given search query across all supported platforms.
- `GET /api/featured`: Fetches products for featured category sections displayed on the homepage.
- `GET /api/health`: Returns the server status, caching metrics, and uptime.
- `GET /api/cache/clear`: Clears the in-memory scraper cache.

## Project Structure

```text
├── src/                # Frontend React application
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page layouts (HomePage, etc.)
│   ├── services/       # API integration utilities
│   ├── store/          # Zustand state management
│   ├── utils/          # Client-side helper functions
│   └── index.css       # Global Tailwind CSS styles
├── server/             # Node.js/Express backend 
│   ├── index.js        # Server entry point
│   ├── routes/         # Express route handlers
│   ├── scrapers/       # Cheerio scraping logic for each retailer
│   └── utils/          # Server utilities (Caching, etc.)
├── package.json        # Frontend dependencies
└── vite.config.js      # Vite bundler configuration
```

## License
MIT License
