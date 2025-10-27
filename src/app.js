const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const pino = require('pino')();
const expressPino = require('express-pino-logger')({ logger: pino });

// Import routes
const apiRouter = require('./api/v1');
const path = require('path');

const app = express();

// --- KONFIGURASI CORS (LETAKKAN DI PALING ATAS) ---
// PENTING: 'origin' harus berisi URL FRONTEND Anda, bukan backend
// --- KONFIGURASI CORS ---
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://domain-frontend-anda.com', // <-- GANTI INI nanti dengan domain production Anda
        'http://localhost:3001',           // <-- IZINKAN localhost untuk development
        'http://localhost:3000'            // <-- IZINKAN localhost untuk development
      ]
    : ['http://localhost:3001', 'http://localhost:3000'], // Untuk development lokal
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// --- KONFIGURASI HELMET (Agar tidak bentrok dengan CORS) ---
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "connect-src": ["'self'", process.env.NODE_ENV === 'production' ? 'https://domain-frontend-anda.com' : 'http://localhost:3001']
    }
  }
}));

// Middleware lainnya (URUTAN PENTING)
app.use(expressPino);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Menyajikan file statis dari folder 'uploads'
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check
app.get('/api/health', (req, res) => {
  req.log.info('Health check endpoint hit');
  res.status(200).json({ status: 'OK', message: 'Server is running!' });
});

// API Routes
app.use('/api/v1', apiRouter);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'API endpoint not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  req.log.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

module.exports = app;