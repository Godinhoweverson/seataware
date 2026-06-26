//Components
import Navbar from "../components/NavBar/NavBar.jsx"
import Footer from "../components/Footer/Footer.jsx";
import Form from "../components/Form/Form.jsx";

function ReportsIssue() {

    const form = ( <form className="forms">

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

                      </form>);

    return (    
       <>
        <Navbar />
        <Form title={"Report an Issue"} heading={"Report an Issue"} form={form}/>
        <Footer/>    
       </> 
      )
}

export default ReportsIssue;