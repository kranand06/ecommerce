import crypto from "crypto";
import razorpay from "../config/razorpay.js";
import { calculateAmount, placeOrder } from "../utils/placeOrder.js";

export const createOrder = async (req, res, next) => {
  try {
    const amount = await calculateAmount(req.user.cartData);

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, address } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      const result = await placeOrder(
        req,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        address,
      );

      return res.status(result.success ? 200 : 500).json(result);
    }

    res.status(400).json({
      success: false,
      message: "Invalid signature",
    });
  } catch (error) {
    console.error("Error in verifyPayment:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
