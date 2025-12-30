import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop"; // ✨ 추가됨

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <ScrollToTop /> {/* ✨ 페이지 이동 시 스크롤 초기화 */}
      <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <footer className="py-8 text-center text-sm text-gray-600 border-t border-white/5 mt-auto">
          © 2026 oREoTheCream. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
