"use client";

import React from "react";
import { Button } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useTheme } from "@/contexts/theme-context";

const ThemeToggleButton: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        zIndex: 1000,
      }}
    >
      <Button
        type="default"
        shape="circle"
        icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
        onClick={toggleTheme}
        style={{
          fontSize: "16px",
          width: "30px",
          height: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: isDarkMode ? "#ffffff20" : "#00000020",
          color: isDarkMode ? "#ffffff" : "#000000",
          border: "none",
          backdropFilter: "blur(5px)",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      />
    </div>
  );
};

export default ThemeToggleButton;
