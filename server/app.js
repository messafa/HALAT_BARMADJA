const express = require("express");
const cors = require("cors");

const cowRoutes = require("./routes/cowRoutes");
const authRoutes = require("./routes/authRoutes");
const milkRoutes = require("./routes/milkProductionRoutes");
const examRoutes = require("./routes/examRoutes");
const birthRoutes = require("./routes/birthRoutes");
const securityMiddleware = require("./middlewares/securityMiddleware");
const errorHandler = require("./middlewares/errorHandler");

require("dotenv").config();

const app = express();
securityMiddleware(app);


app.use(cors());
app.use(express.json());

app.use("/cows", cowRoutes);
app.use("/auth", authRoutes);
app.use("/milk", milkRoutes);
app.use("/exam", examRoutes);
app.use("/births", birthRoutes);



app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
