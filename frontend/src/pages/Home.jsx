//Components
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

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


function Home() {
  return (
    <>
    <Header/>
    <section className="information py-4">
      <div className="container">
        <div className="stats-wrapper shadow-sm">
          <div className="row g-3">

            <div className="col-12 col-md-6 col-lg-3">
              <div className="stat-card">
                <div className="stat-icon bg-green-soft">
                  <img src={busGreen} alt="Green bus icon" />
                </div>
                <div>
                  <h5>1,455</h5>
                  <p>Total Reports</p>
                  <small className="text-success">+10% this month</small>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <div className="stat-card">
                <div className="stat-icon bg-blue-soft">
                  <img src={busBlue} alt="Blue bus icon" />
                </div>
                <div>
                  <h5>46A</h5>
                  <p>Most Reported Route</p>
                  <small>215 reports</small>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <div className="stat-card">
                <div className="stat-icon bg-purple-soft">
                  <img src={communityIcon} alt="community icon" />
                </div>
                <div>
                  <h5>62%</h5>
                  <p>Seating Issues</p>
                  <small>552 reports</small>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <div className="stat-card">
                <div className="stat-icon bg-yellow-soft">
                  <img src={warningIcon} alt="Warning icon" />
                </div>
                <div>
                  <h5>23%</h5>
                  <p>Overcrowding Issues</p>
                  <small>193 reports</small>
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
            <div className="col-12 col-lg-3">
              <h5 className='fw-bold mb-1'>Recent reports on map</h5>
              <img src={map} alt='map'width='100%' height='80%'/>
              <div className="text-end mt-2">
                <a href="#" className="text-success fw-bold text-decoration-none">
                  View full map →
                </a>
              </div>
          </div>
        </div>
      </div>
    </section>
    <section className='involved py-5'>
      <div className='container'>
        <div className="row g-4 shadow-sm rounded py-3 bg-gradient-purple align-items-center">
          <div className="col-12 col-md-9 d-flex flex-column justify-content-center">
            <h4 className="fw-bold mb-1">Be part of the change</h4>
            <small>Small actions create a more inclusive society</small>
          </div>
          <div className="col-12 col-md-3">
            <button className="btn btn-success btn fw-bold">
              Get Involved
            </button>
          </div>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
}

export default Home;