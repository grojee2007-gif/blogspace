const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB ERROR:", err));

app.get("/", (req, res) => {
  res.send("Backend Running");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log("Server running"));