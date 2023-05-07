const express = require("express");
const userRoute = require("./controllers/user");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const ErrorHandler = require("./utils/ErrorHandler");
const hotelRoute = require("./controllers/hotel");
const serviceRoute = require("./controllers/service");
const adminstrationRoute = require("./controllers/adminstration");
const foodRoute = require("./controllers/food");
const medicalRoute = require("./controllers/medical");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./config/.env",
  });
}
app.use("/user", userRoute);
app.use("/hotel", hotelRoute);
app.use("/service", serviceRoute);
app.use("/adminstration", adminstrationRoute);
app.use("/food", foodRoute);
app.use("/medical", medicalRoute);
app.use(ErrorHandler);
module.exports = app;
