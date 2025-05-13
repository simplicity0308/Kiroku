require('dotenv').config(); 

const express = require('express');
const connectDB = require('./config/db.js');
const app = express();
const port = 3000;


// Logging middleware (view in terminal/console)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Middleware
connectDB(); // Connect to MongoDB
app.use(express.json());  // Parse JSON in request body

// Routes
const showRoutes = require('./routes/Show.routes.js');

// Use routes
app.use('/shows', showRoutes);

// Listen on port 3000
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
