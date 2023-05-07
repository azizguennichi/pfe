const catchAsyncError = require("../middleware/catchAsyncError");
const serviceModel = require("../models/service");
const ErrorHandler = require("../utils/ErrorHandler");

const route = require("express").Router();

route.post("/add_service", async (req, res, next) => {
  const { nom, tel, email, time } = req.body;
  try {
    const newService = new serviceModel({
      nom,
      tel,
      email,
      time,
    });
    const serviceSaved = await newService.save();
    res.status(201).json(serviceSaved);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// update Service

route.put(
  "/update_service/:id",
  catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    try {
      const updateService = await serviceModel.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      res.status(201).json(updateService);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

route.delete(
  "/delete_service/:id",
  catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    try {
      await serviceModel.findByIdAndDelete(id);
      res.status(200).json({ message: "service is deleted" });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all

route.get(
  "/all_services",
  catchAsyncError(async (req, res, next) => {
    const services = await serviceModel.find({});
    services && res.status(200).json(services);
  })
);

// get one service
route.get(
  "/get_service/:id",
  catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    try {
      const service = await serviceModel.findById(id);
      res.status(200).json(service);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = route;
