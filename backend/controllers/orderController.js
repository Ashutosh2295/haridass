const Order = require('../models/Order');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder'
});

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.addOrderItems = async (req, res) => {
    try {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        } = req.body;

        if (orderItems && orderItems.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }

        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });

        const createdOrder = await order.save();

        if (paymentMethod === 'Razorpay') {
            const options = {
                amount: Math.round(totalPrice * 100),
                currency: "INR",
                receipt: `receipt_order_${createdOrder._id}`
            };

            try {
                const response = await razorpay.orders.create(options);
                res.status(201).json({
                    success: true,
                    order: createdOrder,
                    razorpayOrderId: response.id,
                    razorpayKeyId: process.env.RAZORPAY_KEY_ID,
                    amount: response.amount,
                    currency: response.currency
                });
            } catch (error) {
                console.error('Razorpay Error:', error);
                res.status(201).json({ success: true, order: createdOrder, message: 'Razorpay order creation failed' });
            }
        } else {
            res.status(201).json({ success: true, order: createdOrder });
        }

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Verify Razorpay Payment
// @route   POST /api/orders/verify-payment
// @access  Private
exports.verifyPayment = async (req, res) => {
    try {
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpaySignature,
            receiptId
        } = req.body;

        const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
        const digest = shasum.digest("hex");

        if (digest !== razorpaySignature) {
            return res.status(400).json({ success: false, message: "Transaction not legit!" });
        }

        const order = await Order.findById(receiptId);
        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: razorpayPaymentId,
                status: 'captured',
                update_time: Date.now(),
                email_address: req.user.email
            };

            const updatedOrder = await order.save();

            try {
                const customerMessage = `
                    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px;">
                        <h1 style="color: #0F766E;">Haridass - Order Confirmed 🙏</h1>
                        <p>Thank you for your order, ${req.user.name}. May Lord Krishna bless you.</p>
                        <h3>Order ID: ${updatedOrder._id}</h3>
                        <p><strong>Total Amount: ₹${updatedOrder.totalPrice}</strong></p>
                        <p>Your products will be shipped soon.</p>
                    </div>
                `;
                await sendEmail({
                    email: req.user.email,
                    subject: 'Order Confirmation - Haridass',
                    message: customerMessage
                });

                const adminEmail = process.env.ADMIN_ORDER_EMAIL || 'ashutosh@bsbfortrade.com';
                const itemsList = updatedOrder.orderItems.map(i => `<li>${i.name} x ${i.qty} = ₹${i.price * i.qty}</li>`).join('');
                const adminMessage = `
                    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px;">
                        <h2 style="color: #0F766E;">New Order Received - Haridass</h2>
                        <p><strong>Order ID:</strong> ${updatedOrder._id}</p>
                        <p><strong>Customer:</strong> ${req.user.name} (${req.user.email})</p>
                        <p><strong>Total:</strong> ₹${updatedOrder.totalPrice}</p>
                        <h4>Items:</h4>
                        <ul>${itemsList}</ul>
                        <h4>Shipping Address:</h4>
                        <p>${updatedOrder.shippingAddress?.fullName || req.user.name}<br/>
                        ${updatedOrder.shippingAddress?.phone || ''}<br/>
                        ${updatedOrder.shippingAddress?.address || ''}<br/>
                        ${updatedOrder.shippingAddress?.city || ''}, ${updatedOrder.shippingAddress?.state || ''} ${updatedOrder.shippingAddress?.postalCode || ''}<br/>
                        ${updatedOrder.shippingAddress?.country || ''}</p>
                    </div>
                `;
                await sendEmail({
                    email: adminEmail,
                    subject: `[Haridass] Order Confirmed: ${updatedOrder._id}`,
                    message: adminMessage
                });
            } catch (emailError) {
                console.error('Email sending failed:', emailError);
            }

            res.json({ success: true, data: updatedOrder });
        } else {
            res.status(404).json({ success: false, message: 'Order not found' });
        }

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private (own order or admin)
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        const orderUserId = order.user?._id?.toString() || order.user?.toString();
        const isOwner = orderUserId === req.user._id.toString();
        const isAdmin = req.user.role === 'admin';
        if (!isOwner && !isAdmin) {
            return res.status(403).json({ success: false, message: 'Not authorized to view this order' });
        }
        res.json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private/Admin
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
        res.json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update order (Admin) - Mark shipped/delivered
// @route   PUT /api/orders/:id
// @access  Private/Admin
exports.updateOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        const { isDelivered, isPaid } = req.body;
        if (typeof isDelivered === 'boolean') {
            order.isDelivered = isDelivered;
            if (isDelivered) order.deliveredAt = Date.now();
        }
        if (typeof isPaid === 'boolean') {
            order.isPaid = isPaid;
            if (isPaid && !order.paidAt) order.paidAt = Date.now();
        }
        const updatedOrder = await order.save();
        res.json({ success: true, data: updatedOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete order (Admin)
// @route   DELETE /api/orders/:id
// @access  Private/Admin
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        res.json({ success: true, message: 'Order deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};