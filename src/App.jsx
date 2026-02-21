import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

// Extracted the main portfolio view into a separate sub-component to keep routing clean
function Portfolio() {
  return (
    <>
      {/* Fixed background – sits behind everything at z-index 0 */}
      <div className="bg-layer bg-gradient" />
      <div className="bg-layer bg-noise" />

      {/* Entire page scrolls above the fixed bg */}
      <div className="page-wrapper">
        <Navbar />

        {/* 88px top-pad equals navbar height so first section isn't hidden */}
        <main style={{ paddingTop: '88px' }}>
          <Hero />
          <About />
          <Education />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Portfolio Route */}
        <Route path="/" element={<Portfolio />} />

        {/* Admin Portal Routes */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* Protected Dashboard Route */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
