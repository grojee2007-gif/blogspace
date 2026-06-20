const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ROOT ROUTE
app.get("/", (req, res) => {
  res.send("Backend Running");
});

// 👇 ADD THIS HERE
app.get("/test", (req, res) => {
  res.json({ message: "Test route working 🚀" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});