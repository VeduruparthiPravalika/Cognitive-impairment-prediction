const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const predictRoutes = require("./routes/predict");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/predict", predictRoutes);

app.get("/test", (req, res) => {
  res.send("Server working");
});

app.listen(3001, () => {
  console.log("Backend running on port 3001");
});