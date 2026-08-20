from flask import Flask, request, jsonify
import joblib
import numpy as np
import os

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model_path = os.path.join(BASE_DIR, "..", "ml", "model.pkl")
scaler_path = os.path.join(BASE_DIR, "..", "ml", "scaler.pkl")
encoder_path = os.path.join(BASE_DIR, "..", "ml", "label_encoders.pkl")

model = joblib.load(model_path)
scaler = joblib.load(scaler_path)
label_encoders = joblib.load(encoder_path)

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json["features"]

    features = np.array(data, dtype=float).reshape(1, -1)

    features = scaler.transform(features)

    prediction = model.predict(features)[0]

    probability = model.predict_proba(features)[0]

    return jsonify({
        "prediction": int(prediction),
        "probability": float(max(probability))
    })


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)