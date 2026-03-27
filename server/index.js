const express = require('express');
const cors = require('cors');
const searchRoutes = require('./routes/search');
const featuredRoutes = require('./routes/featured');
const cache = require('./utils/cache');

const app = express();
const PORT = 3001;

// CORS — allow frontend dev server
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173'],
    methods: ['GET'],
  })
);

app.use(express.json());

// Request logger
app.use((req, res, next) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/search', searchRoutes);
app.use('/api/featured', featuredRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    cache: cache.getStats(),
    uptime: process.uptime(),
  });
});

// Clear cache endpoint
app.get('/api/cache/clear', (req, res) => {
  cache.clear();
  res.json({ message: 'Cache cleared' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`\n🔍 PriceWise Scraping Server`);
  console.log(`   Running on http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/api/health`);
  console.log(`   Search: http://localhost:${PORT}/api/search?q=nike+shoes\n`);
});
