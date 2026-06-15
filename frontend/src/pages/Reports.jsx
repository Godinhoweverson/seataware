//Components
import Navbar from "../components/Navbar/NavBar.jsx";
import Footer from "../components/Footer/Footer.jsx"; 

import { Link } from "react-router-dom";
function Reports() {
    return (
        <>
            <Navbar />
            <div className="reports container mt-5">
                <div className="row">
                    <div className="col-12 col-lg-6 d-flex flex-column justify-content-center align-items-start gap-2 mb-3 mb-lg-0">
                        <div className="reports_header">
                            <h1 className="display-4 fw-bold text-success">Reports</h1>
                            <p>View and manage your reports here.</p>
                        </div>
                    </div>
                    <div className="reports_issue_btn col-12 col-lg-6 d-flex align-items-center justify-content-lg-end mb-3 mb-lg-0">
                        <Link className="issue_btn btn btn-success btn-sm" to="/report-issue">Report an Issue</Link>
                    </div>
                </div>
                
            </div>
            <div className="reports_filter container">
            <div className="row g-4">

                <div className="col-12 col-md-6 col-lg-3">
                <label htmlFor="transportType" className="form-label fw-semibold">
                    Transport Type
                </label>
                <select id="transportType" className="form-select custom-select mt-2">
                    <option>Bus</option>
                    <option>Luas</option>
                    <option>Train</option>
                </select>
                </div>

                <div className="col-12 col-md-6 col-lg-3">
                <label htmlFor="route" className="form-label fw-semibold">
                    Route
                </label>
                <select id="route" className="form-select custom-select mt-2">
                    <option>46A</option>
                    <option>33B</option>
                    <option>3B</option>
                </select>
                </div>

                <div className="col-12 col-md-6 col-lg-3">
                <label htmlFor="issueType" className="form-label fw-semibold">
                    Issue Type
                </label>
                <select id="issueType" className="form-select custom-select mt-2">
                    <option>Occupied Priority Seat</option>
                    <option>Driver Behavior</option>
                    <option>Accessibility Issue</option>
                    <option>Overcrowding</option>
                    <option>Other</option>
                </select>
                </div>

                <div className="col-12 col-md-6 col-lg-3">
                <label htmlFor="dateRange" className="form-label fw-semibold">
                    Date Range
                </label>
                <select id="dateRange" className="form-select custom-select mt-2">
                    <option>All Time</option>
                    <option>Last 24 Hours</option>
                    <option>Last Week</option>
                    <option>Last Month</option>
                </select>
                </div>
            </div>

            </div>
            <div className="container search_reports mt-5">
                <form className="form-inline my-2 my-lg-0 d-flex justify-content-center align-items-center gap-2">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
            <div className="container mt-5">
                <ul className="row g-4 d-flex justify-content-start align-items-center">
                    <li className="col-auto"><p>All Reports</p></li>
                    <li className="col-auto"><p>Recent</p></li>
                    <li className="col-auto"><p>Popular</p></li>
                    <li className="col-auto"><p>Resolved</p></li>
                </ul>
            </div>
            <Footer/>
        </>
    )
}   

export default Reports; 