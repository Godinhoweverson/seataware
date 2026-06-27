//Components
import Navbar from "../components/Navbar/NavBar.jsx";
import Footer from "../components/Footer/Footer.jsx"; 

function Dashboard() {
  return (
    <>
      <Navbar />
      <h1>Dashboard</h1>
        <div className="shadow-sm">
                <div className="row g-3">
      
                  <div className="col-12 col-md-6 col-lg-3">
                    <div className="stat-card">
                      <div>
                        <p>Total Reports</p>
                        <h5>1,455</h5>
                        <small className="text-success">+10% this month</small>
                      </div>
                      <div className="">
                        <img src="" alt="Green bus icon" />
                      </div>
                    </div>
                  </div>

                   <div className="col-12 col-md-6 col-lg-3">
                    <div className="stat-card">
                      <div>
                        <p>Total Reports</p>
                        <h5>1,455</h5> 
                        <small className="text-success">+10% this month</small>
                      </div>
                      <div className="">
                        <img src="" alt="Green bus icon" />
                      </div>
                    </div>
                  </div>

                   <div className="col-12 col-md-6 col-lg-3">
                    <div className="stat-card">
                      <div>
                        <p>Total Reports</p>
                        <h5>1,455</h5>       
                        <small className="text-success">+10% this month</small>
                      </div>
                      <div className="">
                        <img src="" alt="Green bus icon" />
                      </div>
                    </div>
                  </div>

                   <div className="col-12 col-md-6 col-lg-3">
                    <div className="stat-card">
                      <div>
                        <p>Total Reports</p>
                        <h5>1,455</h5>  
                        <small className="text-success">+10% this month</small>
                      </div>
                      <div className="">
                        <img src="" alt="Green bus icon" />
                      </div>
                    </div>
                  </div>
      

      
                </div>
              </div>
      <Footer/>
    </>
  )
}       

export default Dashboard;