const User = require("../models/user");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const sendMail = require("../utils/sendMail");
const jwt = require("jsonwebtoken");
const route = require("express").Router();

route.post("/create_user", async (req, res, next) => {
  try {
    const { fullname, email, password } = req.body;
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      return next(new ErrorHandler("User already exist", 400));
    }

    const user = {
      fullname: fullname,
      email: email,
      password: password,
    };
    const activationToken = createActivationToken(user);
    const activationUrl = `http://localhost:3000/activation/${activationToken}`; // hedha el path mte3 el front
    try {
      await sendMail({
        email: user.email,
        subject: "Activate your Account",
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// activate user

route.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activaton_token } = req.body;

      const newUser = jwt.verify(
        activaton_token,
        process.env.ACTIVATION_SECRET
      );
      if (!newUser) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { fullname, email, password } = newUser;
      let user = await User.findOne({ email });
      if (user) {
        return next(new ErrorHandler("User already exists", 400));
      }
      user = await User.create({
        fullname,
        email,
        password,
      });
      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

route.get("get_user/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await User.findOne(id);
    res.status(200).json(user);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// hedhi zeda testa3melha lel update info :

route.put("/confirm_user/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const confirmUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(201).json(confirmUser);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

route.post(
  "/login_user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields", 400));
      }
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorHandler("Email is not exist", 400));
      }
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return next(new ErrorHandler("Invalid Password", 400));
      }
      sendToken(admin, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update user password

route.put(
  "/update_user_password/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id).select("+password"); // hedhi bel redux memba3ed el user eli aamel login howa eli besh yethat el id mte3ou :)

      const isPasswordMatch = await user.comparePassword(req.body.oldPassword);
      if (!isPasswordMatch) {
        return next(new ErrorHandler("Old password is incorrect", 400));
      }
      if (req.body.newPassword !== req.body.confirmPassword) {
        return next(
          new ErrorHandler("Password doesn't matched with each other", 400)
        );
      }
      user.password = req.body.newPassword;
      await user.save();
      res.status(200).json({ message: "Password updated successfuly" });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete account

route.delete(
  "/delete_user/:id",
  catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    try {
      await User.findByIdAndDelete(id);
      res.status(200).json("user is deleted");
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = route;
