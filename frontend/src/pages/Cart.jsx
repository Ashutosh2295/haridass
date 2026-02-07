import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';

const Cart = () => {
    const { cartItems, removeFromCart, addToCart, appliedCoupon, applyCoupon, removeCoupon } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const checkoutHandler = () => {
        if (!user) {
            navigate('/login?redirect=/shipping');
        } else {
            navigate('/shipping');
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 animate-fade-in bg-cream-50">
            <h1 className="text-3xl font-serif font-semibold text-maroon-700 mb-8 border-b border-gray-100 pb-4">Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <div className="text-center py-20 border border-gray-100">
                    <i className="fa-solid fa-bag-shopping text-6xl mx-auto text-gray-300 mb-6 block"></i>
                    <p className="text-xl text-gray-500 mb-4">Your cart is empty</p>
                    <Link to="/products" className="btn-shop inline-block px-6 py-2.5 font-medium rounded">
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map(item => (
                            <div key={item._id} className="flex items-center gap-4 md:gap-6 border border-gray-100 p-4 md:p-5 hover:border-gray-200 transition-colors">
                                <Link to={`/product/${item._id}`} className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 bg-gray-50 flex items-center justify-center overflow-hidden">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                                </Link>
                                <div className="flex-grow min-w-0">
                                    <Link to={`/product/${item._id}`} className="font-serif font-medium text-maroon-700 hover:text-maroon-600 line-clamp-2">
                                        {item.name}
                                    </Link>
                                    <div className="text-sm text-gray-500 mt-0.5">{item.category}</div>
                                    <div className="font-semibold text-maroon-700 mt-2">₹{item.price}</div>
                                </div>
                                <div className="flex items-center gap-3 flex-shrink-0">
                                    <select
                                        value={item.qty}
                                        onChange={(e) => addToCart(item, Number(e.target.value) - item.qty)}
                                        className="border border-gray-200 px-3 py-2 text-sm"
                                    >
                                        {[...Array(Math.min(item.countInStock || 10, 10)).keys()].map(x => (
                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                        ))}
                                    </select>
                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                                        aria-label="Remove item"
                                    >
                                        <i className="fa-solid fa-trash text-lg"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border border-gray-100 p-6 h-fit sticky top-24">
                        <h2 className="text-xl font-serif font-semibold text-maroon-700 mb-4">Order Summary</h2>
                        <div className="flex justify-between mb-2 text-gray-600 text-sm">
                            <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                            <span>₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
                        </div>

                        <div className="my-4 border border-dashed border-gray-200 p-3 bg-gray-50">
                            <h3 className="font-medium text-gray-700 mb-2 text-sm">Apply Coupon</h3>
                            {appliedCoupon ? (
                                <div className="flex justify-between items-center bg-pink-50 p-2 border border-gold-400/30">
                                    <div>
                                        <div className="font-medium text-maroon-800 text-sm">{appliedCoupon.code}</div>
                                        <div className="text-xs text-maroon-600">Save ₹{appliedCoupon.discountAmount}</div>
                                    </div>
                                    <button onClick={removeCoupon} className="text-xs text-red-600 font-medium hover:underline">REMOVE</button>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {[
                                        { code: 'HARIDASS10', min: 100, label: '10% OFF above ₹100' },
                                        { code: 'HARIDASS25', min: 2000, label: '25% OFF above ₹2000' }
                                    ].map(coupon => {
                                        const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
                                        const isApplicable = subtotal >= coupon.min;
                                        return (
                                            <div key={coupon.code} className={`flex justify-between items-center p-2 border ${isApplicable ? 'border-gray-200 bg-white' : 'border-gray-100 bg-gray-100 opacity-60'}`}>
                                                <div>
                                                    <div className="font-medium text-gray-800 text-sm">{coupon.code}</div>
                                                    <div className="text-xs text-gray-500">{coupon.label}</div>
                                                </div>
                                                <button
                                                    disabled={!isApplicable}
                                                    onClick={() => {
                                                        const discount = coupon.code === 'HARIDASS10' ? subtotal * 0.10 : subtotal * 0.25;
                                                        applyCoupon({ code: coupon.code, discountAmount: Number(discount.toFixed(2)) });
                                                    }}
                                                    className={`text-xs font-medium px-3 py-1 ${isApplicable ? 'btn-shop bg-gradient-to-r from-pink-400 to-maroon-700 text-white hover:opacity-90' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                                                >
                                                    APPLY
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {appliedCoupon && (
                            <div className="flex justify-between mb-2 text-maroon-700 text-sm">
                                <span>Discount ({appliedCoupon.code})</span>
                                <span>- ₹{appliedCoupon.discountAmount}</span>
                            </div>
                        )}

                        <div className="flex justify-between mb-4 text-gray-600 text-sm">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="border-t border-gray-100 pt-4 flex justify-between font-semibold text-lg mb-6">
                            <span>Total</span>
                            <span>₹{(() => {
                                const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
                                const discount = appliedCoupon ? appliedCoupon.discountAmount : 0;
                                return (subtotal - discount).toFixed(2);
                            })()}</span>
                        </div>
                        <button
                            onClick={checkoutHandler}
                            className="w-full btn-shop bg-gradient-to-r from-pink-400 to-maroon-700 text-white py-3 font-medium hover:opacity-90 transition-colors"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
