//Components
import Navbar from "../components/Navbar/NavBar.jsx";
import Footer from "../components/Footer/Footer.jsx";

//Images
import reportIssueIllustration from "../assets/report_issue_illustration.png";

function ReportsIssue() {   
    return (    
       <>
        <Navbar />
        
        <div className="container d-flex flex-wrap justify-content-center align-items-start mt-5">
        <div className="col-12 col-md-8 col-lg-8 mb-4">
          <h1>Report an Issue</h1>
          <p>Help us improve public transport by submitting a report.</p>
        
          <form className="report-form  w-75">
            <div className="form-group">
              <label htmlFor="issueType">Issue Type</label>
              <select id="issueType" className="form-control">
                <option value="">Select an issue type</option>
                <option value="delays">Delays</option>
                <option value="cleanliness">Cleanliness</option>
                <option value="safety">Safety</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="location">Route number / Name</label>
              <input type="text" id="location" className="form-control" placeholder="Where did the issue occur?" />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date and Time</label>
              <input type="datetime-local" id="date" className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea id="description" className="form-control" rows="4" placeholder="Describe the issue in detail..."></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit Report</button>
          </form>
          </div>
          <div className="col-12 col-md-4 col-lg-4">
            <img src={reportIssueIllustration} alt="Report Issue Illustration" className="img-fluid rounded" />
          </div>
        </div>
        <Footer/>    
       </> 
    )
}

export default ReportsIssue;