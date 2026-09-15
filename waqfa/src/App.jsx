import React, { useState } from 'react';
import './App.css';

// Import page components
import Home from './pages/Home';
import Calculator from './pages/Calculator';
import Map from './pages/Map';
import Directory from './pages/Directory';
import DataMethodology from './pages/DataMethodology';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="App">
      <header className="navbar">
        <div className="navbar-content">
          <div className="logo" onClick={() => setCurrentPage('home')} style={{ cursor: 'pointer' }}>
            {/* LOGO IMAGE - image_4.jpeg */}
            <img src="/images/image_4.jpeg" alt="WAQFA Logo" className="logo-img" />
            <span className="logo-text">WAQFA</span>
          </div>
          <nav>
            <button 
              className={currentPage === 'home' ? 'nav-btn active' : 'nav-btn'}
              onClick={() => setCurrentPage('home')}
            >
              Home
            </button>
            <button 
              className={currentPage === 'calculator' ? 'nav-btn active' : 'nav-btn'}
              onClick={() => setCurrentPage('calculator')}
            >
              Cost Calculator
            </button>
            <button 
              className={currentPage === 'map' ? 'nav-btn active' : 'nav-btn'}
              onClick={() => setCurrentPage('map')}
            >
              Find Centers
            </button>
            <button 
              className={currentPage === 'directory' ? 'nav-btn active' : 'nav-btn'}
              onClick={() => setCurrentPage('directory')}
            >
              Directory
            </button>
            <button 
              className={currentPage === 'methodology' ? 'nav-btn active' : 'nav-btn'}
              onClick={() => setCurrentPage('methodology')}
            >
              Data & Methods
            </button>
          </nav>
        </div>
      </header>

      <main className="main-content">
        {currentPage === 'home' && <Home onNavigate={setCurrentPage} />}
        {currentPage === 'calculator' && <Calculator />}
        {currentPage === 'map' && <Map />}
        {currentPage === 'directory' && <Directory />}
        {currentPage === 'methodology' && <DataMethodology />}
      </main>

      <footer className="footer">
        <p>WAQFA © 2026 | Family Financial Planning for Pakistan</p>
        <p>Data sourced from Pakistan Bureau of Statistics & Government Health Departments</p>
      </footer>

      <style jsx>{`
        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .logo-img {
          height: 45px;
          width: auto;
          display: block;
          object-fit: contain;
        }

        .logo-text {
          font-size: 1.4rem;
          font-weight: 800;
          color: white;
          letter-spacing: 0.5px;
        }
      `}</style>
    </div>
  );
}

export default App;