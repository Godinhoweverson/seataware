//Components
import api from "../../../../backend/src/api/api"

//React
import { use, useState } from "react";
import { useEffect } from "react";  

//Leaflet
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function MapComponent({compact = false}) {
  //State for reports
  const [reports, setReports] = useState([]);
  const [height, setHeight] = useState("600px");
  //Load reports
  useEffect(() => {
    async function loadReports() {
      try { 
        const response = await api.get("/reports");
        setReports(response.data.reports);
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    }
    loadReports();
  }, []);

  const mapHeight = compact ? "300px" : "100%";

  return (
    <>
        <MapContainer 
            center={[53.349805, -6.26031]} 
            zoom={13}
            className="rounded w-100"
            style={{ height: mapHeight}}
            >
            <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {reports.filter(report => report.latitude && report.longitude).map((report) => (
            <Marker 
                key={report.report_id}
                position={[Number(report.latitude), Number(report.longitude)]}
            >
                <Popup>
                  <strong>{report.route_name}</strong>
                
                  <p>Issue type: {report.issue_type}</p>
                
                  <p>Location: {report.location_name}</p>
                  
                  <p >Status:<span className="bdge bg-warning p-1 rounded">{report.status}</span> </p>
                </Popup>
            </Marker>
            ))}
        </MapContainer>
    </>
  )
}               

export default MapComponent;