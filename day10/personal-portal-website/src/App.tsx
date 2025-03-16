import type React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import ProjectsPage from "./pages/ProjectsPage/ProjectsPage";
import ComponentsPage from "./pages/ComponentsPage/ComponentsPage";
import LowCodePage from "./pages/LowCodePage/LowCodePage";
import ApiPage from "./pages/ApiPage/ApiPage";
import VisualPage from "./pages/VisualPage/VisualPage";
import BlogPage from './pages/BlogPage/BlogPage'
import "./styles/app.scss";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/components" element={<ComponentsPage />} />
            <Route path="/lowcode" element={<LowCodePage />} />
            <Route path="/api" element={<ApiPage />} />
            <Route path="/visual" element={<VisualPage />} />
            <Route path="/blog" element={<BlogPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
