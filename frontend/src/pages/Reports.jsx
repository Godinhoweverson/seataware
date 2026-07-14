//Components
import Navbar from "../components/Navbar/NavBar.jsx";
import Footer from "../components/Footer/Footer.jsx"; 
import Filter from "../components/Filter/Filter.jsx";
import AlertMessage from "../components/AlertMessage/AlertMessage.jsx";

//Icons
import bus from "../assets/BusBlue.png";
import luas from "../assets/2.png";
import trainInter from "../assets/3.png";
import trainComm from "../assets/4.png";

//React
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

//API
import api from "../../../backend/src/api/api.js";

function Reports() {
    //State
    const [reports, setReports] = useState([]);
    const[routes, setRoutes] = useState([]);

    //Pagination
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(5);
    const [limit, setLimit] = useState(5);

    //alert message
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // "success" or "error"

    //Navigate
    const navigate = useNavigate();
    
    //location
    const location = useLocation();

    useEffect(()=>{
        const navigationMessage = location.state?.message

        if(!navigationMessage){
            return;
        }

        setMessage(navigationMessage);
        setMessageType(location.state?.messageType || "success");

        navigate(location.pathname,
            {
                replace: true,
                state: null,
            }
        );
    },[location.pathname, navigate]);

    useEffect(() =>{

        if(!message){
            return;
        }

        const timer = setTimeout(() => {
            setMessage("");
            setMessageType("");
        }, 5000);

        return () => clearTimeout(timer);
    }, [message]);


    useEffect(()=>{
        // Load reports from the backend API
        async function loadReports() {
            try{
                // Fetch reports and routes data
                const reportsResponse = await api.get(`/reports?page=${page}&limit=${limit}`);
                const routesResponse = await api.get("/routes");

                // Update the reports, total pages, and routes state
                setReports(reportsResponse.data.reports);
                setTotalPages(reportsResponse.data.pagination.totalPages);
                setRoutes(routesResponse.data);
            }catch(error){
                console.log(error.response?.data || error.message);
            }
        }
        loadReports();
    },[page])

  
    return (
        <>
            <Navbar />
            {message && (
                <AlertMessage message={message} type={messageType}/>
            )}
            <div className="container my-5">
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden p-2">
                    <div className="card-header bg-white border-0 pt-4 pb-3">
                        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center w-100">
                            <div>
                                <span className="badge text-bg-success mb-2 px-4 py-2">
                                    Reports
                                </span>
                                <h1 className="fw-bold mb-1">Reports</h1>
                                <p className="text-muted mb-0">View and manage your reports here.</p>
                            </div>
                            <Link to="/reportsIssue" className="btn btn-success px-4">
                                Report an Issue
                            </Link>
                        </div>
                    </div>
                    <Filter setReports={setReports} />
                    <div className="reports-container container my-5">
                        {reports.length === 0 ? (
                            <div className="text-center py-5">
                            <h3 className="text-muted">No reports found.</h3>
                            </div>
                        ) : (
                            reports.map((report) => {
                            let img = bus;

                            if (report.transport_type_id === 2) {
                                img = luas;
                            } else if (report.transport_type_id === 3) {
                                img = trainInter;
                            } else if (report.transport_type_id === 4) {
                                img = trainComm;
                            }

                            return (
                                <div
                                    key={report.report_id}
                                    className="report d-flex align-items-start gap-4 w-100 py-3 border-bottom"
                                    >
                                    <div className="transport-icon flex-shrink-0">
                                        <img src={img} alt="Transport" width="80" />
                                    </div>

                                    <div className="transport-info flex-grow-1">
                                        <h5 className="fw-bold mb-2">{report.route_name}</h5>

                                        <p className="text-muted mb-2">
                                        {report.description}
                                        </p>

                                        <p className="text-muted small mb-0">
                                        {new Date(report.incident_datetime).toLocaleString()}
                                        </p>
                                    </div>
                                     <div className="transport-icon flex-shrink-0">
                                            {report.status === "pending" && (
                                            <span className="badge bg-warning rounded-pill p-2 text-capitalize btn-size">
                                                {report.status}
                                            </span>
                                        )}
                                        {report.status === "approved" && (
                                            <span className="badge bg-success rounded-pill p-2 text-capitalize btn-size">
                                                {report.status}
                                            </span>
                                        )}
                                        {report.status === "resolved" && (
                                            <span className="badge bg-primary rounded-pill p-2 text-capitalize btn-size">
                                                {report.status}
                                            </span>
                                        )}
                                        {report.status === "rejected" && (
                                            <span className="badge bg-danger rounded-pill p-2 text-capitalize btn-size">
                                                {report.status}
                                            </span>
                                        )}
                                    </div>
                                  
                                </div>
                            );
                            })
                        )}
                    </div>
                    <div className="card-footer border-0 px-4 py-4 container mb-5 bg-white">
                        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3">
                            <span className="text-muted small">
                            Page {page} of {totalPages}
                            </span>

                            <div className="btn-group">
                            <button
                                type="button"
                                className="btn btn-outline-success"
                                disabled={page === 1}
                                onClick={() => setPage((currentPage) => currentPage - 1)}
                            >
                                Previous
                            </button>

                            <button
                                type="button"
                                className="btn btn-outline-success"
                                disabled={page === totalPages}
                                onClick={() => setPage((currentPage) => currentPage + 1)}
                            >
                                Next
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
            <Footer/>
        </>
    )
}   

export default Reports; 