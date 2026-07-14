//components
import NavBard from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';


//React
import { useState, useEffect } from "react";
import api from "../../../backend/src/api/api.js";

function AdminDashBoard(){
      //State
    const [reports, setReports] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(5);
    const [limit, setLimit] = useState(12);
    
    //Handle change status

    async function handleStatusChange(reportId, newStatus){
  
        try{
           await api.patch(`/reports/${reportId}/status`,{
                status:newStatus,
            });

            setReports((currentReports) => 
                currentReports.map((report) =>
                report.report_id === reportId 
                ? {...report, status: newStatus}
                : report
            )
        );
        }catch(error){
            console.log(error.response?.data || error.message);
        }
    }


    useEffect(()=>{
        // Load reports from the backend API
        async function loadReports() {
            try{
                // Fetch reports and routes data
                  const reportsResponse = await api.get("/reports", {
                        params: {
                        page,
                        limit,
                    },
                });

                setTotalPages(reportsResponse.data.pagination.totalPages);
                setReports(reportsResponse.data.reports);
            }catch(error){
                console.log(error.response?.data || error.message);
            }
        }
        loadReports();
    },[page, limit]);

    const getStatusClass = (status) => {
        const statusClasses = {
            pending: "bg-warning text-dark",
            approved: "bg-primary text-white",
            resolved: "bg-success text-white",
            rejected: "bg-danger text-white"
        };

        return statusClasses[status] || "bg-secondary text-white";
    };

    return(
        <>
            <NavBard/>
            <div className="container my-5 admin-dashboard">
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                    <div className="card-header bg-white border-0 px-4 pt-4 pb-3">
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                            <div>
                            <span className="badge text-bg-success mb-2">
                                Administration
                            </span>

                            <h1 className="fw-bold mb-1">
                                Report Management
                            </h1>

                            <p className="text-muted mb-0">
                                Review reports and update their current status.
                            </p>
                            </div>

                            <span className="badge bg-light text-dark border px-3 py-2">
                            {reports.length} reports displayed
                            </span>
                        </div>
                    </div>

                    <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                        <thead className="table-success">
                            <tr>
                            <th className="px-4 py-3">Route</th>
                            <th className="py-3">Issue</th>
                            <th className="py-3">Date</th>
                            <th className="py-3">Status</th>
                            <th className="px-4 py-3 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {reports.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-5">
                                <h5 className="fw-bold mb-2">No reports found</h5>
                                <p className="text-muted mb-0">
                                    There are no reports available on this page.
                                </p>
                                </td>
                            </tr>
                            ) : (
                            reports.map((report) => (
                                <tr key={report.report_id}>
                                <td className="px-4 py-3">
                                    <span className="fw-semibold">
                                    {report.route_name}
                                    </span>
                                </td>

                                <td className="py-3">
                                    {report.issue_type}
                                </td>

                                <td className="py-3 text-muted">
                                    {new Date(report.created_at).toLocaleDateString(
                                    "en-IE"
                                    )}
                                </td>

                                <td className="py-3">
                                    <span
                                    className={`badge rounded-pill p-2 text-capitalize btn-size ${getStatusClass(
                                        report.status
                                    )}`}
                                    >
                                    {report.status}
                                    </span>
                                </td>

                                <td className="px-4 py-3">
                                    <select
                                    className="form-select form-select-sm ms-auto"
                                    style={{ maxWidth: "150px" }}
                                    value={report.status}
                                    onChange={(e) =>
                                        handleStatusChange(
                                        report.report_id,
                                        e.target.value
                                        )
                                    }
                                    >
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="resolved">Resolved</option>
                                    <option value="rejected">Rejected</option>
                                    </select>
                                </td>
                                </tr>
                            ))
                            )}
                        </tbody>
                        </table>
                    </div>
                    </div>

                    <div className="card-footer bg-white border-0 px-4 py-4">
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

export default AdminDashBoard;