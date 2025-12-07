import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { removeShape } from "./shapesSlice";
import { MdDeleteForever } from "react-icons/md";
import Button from "./Button";

interface SidebarProps {
  isVisible: boolean;
}

export default function Sidebar({ isVisible }: SidebarProps) {
  const shapes = useSelector((state: RootState) => state.shapes.items);
  const dispatch = useDispatch();

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "240px",
        height: "100vh",
        background: "#fff",
        borderRight: "1px solid #ccc",
        padding: "12px",
        overflowY: "auto",
        zIndex: 1000,
        transform: isVisible ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.3s ease",
        boxShadow: isVisible ? "2px 0 5px rgba(0,0,0,0.1)" : "none",
      }}
    >
      {shapes.length === 0 && <p>Нет объектов</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {shapes.map((sh) => (
          <li
            key={sh.properties.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "2px 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <span>{sh.properties.name}</span>
            <Button
              onClick={() => dispatch(removeShape(sh.properties.id))}
              textColor="#eb3b3b"
              hoverTextColor="#9d1616"
            >
              <MdDeleteForever size={26} />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
