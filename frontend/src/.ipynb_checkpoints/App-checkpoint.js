import React, { useState } from "react";
import { predict } from "./api";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    education: "",
    region: "",
    marital: "",
    chronic: "",
    glucose: "",
    bmi: "",
    sleep: "",
    activity: "",
    smoking: "",
    alcohol: ""
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // clear error when user types
  };

  const handlePredict = async () => {
    // 🔴 Validation: check empty fields
    for (let key in formData) {
      if (formData[key] === "") {
        setError("⚠️ Please fill all fields before predicting.");
        setResult(null);
        return;
      }
    }

    const features = [
      Number(formData.age),
      Number(formData.gender),
      Number(formData.education),
      Number(formData.region),
      Number(formData.marital),
      Number(formData.chronic),
      Number(formData.glucose),
      Number(formData.bmi),
      Number(formData.sleep),
      Number(formData.activity),
      Number(formData.smoking),
      Number(formData.alcohol)
    ];

    const res = await predict(features);
    setResult(res.prediction);
  };

  return (
    <div className="container">
      <h1>Cognitive Impairment Prediction</h1>

      <div className="card">
        <div className="grid">
          <label>Age</label>
          <input name="age" onChange={handleChange} />

          <label>Gender</label>
          <select name="gender" onChange={handleChange}>
            <option value="">Select</option>
            <option value="0">Female</option>
            <option value="1">Male</option>
          </select>

          <label>Education Level</label>
          <input name="education" onChange={handleChange} />

          <label>Region</label>
          <select name="region" onChange={handleChange}>
            <option value="">Select</option>
            <option value="0">Urban</option>
            <option value="1">Rural</option>
          </select>

          <label>Marital Status</label>
          <select name="marital" onChange={handleChange}>
            <option value="">Select</option>
            <option value="0">Single</option>
            <option value="1">Married</option>
            <option value="2">Widowed</option>
          </select>

          <label>Chronic Diseases</label>
          <input name="chronic" onChange={handleChange} />

          <label>Glucose Level</label>
          <input name="glucose" onChange={handleChange} />

          <label>BMI</label>
          <input name="bmi" onChange={handleChange} />

          <label>Sleep Quality</label>
          <input name="sleep" onChange={handleChange} />

          <label>Physical Activity</label>
          <input name="activity" onChange={handleChange} />

          <label>Smoking</label>
          <select name="smoking" onChange={handleChange}>
            <option value="">Select</option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>

          <label>Alcohol Use</label>
          <select name="alcohol" onChange={handleChange}>
            <option value="">Select</option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>

        <button onClick={handlePredict}>Predict</button>

        {/* 🔴 Error message */}
        {error && <div className="error">{error}</div>}

        {/* ✅ Result */}
        {result !== null && (
          <div className={`result ${result === 1 ? "high" : "low"}`}>
            {result === 1 ? "High Risk" : "Low Risk"}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
