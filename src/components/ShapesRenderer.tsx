import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Marker, Polygon, Popup } from "react-leaflet";
import L from "leaflet";
import { ShapeFeature } from "../types";
import { LatLngTuple } from "leaflet";

const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function ShapesRenderer() {
  const shapes = useSelector((state: RootState) => state.shapes.items);

  return (
    <>
      {shapes.map((feature: ShapeFeature) => {
        const id = feature.properties.id;
        const name = feature.properties.name;
        const geo = feature.geometry;

        // ---- Marker ----
        if (geo.type === "Point") {
          const [lng, lat] = geo.coordinates;
          return (
            <Marker
              key={id}
              position={[lat, lng]}
              icon={markerIcon}
            >
              <Popup>{name}</Popup>
            </Marker>
          );
        }

        // ---- Polygon ----
        if (geo.type === "Polygon") {
            const polygon: LatLngTuple[] = geo.coordinates[0].map(
                ([lng, lat]): LatLngTuple => [lat, lng]
            );

            return (
                <Polygon key={id} positions={polygon}>
                <Popup>{name}</Popup>
                </Polygon>
            );
        }

        return null;
      })}
    </>
  );
}
