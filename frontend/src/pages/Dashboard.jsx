//Components
import Navbar from "../components/Navbar/NavBar.jsx";
import Footer from "../components/Footer/Footer.jsx";

//images
import totalReports from "../assets/totalReports.png";
import gpsicon from "../assets/gpsicon.png";
import seat from "../assets/seat.png";
import busBlue from '../assets/busBlue.png';

//API
import api from "../../../backend/src/api/api.js"
//React
import { useEffect, useState } from "react";

function Dashboard() {

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    async function loadDashboard(){
      try{
        const response = await api.get("/dashboard/stats");
        console.log(response.data)
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
      <div className="container mt-5">
        <div className="row align-items-center g-3">
          <div className="col-12 col-md">
            <h1 className="mb-0">Dashboard &amp; Analytics</h1>
          </div>

          <div className="col-12 col-md-auto">
            <button className="btn btn-success w-100 w-md-auto">
              Report an Issue
            </button>
          </div>
        </div>
      </div>
      
      <div className="container mt-5">
        <div className="row g-4">

          <div className="col-12 col-sm-6 col-xl-3">
            <div className="stat-card shadow-sm rounded p-4 h-100 d-flex justify-content-between align-items-center">
              <div>
                <p className="mb-1 fw-bold">Total Reports</p>
                <h5>{stats?.totalReports}</h5>
                <small className="text-success">+5% this month</small>
              </div>

              <img
                src={totalReports}
                alt="Reports count"
                width="80"
                className="img-fluid"
              />
            </div>
          </div>

          <div className="col-12 col-sm-6 col-xl-3">
            <div className="stat-card shadow-sm rounded p-4 h-100 d-flex justify-content-between align-items-center">
              <div>
                <p className="mb-1 fw-bold">Seat Related Issues</p>
                <h5>{stats?.mostReportedRoute?.route_name}</h5>
                <small>{stats?.mostReportedRoute?.total} reports</small>              </div>

              <img
                src={seat}
                alt="Public transport seat"
                width="80"
                className="img-fluid"
              />
            </div>
          </div>

          <div className="col-12 col-sm-6 col-xl-3">
            <div className="stat-card shadow-sm rounded p-4 h-100 d-flex justify-content-between align-items-center">
              <div>
                <p className="mb-1 fw-bold">Most Reported Route</p>
                <h5>46A</h5>
                <small className="text-success">100 reports</small>
              </div>

              <img
                src={busBlue}
                alt="Blue bus icon"
                width="80"
                className="img-fluid"
              />
            </div>
          </div>

          <div className="col-12 col-sm-6 col-xl-3">
            <div className="stat-card shadow-sm rounded p-4 h-100 d-flex justify-content-between align-items-center">
              <div>
                <p className="mb-1 fw-bold">Counties with Reports</p>
                <h5>12</h5>
                <small className="text-success">Of 10 counties</small>
              </div>

              <img
                src={gpsicon}
                alt="GPS icon"
                width="80"
                className="img-fluid"
              />
            </div>
          </div>

      </div>
      </div>
      <div className="container mt-5">
        <div className="row g-4">

          <div className="col-12 col-xl-6">
            <div className="stat-card shadow-sm rounded p-4 h-100 d-flex justify-content-between align-items-center">
              1   
            </div>
          </div>
          <div className="col-12 col-xl-6">
            <div className="stat-card shadow-sm rounded p-4 h-100 d-flex justify-content-between align-items-center">
              1   
            </div>
          </div>
          <div className="col-12 col-xl-6">
            <div className="stat-card shadow-sm rounded p-4 h-100 d-flex justify-content-between align-items-center">
              1   
            </div>
          </div>
          <div className="col-12 col-xl-6">
            <div className="stat-card shadow-sm rounded p-4 h-100 d-flex justify-content-between align-items-center">
              1   
            </div>
          </div>
          



        </div>
      </div>
      <Footer/>
    </>
  )
}       

export default Dashboard;