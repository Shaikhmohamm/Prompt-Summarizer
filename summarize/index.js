const express = require('express');
const {getSummary, getSummaryFromFile} = require('./controller/summaryController.js')
const multer = require('multer');
const cors = require('cors')

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });



const app = express();
const port = 3000;  // Change to any preferred port

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// just for testing purpose
app.get('/', (req,res)=>{
  res.json({message: "successfully landed to server"})
})
// Route to handle the POST request
app.post('/api/generate', getSummary );


// for .txt file to get the summary
app.post('/api/upload', upload.single('file'),getSummaryFromFile)

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
