const catchAsyncError = require("../middleware/catchAsyncError");
const foodModel = require("../models/food");
const ErrorHandler = require("../utils/ErrorHandler");

const route = require("express").Router();

route.post("create_food", async (req, res, next) => {
  const { nom, tel, email, time, genre } = req.body;
  try {
    const newFood = new foodModel({
      nom,
      tel,
      email,
      time,
      genre,
    });
    const savedFood = await newFood.save();
    res.status(200).json(savedFood);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

route.put(
  "/update_food/:id",
  catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    try {
      const updateFood = await foodModel.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      res.status(201).json(updateFood);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

route.delete(
  "/delete_food/:id",
  catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    try {
      await foodModel.findByIdAndDelete(id);
      res.status(200).json({ message: "food is deleted" });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

route.get(
  "/get_all_foods",
  catchAsyncError(async (req, res, next) => {
    const foods = await foodModel.find({});
    foods && res.status(200).json(foods);
  })
);

route.get(
  "/get_food/:id",
  catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    try {
      const food = await foodModel.findOne(id);
      res.status(200).json(food);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = route;
