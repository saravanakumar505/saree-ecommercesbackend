const Order = require('../models/Order');
const Cart = require('../models/Cart');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
    const { orderItems, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400).json({ message: 'No order items' });
        return;
    } else {
        const order = new Order({
            user: req.user._id,
            items: orderItems,
            totalAmount: totalPrice
        });

        const createdOrder = await order.save();

        // Clear cart after order
        await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });

        res.status(201).json(createdOrder);
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
};

// @desc    Update order to status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.status = req.body.status;
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
};

// @desc  Get stats for Admin Dashboard
// @route GET /api/orders/stats
// @access Private/Admin
const getStats = async (req, res) => {
    const User = require('../models/User');
    const Product = require('../models/Product');

    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const orders = await Order.find();
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);

    res.json({
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue
    });
}

module.exports = {
    addOrderItems,
    getMyOrders,
    getOrders,
    updateOrderStatus,
    getStats
};
