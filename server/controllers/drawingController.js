// const recognizeShape = require("../algorithms/shapeRecognizer");
const Drawing = require("../models/Drawing");

const recognizeShape = require("../algorithms/shapeRecognizer");

exports.saveDrawing = async (req, res) => {
  try {
    const { points } = req.body;

    const shape = recognizeShape(points);  // 🔥 algorithm

    const drawing = await Drawing.create({
      userId: req.user.id,
      shape,
    });

    res.json({ shape, drawing });  // ✅ IMPORTANT

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error saving drawing" });
  }
};