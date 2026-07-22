import Food from "../models/FoodModel.js";
import Order from "../models/ordersModel.js";

export const calculateAmount = async (cart) => {
  let totalAmount = 0;

  for (const foodId in cart) {
    const quantity = cart[foodId];

    if (quantity <= 0) continue;

    const food = await Food.findById(foodId);

    if (!food) continue;

    totalAmount += food.price * quantity;
  }
  if (totalAmount <= 0) {
    return res.status(400).json({
      success: false,
      message: "Cart is empty or invalid items",
    });
  }
  if (totalAmount < 500) {
    totalAmount += 50; // Add delivery charge if total is less than 500
  }
  return totalAmount;
};

export const placeOrder = async (
  req,
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  address,
) => {
  try {
    const cart = req.user.cartData;

    let items = [];
    let totalAmount = 0;

    // Build items array and calculate total
    for (const foodId in cart) {
      const quantity = cart[foodId];

      if (quantity <= 0) continue;

      const food = await Food.findById(foodId);

      if (!food) continue;

      totalAmount += food.price * quantity;

      items.push({
        foodId: food._id,
        title: food.title,
        price: food.price,
        quantity,
        image: food.image,
      });
    }
    if (totalAmount < 500) {
    totalAmount += 50; // Add delivery charge if total is less than 500
  }

    // Create Order
    const order = new Order({
      user: req.user._id,
      items,
      amount: totalAmount,
      address,
      payment: true,
      rzrOrderId: razorpay_order_id,
      rzrPaymentId: razorpay_payment_id,
      rzrSignature: razorpay_signature,
    });

    await order.save();

    // Clear cart
    req.user.cartData = {};
    req.user.markModified("cartData");
    await req.user.save();

    return {
      success: true,
      message: "Order placed successfully",
      order,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "Failed to place order",
    };
  }
};
