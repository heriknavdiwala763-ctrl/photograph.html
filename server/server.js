/**
 * Pure Node.js Backend Server for Aakar Films
 * No external dependencies required (Native http & fs).
 * Handles API bookings, stores data in inquiries.json, and serves static files.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = path.join(__dirname, '..');
const DB_FILE = path.join(__dirname, 'inquiries.json');

// Initialize database file if not exists
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2));
}

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json'
};

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // API Endpoint: POST /api/book
  if (req.url === '/api/book' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const booking = JSON.parse(body);
        const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8') || '[]');
        data.push(booking);
        fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Booking confirmed at Aakar Films!', data: booking }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Invalid data' }));
      }
    });
    return;
  }

  // API Endpoint: GET /api/book (To view submitted inquiries)
  if (req.url === '/api/book' && req.method === 'GET') {
    const data = fs.readFileSync(DB_FILE, 'utf8') || '[]';
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(data);
    return;
  }

  // Static File Serving
  let filePath = path.join(ROOT_DIR, req.url === '/' ? 'index.html' : req.url);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500);
        res.end('Server Error: ' + err.code);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`🎬 Aakar Films Backend Server running on http://localhost:${PORT}`);
});
