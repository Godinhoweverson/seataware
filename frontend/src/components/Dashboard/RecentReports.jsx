//APi
import api from "../../../../backend/src/api/api";

//React
import { useEffect, useState } from "react";

function RecentReports(){

    const [reports, setReports] = useState([]);

    useEffect(()=>{
        async function loadLatestReports(){
            try{
                const response = await api.get("/dashboard/latest-reports");
                setReports(response.data.latestReports);
            }catch(error){
                console.log(error.response?.data || error.message);
            }
        }
        loadLatestReports();
    },[]);

    return(
        <>
            <div className="card-body p-4">
                <div className="m-2">
                    <h4 className="mb-3 fw-bold">Latest Reports</h4>
                </div>

                <div className="table-responsive">
                    <table className="table table-hover mb-0">
                        <thead>
                            <tr>
                                <th>Route</th>
                                <th>Issue</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report) =>(
                                <tr key={report.report_id}>
                                    <td>{report.route_name}</td>
                                    <td>{report.issue_type}</td>
                                    <td>
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
                                    </td>
                                    <td>
                                        {new Date(report.created_at).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
    
}

export default RecentReports;

