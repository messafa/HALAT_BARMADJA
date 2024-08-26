const express = require("express");
const cors = require("cors");


const cowRoutes = require("./routes/cowRoutes");
const authRoutes = require("./routes/authRoutes");
const milkRoutes = require("./routes/milkRoutes");
const userRoutes = require("./routes/userRoutes");
const birthRoutes = require("./routes/birthRoutes");


require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/cows", cowRoutes);
app.use("/auth", authRoutes);
app.use("/milk", milkRoutes);
app.use("/users", userRoutes);
app.use("/births", birthRoutes);





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
