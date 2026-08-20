const express = require("express");
const router = express.Router();
const axios = require("axios");
const pool = require("../config/db");

router.post("/", async (req, res) => {
  try {

    const {
      userId,
      age,
      gender,
      education,
      region,
      marital_status,
      chronic_diseases,
      glucose,
      bmi,
      mmse,
      gds,
      sleep_quality,
      physical_activity,
      smoking,
      alcohol
    } = req.body;

    const features = [
      Number(age),
      Number(gender),
      Number(education),
      Number(region),
      Number(marital_status),
      Number(chronic_diseases),
      Number(glucose),
      Number(bmi),
      Number(mmse),
      Number(gds),
      Number(sleep_quality),
      Number(physical_activity),
      Number(smoking),
      Number(alcohol)
    ];

    const response = await axios.post(
      "http://127.0.0.1:5000/predict",
      { features }
    );

    const result = response.data.prediction;

    await pool.query(
      `INSERT INTO predictions
      (user_id, age, gender, education, region, marital_status,
      chronic_diseases, glucose, bmi, mmse, gds, sleep_quality,
      physical_activity, smoking, alcohol, result)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)`,
      [
        userId,
        age,
        gender,
        education,
        region,
        marital_status,
        chronic_diseases,
        glucose,
        bmi,
        mmse,
        gds,
        sleep_quality,
        physical_activity,
        smoking,
        alcohol,
        result
      ]
    );

    res.json({ result });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Prediction failed" });
  }
});

module.exports = router;