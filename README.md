# FaithVish

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-blue?logo=vercel)](https://faith-vish.vercel.app/)

FaithVish is a modern, editorial-style Indian e-commerce price comparison platform. Instantly search for jewelry products and compare prices across major Indian online retailers to find the best deals.

---

## ✨ Features

- **Comprehensive Price Comparison:** Aggregates jewelry prices from top Indian e-commerce platforms.
- **Curated Categories:** Browse by anklets, bangles, bracelets, earrings, necklaces, pendants, rings, and more.
- **Modern Editorial UI:** Clean, content-focused design with a warm, inviting color palette.
- **Fast & Accurate:** Real-time data fetching ensures up-to-date prices.
- **In-Memory Caching:** Speeds up searches and reduces redundant requests.
- **Guides & Resources:** Buying guides, gifting tips, and jewelry care articles.

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS v4, Zustand, React Router DOM
- **Backend:** Node.js, Express, Axios, Cheerio

## 📦 Project Structure

```
FaithVish/
├── public/                  # Static assets
├── src/
│   ├── assets/              # Images & icons
│   ├── components/          # UI components (Navbar, Footer, etc.)
│   ├── data/products/       # Product data (JSON)
│   ├── pages/               # App pages (Home, About, etc.)
│   ├── store/               # Zustand state management
│   ├── utils/               # Utility functions/constants
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── package.json             # Project metadata & scripts
├── vite.config.js           # Vite configuration
└── ...
```

## 📄 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/faithvish.git
   cd faithvish
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app runs at [http://localhost:5173](http://localhost:5173)

## 🌐 Deployment

FaithVish is deployed on [Vercel](https://vercel.com/). To deploy your own version:

1. Fork this repo and push to your GitHub.
2. Import the project into Vercel and follow the prompts.
3. Set up any required environment variables (if needed).
4. Deploy and get your live URL!

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests for improvements and new features.

## 📜 License

FaithVish is released under the MIT License.

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

## Deployment on Render

This project is configured to be easily deployed as a single Web Service on [Render](https://render.com/).

1. Create a new **Web Service** on Render and connect your repository.
2. Configure the service with the following settings:
   - **Environment**: `Node`
   - **Build Command**: `npm run build:render`
   - **Start Command**: `npm start`
3. Add any necessary environment variables (e.g., `PORT` is automatically provided by Render).
4. Click **Deploy Web Service**. Render will install dependencies, build the frontend, and start the unified Express server serving both the API and the static React app.

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
