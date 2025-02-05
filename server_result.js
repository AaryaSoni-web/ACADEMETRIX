const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3000;

// Enable CORS to allow requests from frontend
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',  // Your MySQL server host (localhost for local setup)
  user: 'root',  // Your MySQL username
  password: '2006@Aarya',  // Your MySQL password
  database: 'academetrix'  // Your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// API route to fetch data from table 'a'
app.get('/data', (req, res) => {
  const query = 'SELECT * FROM aiml_1st_2023';  // Query to fetch all data from table 'a'
  
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Error fetching data');
    } else {
      res.json(results);  // Send the fetched data as JSON
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
