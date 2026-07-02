//Components
import Navbar from "../components/NavBar/NavBar.jsx"
import Footer from "../components/Footer/Footer.jsx";
import Form from "../components/Form/Form.jsx";
import api from "../../../backend/src/api/api.js";

import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ReportsIssue() {
  const [issue_type_id, setIssueTypeId] = useState("");
  const [route_id, setRouteId] = useState("");
  const [location_name, setLocationName] = useState("");
  const [incident_datetime, setIncidentDateTime] = useState("");
  const [description, setDescription] = useState("");

  const[routes, setRoutes] = useState([]);
  const navigate = useNavigate();    
  
  
  async function handleSubmit(e){
    e.preventDefault();

    try{
      const response = await api.post("/reports", {
        issue_type_id: Number(issue_type_id),
        route_id: Number(route_id),
        location_name,
        incident_datetime,
        description
      });
      console.log(response.data)

    } catch(error){
      console.log(error.response?.data || error.message);
    }
  }
  
  //Routes
  useEffect(()=>{
    async function loadRoutes() {
      try{
        const response = await api.get("/routes");

        setRoutes(response.data);
      }catch (error){
        console.log(error.response?.data || error.message);
      }
      
    }
    loadRoutes();
  },[]);

    const form = ( 
            <form className="forms" onSubmit={handleSubmit}>

              <div className="mb-3">
                <label htmlFor="issueType" className="form-label fw-semibold">
                  Issue Type
                </label>
                <select id="issueType" className="form-select" value={issue_type_id} onChange={(e) => setIssueTypeId(e.target.value)}>
                  <option value="">Select an issue type</option>
                  <option value="1">Priority Seat</option>
                  <option value="2">Overcrowding</option>
                  <option value="3">Accessibility Issue</option>
                  <option value="4">Driver Behaviour</option>
                  <option value="5">Other</option>
                </select>
              </div>

              <div className="mb-3">
                  <select
                    className="form-select"
                    value={route_id}
                    onChange={(e) => setRouteId(e.target.value)}
                    >
                    <option value="">Select route</option>
                    {routes.map((route)=>(
                      <option
                        key={route.route_id}
                        value={route.route_id}
                      >
                        {route.route_name} ({route.operator_name})
                      </option>
                    ))}
                  </select>
              </div>

              <div className="mb-3">
                <label htmlFor="location" className="form-label fw-semibold">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  className="form-control"
                  placeholder="Example: Ranelagh stop, O'Connell Street"
                  value={location_name}
                  onChange={(e) => setLocationName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="date" className="form-label fw-semibold">
                  Date and Time
                </label>
                <input
                  type="datetime-local"
                  id="date"
                  className="form-control"
                  value={incident_datetime}
                  onChange={(e) => setIncidentDateTime(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="form-label fw-semibold">
                  Description
                </label>
                <textarea
                  id="description"
                  className="form-control"
                  rows="5"
                  placeholder="Describe what happened..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-success px-4 py-2 w-100">
                Submit Report
              </button>

            </form>);

    return (    
       <>
        <Navbar />
        <Form title={"Report an Issue"} heading={"Report an Issue"} form={form}/>
        <Footer/>    
       </> 
      )
}

export default ReportsIssue;