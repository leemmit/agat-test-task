import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "./style.css";
import "leaflet/dist/leaflet.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { startLoading, setShapes, setError } from "./components/shapesSlice";
import { ShapeCollection } from "./types";
import ShapesRenderer from "./components/ShapesRenderer";
import Sidebar from "./components/Sidebar";
import { IoIosArrowBack, IoIosArrowForward  } from "react-icons/io";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

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
      <button
        onClick={() => setIsSidebarVisible(!isSidebarVisible)}
        style={{
          position: "fixed",
          top: "calc(50vh - 40px)",
          left: "0px",
          zIndex: 1001,
          background: "#fff",
          border: "none",
          borderRadius: "4px",
          padding: "30px 5px",
          cursor: "pointer",
          // boxShadow: "0 0 4px rgba(0,0,0,0.7)",
          transform: isSidebarVisible ? "translateX(240px)" : "translateX(0)",
          transition: "transform 0.3s ease",
        }}
        title={isSidebarVisible ? "Закрыть" : "Открыть"}
      >
        {isSidebarVisible ? <IoIosArrowBack size={20} /> : <IoIosArrowForward size={20} />}
      </button>

      <div style={{ flex: 1 }}>
        <MapContainer center={[55, 37]} zoom={5} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <ShapesRenderer />
        </MapContainer>
      </div>

      <Sidebar isVisible={isSidebarVisible} />
    </div>
  );
}
