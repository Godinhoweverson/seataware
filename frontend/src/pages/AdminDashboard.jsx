//components
import NavBard from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';


//React
import { useState, useEffect } from "react";
import api from "../../../backend/src/api/api.js";

function AdminDashBoard(){
      //State
    const [reports, setReports] = useState([]);
    const[routes, setRoutes] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(5);
    const [limit, setLimit] = useState(5);
    
    //Handle change status

    async function handleStatusChange(reportId, newStatus){
  
        try{
           await api.patch(`/reports/${report_id}/status`,{
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

    console.log(status);
    return(
        <>
            <NavBard/>
                <div className="card-body p-4">
                <div className="m-2">
                    <h4 className="mb-3 fw-bold"> Reports</h4>
                </div>

                <div className="table-responsive">
                    <table className="table table-hover mb-0">
                        <thead>
                            <tr> 
                                <th>Route</th>
                                <th>Issue</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report) =>(
                                <tr key={report.report_id}>
                                    <td>{report.route_name}</td>
                                    <td>{report.issue_type}</td>
                                    <td>
                                        {new Date(report.created_at).toLocaleDateString()}
                                    </td>
                                    <td>
                                        <span className="badge bg-warning p-1 rounded">
                                            {report.status}
                                        </span>
                                    </td>
                                    <td>
                                        <select value={reports.status} onChange={(e) =>
                                             handleStatusChange(report.report_id, e.target.value)}>
                                            <option value="pending">Pending</option>
                                            <option value="approved">Approved</option>
                                            <option value="resolved">Resolved</option>
                                            <option value="reject">Reject</option>
                                        </select>
                                    </td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer/>
        </>
        
    )
}

export default AdminDashBoard;