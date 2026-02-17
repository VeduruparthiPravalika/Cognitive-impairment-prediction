const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());              
app.use(express.json());

app.post("/predict", async (req, res) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/predict",
      { features: req.body.features }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "ML API not reachable" });
  }
});

app.listen(3001, () => {
  console.log("Backend running on port 3001");
});
