import { Link } from "react-router-dom";

function Footer(){
    return(
        <footer className="text-center text-white bg-success">
            <div className="container">
                <section className="pt-5">
                <div className="row text-center d-flex justify-content-center">

                    <div className="col-md-2 mb-2">
                    <h6 className="text-uppercase fw-bold">
                        <Link href="#" className="text-white text-decoration-none">
                            Home
                        </Link>
                    </h6>
                    </div>

                    <div className="col-md-2 mb-2">
                    <h6 className="text-uppercase fw-bold">
                        <Link href="#" className="text-white text-decoration-none">
                            Reports
                        </Link>
                    </h6>
                    </div>

                    <div className="col-md-2 mb-2">
                    <h6 className="text-uppercase fw-bold">
                        <Link href="#" className="text-white text-decoration-none">
                            Map
                        </Link>
                    </h6>
                    </div>

                    <div className="col-md-2 mb-2">
                    <h6 className="text-uppercase fw-bold">
                        <Link href="#" className="text-white text-decoration-none">
                            Awareness
                        </Link>
                    </h6>
                    </div>
                </div>
                </section>
                <hr className="my-3" />
                <section className="mb-3">
                <div className="row d-flex justify-content-center">
                    <div className="col-lg-8">
                    <p>
                        SeatAware Ireland helps promote accessibility and awareness on
                        public transport by encouraging respect for priority seating and
                        providing insights into accessibility issues across Ireland.
                    </p>
                    </div>
                </div>
                </section>
            </div>
            <div className="text-center p-3 Allrights">
                © 2026 SeatAware Ireland. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer