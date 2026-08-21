import React, { useState } from "react";
import "./App.css";
import Login from "./login";

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
    mmse: "",
    gds: "",
    sleep: "",
    activity: "",
    smoking: "",
    alcohol: ""
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("userId");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    setError("");
    setResult(null);
  };

  const handlePredict = async () => {
    setResult(null);
    setError("");
    setLoading(true);

    for (let key in formData) {
      if (formData[key] === "") {
        setError("⚠️ Please fill all fields before predicting.");
        setLoading(false);
        return;
      }
    }

    try {
      const response = await fetch("https://cogni-risk-enginebackend.onrender.com/predict",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: userId,
          age: Number(formData.age),
          gender: Number(formData.gender),
          education: Number(formData.education),
          region: Number(formData.region),
          marital_status: Number(formData.marital),
          chronic_diseases: Number(formData.chronic),
          glucose: Number(formData.glucose),
          bmi: Number(formData.bmi),
          mmse: Number(formData.mmse),
          gds: Number(formData.gds),
          sleep_quality: Number(formData.sleep),
          physical_activity: Number(formData.activity),
          smoking: Number(formData.smoking),
          alcohol: Number(formData.alcohol)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Prediction failed");
      }

      setResult(data.result);

    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  if (!userId) {
    return <Login />;
  }

  return (
    <div className="container">

      <h1>Cognitive Impairment Prediction</h1>

      <button
        onClick={() => {
          localStorage.removeItem("userId");
          window.location.reload();
        }}
      >
        Logout
      </button>

      <div className="card">

        <div className="grid">

          <label>Age</label>
          <input
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
          />

          <label>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="0">Female</option>
            <option value="1">Male</option>
          </select>

          <label>Education Level</label>
          <input
            name="education"
            type="number"
            value={formData.education}
            onChange={handleChange}
          />

          <label>Region</label>
          <select
            name="region"
            value={formData.region}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="0">Rural</option>
            <option value="1">Urban</option>
          </select>

          <label>Marital Status</label>
          <select
            name="marital"
            value={formData.marital}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="0">Divorced</option>
            <option value="1">Married</option>
            <option value="2">Single</option>
            <option value="3">Widowed</option>
          </select>

          <label>Chronic Diseases</label>
          <input
            name="chronic"
            type="number"
            value={formData.chronic}
            onChange={handleChange}
          />

          <label>Glucose Level</label>
          <input
            name="glucose"
            type="number"
            step="any"
            value={formData.glucose}
            onChange={handleChange}
          />

          <label>BMI</label>
          <input
            name="bmi"
            type="number"
            step="any"
            value={formData.bmi}
            onChange={handleChange}
          />

          <label>MMSE Score</label>
          <input
            name="mmse"
            type="number"
            step="any"
            value={formData.mmse}
            onChange={handleChange}
          />

          <label>GDS Score</label>
          <input
            name="gds"
            type="number"
            step="any"
            value={formData.gds}
            onChange={handleChange}
          />

          <label>Sleep Quality</label>
          <input
            name="sleep"
            type="number"
            step="any"
            value={formData.sleep}
            onChange={handleChange}
          />

          <label>Physical Activity</label>
          <input
            name="activity"
            type="number"
            step="any"
            value={formData.activity}
            onChange={handleChange}
          />

          <label>Smoking</label>
          <select
            name="smoking"
            value={formData.smoking}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>

          <label>Alcohol Use</label>
          <select
            name="alcohol"
            value={formData.alcohol}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>

        </div>

        <button
          onClick={handlePredict}
          disabled={loading}
        >
          {loading ? "Predicting..." : "Predict"}
        </button>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {loading && (
          <div className="loading">
            Analyzing data...
          </div>
        )}

        {result !== null && !loading && (
          <div
            className={`result ${
              Number(result) === 1 ? "high" : "low"
            }`}
          >
            {Number(result) === 1 ? "High Risk" : "Low Risk"}
          </div>
        )}

      </div>
    </div>
  );
}

export default App;