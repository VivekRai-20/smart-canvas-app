import React from "react";

const Controls = ({ points, canvasRef }) => {
  const handleSave = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("https://smart-canvas-app-4.onrender.com/api/save-drawing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ points }),
    });

    const data = await res.json();

    alert(`Detected: ${data.shape.type}`);

    // draw perfect shape
    canvasRef.current.drawPerfectShape(data.shape);
  };

  return (
    <div className="controls-toolbar">
      <button className="btn btn-accent" onClick={handleSave}>✨ Auto-Correct Drawing</button>
    </div>
  );
};

export default Controls;