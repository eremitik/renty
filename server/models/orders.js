import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  //   user:{type:mongoose.Schema.Types.ObjectId,
  // ref:"User"
  // },

  title: String,
  price_id: String,
  nightPrice: Number,
  totalPrice: Number,
  lenderEmail: String,
  lenderName: String,
  numberNights: Number,
  startDate: Date,
  returnDate: Date,
  renterEmail: String,
  renterName: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  selectedFile: String,
  txhash: String,
});

const postOrder = mongoose.model("postOrder", orderSchema);

export default postOrder;