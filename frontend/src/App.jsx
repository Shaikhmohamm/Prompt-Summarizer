import React from 'react';
import FileUpload from "./components/FileUpload";
import TextInput from "./components/TextInput";
import './App.css'; // Import the CSS file

function App() {
  return (
    <div className="container">
      <div className="left-section">
        <TextInput />
      </div>
      <div className="right-section">
        <FileUpload />
      </div>
    </div>
  );
}

export default App;
