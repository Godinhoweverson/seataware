//Components
import Navbar from "../components/Navbar/NavBar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import MapComponent from "../components/Map/MapComponent.jsx";

import { Link } from "react-router-dom";
function Map() {

  return (
    <>
      <Navbar />
      <div className="map-container container my-5">
          <div className="map-container card border-0 shadow-sm rounded-4 overflow-hidden p-3 p-md-5 d-flex flex-column">
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center w-100 mb-5">
                  <div>
                      <span className="badge text-bg-success mb-2 px-4 py-2">
                          Map
                      </span>
                      <h1 className="fw-bold mb-1">Reports Map</h1>
                      <p className="text-muted mb-0">View reported issues across Ireland.</p>
                  </div>
                  <Link to="/reportsIssue" className="btn btn-success px-4">
                    Report an Issue
                  </Link>
            </div>
            <MapComponent className="map-wrapper"/>
          </div>
      </div>
      <Footer />
    </>
  )
}               

export default Map;