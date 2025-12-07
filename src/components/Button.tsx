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
  style?: React.CSSProperties;  // Новый проп для дополнительных inline-стилей
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
  style: additionalStyle,  // Переименовал для ясности
}) => {
  
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const defaultStyle: React.CSSProperties = {
    padding: "0px",
    cursor: "pointer",
    background: isHovered ? (hoverColor || bgColor) : bgColor,
    border: "none",
    width: width,
    height: height,
    color: isHovered ? (hoverTextColor || textColor) : textColor,
    transition: "background 0.2s ease",
  };

  const combinedStyle = { ...defaultStyle, ...(additionalStyle || {}) };

  return (
    <button
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={combinedStyle}
    >
      {children}
    </button>
  );
};

export default Button;
