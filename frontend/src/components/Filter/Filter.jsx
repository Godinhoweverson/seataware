import {useState} from 'react';
import api from "../../../../backend/src/api/api.js";

function Filter({ setReports }) {
    const [filters, setFilters] = useState({
        transport_type: '',
        route_id: '',
        issue_type_id: '',
        status: ''
    });

    const [routes, setRoutes] = useState([]);

    async function applyFilters(updatedFilters) {
        try {
            const response = await api.get("/reports", {
                params: updatedFilters,
            });

            const routesResponse = await api.get("/routes");
            setReports(response.data.reports);
            setRoutes(routesResponse.data);

        }catch (error) {
            console.log(error.response?.data || error.message);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedFilters = { 
            ...filters,
             [name]: value,
            };

        setFilters(updatedFilters);
        applyFilters(updatedFilters);
    };

   

    return (
        <>
         <div className="reports_filter container mt-5">
            <div className="row g-4">

                <div className="col-12 col-md-6 col-lg-3">
                <label htmlFor="transportType" className="form-label fw-semibold">
                    Transport Type
                </label>
                <select id="transportType"
                    name="transport_type"
                    className="form-select custom-select mt-2"
                    value={filters.transport_type}
                    onChange={(handleChange)}
                    >
                    <option value="">All</option>
                    <option value="Bus">Bus</option>
                    <option value="Luas">Luas</option>
                    <option value="Train">Train</option>
                    <option value="DART">DART</option>
                </select>
                </div>

                <div className="col-12 col-md-6 col-lg-3">
                <label htmlFor="route" className="form-label fw-semibold">
                    Route
                </label>
                <select
                    className="form-select"
                    value={filters.route_id}
                    onChange={handleChange}
                    name="route_id"
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

                <div className="col-12 col-md-6 col-lg-3">
                <label htmlFor="issueType" className="form-label fw-semibold">
                    Issue Type
                </label>
                <select id="issueType" 
                    className="form-select custom-select mt-2"
                    name="issue_type_id"
                    value={filters.issue_type}
                    onChange={handleChange}
                    >
                    <option value="">All</option>
                    <option value="1">Occupied Priority Seat</option>
                    <option value="2">Driver Behavior</option>
                    <option value="3">Accessibility Issue</option>
                    <option value="4">Overcrowding</option>
                    <option value="5">Other</option>
                </select>
                </div>

                <div className="col-12 col-md-6 col-lg-3">
                    <label htmlFor="status" className="form-label fw-semibold">
                        Status
                    </label>
                    <select
                        id="status"
                        name="status"
                        className="form-select custom-select mt-2"
                        value={filters.status}
                        onChange={handleChange}
                    >
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                        <option value="resolved">Resolved</option>
                    </select>
                </div>

            </div>

            </div>
        </>     
       
    )
}

export default Filter;