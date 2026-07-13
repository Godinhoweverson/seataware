import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function getUserFromLocalStorage() {
  const user = localStorage.getItem("user");
  if(!user || user === "undefined") {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch {
    localStorage.removeItem("user");
    return null;
  }
}

function Navbar() {
  const user = getUserFromLocalStorage();
  
  const isAdmin = user && user.role === "admin";

  const [isLogedIn, setIsLogedIn] = useState(
  !!localStorage.getItem("token")
  );

  const navigate = useNavigate();
  
  const handleLogout = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLogedIn(false);
    navigate("/");
  }

  return (
   <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3">
      <div className="container">

        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            alt="SeatAware Ireland"
            height="45"
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav mx-auto">

            <li className="nav-item px-2">
              <Link className="nav-link text-dark" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item px-2">
              <Link className="nav-link text-dark" to="/reports">
                Reports
              </Link>
            </li>

            <li className="nav-item px-2">
              <Link className="nav-link text-dark" to="/map">
                Map
              </Link>
            </li>

            <li className="nav-item px-2">
              <Link className="nav-link text-dark" to="/dashboard">
                Dashboard
              </Link>
            </li>

            <li className="nav-item px-2">
              <Link className="nav-link text-dark" to="/awareness">
                Awareness
              </Link>
            </li>
            {isAdmin && (
              <li className="nav-item px-2">
                <Link className="nav-link text-dark" to="/adminDashboard">
                  Admin Dashboard
                </Link>
              </li>
            )}
          </ul>
  
          <div className="d-flex gap-2 mt-3">
            {isLogedIn ? (
                <button className="btn btn-success btn-sm" to="/login" onClick={handleLogout}>
                  Logout
                </button>
              ): (
                <>
                <Link className="btn btn-outline-success btn-sm" to="/login">
                  Login
                </Link>

                <Link className="btn btn-success btn-sm" to="/register">
                  Register
                </Link>
                </>
              
              )
            }
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;