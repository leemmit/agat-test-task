import React, { useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "./style.css";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons (Vite / bundlers)
// If you later use Marker from react-leaflet, marker icons will display correctly.
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function App() {
  useEffect(() => {
    console.log("Map mounted");
  }, []);

  return (
    <div id="app-root" style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: 300, background: "#fff", padding: 12 }}>
        <h3>Sidebar</h3>
      </div>

      <div style={{ flex: 1 }}>
        <MapContainer center={[55, 37]} zoom={5} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>
      </div>
    </div>
  );
}
