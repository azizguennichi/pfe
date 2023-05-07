const catchAsyncError = require("../middleware/catchAsyncError");
const hotelModel = require("../models/hotels");
const ErrorHandler = require("../utils/ErrorHandler");
const route = require("express").Router();

route.post("/add_hotel", async (req, res, next) => {
  const { nom, tel, email, time, qualibre } = req.body;
  try {
    const newHotel = new hotelModel({
      nom,
      email,
      qualibre,
      tel,
      time,
    });
    const hotelSaved = await newHotel.save();
    res.status(201).json(hotelSaved);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// update hotel

route.put(
  "/update_hotel/:id",
  catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    try {
      const updateHotel = await hotelModel.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(201).json(updateHotel);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete Hotel

route.delete(
  "/delete_hotel/:id",
  catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    try {
      await hotelModel.findByIdAndDelete(id);
      res.status(200).json({ message: "hotel is deleted!" });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all hotels

route.get(
  "/all_hotels",
  catchAsyncError(async (req, res, next) => {
    const hotels = await hotelModel.find({});
    hotels && res.status(200).json(hotels);
  })
);

// get one hotel

route.get(
  "/one_hotel/:id",
  catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    try {
      const hotel = await hotelModel.findById(id);
      res.status(200).json(hotel);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = route;
