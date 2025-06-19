require('dotenv').config(); 

const express = require('express');
const connectDB = require('./config/db.js');
const app = express();
const port = 3000;
const cors = require('cors');
const cookieParser = require('cookie-parser');


// Logging middleware (view in terminal/console)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Middleware
connectDB(); // Connect to MongoDB
app.use(express.json());  // Parse JSON in request body
app.use(cookieParser()); // Parse cookies in request
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
    credentials: true // Allow cookies to be sent with requests
}))

// Routes
const showRoutes = require('./routes/Show.routes.js');
const adminRoutes = require('./routes/Admin.routes.js');
const userRoutes = require('./routes/User.routes.js');

// Use routes
app.use('/shows', showRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

// Listen on port 3000
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
