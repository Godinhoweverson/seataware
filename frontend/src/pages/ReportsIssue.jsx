//Components
import Navbar from "../components/NavBar/NavBar.jsx"
import Footer from "../components/Footer/Footer.jsx";
import Form from "../components/Form/Form.jsx";
import LocationPicker from "../components/Map/LocationPicker.jsx";

//API
import api from "../../../backend/src/api/api.js";

//React
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ReportsIssue() {
  //form fields
  const [issue_type_id, setIssueTypeId] = useState("");
  const [route_id, setRouteId] = useState("");
  const [location_name, setLocationName] = useState("");
  const [incident_datetime, setIncidentDateTime] = useState("");
  const [description, setDescription] = useState("");

  //Routes
  const[routes, setRoutes] = useState([]);

  //alert message
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  //latitude and longitude
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  //React Router navigation
  const navigate = useNavigate();    
  
  //Handle form submission
  async function handleSubmit(e){
    e.preventDefault();

    // Validate that all fields are filled
    console.log(issue_type_id, route_id, location_name);
    if(!issue_type_id || !route_id || !location_name.trim() || !incident_datetime || !description.trim()){
      setMessage("All fields are required.");
      setMessageType("danger");
      return;
    }
    // Validate that latitude and longitude are set
    if(!latitude || !longitude){
      setMessage("Please select a location on the map.");
      setMessageType("danger");
      return;
    }


    try{
      // Send a POST request to the backend API to create a new report
      const response = await api.post("/reports", {
        issue_type_id: Number(issue_type_id),
        route_id: Number(route_id),
        location_name,
        latitude,
        longitude,
        incident_datetime,
        description
      });

      // Navigate to the reports page after successful submission
      navigate("/reports",{
        state: {
          message: "Report submitted successfully!",
          messageType: "success"
        }
      });

    } catch(error){
      // Set error message for submission failure
      setMessage(error.response?.data?.message || "Failed to submit report. Please try again.");
      setMessageType("danger");
    }
  }
  
  //Routes
  useEffect(()=>{
    async function loadRoutes() {
      try{
        const response = await api.get("/routes");

        setRoutes(response.data);
      }catch (error){
        setMessage(error.response?.data || error.message);
        setMessageType("danger");
      }
      
    }
    loadRoutes();
  },[]);

  useEffect(() =>{
    navigator.geolocation.getCurrentPosition(
      (position) =>{
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) =>{
        console.log("Error getting location", error);
      }
    );
  },[]);


    const form = ( 
            <form className="forms" onSubmit={handleSubmit}>

              <div className="mb-3">
                <label htmlFor="issueType" className="form-label fw-semibold">
                  Issue Type
                </label>
                <select 
                    id="issueType"
                    className="form-select"
                    value={issue_type_id} 
                    onChange={(e) => setIssueTypeId(e.target.value)}
                    required
                  >
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
                    required
                    >
                    <option value="">Select route</option>
                    {/* Populate the route options dynamically */}
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
                  <label htmlFor="location" className="form-label fw-semibold">Location</label>
                  <input
                    type="text"
                    id="location"
                    className="form-control"
                    placeholder="Example: Ranelagh stop, O'Connell Street"
                    value={location_name}
                    onChange={(e) => setLocationName(e.target.value)}
                    required
                  />
              </div>
               <div className="mb-3">
                  <label className="form-label fw-semibold mt-4">
                    Select the exact location on the map
                  </label>
                  <LocationPicker
                    latitude={latitude}
                    longitude={longitude}
                    setLatitude={setLatitude}
                    setLongitude={setLongitude}
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
                  required
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
                  required
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