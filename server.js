const express = require("express");
const app = express();
const db = require("./db");
const {jwtAuthMiddleware}=require('./jwt')

require('dotenv').config();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

const userRoutes = require("./routes/userRoutes");

const candidateRoutes = require("./routes/candidateRoutes");

app.use("/user", userRoutes);
app.use("/candidate", jwtAuthMiddleware,candidateRoutes);


app.listen(PORT, () => {
  console.log("listing on port 3000");
});
