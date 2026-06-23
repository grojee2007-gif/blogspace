const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req,res)=>{
res.send("Backend Running");
});

app.get("/test",(req,res)=>{
res.json({
message:"Test route working 🚀"
});
});

// ADD THESE
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
console.log(`Server running on port ${PORT}`);
});