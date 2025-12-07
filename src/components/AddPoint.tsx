import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addShape } from "./shapesSlice";
import { RootState } from "../store";
import Button from "./Button";

export default function AddPoint() {
  const dispatch = useDispatch();
  const shapes = useSelector((s: RootState) => s.shapes.items);

  const [name, setName] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAdd = () => {
    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);

    if (!name.trim()) return setError("Введите имя");
    if (isNaN(latNum) || latNum < -90 || latNum > 90)
      return setError("Широта должна быть от -90 до 90");
    if (isNaN(lngNum) || lngNum < -180 || lngNum > 180)
      return setError("Долгота должна быть от -180 до 180");

    const maxId = Math.max(...shapes.map(s => s.properties.id), 0);

    dispatch(
      addShape({
        id: maxId + 1,
        name,
        lat: latNum,
        lng: lngNum,
      })
    );

    setName("");
    setLat("");
    setLng("");
    setError("");
    setSuccess("Точка успешно добавлена!");

    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <div>
      <h4 style={{ marginBottom: "10px" }}>Добавить маркер</h4>

      {success && (
        <div style={{ color: "green", marginBottom: "8px", fontWeight: "bold" }}>
          {success}
        </div>
      )}

      {error && (
        <div style={{ color: "red", marginBottom: "8px" }}>{error}</div>
      )}

      <div style={{ marginBottom: "10px" }}>
        <label>Имя:</label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ width: "100%", padding: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Широта:</label>
        <input
          value={lat}
          onChange={e => setLat(e.target.value)}
          style={{ width: "100%", padding: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Долгота:</label>
        <input
          value={lng}
          onChange={e => setLng(e.target.value)}
          style={{ width: "100%", padding: "5px" }}
        />
      </div>

      <Button
        onClick={handleAdd}
        textColor="blue"
        width="100%"
        style={{ border: "1px solid blue", padding: "6px", borderRadius: "10px", fontSize: "16px" }}
      >
        Добавить
      </Button>
    </div>
  );
}
