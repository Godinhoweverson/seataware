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

                        <p className="lead text-muted mb-4">
                        Report accessibility issues and help improve public transport across Ireland.
                        </p>

                        <div className="d-flex gap-3">
                        <button className="btn btn-success btn-lg">
                            Report an Issue
                        </button>

                        <button className="btn btn-outline-success btn-lg">
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