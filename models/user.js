const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: [true, "fullname must be required"] },
    email: { type: String, required: [true, "email must be required"] },
    password: { type: String, required: [true, "email must be required"] },
    country: { type: String },
    dateOfBirth: { type: Date },
    city: { type: String },
    phoneNumber: { type: Number },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

// hashed Password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
// jwt token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};
// compare lel password

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("user", userSchema);
module.exports = User;
