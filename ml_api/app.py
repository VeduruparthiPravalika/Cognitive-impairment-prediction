from flask import Flask, request, jsonify
import joblib
import numpy as np
import os

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model_path = os.path.join(BASE_DIR, "..", "ml", "model.pkl")
scaler_path = os.path.join(BASE_DIR, "..", "ml", "scaler.pkl")

model = joblib.load(model_path)
scaler = joblib.load(scaler_path)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json["features"]
    features = scaler.transform([data])
    prediction = model.predict(features)[0]
    return jsonify({"prediction": int(prediction)})

if __name__ == "__main__":
    app.run(debug=True)
