const axios = require('axios');
const asyncHandler = require('express-async-handler')
const dotenv = require('dotenv')
dotenv.config()

const fs = require('fs');
let baseURL = process.env.baseURL
const apiKey = process.env.apiKey

// Function to pull the model
async function pullModel(model) {
  try {
    const response = await axios.post(`${baseURL}/api/pull`, {
      model: model
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(`Model ${model} pulled successfully.`);
  } catch (error) {
    console.error(`Error pulling model ${model}:`, error.message);
    throw new Error(`Failed to pull model: ${error.message}`);
  }
}

// Function to summarize text using the model
const summarizeText = async (text) => {
  const model = 'qwen2:0.5b';

  // Pull the model first
  await pullModel(model);

  const response = await axios.post(`${baseURL}/api/generate`, {
    model: model,
    prompt: text,
    stream: false
  });
  
  return response.data.response;
};

const getSummary = asyncHandler(async (req, res) => {
  const { model, prompt, stream } = req.body;

  try {
    console.log('Request received for model:', model);
    console.log('Prompt:', prompt);

    // Ensure the model is pulled before generating summary
    await pullModel(model);

    const response = await axios.post(`${baseURL}/api/generate`, {
      model,
      prompt,
      stream
    });

    console.log('Response from external API:', response.data);
    res.status(200).json(response.data);
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

const getSummaryFromFile = asyncHandler(async (req, res) => {
  const filePath = req.file.path;

  try {
    console.log('File path:', filePath);

    const text = await fs.promises.readFile(filePath, 'utf8');
    console.log('File content:', text);

    const summary = await summarizeText(text);
    console.log('Summary:', summary);
    
    res.status(200).json({ response: summary });
  } catch (error) {
    console.error('Error processing file:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    fs.unlink(filePath, (err) => {
      if (err) console.error('Error deleting file:', err);
    });
  }
});

  module.exports = {getSummary, getSummaryFromFile}