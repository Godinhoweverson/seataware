import Header from '../components/Header/Header';
import busGreen from '../assets/busGreen.png';
import busPurple from '../assets/busPurple.png';
import warningIcon from '../assets/community.png';
import communityIcon from '../assets/yellowWarming.png';

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
            <div className="stat-icon bg-purple-soft">
              <img src={busPurple} alt="Purple bus icon" />
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
            <div className="stat-icon bg-yellow-soft">
              <img src={warningIcon} alt="Warning icon" />
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
            <div className="stat-icon bg-purple-soft">
              <img src={communityIcon} alt="Community icon" />
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
      <section className='awareness'></section>
    </>
  );
}

export default Home;