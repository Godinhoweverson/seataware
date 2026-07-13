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
                        </div>
                    );
                    })
                )}
            </div>
            <div className="card-footer border-0 px-4 py-4">
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
            <Footer/>
        </>
    )
}   

export default Reports; 