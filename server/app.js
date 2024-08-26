const express = require("express");
const cors = require("cors");

const cowRoutes = require("./routes/cowRoutes");
const authRoutes = require("./routes/authRoutes");
const milkRoutes = require("./routes/milkProductionRoutes");
const examRoutes = require("./routes/examRoutes");
const birthRoutes = require("./routes/birthRoutes");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/cows", cowRoutes);      // Done
app.use("/auth", authRoutes);     // Done
app.use("/milk", milkRoutes);     // Done
app.use("/exam", examRoutes);     // Done
app.use("/births", birthRoutes);  // Todo: work on this

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
