import { realCostData } from '../data/REAL_PBS_COST_DATA';
import React, { useState } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

function Calculator() {
  const costData = realCostData;

  const [formData, setFormData] = useState({
    province: 'Punjab',
    area: 'urban',
    incomeLevel: 'medium',
    currentExpense: '',
    numKids: 1
  });

  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateCost = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!formData.currentExpense || formData.currentExpense <= 0) {
      newErrors.currentExpense = 'Please enter a valid monthly expense amount';
    }
    if (!formData.numKids || formData.numKids < 1 || formData.numKids > 10) {
      newErrors.numKids = 'Please enter number of kids (1-10)';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const costs = costData[formData.province][formData.area][formData.incomeLevel];
    const numKids = parseInt(formData.numKids);
    
    const childCostMultipliers = {
      Food: 0.25,
      Housing: 0.1,
      Healthcare: 0.2,
      Education: 0.3,
      Transportation: 0.05,
      Utilities: 0.1,
      Other: 0.15
    };

    let childMonthlyCost = 0;
    const childCostBreakdown = {};
    
    Object.entries(costs).forEach(([category, amount]) => {
      const childAmount = amount * (childCostMultipliers[category] || 0);
      childCostBreakdown[category] = childAmount;
      childMonthlyCost += childAmount;
    });

    const totalMonthlyCost = childMonthlyCost * numKids;
    const annual = totalMonthlyCost * 12;
    const total18 = totalMonthlyCost * 216;

    const pieData = Object.entries(childCostBreakdown)
      .filter(([_, value]) => value > 0)
      .map(([category, value]) => ({
        name: category,
        value: Math.round(value * numKids),
      }));

    setResults({
      monthly: Math.round(totalMonthlyCost),
      annual: Math.round(annual),
      total18: Math.round(total18),
      currentExpense: parseInt(formData.currentExpense),
      newExpense: Math.round(parseInt(formData.currentExpense) + totalMonthlyCost),
      numKids: numKids,
      breakdown: costs,
      childCosts: {
        Food: Math.round(childCostBreakdown.Food * numKids),
        Healthcare: Math.round(childCostBreakdown.Healthcare * numKids),
        Education: Math.round(childCostBreakdown.Education * numKids),
        Transportation: Math.round(childCostBreakdown.Transportation * numKids),
      },
      pieData: pieData
    });
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  const COLORS = ['#E95F9D', '#C24891', '#FFB6D9', '#F78FB3', '#D47FB0', '#A0618C', '#8B5A8E'];

  if (results) {
    return (
      <div className="calculator-results">
        <button className="btn" onClick={() => setResults(null)} style={{ marginBottom: '2rem' }}>
          ← Recalculate
        </button>

        <h2>Your Cost Estimate ({results.numKids} kid{results.numKids > 1 ? 's' : ''})</h2>

        <div className="results-grid">
          <div className="result-card card">
            <h3>Monthly Cost</h3>
            <div className="big-number">{formatCurrency(results.monthly)}</div>
            <p className="small-text">Additional monthly expense</p>
          </div>

          <div className="result-card card">
            <h3>Annual Cost</h3>
            <div className="big-number">{formatCurrency(results.annual)}</div>
            <p className="small-text">Per year</p>
          </div>

          <div className="result-card card">
            <h3>Through Age 18</h3>
            <div className="big-number">{formatCurrency(results.total18)}</div>
            <p className="small-text">Total estimated cost</p>
          </div>
        </div>

        <div className="chart-container card">
          <h3>💰 Cost Breakdown by Category (Monthly)</h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={results.pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${formatCurrency(value)}`}
                outerRadius={120}
                fill="#E95F9D"
                dataKey="value"
              >
                {results.pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="comparison card">
          <h3>Household Expense Comparison</h3>
          <div className="comparison-bars">
            <div className="bar-item">
              <label>Current Monthly</label>
              <div className="bar">
                <div className="bar-fill" style={{ width: '40%', background: '#FFB6D9' }}>
                  {formatCurrency(results.currentExpense)}
                </div>
              </div>
            </div>
            <div className="bar-item">
              <label>With {results.numKids} Kid{results.numKids > 1 ? 's' : ''}</label>
              <div className="bar">
                <div className="bar-fill" style={{ width: '60%', background: '#E95F9D' }}>
                  {formatCurrency(results.newExpense)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="breakdown card">
          <h3>Main Cost Categories (Monthly)</h3>
          <div className="breakdown-items">
            {Object.entries(results.childCosts).map(([category, amount]) => (
              amount > 0 && (
                <div key={category} className="breakdown-item">
                  <span>{category}</span>
                  <span className="amount">{formatCurrency(amount)}</span>
                </div>
              )
            ))}
          </div>
        </div>

        <div className="suggestions card">
          <h3>💡 Financial Planning Tips</h3>
          <ul>
            <li>Keep an emergency fund of 3-6 months of household expenses</li>
            <li>Set aside {formatCurrency(results.monthly * 0.2)} monthly for education</li>
            <li>Budget {formatCurrency(results.monthly * 0.15)} monthly for healthcare</li>
            <li>Try to save {formatCurrency(results.monthly * 0.1)} monthly for long-term growth</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="calculator-wrapper">
      <div className="calculator-header-img">
        <img src="/images/image_2.jpeg" alt="Cost Calculator" />
      </div>

      <div className="calculator-layout">
        <div className="calculator-form-container">
          <h2>Calculate the Cost of Having a Child</h2>
          <p className="subtitle">
            Get a personalized estimate based on your location and income level
          </p>

          <form onSubmit={calculateCost} className="calculator-form">
            <div className="form-section">
              <h3>📍 Where do you live?</h3>
              
              <div className="form-group">
                <label>Province</label>
                <select name="province" value={formData.province} onChange={handleChange}>
                  <option>Punjab</option>
                  <option>Sindh</option>
                </select>
              </div>

              <div className="form-group">
                <label>Area Type</label>
                <select name="area" value={formData.area} onChange={handleChange}>
                  <option value="urban">Urban</option>
                  <option value="rural">Rural</option>
                </select>
              </div>
            </div>

            <div className="form-section">
              <h3>💰 Income Level</h3>
              
              <div className="form-group">
                <label>Monthly Income Bracket</label>
                <select name="incomeLevel" value={formData.incomeLevel} onChange={handleChange}>
                  <option value="low">Low (PKR 0 - 50,000)</option>
                  <option value="medium">Medium (PKR 50,001 - 150,000)</option>
                  <option value="high">High (PKR 150,000+)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Current Monthly Household Expense (PKR)</label>
                <input
                  type="number"
                  name="currentExpense"
                  value={formData.currentExpense}
                  onChange={handleChange}
                  placeholder="e.g., 50000"
                  min="0"
                />
                {errors.currentExpense && <div className="error-text">{errors.currentExpense}</div>}
              </div>
            </div>

            <div className="form-section">
              <h3>👶 How Many Kids?</h3>
              
              <div className="form-group">
                <label>Number of Kids to Add</label>
                <div className="kids-selector">
                  {[1, 2, 3, 4, 5].map(num => (
                    <button
                      key={num}
                      type="button"
                      className={`kid-btn ${formData.numKids === num ? 'active' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, numKids: num }))}
                    >
                      {num}
                    </button>
                  ))}
                  <input
                    type="number"
                    name="numKids"
                    value={formData.numKids}
                    onChange={handleChange}
                    min="1"
                    max="10"
                    className="kids-input"
                  />
                </div>
                {errors.numKids && <div className="error-text">{errors.numKids}</div>}
              </div>
            </div>

            <button type="submit" className="btn" style={{ width: '100%', padding: '1rem' }}>
              Calculate Cost
            </button>
          </form>
        </div>

        {/* SIDEBAR IMAGE - Only shows before calculate is clicked */}
        <div className="calculator-sidebar-image">
          <img src="/images/calculator_sidebar_new.png" alt="Family Planning" className="sidebar-img" />
        </div>
      </div>

      <style jsx>{`
        .calculator-wrapper {
          width: 100%;
        }

        .calculator-header-img {
          margin-bottom: 2rem;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(233, 95, 157, 0.1);
        }

        .calculator-header-img img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 12px;
        }

        .calculator-layout {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 2rem;
          align-items: start;
        }

        .calculator-form-container {
          max-width: 600px;
        }

        .calculator-form-container h2 {
          color: #E95F9D;
          margin-bottom: 0.5rem;
        }

        .subtitle {
          color: #999;
          margin-bottom: 2rem;
        }

        .calculator-form {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .form-section {
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid #eee;
        }

        .form-section:last-of-type {
          border-bottom: none;
        }

        .form-section h3 {
          color: #333;
          margin-bottom: 1.5rem;
          font-size: 1.1rem;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #333;
        }

        .form-group select,
        .form-group input {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #FFB6D9;
          border-radius: 6px;
          font-size: 1rem;
          transition: all 0.3s;
          box-sizing: border-box;
        }

        .form-group select:focus,
        .form-group input:focus {
          outline: none;
          border-color: #E95F9D;
          box-shadow: 0 0 0 3px rgba(233, 95, 157, 0.1);
        }

        .kids-selector {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          align-items: center;
        }

        .kid-btn {
          width: 40px;
          height: 40px;
          border: 2px solid #FFB6D9;
          background: white;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          color: #E95F9D;
          transition: all 0.3s;
          font-size: 1rem;
        }

        .kid-btn:hover {
          background: #FFB6D9;
          color: white;
        }

        .kid-btn.active {
          background: #E95F9D;
          color: white;
          border-color: #E95F9D;
        }

        .kids-input {
          width: 60px !important;
          padding: 0.5rem !important;
          text-align: center;
        }

        .error-text {
          color: #c62828;
          font-size: 0.9rem;
          margin-top: 0.5rem;
        }

        /* SIDEBAR IMAGE */
        .calculator-sidebar-image {
          display: flex;
          justify-content: center;
          padding-top: 1rem;
        }

        .sidebar-img {
          width: 100%;
          height: auto;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(233, 95, 157, 0.15);
          max-height: 700px;
          object-fit: cover;
        }

        /* RESULTS PAGE */
        .calculator-results {
          animation: slideIn 0.3s ease-in-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .calculator-results h2 {
          color: #E95F9D;
          margin-bottom: 1.5rem;
        }

        .results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin: 2rem 0;
        }

        .result-card h3 {
          color: #999;
          font-size: 0.9rem;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .big-number {
          font-size: 2.2rem;
          font-weight: bold;
          color: #E95F9D;
          margin-bottom: 0.5rem;
        }

        .small-text {
          color: #999;
          font-size: 0.85rem;
        }

        .chart-container {
          margin: 2rem 0;
        }

        .chart-container h3 {
          color: #E95F9D;
          margin-bottom: 1.5rem;
        }

        .comparison {
          margin: 2rem 0;
        }

        .comparison h3 {
          color: #E95F9D;
          margin-bottom: 1.5rem;
        }

        .comparison-bars {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .bar-item label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .bar {
          height: 40px;
          background: #f0f0f0;
          border-radius: 4px;
          overflow: hidden;
        }

        .bar-fill {
          height: 100%;
          display: flex;
          align-items: center;
          padding: 0 1rem;
          color: white;
          font-weight: bold;
          font-size: 0.9rem;
        }

        .breakdown {
          margin: 2rem 0;
        }

        .breakdown h3 {
          color: #E95F9D;
          margin-bottom: 1.5rem;
        }

        .breakdown-items {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .breakdown-item {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem;
          background: #f9f9f9;
          border-radius: 4px;
        }

        .breakdown-item span:first-child {
          font-weight: 600;
        }

        .breakdown-item .amount {
          color: #E95F9D;
          font-weight: bold;
        }

        .suggestions {
          margin: 2rem 0;
          background: #f0f5ff;
          border-left: 4px solid #E95F9D;
        }

        .suggestions h3 {
          color: #E95F9D;
          margin-bottom: 1rem;
        }

        .suggestions ul {
          list-style: none;
          padding: 0;
        }

        .suggestions li {
          padding: 0.75rem 0;
          border-bottom: 1px solid #e0e0e0;
        }

        .suggestions li:last-child {
          border-bottom: none;
        }

        .card {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          padding: 1.5rem;
        }

        @media (max-width: 1024px) {
          .calculator-layout {
            grid-template-columns: 1fr;
          }

          .calculator-sidebar-image {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .calculator-header-img {
            margin-bottom: 1.5rem;
          }

          .kids-selector {
            gap: 0.25rem;
          }

          .kid-btn {
            width: 36px;
            height: 36px;
            font-size: 0.9rem;
          }

          .kids-input {
            width: 50px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Calculator;