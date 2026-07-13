//Components
import Navbar from '../components/Navbar/NavBar';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import MapComponent from '../components/Map/MapComponent'
import AlertMessage from '../components/AlertMessage/AlertMessage';

//Images
import busGreen from '../assets/busGreen.png';
import busBlue from '../assets/busBlue.png';
import communityIcon from '../assets/community.png';
import warningIcon from '../assets/yellowWarming.png';
import elderlyPerson from '../assets/elderlyPerson.png';
import pregnantWoman from '../assets/pregnantWoman.png';
import userIcon from '../assets/userIcon.png';
import wheelchair from '../assets/wheelchair.png';
import map from '../assets/map.png';

//API
import api from "../../../backend/src/api/api"
//React
import { Link } from "react-router-dom";
import {useLocation} from "react-router-dom";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  const location = useLocation();
  const navigate = useNavigate();
  
  //Dashboard cards

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

  //Alert
  useEffect(() => {
    const navigationMessage = location.state?.message;

    if(!navigationMessage){
      return;
    }

    setMessage(navigationMessage);
    setMessageType(location.state?.messageType || "success");

    navigate(location.pathname,
       { 
        replace: true, 
        state: null,
      });
  }, [location.pathname, navigate]);

  useEffect(() => {

    if(!message){
      return;
    }

    const timer = setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [message]);

  return (
    <>
    <Navbar/>
    {message && (
      <AlertMessage message={message} type={messageType}/>
    )}
    <Header/>
    <section className="information py-2">
      <div className="container">
        <div className="stats-wrapper shadow-sm p-0">
          <div className="row g-3">

            <div className="col-12 col-md-4">
              <div className="stat-card">
                <div className="stat-icon bg-green-soft">
                  <img src={busGreen} alt="Green bus icon" />
                </div>
                <div>
                  <h4>{stats?.totalReports || 0}</h4>
                  <p>Total Reports</p>
                  <small className="text-success">+10% this month</small>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="stat-card">
                <div className="stat-icon bg-blue-soft">
                  <img src={busBlue} alt="Blue bus icon" />
                </div>
                <div>
                  <h4>{stats?.mostReportedRoute?.route_name || "No data"}</h4>
                  <p>Most Reported Route</p>
                  <small>{stats?.mostReportedRoute?.total || 0} </small>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="stat-card">
                <div className="stat-icon bg-purple-soft">
                  <img src={communityIcon} alt="community icon" />
                </div>
                <div>
                  <h4>{stats?.mostCommonIssue?.issue_type || "No data"}</h4>
                  <p>Most common issue</p>
                  <small>{stats?.mostCommonIssue?.total || 0} reports</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="awareness py-5">
      <div className="container">
        <div className='row g-4'>
            <div className="col-12 col-lg-9">
              <div className="text-left mb-5">
              <h3 className="fw-bold">Why Awareness Matters</h3>
              <p className="text-muted mb-1">
                Priority seats are for those who need them.
              </p>
              <p className="text-muted">
                Let's build a more inclusive Ireland.
              </p>
              </div>

              <div className="row g-4">

                <div className="col-12 col-md-6 col-lg-3">
                  <div className="card border-0 shadow-sm h-100 text-center p-4 bg-green-soft awareness-card">
                    <img
                      src={pregnantWoman}
                      alt="Pregnant Woman icon"
                      width="80"
                      className="mx-auto mb-3"
                    />

                    <h5>Pregnant Women</h5>

                    <small className="text-muted">
                      Need comfort and safety during travel.
                    </small>
                  </div>
                </div>

                <div className="col-12 col-md-6 col-lg-3">
                  <div className="card border-0 shadow-sm h-100 text-center p-4 bg-purple-soft awareness-card">
                    <img
                      src={elderlyPerson}
                      alt="Elderly person icon"
                      width="80"
                      className="mx-auto mb-3"
                    />

                    <h5>Elderly Passengers</h5>

                    <small className="text-muted">
                      May need extra support and balance.
                    </small>
                  </div>
                </div>


                <div className="col-12 col-md-6 col-lg-3">
                  <div className="card border-0 shadow-sm h-100 text-center p-4 bg-blue-soft awareness-card">
                    <img
                      src={wheelchair}
                      alt="Wheelchair icon"
                      width="80"
                      className="mx-auto mb-3"
                    />

                    <h5>People with Disabilities</h5>

                    <small className="text-muted">
                      Accessible transport should be available to everyone.
                    </small>
                  </div>
                </div>

                <div className="col-12 col-md-6 col-lg-3">
                  <div className="card border-0 shadow-sm h-100 text-center p-4 bg-yellow-soft awareness-card">
                    <img
                      src={userIcon}
                      alt="User icon"
                      width="80"
                      className="mx-auto mb-3"
                    />

                    <h5>Others</h5>

                    <small className="text-muted">
                      Temporary injuries or hidden conditions also matter.
                    </small>
                  </div>
                </div>

              </div>
            </div>
            <div className="col-12 col-lg-3 d-flex justify-content-end align-items-end flex-column">
              <h5 className='fw-bold mb-1'>Recent reports on map</h5>
              <MapComponent compact={true}/>
              <div className="text-end mt-2">
                <Link className="text-success fw-bold text-decoration-none" to="/map">
                  View full map →
                </Link>
              </div>
          </div>
        </div>
      </div>
    </section>
    <section className='involved my-5'>
      <div className='container bg-gradient-purple py-5 shadow-sm rounded'>
        <div className="row g-4 py-3 align-items-center">
          <div className="col-12 col-md-9 d-flex flex-column justify-content-center mt-0">
            <h4 className="fw-bold mb-1">Be part of the change</h4>
            <small>Small actions create a more inclusive society</small>
          </div>
          <div className="col-12 col-md-3">
            <Link className="btn btn-success btn fw-bold" to="/register">
              Get Involved
            </Link>
          </div>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
}

export default Home;