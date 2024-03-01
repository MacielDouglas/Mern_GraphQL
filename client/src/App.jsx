import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Headers from "./components/Headers";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Project from "./pages/Project";

export default function App() {
  return (
    <>
      <Router>
        <Headers />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<Project />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}
