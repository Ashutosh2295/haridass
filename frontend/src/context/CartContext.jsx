import { createContext, useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';

const CartContext = createContext();

const getStorageKey = (userId) => userId ? `cartItems_${userId}` : 'cartItems_guest';
const getCouponKey = (userId) => userId ? `appliedCoupon_${userId}` : 'appliedCoupon_guest';

export const CartProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const userId = user?._id || null;

    const [cartItems, setCartItems] = useState([]);
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const cartKey = getStorageKey(userId);
        const couponKey = getCouponKey(userId);
        try {
            const storedCart = localStorage.getItem(cartKey);
            const storedCoupon = localStorage.getItem(couponKey);
            if (storedCart) setCartItems(JSON.parse(storedCart));
            else setCartItems([]);
            if (storedCoupon) setAppliedCoupon(JSON.parse(storedCoupon));
            else setAppliedCoupon(null);
        } catch (e) {
            setCartItems([]);
            setAppliedCoupon(null);
        }
        setIsInitialized(true);
    }, [userId]);

    useEffect(() => {
        if (!isInitialized) return;
        const cartKey = getStorageKey(userId);
        const couponKey = getCouponKey(userId);
        localStorage.setItem(cartKey, JSON.stringify(cartItems));
        if (appliedCoupon) {
            localStorage.setItem(couponKey, JSON.stringify(appliedCoupon));
        } else {
            localStorage.removeItem(couponKey);
        }
    }, [cartItems, appliedCoupon, userId, isInitialized]);

    const addToCart = (product, qty = 1) => {
        const existItem = cartItems.find((x) => x._id === product._id);
        if (existItem) {
            setCartItems(
                cartItems.map((x) =>
                    x._id === existItem._id ? { ...existItem, qty: existItem.qty + qty } : x
                )
            );
        } else {
            setCartItems([...cartItems, { ...product, qty }]);
        }
    };

    const removeFromCart = (id) => {
        setCartItems(cartItems.filter((x) => x._id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
        setAppliedCoupon(null);
    };

    const applyCoupon = (coupon) => {
        setAppliedCoupon(coupon);
    };

    const removeCoupon = () => {
        setAppliedCoupon(null);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, appliedCoupon, applyCoupon, removeCoupon }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
