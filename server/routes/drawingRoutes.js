const express = require("express");
const router = express.Router();
const { saveDrawing } = require("../controllers/drawingController");
const auth = require("../middleware/authMiddleware");

router.post("/save-drawing", auth, saveDrawing);


module.exports = router;