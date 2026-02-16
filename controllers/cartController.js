const Cart = require('../models/Cart');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart) {
        cart = await Cart.create({ user: req.user._id, items: [] });
    }
    res.json(cart);
};

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
        cart = await Cart.create({ user: req.user._id, items: [] });
    }

    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

    if (itemIndex > -1) {
        cart.items[itemIndex].quantity += Number(quantity);
    } else {
        cart.items.push({ product: productId, quantity: Number(quantity) });
    }

    await cart.save();
    const populatedCart = await cart.populate('items.product');
    res.json(populatedCart);
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/update
// @access  Private
const updateCartItem = async (req, res) => {
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
        const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
        if (itemIndex > -1) {
            if (quantity > 0) {
                cart.items[itemIndex].quantity = quantity;
            } else {
                cart.items.splice(itemIndex, 1);
            }
            await cart.save();
            const populatedCart = await cart.populate('items.product');
            res.json(populatedCart);
        } else {
            res.status(404).json({ message: 'Item not found in cart' });
        }
    } else {
        res.status(404).json({ message: 'Cart not found' });
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove
// @access  Private
const removeFromCart = async (req, res) => {
    const { productId } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
        cart.items = cart.items.filter((item) => item.product.toString() !== productId);
        await cart.save();
        const populatedCart = await cart.populate('items.product');
        res.json(populatedCart);
    } else {
        res.status(404).json({ message: 'Cart not found' });
    }
};

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
};
