function Header(){
    return(
        <>
            <header className="header-section d-flex align-items-center">
                <div className="container">
                    <div className="row">
                    <div className="col-lg-6">
                        <h1 className="display-4 fw-bold mb-3">
                            Making Public Transport
                        <span className="text-success"> Accessible for Everyone</span>
                        </h1>

                        <p className="lead mb-4 fw-bold">
                            Report accessibility issues and help improve public transport across Ireland.
                        </p>

                        <div className="d-flex gap-3 justify-content-center justify-content-lg-start">
                            <button className="btn btn-success btn-sm">
                                Report an Issue
                            </button>

                            <button className="btn btn-outline-success btn-sm">
                                View Reports
                            </button>
                        </div>
                    </div>
                    </div>
                </div>
            </header>
        </>
        
    )
}

export default Header