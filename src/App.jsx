import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Landing from "./pages/landing/Landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Create from "./pages/create/Create";
import Home from "./pages/home/Home";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<Create />} />
          {/* <Route path="/gallery/:id" element={<GalleryDetail />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
