const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  nom: { type: String, required: [true, "name is required"] },
  tel: { type: Number, required: [true, "tel is required"] },
  email: { type: String, required: [true, "email is required"] },
  time: { type: String, required: [true, "time is required"] },
  qualibre: { type: String, required: [true, "qualibre is required"] },
});

const hotelModel = mongoose.model("hotel", hotelSchema);
module.exports = hotelModel;
