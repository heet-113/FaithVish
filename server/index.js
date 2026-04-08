const express = require('express');
const cors = require('cors');
const path = require('path');
const https = require('https');
const searchRoutes = require('./routes/search');
const featuredRoutes = require('./routes/featured');
const cache = require('./utils/cache');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS — allow all origins so the API can be hit easily, or frontend served directly
app.use(cors());

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

// Serve static frontend in production
app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`\n🔍 PriceWise Scraping Server`);
  console.log(`   Running on port ${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/api/health`);
  console.log(`   Search: http://localhost:${PORT}/api/search?q=nike+shoes\n`);

  // Self-ping to keep Render free tier alive
  const RENDER_EXTERNAL_URL = process.env.RENDER_EXTERNAL_URL;
  if (RENDER_EXTERNAL_URL) {
    setInterval(() => {
      https.get(`${RENDER_EXTERNAL_URL}/api/health`, (res) => {
        console.log(`[${new Date().toLocaleTimeString()}] Self-ping status: ${res.statusCode}`);
      }).on('error', (err) => {
        console.error(`[${new Date().toLocaleTimeString()}] Self-ping error:`, err.message);
      });
    }, 14 * 60 * 1000); // 14 minutes
    console.log(`   Self-ping mechanism enabled for ${RENDER_EXTERNAL_URL}\n`);
  }
});
