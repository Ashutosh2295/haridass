const express = require('express');
const router = express.Router();
const { addOrderItems, verifyPayment, getOrderById, getOrders, updateOrder, deleteOrder } = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/').post(protect, addOrderItems).get(protect, authorize('admin'), getOrders);
router.route('/verify-payment').post(protect, verifyPayment);
router.route('/:id')
    .get(protect, getOrderById)
    .put(protect, authorize('admin'), updateOrder)
    .delete(protect, authorize('admin'), deleteOrder);

module.exports = router;
