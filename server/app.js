const express = require("express");
const cors = require("cors");
const cowRoutes = require("./routes/cowRoutes");
const authRoutes = require("./routes/authRoutes");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/cows", cowRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
