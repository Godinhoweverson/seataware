//Components
import Navbar from "../components/Navbar/NavBar.jsx";
import Footer from "../components/Footer/Footer.jsx";

import api from "../../../backend/src/api/api.js";

//React
import { useState } from "react";
import { useEffect } from "react";  

//Leaflet
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function Map() {
  //State for reports
  const [reports, setReports] = useState([]);
  //Load reports
  useEffect(() => {
    async function loadReports() {
      try { 
        const response = await api.get("/reports");
        setReports(response.data.reports);
        console.log(response.data);
        console.log(response.data.reports);
        console.log(Array.isArray(response.data.reports));
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    }
    loadReports();
  }, []);

  return (
    <>
      <Navbar />
      <div className="map-heading container my-5">
        <div className="row g-4">
          <div className="col-12 col-xl-3 bg-light p-4 rounded shadow-sm">
            <h1 className=" fw-bold text-dark">Reports Map</h1>
            <small className="text-muted">View reported issues across Ireland.</small>
            {/* <div className="mt-4">
              <ul className="list-unstyled">
                <li className="mb-4 d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <span className="badge bg-success me-2">&nbsp;</span>

                    <div className="d-flex justify-content-between align-items-center">
                      <label className="form-check-label fw-semibold" htmlFor="allReports">
                        All Reports
                      </label>
                    </div>
                  </div>

                  <input
                    type="checkbox"
                    className="form-check-input success-checkbox"
                    id="allReports"
                  />
                </li>

                <li className="mb-4 d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <span className="badge bg-danger me-2">&nbsp;</span>

                    <div>
                      <label className="form-check-label fw-semibold" htmlFor="prioritySeat">
                        Priority Seat
                      </label>
      
                    </div>
                  </div>

                  <input
                    type="checkbox"
                    className="form-check-input success-checkbox"
                    id="prioritySeat"
                  />
                </li>

                <li className="mb-4 d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <span className="badge bg-primary me-2">&nbsp;</span>

                    <div>
                      <label className="form-check-label fw-semibold" htmlFor="overcrowding">
                        Overcrowding
                      </label>
                  
                    </div>
                  </div>

                  <input
                    type="checkbox"
                    className="form-check-input success-checkbox"
                    id="overcrowding"
                  />
                </li>
                 <li className="mb-4 d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <span className="badge bg-secondary me-2">&nbsp;</span>

                    <div>
                      <label className="form-check-label fw-semibold" htmlFor="otherIssues">
                        Other issues
                      </label>
                  
                    </div>
                  </div>

                  <input
                    type="checkbox"
                    className="form-check-input success-checkbox"
                    id="otherIssues"
                  />
                </li>
              </ul>
            </div>
            <div className="mt-5 data-range">
               <label htmlFor="date" className="form-label fw-semibold">
                  Date Range
                </label>
                <input type="datetime-local" id="date" className="form-control"/>
            </div>
            <div className="mt-5 btn-apply">
              <button className="btn btn-success w-100">Apply Filters</button>
            </div> */}
          </div>
          <div className="col-12 col-xl-9">
            <MapContainer 
              center={[53.349805, -6.26031]} 
              zoom={13} 
              style={{ height: "600px", width: "100%"}}
              >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {reports.filter(report => report.latitude && report.longitude)
              .map((report) => (
                <Marker 
                  key={report.report_id}
                  position={[Number(report.latitude), Number(report.longitude)]}
                >
                  <Popup>
                    <strong>{report.route_name}</strong>
                    <br />
                    {report.issue_type}
                    <br />
                    {report.location_name}
                    <br />
                    {report.status}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>          
        </div>
      </div>
      <Footer />
    </>
  )
}               

export default Map;