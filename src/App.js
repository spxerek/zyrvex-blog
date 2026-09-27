import { HashRouter, Routes, Route } from "react-router-dom";import "./App.css";
import Layout from "./Components/Layout";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Writeups from "./pages/Writeups";
import BugBounty from "./pages/BugBounty";
import About from "./pages/About";

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/writeups" element={<Writeups />} />
          <Route path="/bugbounty" element={<BugBounty />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;