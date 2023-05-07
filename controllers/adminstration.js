const catchAsyncError = require("../middleware/catchAsyncError");
const adminstrationModel = require("../models/adminstration");
const ErrorHandler = require("../utils/ErrorHandler");

const route = require("express").Router();

route.post("/new_adminstation", async (req, res, next) => {
  const { name, email, time, tel } = req.body;
  try {
    const newAdminstation = new adminstrationModel({
      name,
      email,
      time,
      tel,
    });
    const savedAdminstration = await newAdminstation.save();
    res.status(201).json(savedAdminstration);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// update

route.put(
  "/update_adminstration/:id",
  catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    try {
      const updateAdminstration = adminstrationModel.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      res.status(201).json(updateAdminstration);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete

route.delete(
  "/delete_adminstration/:id",
  catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    try {
      await adminstrationModel.findByIdAndDelete(id);
      res.status(200).json({ message: "adminstration is deleted" });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all
route.get(
  "/get_all_adminstrations",
  catchAsyncError(async (req, res, next) => {
    const adminstration = await adminstrationModel.find({});
    adminstration && res.status(200).json(adminstration);
  })
);

// get one

route.get(
  "/adminstration/:id",
  catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    try {
      const adminstration = await adminstrationModel.findOne(id);
      res.status(200).json(adminstration);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = route;
