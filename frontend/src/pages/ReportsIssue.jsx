//Components
import Navbar from "../components/Navbar/NavBar.jsx";
import Footer from "../components/Footer/Footer.jsx";

//Images
import reportIssueIllustration from "../assets/report_issue_illustration.png";

function ReportsIssue() {   
    return (    
       <>
        <Navbar />
          <div className="container my-5 report-form-container">
            <div className="row justify-content-center p-3">
              <div className="col-12 col-xl-10">
                <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                  <div className="row g-0">
                    <div className="col-12 col-lg-7 p-4 p-lg-5">
                      <span className="badge text-bg-success mb-3">
                        Report Issue
                      </span>

                      <h1 className="fw-bold mb-2">
                        Report an Issue
                      </h1>

                      <p className="text-muted mb-4">
                        Help us improve public transport by submitting a report.
                      </p>

                      <form className="report-form">

                        <div className="mb-3">
                          <label htmlFor="issueType" className="form-label fw-semibold">
                            Issue Type
                          </label>
                          <select id="issueType" className="form-select">
                            <option value="">Select an issue type</option>
                            <option value="priority-seat">Priority Seat</option>
                            <option value="overcrowding">Overcrowding</option>
                            <option value="accessibility">Accessibility Issue</option>
                            <option value="driver-behaviour">Driver Behaviour</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="route" className="form-label fw-semibold">
                            Route Number / Name
                          </label>
                          <input
                            type="text"
                            id="route"
                            className="form-control"
                            placeholder="Example: 46A, Green Luas, DART"
                          />
                        </div>

                        <div className="mb-3">
                          <label htmlFor="location" className="form-label fw-semibold">
                            Location
                          </label>
                          <input
                            type="text"
                            id="location"
                            className="form-control"
                            placeholder="Example: Ranelagh stop, O'Connell Street"
                          />
                        </div>

                        <div className="mb-3">
                          <label htmlFor="date" className="form-label fw-semibold">
                            Date and Time
                          </label>
                          <input
                            type="datetime-local"
                            id="date"
                            className="form-control"
                          />
                        </div>

                        <div className="mb-4">
                          <label htmlFor="description" className="form-label fw-semibold">
                            Description
                          </label>
                          <textarea
                            id="description"
                            className="form-control"
                            rows="5"
                            placeholder="Describe what happened..."
                          ></textarea>
                        </div>

                        <button type="submit" className="btn btn-success px-4 py-2 w-100">
                          Submit Report
                        </button>

                      </form>
                    </div>

                    <div className="col-12 col-lg-5 d-none d-lg-block">
                      <img
                        src={reportIssueIllustration}
                        alt="Report Issue Illustration"
                        className="img-fluid h-100 w-100 report-issue-image"
                      />
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        <Footer/>    
       </> 
    )
}

export default ReportsIssue;