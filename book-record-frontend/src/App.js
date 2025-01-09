import "./App.css";
import Home from "./pages/home";
import Record from "./pages/record";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/record" element={<Record />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
