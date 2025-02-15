const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Sample hardcoded credentials, replace with actual user validation
  if (username !== "admin" || password !== "password") {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate JWT token
  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "10d" });

  res.json({ token });
});

module.exports = router;
