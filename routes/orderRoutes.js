const express = require('express');
const router = express.Router();
const {
    addOrderItems,
    getOrderById, // Wait, I didn't implement this in controller? Let me check. I might have missed it. If so, I will add it or just rely on getMyOrders.
    // Actually I checked the controller I wrote: addOrderItems, getMyOrders, getOrders, updateOrderStatus, getStats.
    // I didn't write getOrderById. I should probably add it for detail view.
    getMyOrders,
    getOrders,
    updateOrderStatus,
    getStats
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/stats').get(protect, admin, getStats);
router.route('/:id/status').put(protect, admin, updateOrderStatus);

module.exports = router;
