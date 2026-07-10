import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

function LocationPicker({latitude, longitude, setLatitude, setLongitude}){
    function ClickHandler(){
        useMapEvents({
            click(e){
                setLatitude(e.latlng.lat);
                setLongitude(e.latlng.lng);
            },
        });
        return null;
    }

    return(
            <MapContainer
                center={[53.3498, -6.2603]}
                zoom={12}
                style={{ height: "300px", width: "100%" }}
                className="rounded shadow-sm"
                >
                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <ClickHandler />

                {latitude && longitude && (
                    <Marker position={[latitude, longitude]} />
                )}
            </MapContainer>
    )
}

export default LocationPicker;