//Components
import Navbar from "../components/Navbar/NavBar.jsx";
import Footer from "../components/Footer/Footer.jsx"; 

//Icons
import bus from "../assets/BusBlue.png";
import luas from "../assets/2.png";
import trainInter from "../assets/3.png";
import trainComm from "../assets/4.png";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../../backend/src/api/api.js";

function Reports() {
    const [reports, setReports] = useState([]);
    const[routes, setRoutes] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(5);
    const [limit, setLimit] = useState(5);

    useEffect(()=>{
        async function loadReports() {
            try{
                const reportsResponse = await api.get(`/reports?page=${page}&limit=${limit}`);
                const routesResponse = await api.get("/routes");

                setReports(reportsResponse.data.reports);
                setTotalPages(reportsResponse.data.pagination.totalPages);
                setRoutes(routesResponse.data);

                console.log(routesResponse.data[0].route_id);

            }catch(error){
                console.log(error.response?.data || error.message);
            }
        }
        loadReports();
    },[page])

  
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
                        <Link className="issue_btn btn btn-success btn-sm" to="/reportsIssue">Report an Issue</Link>
                    </div>
                </div>
                
            </div>
            <div className="reports_filter container mt-5">
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
                    <input className="form-control mr-sm-2 custom-select" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
            <div className="container mt-5">
                <ul className="row g-4 d-flex justify-content-start align-items-center list-unstyled">
                    <li className="col-auto">All Reports</li>
                    <li className="col-auto">Recent</li>
                    <li className="col-auto">Popular</li>
                    <li className="col-auto">Resolved</li>
                </ul>
            </div>
              <div className="reports-container container my-5">
                {reports.map((report) => {
                   
                    const transport_type = report.transport_type_id;
                    let img = bus; //
                    if(transport_type === 2){
                        img = luas;
                    }else if(transport_type === 3){
                        img = trainInter;
                    }else if(transport_type === 4){
                        img = trainComm;
                    }
                    return (
                        <div
                        key={report.report_id}
                        className="report d-flex align-items-start gap-4 w-100 py-3 border-bottom"
                        >
                        <div className="transport-icon flex-shrink-0">
                            <img src={img} alt="Bus icon" width="80" />
                        </div>

                        <div className="transport-info flex-grow-1">
                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-2 mb-2">
                            <h5 className="fw-bold mb-0">
                                {report.route_name}
                            </h5>

                            <span className="rounded fw-bold text-center px-2 py-1 small bg-warning text-dark">
                                {report.status}
                            </span>
                            </div>

                            <p className="text-muted mb-2">{report.description}</p>

                            <p className="text-muted small mb-0">
                            {new Date(report.incident_datetime).toLocaleString()}
                            </p>
                        </div>
                        </div>
                    );
                })}
            </div>
            <div className="pagination d-flex justify-content-center align-items-center gap-2 my-4">
                <p className="fw-bold mb-0 cursor-pointer" disabled={page === 1} onClick={() => setPage(page - 1)}>
                    Previous
                </p>
                <span className="fw-bold"> {page} of {totalPages}</span>
                <p className="fw-bold mb-0 cursor-pointer" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                     Next
                </p>
            </div> 
            <Footer/>
        </>
    )
}   

export default Reports; 