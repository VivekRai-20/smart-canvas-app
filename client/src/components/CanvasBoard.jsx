import React, { useRef, useState, forwardRef, useImperativeHandle } from "react";

const CanvasBoard = forwardRef(({ setPoints }, ref) => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);

  // ✅ FIXED: define first
  const drawPerfectShape = (shape) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.strokeStyle = "#6366f1";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    switch (shape.type) {

      case "line": {
        const [s, e] = shape.points;
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(e.x, e.y);
        break;
      }

      case "circle": {
        ctx.arc(shape.center.x, shape.center.y, shape.radius, 0, 2 * Math.PI);
        break;
      }

      case "ellipse": {
        ctx.ellipse(
          shape.center.x, shape.center.y,
          shape.rx, shape.ry,
          0, 0, 2 * Math.PI
        );
        break;
      }

      case "rectangle":
      case "square": {
        const [p1, p2] = shape.points;
        ctx.rect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
        break;
      }

      case "triangle": {
        if (shape.points && shape.points.length >= 3) {
          const [a, b, c] = shape.points;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.lineTo(c.x, c.y);
          ctx.closePath();
        }
        break;
      }

      case "polygon": {
        // Regular polygon: n sides inscribed in the detected radius
        const { center, radius, sides } = shape;
        const n = Math.max(3, Math.min(sides || 5, 12));
        const angleOffset = -Math.PI / 2; // start at top
        for (let i = 0; i <= n; i++) {
          const angle = angleOffset + (2 * Math.PI * i) / n;
          const x = center.x + radius * Math.cos(angle);
          const y = center.y + radius * Math.sin(angle);
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        break;
      }

      case "arc": {
        ctx.arc(shape.center.x, shape.center.y, shape.radius, 0, Math.PI);
        break;
      }

      default:
        // Unknown / scribble — nothing to redraw
        break;
    }

    ctx.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setPoints([]);
  };

  // ✅ now safe to expose
  useImperativeHandle(ref, () => ({
    drawPerfectShape,
    clearCanvas
  }));

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(getX(e), getY(e));

    setDrawing(true);
  };

  const endDrawing = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.closePath();
    setDrawing(false);
  };

  const draw = (e) => {
    if (!drawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const x = getX(e);
    const y = getY(e);

    ctx.lineTo(x, y);
    ctx.strokeStyle = "#374151";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();

    setPoints((prev) => [...prev, { x, y }]);
  };

  const getX = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return e.clientX - rect.left;
  };

  const getY = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return e.clientY - rect.top;
  };

  return (
    <div className="canvas-container">
      <div className="canvas-wrapper">
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseMove={draw}
          onMouseLeave={endDrawing}
        />
      </div>
      <button className="btn btn-danger" onClick={clearCanvas}>Clear Canvas</button>
    </div>
  );
});

export default CanvasBoard;