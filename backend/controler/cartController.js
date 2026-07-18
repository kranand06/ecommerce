//updated
const addToCart = async (req, res) => {
  try {
    const { foodID } = req.body;

    if (!req.user.cartData[foodID]) {
      req.user.cartData[foodID] = 1;
    } else {
      req.user.cartData[foodID] += 1;
    }
    req.user.markModified("cartData"); // this will mark the cartData field as modified, ensuring that Mongoose saves the changes to the database
    await req.user.save();

    res.status(201).json({
      message: "Item added to cart successfully",
      cart: req.user.cartData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add item to cart",
      error: error.message,
    });
  }
};

//updated
const getCart = async (req, res) => {
  try {
    res.status(200).json({
      cart: req.user.cartData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve cart",
      error: error.message,
    });
  }
};

const deleteFromCart = async (req, res) => {
  try {
    const { foodID } = req.body;
    if (!req.user.cartData[foodID]) {
      return res.status(404).json({
        message: "Item not found in cart",
      });
    }
    if (req.user.cartData[foodID] > 1) {
      req.user.cartData[foodID] -= 1;
    } else {
      delete req.user.cartData[foodID];
    }

    req.user.markModified("cartData");
    await req.user.save();

    res.status(200).json({
      message: "Item removed from cart successfully",
      cart: req.user.cartData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to remove item from cart",
      error: error.message,
    });
  }
};

//updated
const clearCart = async (req, res) => {
  try {
    req.user.cartData = {};

    await req.user.save();

    res.status(200).json({
      message: "Cart cleared successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to clear cart",
      error: error.message,
    });
  }
};

export { addToCart, getCart, deleteFromCart, clearCart };
