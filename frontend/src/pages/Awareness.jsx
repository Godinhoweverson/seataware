//Components
import Navbar from "../components/Navbar/NavBar.jsx";
import Footer from "../components/Footer/Footer.jsx";

//Icons
import elderlyPerson from '../assets/elderlyPerson.png';
import pregnantWoman from '../assets/pregnantWoman.png';
import userIcon from '../assets/userIcon.png';
import wheelchair from '../assets/wheelchair.png';
import heart from '../assets/heart.png';

function Awareness(){
    return (
        <>
            <Navbar />
                <div className="awareness-page d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                        <div className="col-lg-6">
                            <h1 className="display-4 fw-bold mb-3 text-success">
                                Awareness & <br></br>Inclusion
                            </h1>
                            <p className="lead mb-4 fw-bold text-muted">
                                Building an inclusive society starts <br></br>with understanding and small <br></br>acts of kindness.
                            </p>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="container my-5">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="fw-bold mb-3 text-success">What is Awareness & Inclusion?</h2>
                            <p className="lead mb-4">
                                Awareness is the first step towards creating an inclusive society. By educating ourselves and others about the challenges faced by individuals with disabilities, we can foster empathy and understanding. This awareness can lead to positive changes in attitudes, behaviors, and policies that promote inclusivity.
                            </p>
                            <p className="lead mb-4">
                                Inclusion goes beyond awareness; it involves actively creating environments where everyone feels valued and respected. This means ensuring accessibility, providing equal opportunities, and embracing diversity in all its forms. By promoting inclusion, we can build communities that celebrate differences and empower individuals to thrive.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="container my-5">    
                    <div className="row g-4" >
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="card border-0 shadow-sm h-100 text-center p-4 bg-purple-soft awareness-card">
                                <img src={elderlyPerson} alt="Elderly Person" className="card-img-top"/>
                                <h5 className="card-title mt-3">Elderly People</h5>
                                <p className="card-text text-muted">Older adults may have difficulty standing for long periods. A seat can make a big difference in their comfort and safety.</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="card border-0 shadow-sm h-100 text-center p-4 bg-green-soft awareness-card">
                                <img src={pregnantWoman} alt="Pregnant Woman" className="card-img-top"/>
                                <h5 className="card-title mt-3">Pregnant Women</h5>
                                <p className="card-text text-muted">Pregnancy can be physically challenging. Offering your seat helps ensure a safe and more comfortable journey.</p>
                            </div>
                        </div>
                      
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="card border-0 shadow-sm h-100 text-center p-4 bg-blue-soft awareness-card">
                                <img src={wheelchair} alt="Wheelchair" className="card-img-top"/>
                                <h5 className="card-title mt-3">People with Disabilities</h5>
                                <p className="card-text text-muted">Not all disabilities are visible, Priority seating provides accessibility and dignity for those who need it.</p>
                            </div>
                        </div>

                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="card border-0 shadow-sm h-100 text-center p-4 bg-yellow-soft awareness-card">
                                <img src={userIcon} alt="User Icon" className="card-img-top"/>
                                <h5 className="card-title mt-3">Others in Need</h5>
                                <p className="card-text text-muted">This includes parents with small children, people with injuries, or anyone who needs additional support.</p>
                            </div>
                        </div>
                    </div>
                </div>
        
                    <div className="container good-to-know-section">
                        <div className="row h-100d-flex align-items-center">
                            <div className="col-12 col-lg-3 text-center">
                                <img src={heart} alt="Heart Icon" className="card-img-top"/>
                            </div>
                            <div className="col-12 col-lg-6">
                                <h5 className="fw-bold mb-3 text-success">Good to Know</h5>
                                <p><i className="bi bi-check-circle-fill text-success me-2"></i>
                                Priority seats are not a suggestion but a consideration for those who need them most.
                                </p>

                                <p><i className="bi bi-check-circle-fill text-success me-2"></i>
                                Small actions create a big impact on someone's day.
                                </p>

                                <p><i className="bi bi-check-circle-fill text-success me-2"></i>
                                Let's work together to make public transport welcoming for all.
                                </p>
                            </div>
                        </div>
                    </div> 
             
                
            <Footer/>
        </>
    )
}

export default Awareness;