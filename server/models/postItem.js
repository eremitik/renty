import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  description: String,
  email: String,
  name: String,
  tags: [String],
  createdAt: {
    type: Date,
    default: new Date(),
  },
  rented: Boolean,

  // startRentDate: Date,
  // endRentDate: Date,


  // rentedBy: [String], 
  // startDateRental: [Date],
  // endDateRental: [Date],
  // numberNights: [Number],

  // itemArr[2]

  price_id: String,
  price: Number,
  selectedFile: String,
});

const postItem = mongoose.model("postItem", postSchema);

export default postItem;