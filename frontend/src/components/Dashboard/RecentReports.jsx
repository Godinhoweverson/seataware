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
            <div className="card shadow-sm">
            <div className="card-header">
                <h5 className="mb-0">Latest Reports</h5>
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
                                    <span className="bdge bg-warning">
                                        {report.status}
                                    </span>
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

