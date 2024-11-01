// Import necessary packages
require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

// Initialize express app
const app = express();
const port = process.env.PORT || 5000; // Set port from environment variable or default to 5000

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create a MySQL connection for AWS RDS
const db = mysql.createConnection({
  host: process.env.DB_HOST, // AWS RDS endpoint from .env
  user: process.env.DB_USER, // MySQL username from .env
  password: process.env.DB_PASSWORD, // MySQL password from .env
  database: process.env.DB_NAME, // Database name from .env
  port: 3306, // Default MySQL port
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
    return;
  }
  console.log("Connected to AWS RDS MySQL database");
});

// Example route for customer login
app.post("/api/customers/login", (req, res) => {
  const { email, password } = req.body;

  // Example authentication logic (adjust as necessary)
  db.query(
    "SELECT * FROM customers WHERE email = ? AND password = ?",
    [email, password],
    (err, results) => {
      if (err) {
        console.error("Error during query:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (results.length > 0) {
        // Assuming user is found
        res.json({ message: "Login successful!", user: results[0] });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
