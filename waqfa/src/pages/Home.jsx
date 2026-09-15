import React from 'react';

function Home({ onNavigate }) {
  return (
    <div className="home-page">
      {/* BANNER IMAGE */}
      <div className="banner-container">
        <img src="/images/image_1.jpeg" alt="WAQFA Banner" className="banner-image" />
      </div>

      <section className="hero">
        <h1>WAQFA</h1>
        <h2>Understand the Cost of Having a Child</h2>
        <p>
          An AI-backed, data-driven family financial planning platform designed for families in Pakistan.
          Get personalized estimates and find family planning services near you.
        </p>
        
        <div className="hero-buttons">
          <button className="btn" onClick={() => onNavigate('calculator')}>
            💰 Start Calculator
          </button>
          <button className="btn btn-secondary" onClick={() => onNavigate('map')}>
            📍 Find Services
          </button>
        </div>
      </section>

      {/* CLICKABLE FEATURE CARDS */}
      <section className="features">
        <div className="feature-card card clickable" onClick={() => onNavigate('calculator')}>
          <h3>💵 Cost Calculator</h3>
          <p>
            Understand the estimated financial impact of having an additional child 
            based on your location, income, and household situation.
          </p>
          <p className="click-hint">👉 Click to start</p>
        </div>

        <div className="feature-card card clickable" onClick={() => onNavigate('map')}>
          <h3>📍 Find Centers</h3>
          <p>
            Discover family planning centers in your district with contact information, 
            services offered, and opening hours.
          </p>
          <p className="click-hint">👉 Click to view</p>
        </div>

        <div className="feature-card card clickable" onClick={() => onNavigate('calculator')}>
          <h3>💡 Financial Planning</h3>
          <p>
            Get personalized suggestions for emergency funds, education planning, 
            healthcare budgeting, and long-term savings.
          </p>
          <p className="click-hint">👉 Click to explore</p>
        </div>

        <div className="feature-card card clickable" onClick={() => onNavigate('calculator')}>
          <h3>📊 Transparent Data</h3>
          <p>
            All our calculations are based on official government data from PBS, 
            UNFPA, and district health offices.
          </p>
          <p className="click-hint">👉 Click to see data</p>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="info">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Enter Your Information</h3>
            <p>Tell us about your location, income, and household</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Get Your Estimate</h3>
            <p>See the estimated monthly, annual, and total costs</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Plan Your Future</h3>
            <p>Get personalized financial planning suggestions</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Find Support</h3>
            <p>Locate family planning centers and services nearby</p>
          </div>
        </div>
      </section>

      {/* STATISTICS BANNER */}
      <section className="statistics-section">
        <div className="statistics-container">
          <img src="/images/statistics_banner_real.png" alt="Family Planning Statistics" className="statistics-image" />
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="testimonials">
        <h2>Real Stories, Real Impact</h2>
        <p className="testimonials-subtitle">Families who planned ahead</p>
        <div className="testimonial-card card">
          <img src="/images/testimonial_family.png" alt="Family Success Story" className="testimonial-image" />
          <div className="testimonial-content">
            <h3>Planning Ahead Leads to Success</h3>
            <p>
              When families understand the real costs of having children, they can make informed decisions about their future. 
              With proper financial planning and access to family planning services, they achieve their goals and build stable, 
              prosperous families.
            </p>
            <p className="testimonial-stat">Data shows that families with financial plans are more likely to achieve their educational and economic goals.</p>
          </div>
        </div>
      </section>

      <style jsx>{`
        .home-page {
          width: 100%;
        }

        /* BANNER STYLES */
        .banner-container {
          margin-bottom: 3rem;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(233, 95, 157, 0.15);
        }

        .banner-image {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 12px;
        }

        .hero {
          background: linear-gradient(135deg, #E95F9D, #C24891);
          color: white;
          padding: 4rem 2rem;
          text-align: center;
          border-radius: 8px;
          margin-bottom: 3rem;
        }

        .hero h1 {
          font-size: 3.5rem;
          margin-bottom: 0.5rem;
          font-weight: 800;
        }

        .hero h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .hero p {
          font-size: 1.1rem;
          max-width: 700px;
          margin: 0 auto 2rem;
          line-height: 1.6;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .hero .btn {
          font-size: 1.1rem;
          padding: 1rem 2rem;
        }

        /* CLICKABLE CARDS */
        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .feature-card {
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .feature-card.clickable:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(233, 95, 157, 0.25);
          background: #FFF5FA;
        }

        .feature-card h3 {
          color: #E95F9D;
          margin-bottom: 0.5rem;
          font-size: 1.3rem;
        }

        .feature-card p {
          color: #666;
          line-height: 1.6;
          margin: 0.5rem 0;
        }

        .click-hint {
          color: #E95F9D;
          font-weight: 600;
          font-size: 0.9rem;
          margin-top: 1rem !important;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .feature-card.clickable:hover .click-hint {
          opacity: 1;
        }

        .info {
          background: white;
          padding: 3rem 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          margin-bottom: 3rem;
        }

        .info h2 {
          text-align: center;
          margin-bottom: 2rem;
          color: #E95F9D;
          font-size: 2rem;
        }

        .steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }

        .step {
          text-align: center;
        }

        .step-number {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #E95F9D, #C24891);
          color: white;
          border-radius: 50%;
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        .step h3 {
          color: #333;
          margin-bottom: 0.5rem;
        }

        .step p {
          color: #666;
        }

        /* STATISTICS SECTION */
        .statistics-section {
          margin: 3rem 0;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(233, 95, 157, 0.15);
        }

        .statistics-container {
          background: white;
          padding: 1rem;
          border-radius: 12px;
        }

        .statistics-image {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 8px;
        }

        /* TESTIMONIALS SECTION */
        .testimonials {
          background: linear-gradient(135deg, #f0f5ff, #fff5fa);
          padding: 3rem 2rem;
          border-radius: 8px;
          margin-top: 3rem;
        }

        .testimonials h2 {
          text-align: center;
          color: #E95F9D;
          margin-bottom: 0.5rem;
          font-size: 2rem;
        }

        .testimonials-subtitle {
          text-align: center;
          color: #999;
          margin-bottom: 2rem;
        }

        .testimonial-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          align-items: center;
          background: white;
          padding: 2rem;
          border-radius: 8px;
        }

        .testimonial-image {
          width: 100%;
          height: auto;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(233, 95, 157, 0.15);
        }

        .testimonial-content h3 {
          color: #E95F9D;
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .testimonial-content p {
          color: #666;
          line-height: 1.8;
          margin-bottom: 1rem;
        }

        .testimonial-stat {
          background: #f0f5ff;
          padding: 1rem;
          border-left: 4px solid #E95F9D;
          border-radius: 4px;
          font-style: italic;
          color: #555;
        }

        .card {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          padding: 1.5rem;
          transition: all 0.3s;
        }

        @media (max-width: 768px) {
          .banner-container {
            margin-bottom: 2rem;
            border-radius: 8px;
          }

          .hero h1 {
            font-size: 2.5rem;
          }
          .hero h2 {
            font-size: 1.5rem;
          }
          .hero-buttons {
            flex-direction: column;
          }
          .hero .btn {
            width: 100%;
          }

          .testimonial-card {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;