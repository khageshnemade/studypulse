const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to parse cookies
app.use(cookieParser());

// CORS setup to allow frontend from specific origins and enable credentials (cookies)
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],  // List of allowed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,  // Allow cookies and authentication headers
}));

// Simulate a login route that sets the refreshToken cookie
app.post('/login', (req, res) => {
  const refreshToken = 'ysuadyasuifdyuuuuusniiiiasudjhi-awudhuawdhqwaduihqawudhuahuuad'; // Generate dynamically in real case

  // Set the refreshToken as a cookie (Secure & HttpOnly in real deployment)
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,  // Prevents JavaScript from accessing the cookie
    secure: process.env.NODE_ENV === 'production',   // Set to true if using HTTPS (needed in production)
    maxAge: 60 * 60 * 24 * 7 * 1000, // 7 days expiration
    sameSite: 'Strict',  // Prevents CSRF attacks
  });

  // Send response back to frontend indicating successful login
  res.status(200).json({ message: 'Login successful' });
});

// Example route to simulate access to the app
app.get('/app', (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  // Print the refreshToken to the console (for debugging)
  console.log("Refresh Token in /app route:", refreshToken);

  // Check if refresh token exists
  if (!refreshToken) {
    return res.status(403).json({ error: 'Authentication required' });
  }

  // If the refresh token exists, access granted
  res.json({ message: 'App page, access granted' });
});

// Route to refresh token using the refreshToken cookie
app.post('/refresh-token', (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  // Print the refreshToken to the console (for debugging)
  console.log("Refresh Token in /refresh-token route:", refreshToken);

  if (!refreshToken) {
    return res.status(403).json({ error: 'No refresh token found' });
  }

  // Simulate token refresh logic
  const newAccessToken = 'newAccessTokenGeneratedFromRefreshToken';

  // Send the new access token back to the client
  res.status(200).json({ token: newAccessToken });
});

// Start the server on port 3001
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
