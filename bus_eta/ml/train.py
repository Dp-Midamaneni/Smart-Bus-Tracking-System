import pandas as pd
import joblib

from sklearn.svm import SVR
from sklearn.neighbors import KNeighborsRegressor

import os

current_dir = os.path.dirname(os.path.abspath(__file__))
csv_file = os.path.join(current_dir, "..", "backend", "gps_data.csv")

df = pd.read_csv(csv_file)

X = df[["speed", "distance_to_stop"]]
y = df["eta"]

svr_model = SVR(kernel="rbf")

svr_model.fit(X, y)

knn_model = KNeighborsRegressor(
    n_neighbors=3
)

knn_model.fit(X, y)

joblib.dump(
    svr_model,
    "eta_model.pkl"
)

joblib.dump(
    knn_model,
    "knn_model.pkl"
)

print("Models Saved Successfully")