import React, { useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "./style.css";
import "leaflet/dist/leaflet.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { startLoading, setShapes, setError } from "./components/shapesSlice";
import { ShapeCollection } from "./types";
import ShapesRenderer from "./components/ShapesRenderer";


delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(startLoading());

    fetch("/shapes.json")
      .then(r => {
        if (!r.ok) throw new Error("Ошибка загрузки shapes.json");
        return r.json();
      })
      .then((data: ShapeCollection) => {
        dispatch(setShapes(data));
      })
      .catch(err => {
        dispatch(setError(err.message));
      });
  }, []);

  return (
    <div id="app-root" style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: 300, background: "#fff", padding: 12 }}>
        <h3>Sidebar</h3>
      </div>

      <div style={{ flex: 1 }}>
        <MapContainer center={[55, 37]} zoom={5} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <ShapesRenderer />
        </MapContainer>
      </div>
    </div>
  );
}
