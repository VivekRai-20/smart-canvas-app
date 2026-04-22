const mongoose = require("mongoose");

const drawingSchema = new mongoose.Schema({
  userId: String,
  shape: Object,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Drawing", drawingSchema);