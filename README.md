# Summarizer app

A simple application that gives summary/reply of prompted text or file. Primarily depends on ollama API. 


### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- ollama qwen2:0.5b

### Backend Setup

1. **Clone the Repository**: Start by cloning the Summarizer app
            repository to your local machine.
   ```bash
   git clone https://github.com/Shaikhmohamm/Prompt-Summarizer.git
   ```
   
2. **Navigate to the Backend Directory**: Move into the `summarize` directory of the project.
   ```bash
   cd summarize
   ```

3. **Install Dependencies**: Install the necessary dependencies using npm.
   ```bash
   npm install
   ```

4. **Configure Environment Variables**: Create a `.env` file based on the provided `.env.example` file.
   ```bash
    baseURL='http://localhost:11434'
    apiKey='your api key';


   ```

5. **Start the Server**: Run the backend server.
   ```bash
   node index.js
   ```

6. **Install ollama model**: To run in local system do install ollama qwen2:0.5b in your system 


6. **Test at postman**: for text summary:- http://localhost:3000/api/generate
for .txt file summary:- http://localhost:3000/api/upload

Do replace 3000 with your port