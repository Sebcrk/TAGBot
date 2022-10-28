import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [feedback, setFeedback] = useState("")
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const showFeedback = () => {

    return <h3>{feedback}</h3>
  }
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    setUsername("");
    setPassword("");

    const response = await fetch('http://localhost:4200/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
    });

    const content = await response.json();
    
    setLoading(false)
    setFeedback(content)
    setTimeout(() => setFeedback(null), 5000);

  };
  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Bot Form</h1>
      {loading && <h3>Bot is running. Please wait.</h3>}
      {feedback && feedback}
      {!loading && (
        <form onSubmit={onSubmitHandler}>
          <label>Username</label>
          <input
            onChange={({ target }) => {
              setUsername(target.value);
            }}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={({ target }) => {
              setPassword(target.value);
            }}
          />
          <button>Run bot</button>
        </form>
      )}
    </div>
  );
}

export default App;
