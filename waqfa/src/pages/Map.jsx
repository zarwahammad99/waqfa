import React, { useState } from 'react';

function Map() {
  const centresData = {
    Lahore: [
      { id: 1, name: 'Population Welfare Centre Lahore', lat: 31.5497, lng: 74.3436, phone: '042-123-4567', hours: '9AM-5PM' },
      { id: 2, name: 'Jinnah Hospital FP Clinic', lat: 31.5237, lng: 74.3589, phone: '042-124-5678', hours: '8AM-4PM' },
      { id: 3, name: 'Mayo Hospital Reproductive Health', lat: 31.5287, lng: 74.3178, phone: '042-125-6789', hours: '9AM-5PM' },
      { id: 4, name: 'Fatima Jinnah Hospital FP', lat: 31.5430, lng: 74.3200, phone: '042-126-7890', hours: '8AM-4PM' },
      { id: 5, name: 'Civil Hospital Lahore FP', lat: 31.5550, lng: 74.3150, phone: '042-127-8901', hours: '9AM-5PM' },
    ],
    Karachi: [
      { id: 6, name: 'Population Welfare Centre Karachi', lat: 24.8607, lng: 67.0011, phone: '021-234-5678', hours: '9AM-5PM' },
      { id: 7, name: 'Aga Khan Hospital FP Clinic', lat: 24.8345, lng: 67.0567, phone: '021-235-6789', hours: '8AM-4PM' },
      { id: 8, name: 'Civil Hospital Karachi', lat: 24.8450, lng: 67.0234, phone: '021-236-7890', hours: '9AM-5PM' },
      { id: 9, name: 'Liaquat National FP Services', lat: 24.8200, lng: 67.0400, phone: '021-237-8901', hours: '8AM-4PM' },
    ],
    Faisalabad: [
      { id: 10, name: 'Population Welfare Centre Faisalabad', lat: 31.4180, lng: 72.9790, phone: '041-234-5678', hours: '9AM-5PM' },
      { id: 11, name: 'Allied Hospital FP', lat: 31.4250, lng: 72.9900, phone: '041-235-6789', hours: '8AM-4PM' },
      { id: 12, name: 'DHQ Hospital FP Clinic', lat: 31.4100, lng: 72.9650, phone: '041-236-7890', hours: '9AM-5PM' },
    ],
    Multan: [
      { id: 13, name: 'Population Welfare Centre Multan', lat: 30.1575, lng: 71.4454, phone: '061-234-5678', hours: '9AM-5PM' },
      { id: 14, name: 'Nishtar Hospital FP Services', lat: 30.1650, lng: 71.4567, phone: '061-235-6789', hours: '8AM-4PM' },
      { id: 15, name: 'DHQ Hospital Multan', lat: 30.1500, lng: 71.4300, phone: '061-236-7890', hours: '9AM-5PM' },
    ],
    Rawalpindi: [
      { id: 16, name: 'Population Welfare Centre Rawalpindi', lat: 33.5731, lng: 73.1898, phone: '051-234-5678', hours: '9AM-5PM' },
      { id: 17, name: 'Holy Family Hospital FP', lat: 33.5800, lng: 73.2000, phone: '051-235-6789', hours: '8AM-4PM' },
      { id: 18, name: 'District Hospital Rawalpindi', lat: 33.5650, lng: 73.1800, phone: '051-236-7890', hours: '9AM-5PM' },
    ],
    Peshawar: [
      { id: 19, name: 'Population Welfare Centre Peshawar', lat: 34.0151, lng: 71.5787, phone: '091-234-5678', hours: '9AM-5PM' },
      { id: 20, name: 'Khyber Teaching Hospital FP', lat: 34.0200, lng: 71.5900, phone: '091-235-6789', hours: '8AM-4PM' },
    ],
  };

  const [selectedDistrict, setSelectedDistrict] = useState('Lahore');
  const [selectedCentre, setSelectedCentre] = useState(null);

  const centres = centresData[selectedDistrict] || [];

  const lats = centres.map(c => c.lat);
  const lngs = centres.map(c => c.lng);
  const maxLat = Math.max(...lats);
  const minLat = Math.min(...lats);
  const maxLng = Math.max(...lngs);
  const minLng = Math.min(...lngs);

  const latPadding = Math.abs(maxLat - minLat) * 0.3 || 0.05;
  const lngPadding = Math.abs(maxLng - minLng) * 0.3 || 0.05;

  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${minLng - lngPadding},${minLat - latPadding},${maxLng + lngPadding},${maxLat + latPadding}&layer=mapnik${centres.map(c => `&marker=${c.lat},${c.lng}`).join('')}`;

  return (
    <div className="map-container">
      <div className="map-header-img">
        <img src="/images/image_3.jpeg" alt="Find Centers" />
      </div>

      <div className="map-content">
        <h2>📍 Find Family Planning Centers</h2>
        <p className="subtitle">Select a district to view available centers</p>

        {/* COVERAGE MAP IMAGE - Context visualization */}
        <div className="coverage-map-section">
          <img src="/images/pakistan_coverage_map.png" alt="Coverage Map" className="coverage-map-image" />
        </div>

        <div className="district-selector">
          <label>Select District:</label>
          <select value={selectedDistrict} onChange={(e) => {
            setSelectedDistrict(e.target.value);
            setSelectedCentre(null);
          }}>
            {Object.keys(centresData).map(district => (
              <option key={district} value={district}>
                {district} ({centresData[district].length} centers)
              </option>
            ))}
          </select>
        </div>

        {/* Interactive OpenStreetMap with ALL markers visible */}
        <div className="map-wrapper">
          <p className="map-note">Drag to explore • Click markers for details • Zoom with scroll wheel</p>
          <iframe
            className="map-iframe"
            src={osmEmbedUrl}
            title={`Map of ${selectedDistrict}`}
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="centres-list">
          <h3>✅ Centers in {selectedDistrict} ({centres.length})</h3>
          <div className="centres-grid">
            {centres.map((centre, index) => (
              <div
                key={centre.id}
                className={`centre-item card ${selectedCentre?.id === centre.id ? 'active' : ''}`}
                onMouseEnter={() => setSelectedCentre(centre)}
                onClick={() => setSelectedCentre(centre)}
              >
                <div className="centre-number">{index + 1}</div>
                <h4>{centre.name}</h4>
                <p><strong>📞 Phone:</strong></p>
                <p className="phone-link">
                  <a href={`tel:${centre.phone}`}>{centre.phone}</a>
                </p>
                <p><strong>🕐 Hours:</strong> {centre.hours}</p>
                
                <div className="btn-group">
                  <a 
                    href={`tel:${centre.phone}`}
                    className="btn btn-call"
                  >
                    📞 Call
                  </a>
                  <a 
                    href={`https://maps.google.com/?q=${centre.lat},${centre.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-directions"
                  >
                    🗺️ Directions
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .map-container {
          max-width: 1000px;
        }

        .map-header-img {
          margin-bottom: 2rem;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(233, 95, 157, 0.1);
        }

        .map-header-img img {
          width: 100%;
          height: auto;
          display: block;
        }

        .map-content h2 {
          color: #E95F9D;
          margin-bottom: 0.5rem;
        }

        .subtitle {
          color: #999;
          margin-bottom: 2rem;
        }

        /* COVERAGE MAP SECTION */
        .coverage-map-section {
          margin-bottom: 2rem;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(233, 95, 157, 0.1);
        }

        .coverage-map-image {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 12px;
        }

        .district-selector {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .district-selector label {
          font-weight: 600;
          margin: 0;
          color: #333;
        }

        .district-selector select {
          padding: 0.75rem;
          border: 2px solid #FFB6D9;
          border-radius: 8px;
          font-size: 1rem;
          min-width: 200px;
          cursor: pointer;
          transition: all 0.3s;
          background: white;
          color: #333;
        }

        .district-selector select:focus {
          outline: none;
          border-color: #E95F9D;
          box-shadow: 0 0 0 3px rgba(233, 95, 157, 0.1);
        }

        /* INTERACTIVE MAP */
        .map-wrapper {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 12px rgba(233, 95, 157, 0.1);
          overflow: hidden;
          margin-bottom: 3rem;
          height: 500px;
          border: 2px solid #FFB6D9;
          position: relative;
        }

        .map-note {
          position: absolute;
          top: 10px;
          left: 10px;
          background: rgba(255, 255, 255, 0.95);
          padding: 0.75rem 1rem;
          border-radius: 6px;
          font-size: 0.85rem;
          color: #666;
          font-weight: 500;
          z-index: 10;
          pointer-events: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .map-iframe {
          width: 100%;
          height: 100%;
          border: none;
        }

        .centres-list h3 {
          color: #E95F9D;
          margin-bottom: 1.5rem;
          font-size: 1.3rem;
        }

        .centres-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .centre-item {
          cursor: pointer;
          transition: all 0.3s;
          background: white;
          border-left: 4px solid #FFB6D9;
          position: relative;
          padding: 1.5rem;
        }

        .centre-number {
          position: absolute;
          top: 10px;
          right: 15px;
          background: #E95F9D;
          color: white;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 0.9rem;
        }

        .centre-item:hover,
        .centre-item.active {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(233, 95, 157, 0.25);
          border-left: 4px solid #E95F9D;
          background: #FFF5FA;
        }

        .centre-item h4 {
          color: #E95F9D;
          margin-bottom: 1rem;
          font-size: 1.1rem;
          padding-right: 35px;
        }

        .centre-item p {
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

        .btn-group {
          display: flex;
          gap: 0.75rem;
          margin-top: 1rem;
          flex-wrap: wrap;
        }

        .btn {
          flex: 1;
          min-width: 100px;
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

        .btn-call {
          background: #E95F9D;
        }

        .btn-directions {
          background: #C24891;
        }

        .btn-directions:hover {
          background: #E95F9D;
        }

        .card {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          padding: 1.5rem;
          transition: all 0.3s;
        }

        @media (max-width: 768px) {
          .map-wrapper {
            height: 400px;
            margin-bottom: 2rem;
          }

          .centres-grid {
            grid-template-columns: 1fr;
          }

          .btn-group {
            flex-direction: column;
          }

          .btn {
            min-width: auto;
            width: 100%;
          }

          .district-selector {
            flex-direction: column;
            align-items: flex-start;
          }

          .district-selector select {
            width: 100%;
            min-width: auto;
          }

          .map-note {
            font-size: 0.75rem;
            padding: 0.5rem 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Map;