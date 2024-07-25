const axios = require('axios');
const asyncHandler = require('express-async-handler')
const dotenv = require('dotenv')
dotenv.config()

const fs = require('fs');
let baseURL = process.env.baseURL
const apiKey = process.env.apiKey

async function summarizeText(text) {
    const model = 'qwen2:0.5b';
  
    try {
      const response = await axios.post(`${baseURL}/api/generate`, {
        model: model,
        prompt: text,
        stream: false
      }, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });
  
      // Adjust this based on the actual response structure
      return response.data.response || response.data.result || 'No summary found.';
    } catch (error) {
      console.error('Error summarizing text:', error.message);
      if (error.response && error.response.data) {
        console.error('Error details:', error.response.data);
      }
      process.exit(1);
    }
  }


// to get the summary from text

  const getSummary = asyncHandler(async (req, res) => {
    const { model, prompt, stream } = req.body;
  
    try {
      const response = await axios.post('http://localhost:11434/api/generate', {
        model,
        prompt,
        stream
      });
  
      // Send the response back to the client
      res.status(200).json(response.data.response);
    } catch (error) {
      console.error('Error posting to /api/generate:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
        res.status(error.response.status).json(error.response.data);
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  });

    
  // to get the summary from file.txt

  const getSummaryFromFile = asyncHandler(async (req, res) => {
    
    const filePath = req.file.path;
  
    try {
      // Read the text from the uploaded .txt file
      const text = await fs.promises.readFile(filePath, 'utf8');
  
      // Now call the summarizeText function with the extracted text
      const summary = await summarizeText(text);
      res.status(200).json({ summary });
    } catch (error) {
      console.error('Error processing file:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      // Clean up the uploaded file
      fs.unlink(filePath, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }
  });

  module.exports = {getSummary, getSummaryFromFile}