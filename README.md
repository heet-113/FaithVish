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

Open a new terminal window/tab:
```bash
npm run dev
```

## License
MIT License
