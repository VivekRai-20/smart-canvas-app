import React, { useState, useRef } from "react";
import CanvasBoard from "../components/CanvasBoard";
import Controls from "../components/Controls";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [points, setPoints] = useState([]);
  const canvasRef = useRef();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="dashboard-logo">
          <div className="dashboard-logo-icon">✏️</div>
          <span className="dashboard-title">Smart Canvas</span>
        </div>
        <button className="btn btn-secondary" onClick={logout}>Logout</button>
      </header>

      <main className="dashboard-main">
        <CanvasBoard ref={canvasRef} setPoints={setPoints} />
        <Controls points={points} canvasRef={canvasRef} />
      </main>
    </div>
  );
};

export default Dashboard;