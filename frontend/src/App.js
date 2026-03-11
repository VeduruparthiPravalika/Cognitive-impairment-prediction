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
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

      const response = await fetch("http://localhost:3001/predict", {
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
          sleep_quality: Number(formData.sleep),
          physical_activity: Number(formData.activity),
          smoking: Number(formData.smoking),
          alcohol: Number(formData.alcohol)
        })
      });

      const data = await response.json();
      setResult(data.result);

    } catch (err) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  // Show login if not logged in
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

        <button onClick={handlePredict} disabled={loading}>
          {loading ? "Predicting..." : "Predict"}
        </button>

        {error && <div className="error">{error}</div>}
        {loading && <div className="loading">Analyzing data...</div>}

        {result !== null && !loading && (
          <div className={`result ${result === 1 ? "high" : "low"}`}>
            {result === 1 ? "High Risk" : "Low Risk"}
          </div>
        )}

      </div>
    </div>
  );
}

export default App;