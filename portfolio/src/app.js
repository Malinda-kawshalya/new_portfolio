
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const path = require('path');
const fs = require('fs');

// Determine if we're in development or production mode
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Port configuration - use environment variable or default to 3000
const PORT = process.env.PORT || 3000;

// Initialize analytics tracking (if needed)
const initAnalytics = () => {
  // You can add analytics initialization code here
  console.log('Analytics initialized');
};

// Configure environment-specific settings
const configureEnvironment = () => {
  // Load environment variables from .env files if in development
  if (dev) {
    try {
      const envPath = path.resolve(process.cwd(), '.env.local');
      if (fs.existsSync(envPath)) {
        console.log('Loading environment variables from .env.local');
        require('dotenv').config({ path: envPath });
      }
    } catch (error) {
      console.warn('Error loading environment variables:', error);
    }
  }
};

// Custom error handler
const handleError = (err) => {
  console.error('Server error:', err);
  process.exit(1); // Exit on server error (optional - remove this for production)
};

// Initialize and start the server
app
  .prepare()
  .then(() => {
    // Configure environment based on NODE_ENV
    configureEnvironment();
    
    // Initialize analytics
    initAnalytics();
    
    // Create the HTTP server
    const server = createServer((req, res) => {
      try {
        // Parse the URL
        const parsedUrl = parse(req.url, true);
        
        // Let Next.js handle the request
        handle(req, res, parsedUrl);
      } catch (err) {
        console.error('Error handling request:', err);
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    });
    
    // Listen on the configured port
    server.listen(PORT, (err) => {
      if (err) {
        handleError(err);
        return;
      }
      
      console.log(`> Ready on http://localhost:${PORT}`);
      console.log(`> Environment: ${process.env.NODE_ENV || 'development'}`);
    });
    
    // Handle server shutdown gracefully
    const handleShutdown = () => {
      console.log('Shutting down server...');
      server.close(() => {
        console.log('Server successfully closed');
        process.exit(0);
      });
      
      // Force close after timeout
      setTimeout(() => {
        console.error('Forced server shutdown after timeout');
        process.exit(1);
      }, 10000);
    };
    
    // Register shutdown handlers
    process.on('SIGTERM', handleShutdown);
    process.on('SIGINT', handleShutdown);
  })
  .catch((err) => {
    handleError(err);
  });