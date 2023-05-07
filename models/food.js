const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  nom: { type: String, required: [true, "name is required"] },
  tel: { type: Number, required: [true, "tel is required"] },
  email: { type: String, required: [true, "email is required"] },
  time: { type: String, required: [true, "time is required"] },
  genre: { type: String, required: [true, "genre is required"] },
});

const foodModel = mongoose.model("food", foodSchema);
module.exports = foodModel;
