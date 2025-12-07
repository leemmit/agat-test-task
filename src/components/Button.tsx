import React, { useState } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;        
  width?: string;
  height?: string;
  bgColor?: string;
  textColor?: string;
  hoverColor?: string;
  hoverTextColor?: string;
}


const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  width,
  height,
  bgColor = "transparent",
  textColor,
  hoverColor,
  hoverTextColor,
}) => {
  
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const style: React.CSSProperties = {
    padding: "0px",
    cursor: "pointer",
    background: isHovered ? (hoverColor || bgColor) : bgColor,
    border: "none",
    width: width,
    height: height,
    color: isHovered ? (hoverTextColor || textColor) : textColor,
    transition: "background 0.2s ease",
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
