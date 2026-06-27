//Components
import Navbar from "../components/Navbar/NavBar.jsx";
import Footer from "../components/Footer/Footer.jsx";

//Icons
import busBlue from "../assets/BusBlue.png";

function Map() {

     // TO be Deleted
    const reports = [
        {
            route: "46A - Ranelagh to City Centre",
            status: "Occupied Priority Seat",
            badgeClass: "bg-success-subtle text-success",
            description:
            "Priority seats were occupied even though other passengers needed them.",
            date: "May 30, 2024, 09:15am",
        },
        {
            route: "14B - Cork to Dublin",
            status: "Occupied Priority Seat",
            badgeClass: "bg-danger-subtle text-danger",
            description:
            "Priority seats were occupied even though other passengers needed them.",
            date: "May 30, 2024, 09:15am",
        },
        {
            route: "46A - Central Park to City Centre",
            status: "Occupied Priority Seat",
            badgeClass: "bg-primary-subtle text-primary",
            description:
            "Priority seats were occupied even though other passengers needed them.",
            date: "May 30, 2024, 09:15am",
        },
    ];
    //***************/

  return (
    <>
      <Navbar />
      <div className="map-heading container my-5">
        <div className="row g-4">
          <div className="col-12 col-xl-3 bg-light p-4 rounded shadow-sm">
            <h1 className=" fw-bold text-dark">Reports Map</h1>
            <small className="text-muted">View reported issues across Ireland.</small>
            <div className="mt-4">
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
            </div>
          </div>
          <div className="col-12 col-xl-9">
            <iframe
              title="Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2381.703187059168!2d-6.260309684178479!3d53.34980597997986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670e9c8b8b8b8b%3A0x8b8b8b8b8b8b8b8b!2sDublin%2C%20Ireland!5e0!3m2!1sen!2sus!4v1623456789012"
              width="100%"      
              height="600"
              rounding="20"
            />
          </div>          
        </div>
      </div>
      <Footer />
    </>
  )
}               

export default Map;