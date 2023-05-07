const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  nom: { type: String, required: [true, "name is required"] },
  tel: { type: Number, required: [true, "tel is required"] },
  email: { type: String, required: [true, "email is required"] },
  time: { type: String, required: [true, "time is required"] },
});

const serviceModel = mongoose.model("service", serviceSchema);

module.exports = serviceModel;
