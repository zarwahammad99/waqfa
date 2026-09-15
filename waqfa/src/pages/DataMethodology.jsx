import React, { useState } from 'react';

function DataMethodology() {
  const [activeTab, setActiveTab] = useState('sources');

  return (
    <div className="methodology-page">
      <div className="methodology-header">
        <h1>📊 Our Data & Methodology</h1>
        <p className="subtitle">Transparency in calculation and data sourcing</p>
      </div>

      {/* EDUCATIONAL CARDS */}
      <section className="educational-cards">
        <div className="cards-grid">
          <div className="edu-card">
            <img src="/images/card_financial.png" alt="Financial Awareness" className="card-image" />
            <h3>Financial Awareness</h3>
            <p>Know the real costs before deciding</p>
          </div>
          <div className="edu-card">
            <img src="/images/card_informed.png" alt="Informed Choices" className="card-image" />
            <h3>Informed Choices</h3>
            <p>Make decisions based on data</p>
          </div>
          <div className="edu-card">
            <img src="/images/card_planning.png" alt="Better Planning" className="card-image" />
            <h3>Better Planning</h3>
            <p>Plan your future with confidence</p>
          </div>
        </div>
      </section>

      <div className="tabs">
        <button 
          className={`tab-btn ${activeTab === 'sources' ? 'active' : ''}`}
          onClick={() => setActiveTab('sources')}
        >
          📚 Data Sources
        </button>
        <button 
          className={`tab-btn ${activeTab === 'calculations' ? 'active' : ''}`}
          onClick={() => setActiveTab('calculations')}
        >
          🧮 How We Calculate
        </button>
        <button 
          className={`tab-btn ${activeTab === 'faq' ? 'active' : ''}`}
          onClick={() => setActiveTab('faq')}
        >
          ❓ FAQs
        </button>
      </div>

      {/* DATA SOURCES TAB */}
      {activeTab === 'sources' && (
        <div className="tab-content">
          <section className="source-section">
            <h2>1. Household Expenditure Data</h2>
            <div className="source-card card">
              <h3>📊 Pakistan Bureau of Statistics (PBS)</h3>
              <p><strong>Source:</strong> Household Integrated Economic Survey (HIES) 2024-25</p>
              <p><strong>Sample Size:</strong> 30,123 households across Pakistan</p>
              <p><strong>Coverage:</strong> Punjab, Sindh, KP, Balochistan (Urban & Rural)</p>
              <p><strong>Data Collected:</strong></p>
              <ul>
                <li>Average monthly household income: PKR 82,179</li>
                <li>Average monthly household expenditure: PKR 79,150</li>
                <li>Expenditure breakdown by category (Food, Housing, Health, Education, Transport)</li>
                <li>Income distribution across 3 levels (Low, Medium, High)</li>
              </ul>
              <p><strong>Link:</strong> <a href="https://www.pbs.gov.pk" target="_blank" rel="noopener noreferrer">www.pbs.gov.pk</a></p>
            </div>
          </section>

          <section className="source-section">
            <h2>2. Family Planning Centers</h2>
            <div className="source-card card">
              <h3>🏥 Multiple Government & NGO Sources</h3>
              <p><strong>Sources Include:</strong></p>
              <ul>
                <li><strong>Punjab Population Welfare Department</strong> - Government health clinics</li>
                <li><strong>District Health Offices</strong> - Medical facilities offering family planning</li>
                <li><strong>Rahnuma-FPAP</strong> - NGO clinics specializing in reproductive health</li>
                <li><strong>Hospital Networks:</strong> Sir Ganga Ram, Lady Willingdon, Jinnah, Services Hospital</li>
              </ul>
              <p><strong>Data Updated:</strong> 2024-25</p>
              <p><strong>Information Included:</strong> Contact numbers, addresses, services, operating hours</p>
            </div>
          </section>

          <section className="source-section">
            <h2>3. Child Cost Research</h2>
            <div className="source-card card">
              <h3>📖 International References</h3>
              <ul>
                <li><strong>UNFPA Pakistan</strong> - United Nations Fund for Population Activities</li>
                <li><strong>World Bank Data</strong> - Development indicators for South Asia</li>
                <li><strong>Government of Pakistan Health Reports</strong> - Healthcare cost trends</li>
              </ul>
            </div>
          </section>
        </div>
      )}

      {/* CALCULATIONS TAB */}
      {activeTab === 'calculations' && (
        <div className="tab-content">
          <section className="calc-section">
            <h2>How We Calculate Child Costs</h2>
            
            <div className="calc-card card">
              <h3>Step 1: Base Household Expenses</h3>
              <p>We start with actual PBS data for your location & income level:</p>
              <div className="example">
                <p><strong>Example (Medium Income, Urban Punjab):</strong></p>
                <ul>
                  <li>Food: PKR 29,050/month</li>
                  <li>Housing: PKR 20,360/month</li>
                  <li>Healthcare: PKR 2,640/month</li>
                  <li>Education: PKR 1,960/month</li>
                  <li>Transportation: PKR 4,900/month</li>
                  <li>Utilities: PKR 5,000/month</li>
                  <li>Other: PKR 8,900/month</li>
                </ul>
              </div>
            </div>

            <div className="calc-card card">
              <h3>Step 2: Child Cost Multipliers</h3>
              <p>Not all expenses increase equally when you have a child. We apply category-specific multipliers:</p>
              <div className="multiplier-table">
                <div className="multiplier-row">
                  <span className="category">Food</span>
                  <span className="multiplier">25% of household expense</span>
                  <span className="logic">Child eats proportional amount</span>
                </div>
                <div className="multiplier-row">
                  <span className="category">Housing</span>
                  <span className="multiplier">10% of household expense</span>
                  <span className="logic">Shared space (small additional cost)</span>
                </div>
                <div className="multiplier-row">
                  <span className="category">Healthcare</span>
                  <span className="multiplier">20% of household expense</span>
                  <span className="logic">Regular checkups, vaccinations, medicine</span>
                </div>
                <div className="multiplier-row">
                  <span className="category">Education</span>
                  <span className="multiplier">30% of household expense</span>
                  <span className="logic">School fees, books, supplies (major cost)</span>
                </div>
                <div className="multiplier-row">
                  <span className="category">Transportation</span>
                  <span className="multiplier">5% of household expense</span>
                  <span className="logic">Occasional child transport needs</span>
                </div>
                <div className="multiplier-row">
                  <span className="category">Utilities</span>
                  <span className="multiplier">10% of household expense</span>
                  <span className="logic">Slight increase in water/electricity</span>
                </div>
                <div className="multiplier-row">
                  <span className="category">Other</span>
                  <span className="multiplier">15% of household expense</span>
                  <span className="logic">Miscellaneous child-related costs</span>
                </div>
              </div>
            </div>

            <div className="calc-card card">
              <h3>Step 3: Monthly Cost Calculation</h3>
              <p><strong>Formula:</strong></p>
              <div className="formula">
                <p>Monthly Child Cost = Σ(Base Expense × Multiplier)</p>
                <p>= (29,050 × 0.25) + (20,360 × 0.10) + (2,640 × 0.20) + (1,960 × 0.30) + (4,900 × 0.05) + (5,000 × 0.10) + (8,900 × 0.15)</p>
                <p>= <strong>PKR ~9,087/month for 1 child</strong></p>
              </div>
            </div>

            <div className="calc-card card">
              <h3>Step 4: Multiple Children & Long-term Projections</h3>
              <p><strong>Formula for N children:</strong></p>
              <div className="formula">
                <p>Total Monthly Cost = Monthly Child Cost × Number of Children</p>
                <p>Annual Cost = Monthly Cost × 12</p>
                <p>Total (Through Age 18) = Monthly Cost × 216 months</p>
              </div>
              <p><strong>Example (2 kids):</strong></p>
              <ul>
                <li>Monthly: PKR 9,087 × 2 = PKR 18,174</li>
                <li>Annual: PKR 18,174 × 12 = PKR 218,088</li>
                <li>18 years: PKR 18,174 × 216 = PKR 3,925,584</li>
              </ul>
            </div>

            <div className="calc-card card">
              <h3>Step 5: Household Impact</h3>
              <p><strong>Shows comparison:</strong></p>
              <ul>
                <li>Current monthly household expense</li>
                <li>New expense with additional child(ren)</li>
                <li>Percentage increase in budget needed</li>
              </ul>
            </div>
          </section>
        </div>
      )}

      {/* FAQ TAB */}
      {activeTab === 'faq' && (
        <div className="tab-content">
          <div className="faq-item card">
            <h3>Why does education cost 30% of household expense per child?</h3>
            <p>Education is one of the largest discretionary expenses for families planning additional children. This includes school fees, books, uniforms, transportation, and tutoring - all significant costs from age 5-18.</p>
          </div>

          <div className="faq-item card">
            <h3>Are these costs for Pakistan only?</h3>
            <p>Yes, all data is specific to Pakistan (Punjab and Sindh provinces). Costs vary significantly by province and urban/rural areas, which is why we ask for your location.</p>
          </div>

          <div className="faq-item card">
            <h3>Do these calculations include private school/healthcare?</h3>
            <p>We use average household expenditure data from PBS, which includes both public and private sector spending at the national average. Individual costs may vary based on your choices (government vs. private school, etc.).</p>
          </div>

          <div className="faq-item card">
            <h3>Why only through age 18?</h3>
            <p>Age 18 represents the end of legal guardianship and typical dependency period in Pakistan. Many costs (education, healthcare support) decrease significantly after this point.</p>
          </div>

          <div className="faq-item card">
            <h3>How often is data updated?</h3>
            <p>We use PBS HIES 2024-25 data (most recent official household survey). We update our calculator annually when new data becomes available.</p>
          </div>

          <div className="faq-item card">
            <h3>Can I use this for financial planning?</h3>
            <p>Yes! These are realistic estimates based on official government data. We recommend using this as a starting point for family financial planning discussions with a financial advisor.</p>
          </div>

          <div className="faq-item card">
            <h3>Why is the housing multiplier so low (10%)?</h3>
            <p>Housing costs (rent/mortgage) are largely fixed regardless of family size. An additional child doesn't proportionally increase housing costs like food or education does.</p>
          </div>

          <div className="faq-item card">
            <h3>Are healthcare costs sufficient for emergencies?</h3>
            <p>The 20% multiplier covers routine healthcare (checkups, vaccinations, common medicines). We recommend families maintain an emergency fund for unexpected medical expenses.</p>
          </div>
        </div>
      )}

      <style jsx>{`
        .methodology-page {
          max-width: 1000px;
          width: 100%;
        }

        .methodology-header {
          background: linear-gradient(135deg, #E95F9D, #C24891);
          color: white;
          padding: 3rem 2rem;
          text-align: center;
          border-radius: 8px;
          margin-bottom: 3rem;
        }

        .methodology-header h1 {
          margin: 0 0 0.5rem 0;
          font-size: 2.5rem;
        }

        .methodology-header .subtitle {
          margin: 0;
          font-size: 1.1rem;
          opacity: 0.95;
        }

        /* EDUCATIONAL CARDS */
        .educational-cards {
          margin-bottom: 3rem;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .edu-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(233, 95, 157, 0.15);
          transition: all 0.3s;
        }

        .edu-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(233, 95, 157, 0.25);
        }

        .card-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          display: block;
        }

        .edu-card h3 {
          color: #E95F9D;
          margin: 1.5rem 1.5rem 0.5rem;
          font-size: 1.2rem;
        }

        .edu-card p {
          color: #666;
          margin: 0 1.5rem 1.5rem;
          line-height: 1.6;
        }

        .tabs {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          border-bottom: 2px solid #f0f0f0;
          flex-wrap: wrap;
        }

        .tab-btn {
          padding: 1rem 1.5rem;
          background: none;
          border: none;
          font-size: 1rem;
          font-weight: 600;
          color: #999;
          cursor: pointer;
          border-bottom: 3px solid transparent;
          transition: all 0.3s;
        }

        .tab-btn:hover {
          color: #E95F9D;
        }

        .tab-btn.active {
          color: #E95F9D;
          border-bottom-color: #E95F9D;
        }

        .tab-content {
          animation: fadeIn 0.3s;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .source-section,
        .calc-section {
          margin-bottom: 2rem;
        }

        .source-section h2,
        .calc-section h2 {
          color: #E95F9D;
          margin-bottom: 1.5rem;
          font-size: 1.8rem;
        }

        .source-card,
        .calc-card,
        .faq-item {
          margin-bottom: 1.5rem;
        }

        .source-card h3,
        .calc-card h3,
        .faq-item h3 {
          color: #333;
          margin-top: 0;
          margin-bottom: 1rem;
        }

        .source-card p,
        .calc-card p,
        .faq-item p {
          line-height: 1.8;
          color: #555;
          margin: 0.75rem 0;
        }

        .source-card a {
          color: #E95F9D;
          text-decoration: none;
          font-weight: 600;
        }

        .source-card a:hover {
          text-decoration: underline;
        }

        .source-card ul,
        .calc-card ul {
          margin: 1rem 0;
          padding-left: 1.5rem;
        }

        .source-card li,
        .calc-card li {
          margin: 0.5rem 0;
          line-height: 1.6;
        }

        .example {
          background: #f9f9f9;
          padding: 1rem;
          border-left: 4px solid #E95F9D;
          border-radius: 4px;
          margin: 1rem 0;
        }

        .example p {
          margin: 0.5rem 0;
        }

        .example ul {
          margin: 1rem 0;
        }

        .multiplier-table {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin: 1.5rem 0;
        }

        .multiplier-row {
          display: grid;
          grid-template-columns: 120px 180px 1fr;
          gap: 1rem;
          padding: 0.75rem;
          background: #f9f9f9;
          border-radius: 4px;
          align-items: center;
        }

        .multiplier-row .category {
          font-weight: 600;
          color: #E95F9D;
        }

        .multiplier-row .multiplier {
          font-weight: 600;
          color: #333;
        }

        .multiplier-row .logic {
          color: #666;
          font-size: 0.9rem;
        }

        .formula {
          background: linear-gradient(135deg, #f9f9f9, #f0f5ff);
          padding: 1.5rem;
          border-radius: 8px;
          border-left: 4px solid #E95F9D;
          margin: 1.5rem 0;
          font-family: 'Courier New', monospace;
          line-height: 2;
        }

        .formula p {
          margin: 0.5rem 0;
          color: #333;
        }

        .card {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          padding: 1.5rem;
        }

        @media (max-width: 768px) {
          .methodology-header {
            padding: 2rem 1rem;
          }

          .methodology-header h1 {
            font-size: 1.8rem;
          }

          .cards-grid {
            grid-template-columns: 1fr;
          }

          .tabs {
            flex-direction: column;
            border-bottom: none;
          }

          .tab-btn {
            border-bottom: none;
            border-left: 3px solid transparent;
            padding: 0.75rem 1rem;
          }

          .tab-btn.active {
            border-left-color: #E95F9D;
            border-bottom-color: transparent;
          }

          .multiplier-row {
            grid-template-columns: 1fr;
          }

          .multiplier-row .category {
            display: inline;
            margin-right: 0.5rem;
          }

          .multiplier-row .category::after {
            content: " - ";
          }
        }
      `}</style>
    </div>
  );
}

export default DataMethodology;