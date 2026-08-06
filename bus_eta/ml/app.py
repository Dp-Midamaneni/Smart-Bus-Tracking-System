from flask import Flask
from flask import jsonify
from flask import request

from flask_cors import CORS

import json
import joblib

app = Flask(__name__)
CORS(app)

svr_model = joblib.load(
    "../ml/eta_model.pkl"
)

knn_model = joblib.load(
    "../ml/knn_model.pkl"
)

@app.route("/routes", methods=["GET"])
def get_routes():

    with open("routes.json", "r") as file:
        routes = json.load(file)

    return jsonify(routes)


@app.route("/eta", methods=["POST"])
def predict_eta():

    data = request.json

    speed = float(data["speed"])

    distance = float(
        data["distance_to_stop"]
    )

    features = [
        [speed, distance]
    ]

    svr_eta = svr_model.predict(
        features
    )[0]

    knn_eta = knn_model.predict(
        features
    )[0]

    final_eta = round(
        (svr_eta + knn_eta) / 2
    )

    return jsonify({
        "eta_minutes": final_eta
    })


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )