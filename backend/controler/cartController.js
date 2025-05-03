const addToCart = async (req, res) => {
    const { title, price, quantity } = req.body;
    const cartItem = {
        title,
        price,
        quantity
    };
    try {
        let cart = [];
        if (fs.existsSync('cart.json')) {
            const data = fs.readFileSync('cart.json');
            cart = JSON.parse(data);
        }
        cart.push(cartItem);
        fs.writeFileSync('cart.json', JSON.stringify(cart));
        res.status(201).json({ message: "Item added to cart successfully", cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add item to cart", error });
    }
}

const getCart = async (req, res) => {
}

const deleteFromCart = async (req, res) => {
    const { title } = req.params;
    try {
        let cart = [];
        if (fs.existsSync('cart.json')) {
            const data = fs.readFileSync('cart.json');
            cart = JSON.parse(data);
        }
        cart = cart.filter(item => item.title !== title);
        fs.writeFileSync('cart.json', JSON.stringify(cart));
        res.status(200).json({ message: "Item removed from cart successfully", cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to remove item from cart", error });
    }
}
const clearCart = async (req, res) => {
    try {
        fs.writeFileSync('cart.json', JSON.stringify([]));
        res.status(200).json({ message: "Cart cleared successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to clear cart", error });
    }
}
export { addToCart, getCart, deleteFromCart, clearCart }