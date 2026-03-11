const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../config/db");

/* SIGNUP */
router.post("/signup", async (req, res) => {
  try {

    const { name, password } = req.body;

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE name=$1",
      [name]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users(name,password) VALUES($1,$2)",
      [name, hashedPassword]
    );

    res.json({ message: "Signup successful" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Signup failed" });
  }
});


/* LOGIN */
router.post("/login", async (req, res) => {
  try {

    const { name, password } = req.body;

    const user = await pool.query(
      "SELECT * FROM users WHERE name=$1",
      [name]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.json({
      message: "Login successful",
      userId: user.rows[0].id
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
});

module.exports = router;