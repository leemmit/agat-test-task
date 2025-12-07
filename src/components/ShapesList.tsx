import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { removeShape } from "./shapesSlice";
import { MdDeleteForever } from "react-icons/md";
import Button from "./Button";

export default function ShapesList() {
  const shapes = useSelector((state: RootState) => state.shapes.items);
  const dispatch = useDispatch();

  return (
    <>
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
    </>
  );
}
