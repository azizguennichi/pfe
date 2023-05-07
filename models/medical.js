const mongoose = require("mongoose");

const medicalSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  email: { type: String, required: [true, "email is required"] },
  time: { type: String, required: [true, "time is required"] },
  tel: { type: Number, required: [true, "tel is required"] },
});

const medicalModel = mongoose.model("medical", medicalSchema);
module.exports = medicalModel;
