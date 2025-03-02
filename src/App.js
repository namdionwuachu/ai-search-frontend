import React, { useState } from "react";
import axios from "axios";

const API_URL = "https://tab6oyjq64.execute-api.us-east-1.amazonaws.com/dev/query"; // Replace with your API Gateway URL

function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [sources, setSources] = useState([]);

  const handleSearch = async () => {
    if (!query) return;
    setResponse("Searching...");

    try {
      const result = await axios.post(API_URL, { query });
      setResponse(result.data.response);
      setSources(result.data.sources);
    } catch (error) {
      setResponse("Error fetching response.");
    }  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto", textAlign: "center" }}>
      <h2>🔍 AI-Powered Search</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask a question..."
        style={{ width: "100%", padding: "10px", marginBottom: "10px", fontSize: "16px" }}
      />
      <button onClick={handleSearch} style={{ padding: "10px 20px", cursor: "pointer", fontSize: "16px" }}>
        Search
      </button>
      <div style={{ marginTop: "20px" }}>
        <h3>Response:</h3>
        <p>{response}</p>
      </div>
      <div>
        <h3>Sources:</h3>
        <ul>{sources.map((s, i) => <li key={i}>{s}</li>)}</ul>
      </div>
    </div>
  );
}


export default App;
