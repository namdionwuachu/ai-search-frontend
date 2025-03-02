import React, { useState } from "react";
import axios from "axios";

const API_URL = "https://tab6oyjq64.execute-api.us-east-1.amazonaws.com/dev/query"; // Ensure this is correct

function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;
    setResponse("🔎 Searching...");
    setSources([]);
    setLoading(true);
    setError("");

    try {
      const result = await axios.post(
        API_URL,
        { query },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("✅ API Response:", result.data);

      setResponse(result.data.response || "No response received.");
      setSources(Array.isArray(result.data.sources) ? result.data.sources : []);
    } catch (err) {
      console.error("❌ API Request Failed:", err.response || err.message);
      setError(err.response?.data?.error || err.message || "Unknown error");
      setResponse("❌ Error fetching response.");
      setSources([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>🔍 AI-Powered Search</h2>
      
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask a question..."
        style={styles.input}
      />

      <button onClick={handleSearch} disabled={loading} style={styles.button(loading)}>
        {loading ? "Searching..." : "Search"}
      </button>

      {error && <p style={styles.error}>❌ {error}</p>}

      <div style={{ marginTop: "20px" }}>
        <h3>Response:</h3>
        <p style={{ color: response.startsWith("❌") ? "red" : "black" }}>
          {response}
        </p>
      </div>

      <div>
        <h3>Sources:</h3>
        {sources.length > 0 ? (
          <ul>
            {sources.map((s, i) => (
              <li key={i}>
                <strong>{s.title || "Unknown Source"}</strong> <br />
                <small>{s.content ? s.content.slice(0, 150) + "..." : "No content available."}</small>
              </li>
            ))}
          </ul>
        ) : (
          <p>No sources available.</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "auto",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: (loading) => ({
    padding: "10px 20px",
    cursor: loading ? "not-allowed" : "pointer",
    fontSize: "16px",
    backgroundColor: loading ? "#aaa" : "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    transition: "background-color 0.3s",
  }),
  error: {
    color: "red",
    fontWeight: "bold",
    marginTop: "10px",
  },
};

export default App;

