function recognizeShape(points) {
  if (!points || points.length < 10) {
    return { type: "unknown" };
  }

  const start = points[0];
  const end = points[points.length - 1];

  const endDistance = Math.sqrt(
    (end.x - start.x) ** 2 + (end.y - start.y) ** 2
  );

  const isClosed = endDistance < 30;

  // Bounding box
  const xs = points.map(p => p.x);
  const ys = points.map(p => p.y);

  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const width = maxX - minX;
  const height = maxY - minY;

  // 🔵 CLOSED SHAPES (circle / rectangle)
  if (isClosed) {
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    const avgRadius =
      points.reduce(
        (sum, p) =>
          sum + Math.sqrt((p.x - centerX) ** 2 + (p.y - centerY) ** 2),
        0
      ) / points.length;

    const radiusVariance =
      points.reduce(
        (sum, p) =>
          sum +
          Math.abs(
            Math.sqrt((p.x - centerX) ** 2 + (p.y - centerY) ** 2) - avgRadius
          ),
        0
      ) / points.length;

    // ✅ CIRCLE
    if (radiusVariance < 10) {
      return {
        type: "circle",
        center: { x: centerX, y: centerY },
        radius: avgRadius,
      };
    }

    // ✅ RECTANGLE
    return {
      type: "rectangle",
      points: [
        { x: minX, y: minY },
        { x: maxX, y: maxY },
      ],
    };
  }

  // 🟢 OPEN SHAPE → LINE
  return {
    type: "line",
    points: [start, end],
  };
}

module.exports = recognizeShape;

