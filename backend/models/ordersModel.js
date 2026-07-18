import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  items: {
    type: [Object],
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  address: {
    type: Object,
    required: true,
  },

  status: {
    type: String,
    default: "Food Processing",
  },

  payment: {
    type: Boolean,
    default: false,
  },

  date: {
    type: Date,
    default: Date.now,
  },

  rzrPaymentId: {
    type: String,
    required: true,
  },

  rzrOrderId: {
    type: String,
    required: true,
  },
  rzrSignature: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
