//images
import totalReports from "../../assets/totalReports.png";
import gpsicon from "../../assets/gpsicon.png";
import seat from "../../assets/seat.png";
import busBlue from '../../assets/busBlue.png';

function DashboardCards({stats}){
    return(
        <>
            <div className="row g-4 mb-4">
                        <div className="col-12 col-xl-4">
                          <div className="card border-0 shadow-sm rounded-4 h-100">
                            <div className="card-body d-flex justify-content-between align-items-center p-4">
                              <div>
                                <p className="text-muted fw-semibold mb-1">Total Reports</p>
                                <h2 className="fw-bold mb-1">{stats?.totalReports || 0}</h2>
                                <small className="text-success">All submitted reports</small>
                              </div>
                              <img src={totalReports} alt="Reports" width="72" />
                            </div>
                          </div>
                        </div>
            
                        <div className="col-12 col-xl-4">
                          <div className="card border-0 shadow-sm rounded-4 h-100">
                            <div className="card-body d-flex justify-content-between align-items-center p-4">
                              <div>
                                <p className="text-muted fw-semibold mb-1">Most Common Issue</p>
                                <h4 className="fw-bold mb-1">
                                  {stats?.mostCommonIssue?.issue_type || "No data"}
                                </h4>
                                <small>{stats?.mostCommonIssue?.total || 0} reports</small>
                              </div>
                              <img src={seat} alt="Seat issue" width="72" />
                            </div>
                          </div>
                        </div>
            
                        <div className="col-12 col-xl-4">
                          <div className="card border-0 shadow-sm rounded-4 h-100">
                            <div className="card-body d-flex justify-content-between align-items-center p-4">
                              <div>
                                <p className="text-muted fw-semibold mb-1">Most Reported Route</p>
                                <h4 className="fw-bold mb-1">
                                  {stats?.mostReportedRoute?.route_name || "No data"}
                                </h4>
                                <small>{stats?.mostReportedRoute?.total || 0} reports</small>
                              </div>
                              <img src={busBlue} alt="Bus route" width="72" />
                            </div>
                          </div>
                        </div>
            </div>
        </>
    )
}

export default DashboardCards;