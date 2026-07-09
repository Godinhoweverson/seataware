//Components
import Navbar from "../components/Navbar/NavBar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import TransportChart from "../components/Dashboard/TransportChart.jsx";
import IssueChart from "../components/Dashboard/IssueChart.jsx";
import RecentReports from "../components/Dashboard/RecentReports.jsx";
import DashboardCards from "../components/Dashboard/DashboardCards.jsx";
import MapComponent from "../components/Map/MapComponent.jsx";

//API
import api from "../../../backend/src/api/api.js"
//React
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    async function loadDashboard(){
      try{
        const response = await api.get("/dashboard/stats");
        
        setStats(response.data);
      }catch(error){
        console.log(error.response?.data || error.message);
      }finally{
        setLoading(false);
      }
    }
    loadDashboard();
  },[]);

  return (
     <>
      <Navbar />

      <main className="dashboard-page py-5 bg-light">
        <div className="container">

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-5">
            <div>
              <span className="badge text-bg-success mb-2 p-1">SeatAware Analytics</span>
              <h1 className="fw-bold mb-1">Dashboard &amp; Analytics</h1>
              <p className="text-muted mb-0">
                Monitor public transport accessibility reports and trends.
              </p>
            </div>

            <Link to="/reportsIssue" className="btn btn-success px-4">
              Report an Issue
            </Link>
          </div>
          <DashboardCards stats={stats}/>
          <div className="row g-4 mb-4">
            <div className="col-12 col-xl-6">
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-3">Reports by Issue</h4>
                  <IssueChart data={stats?.reportsByIssue || []} />
                </div>
              </div>
            </div>

            <div className="col-12 col-xl-6">
              <div className="card border-0 shadow-sm rounded-4 h-100">
                  <RecentReports />
                </div>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-12 col-xl-6">
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-3">Reports by Transport</h4>
                  <TransportChart data={stats?.reportsByTransport || []} />
                </div>
              </div>
            </div>

            <div className="col-12 col-xl-6">
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-3">Reports Map</h4>
                  <MapComponent compact={true}/>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  )
}       

export default Dashboard;