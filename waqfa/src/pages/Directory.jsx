import React, { useState, useMemo } from 'react';

// Move centresData OUTSIDE component so it doesn't change on re-renders
const centresData = {
  Lahore: [
    { id: 1, name: 'Population Welfare Centre Lahore', district: 'Lahore', phone: '042-123-4567', hours: '9AM-5PM' },
    { id: 2, name: 'Jinnah Hospital FP Clinic', district: 'Lahore', phone: '042-124-5678', hours: '8AM-4PM' },
    { id: 3, name: 'Mayo Hospital Reproductive Health', district: 'Lahore', phone: '042-125-6789', hours: '9AM-5PM' },
    { id: 4, name: 'Fatima Jinnah Hospital FP', district: 'Lahore', phone: '042-126-7890', hours: '8AM-4PM' },
    { id: 5, name: 'Civil Hospital Lahore FP', district: 'Lahore', phone: '042-127-8901', hours: '9AM-5PM' },
  ],
  Karachi: [
    { id: 6, name: 'Population Welfare Centre Karachi', district: 'Karachi', phone: '021-234-5678', hours: '9AM-5PM' },
    { id: 7, name: 'Aga Khan Hospital FP Clinic', district: 'Karachi', phone: '021-235-6789', hours: '8AM-4PM' },
    { id: 8, name: 'Civil Hospital Karachi', district: 'Karachi', phone: '021-236-7890', hours: '9AM-5PM' },
    { id: 9, name: 'Liaquat National FP Services', district: 'Karachi', phone: '021-237-8901', hours: '8AM-4PM' },
  ],
  Faisalabad: [
    { id: 10, name: 'Population Welfare Centre Faisalabad', district: 'Faisalabad', phone: '041-234-5678', hours: '9AM-5PM' },
    { id: 11, name: 'Allied Hospital FP', district: 'Faisalabad', phone: '041-235-6789', hours: '8AM-4PM' },
    { id: 12, name: 'DHQ Hospital FP Clinic', district: 'Faisalabad', phone: '041-236-7890', hours: '9AM-5PM' },
  ],
  Multan: [
    { id: 13, name: 'Population Welfare Centre Multan', district: 'Multan', phone: '061-234-5678', hours: '9AM-5PM' },
    { id: 14, name: 'Nishtar Hospital FP Services', district: 'Multan', phone: '061-235-6789', hours: '8AM-4PM' },
    { id: 15, name: 'DHQ Hospital Multan', district: 'Multan', phone: '061-236-7890', hours: '9AM-5PM' },
  ],
  Rawalpindi: [
    { id: 16, name: 'Population Welfare Centre Rawalpindi', district: 'Rawalpindi', phone: '051-234-5678', hours: '9AM-5PM' },
    { id: 17, name: 'Holy Family Hospital FP', district: 'Rawalpindi', phone: '051-235-6789', hours: '8AM-4PM' },
    { id: 18, name: 'District Hospital Rawalpindi', district: 'Rawalpindi', phone: '051-236-7890', hours: '9AM-5PM' },
  ],
  Peshawar: [
    { id: 19, name: 'Population Welfare Centre Peshawar', district: 'Peshawar', phone: '091-234-5678', hours: '9AM-5PM' },
    { id: 20, name: 'Khyber Teaching Hospital FP', district: 'Peshawar', phone: '091-235-6789', hours: '8AM-4PM' },
  ],
};

function Directory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedCentre, setSelectedCentre] = useState(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  const allCentres = useMemo(() => {
    return Object.values(centresData).flat();
  }, [centresData]);

  const filteredCentres = useMemo(() => {
    return allCentres.filter(centre => {
      const matchesDistrict = selectedDistrict === 'All' || centre.district === selectedDistrict;
      const matchesSearch = centre.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           centre.phone.includes(searchTerm);
      return matchesDistrict && matchesSearch;
    });
  }, [allCentres, selectedDistrict, searchTerm]);

  return (
    <div className="directory-container">
      <h2>📋 Family Planning Centers Directory</h2>
      <p className="subtitle">Search and filter centers by district and name</p>

      <div className="directory-controls">
        <div className="filter-group">
          <label>Filter by District:</label>
          <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)}>
            <option value="All">All Districts</option>
            {Object.keys(centresData).map(district => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Search by Name or Phone:</label>
          <input
            type="text"
            placeholder="e.g., 'Mayo Hospital' or '042-'"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="results-info">
        Found {filteredCentres.length} center{filteredCentres.length !== 1 ? 's' : ''}
      </div>

      <div className="centres-directory">
        {filteredCentres.length > 0 ? (
          filteredCentres.map((centre) => (
            <div
              key={centre.id}
              className={`centre-card card ${selectedCentre?.id === centre.id ? 'active' : ''}`}
              onClick={() => setSelectedCentre(centre)}
            >
              <h3>{centre.name}</h3>
              <p><strong>District:</strong> {centre.district}</p>
              <p><strong>📞 Phone:</strong></p>
              <p className="phone-link">
                <a href={`tel:${centre.phone}`}>{centre.phone}</a>
              </p>
              <p><strong>🕐 Hours:</strong> {centre.hours}</p>
              
              <div className="button-group">
                <a href={`tel:${centre.phone}`} className="btn btn-call">📞 Call</a>
                <a 
                  href={`https://maps.google.com/?q=${centre.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-directions"
                >
                  🗺️ Directions
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No centers found matching your search.</p>
            <p>Try different keywords or select "All Districts".</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .directory-container {
          max-width: 1000px;
        }

        .directory-container h2 {
          color: #E95F9D;
          margin-bottom: 0.5rem;
        }

        .subtitle {
          color: #999;
          margin-bottom: 2rem;
        }

        .directory-controls {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 2rem;
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .filter-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #333;
        }

        .filter-group select,
        .filter-group input {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #FFB6D9;
          border-radius: 6px;
          font-size: 1rem;
          box-sizing: border-box;
        }

        .filter-group select:focus,
        .filter-group input:focus {
          outline: none;
          border-color: #E95F9D;
          box-shadow: 0 0 0 3px rgba(233, 95, 157, 0.1);
        }

        .results-info {
          color: #666;
          margin-bottom: 1.5rem;
          font-weight: 500;
        }

        .centres-directory {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .centre-card {
          cursor: pointer;
          transition: all 0.3s;
          position: relative;
        }

        .centre-card:hover,
        .centre-card.active {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(233, 95, 157, 0.25);
          background: #FFF5FA;
        }

        .centre-card h3 {
          color: #E95F9D;
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }

        .centre-card p {
          margin: 0.5rem 0;
          font-size: 0.95rem;
          color: #333;
        }

        .phone-link a {
          color: #E95F9D;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.05rem;
        }

        .phone-link a:hover {
          text-decoration: underline;
          color: #C24891;
        }

        .button-group {
          display: flex;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .btn {
          flex: 1;
          padding: 0.6rem 1rem;
          background: #E95F9D;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          text-align: center;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s;
        }

        .btn:hover {
          background: #C24891;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(233, 95, 157, 0.3);
        }

        .btn-directions {
          background: #C24891;
        }

        .btn-directions:hover {
          background: #E95F9D;
        }

        .no-results {
          grid-column: 1 / -1;
          text-align: center;
          padding: 2rem;
          background: #f9f9f9;
          border-radius: 8px;
          color: #666;
        }

        .card {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          padding: 1.5rem;
          transition: all 0.3s;
          border-left: 4px solid #FFB6D9;
        }

        @media (max-width: 768px) {
          .directory-controls {
            grid-template-columns: 1fr;
          }

          .centres-directory {
            grid-template-columns: 1fr;
          }

          .button-group {
            flex-direction: column;
          }

          .btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default Directory;