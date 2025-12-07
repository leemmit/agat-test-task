import { ReactNode } from "react";
import ShapesList from "./ShapesList";
import AddPoint from "./AddPoint";

interface SidebarProps {
  isVisible: boolean;
}

export default function Sidebar({ isVisible }: SidebarProps) {
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
        zIndex: 1000,
        transform: isVisible ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.3s ease",
        boxShadow: isVisible ? "2px 0 5px rgba(0,0,0,0.1)" : "none",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "12px 12px 12px 12px",
        }}
      >
        <ShapesList />
      </div>

      <hr style={{ margin: "0 12px", borderColor: "#ddd" }} />

      <div
        style={{
          flexShrink: 0,
          padding: "12px",
        }}
      >
        <AddPoint />
      </div>
    </div>
  );
}
