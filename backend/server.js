const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
   res.send("Backend is running");
});

app.post("/feedback", (req, res) => {

   console.log(req.body);

   res.send("Feedback received");
});

app.listen(5000, () => {
   console.log("Server running on port 5000");
});