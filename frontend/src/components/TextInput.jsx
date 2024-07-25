import React, { useState } from 'react';
import axios from 'axios';

const TextInput = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted');  // Log to see if the function is triggered

    if (!text) {
      console.log('Text is empty');  // Log to check if the text is empty
      return false;
    }

    setLoading(true);

    try {
      console.log('Sending request to backend');  // Log before sending the request
      const response = await axios.post('http://localhost:3000/api/generate', {
        model: "qwen2:0.5b",
        prompt: text,
        stream: false
      });
      console.log('Response received:', response.data);  // Log the response
      setSummary(response.data); // Adjust based on your backend response
    } catch (error) {
      console.error('Error getting summary:', error);
    } finally {
      setLoading(false);
    }

    setText('');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Enter Text to Summarize</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="10"
          cols="50"
          value={text}
          onChange={handleChange}
          placeholder="Enter your text here"
          style={{ width: '100%', padding: '10px', fontSize: '16px' }}
        />
        <br />
        <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', marginTop: '10px' }}>
          Get Summary
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {summary && !loading && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <h2>Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default TextInput;
