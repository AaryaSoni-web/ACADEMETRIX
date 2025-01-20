const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Import cors package
const app = express();
const port = 3000;

// MongoDB connection URI (replace with your actual URI)
const uri = 'mongodb+srv://aarya4soni:1sJqdoeARNI6dz7J@testresults.twyjy.mongodb.net/testresults?retryWrites=true&w=majority&appName=testresults';

// Define a Mongoose Schema and Model for the results
const resultSchema = new mongoose.Schema({
  Sr_No: Number,
  Enrollment_No: Number,
  Name: String,
  SGPA: Number,
  BAS_101: String,
  BAS_103: String,
  BAS_105: String,
  BMA_110: String,
  BMA_120: String,
  HMC_110: String,
}, { collection: 'result' });  // Ensure collection name is 'result'

const Results = mongoose.model('Results', resultSchema);

// Connect to MongoDB Atlas
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Route to fetch all results
app.get('/api/results', async (req, res) => {
  try {
    console.log('Fetching data...');

    // Fetch data from MongoDB
    const results = await Results.aggregate([
      {
        $addFields: {
          isTarget: {
            $cond: [
              { $eq: ["$Enrollment_No", Number(1801032023)] }, 
              1,  // If the enrollment number matches, set it as 1 (priority)
              0   // Otherwise, set it as 0
            ]
          }
        }
      },
      // Sort by the isTarget field first, ensuring the target enrollment is on top, then by Enrollment_No
      { $sort: { isTarget: -1, Enrollment_No: 1 } }
    ]);

    console.log('Fetched results:', results); // Log the fetched results

    if (results.length === 0) {
      return res.status(404).json({ message: 'No results found' });
    }

    // Send the results back as a response
    res.json(results);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ message: 'Error fetching data. Please try again later.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
