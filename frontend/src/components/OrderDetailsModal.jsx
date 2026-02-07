const OrderDetailsModal = ({ order, onClose, onUpdateStatus, onDelete }) => {
    if (!order) return null;

    const addr = order.shippingAddress || {};

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in p-4">
            <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
                <div className="bg-maroon-700 text-white p-6 flex justify-between items-center flex-shrink-0">
                    <h2 className="text-xl font-semibold font-serif">Order #{String(order._id).slice(-8)}</h2>
                    <button onClick={onClose} className="hover:bg-maroon-800 p-2 rounded transition">
                        <i className="fa-solid fa-xmark text-xl"></i>
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-grow">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <h3 className="text-gray-500 uppercase text-xs font-bold mb-2 tracking-wider">Customer</h3>
                            <p className="font-semibold text-gray-900">{order.user?.name || 'N/A'}</p>
                            <p className="text-gray-600 text-sm">{order.user?.email || 'N/A'}</p>
                        </div>
                        <div>
                            <h3 className="text-gray-500 uppercase text-xs font-bold mb-2 tracking-wider">Shipping Address</h3>
                            <p className="text-gray-700 text-sm">
                                {addr.fullName || order.user?.name}<br />
                                {addr.phone && <>{addr.phone}<br /></>}
                                {addr.address}<br />
                                {addr.addressLine2 && <>{addr.addressLine2}<br /></>}
                                {addr.city}, {addr.state || ''} {addr.postalCode}<br />
                                {addr.country}
                            </p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-gray-500 uppercase text-xs font-bold mb-3 tracking-wider">Order Items</h3>
                        <div className="space-y-3">
                            {order.orderItems?.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4 bg-gray-50 p-3">
                                    <div className="w-16 h-16 bg-white border border-gray-200 flex-shrink-0 flex items-center justify-center overflow-hidden">
                                        <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <p className="font-medium text-gray-900 truncate">{item.name}</p>
                                        <p className="text-sm text-gray-500">Qty: {item.qty} x ₹{item.price}</p>
                                    </div>
                                    <div className="font-semibold text-gray-900">₹{item.qty * item.price}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t pt-4 space-y-1 text-sm text-gray-600">
                        <div className="flex justify-between"><span>Items</span><span>₹{order.itemsPrice}</span></div>
                        <div className="flex justify-between"><span>Tax</span><span>₹{order.taxPrice}</span></div>
                        <div className="flex justify-between"><span>Shipping</span><span>₹{order.shippingPrice}</span></div>
                        <div className="flex justify-between font-bold text-lg text-maroon-700 pt-2 border-t">
                            <span>Total</span><span>₹{order.totalPrice}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 p-6 border-t flex flex-col sm:flex-row justify-between items-center gap-4 flex-shrink-0">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Status:</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                            order.isDelivered ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                            {order.isDelivered ? 'Delivered' : 'Processing'}
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {!order.isDelivered && (
                            <>
                                <button
                                    onClick={() => onUpdateStatus(order, 'Shipped')}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                                >
                                    <i className="fa-solid fa-truck"></i> Mark Shipped
                                </button>
                                <button
                                    onClick={() => onUpdateStatus(order, 'Delivered')}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition"
                                >
                                    <i className="fa-solid fa-check"></i> Mark Delivered
                                </button>
                            </>
                        )}
                        <button
                            onClick={() => { onDelete?.(); onClose(); }}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition"
                        >
                            <i className="fa-solid fa-trash"></i> Delete Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsModal;
