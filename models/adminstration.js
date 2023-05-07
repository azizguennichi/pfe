const mongoose = require("mongoose");

const adminstrationSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  email: { type: String, required: [true, "email is required"] },
  time: { type: String, required: [true, "time is required"] },
  tel: { type: Number, required: [true, "tel is required"] },
});

const adminstrationModel = mongoose.model("adminstration", adminstrationSchema);
module.exports = adminstrationModel;
