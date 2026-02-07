import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';

const getShippingKey = (userId) => userId ? `shippingAddress_${userId}` : 'shippingAddress_guest';

const Shipping = () => {
    const { cartItems } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('India');

    useEffect(() => {
        const key = getShippingKey(user?._id);
        const stored = localStorage.getItem(key);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setFullName(parsed.fullName || user?.name || '');
                setPhone(parsed.phone || '');
                setAddress(parsed.address || '');
                setAddressLine2(parsed.addressLine2 || '');
                setCity(parsed.city || '');
                setState(parsed.state || '');
                setPostalCode(parsed.postalCode || '');
                setCountry(parsed.country || 'India');
            } catch (_) {}
        } else if (user?.name) {
            setFullName(user.name);
        }
    }, [user]);

    const submitHandler = (e) => {
        e.preventDefault();
        const shippingData = {
            fullName,
            phone,
            address,
            addressLine2,
            city,
            state,
            postalCode,
            country
        };
        const key = getShippingKey(user?._id);
        localStorage.setItem(key, JSON.stringify(shippingData));
        localStorage.setItem('shippingAddress', JSON.stringify(shippingData));
        navigate('/place-order');
    };

    if (cartItems.length === 0) {
        navigate('/cart');
        return null;
    }

    if (!user) {
        navigate('/login?redirect=/shipping');
        return null;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    const isValidPhone = phone.length === 10 && phoneRegex.test(phone);

    return (
        <div className="max-w-2xl mx-auto px-4 py-12 animate-fade-in bg-white">
            <div className="mb-8">
                <Link to="/cart" className="text-maroon-700 text-sm hover:underline">← Back to Cart</Link>
            </div>
            <h1 className="text-3xl font-serif font-semibold text-maroon-700 mb-2">Checkout</h1>
            <p className="text-gray-500 text-sm mb-8">Step 1 of 2: Shipping Information</p>

            <form onSubmit={submitHandler} className="space-y-5">
                <div>
                    <label className="block text-gray-700 font-medium mb-1.5 text-sm">Full Name *</label>
                    <input
                        type="text"
                        required
                        className="w-full px-4 py-2.5 border border-gray-200 focus:ring-2 focus:ring-maroon-600 focus:border-maroon-600 outline-none"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1.5 text-sm">Phone Number *</label>
                    <input
                        type="tel"
                        required
                        maxLength={10}
                        className="w-full px-4 py-2.5 border border-gray-200 focus:ring-2 focus:ring-maroon-600 focus:border-maroon-600 outline-none"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="10-digit mobile number"
                    />
                    {phone && !isValidPhone && <p className="text-red-500 text-xs mt-1">Enter valid 10-digit phone number</p>}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1.5 text-sm">Address Line 1 *</label>
                    <input
                        type="text"
                        required
                        className="w-full px-4 py-2.5 border border-gray-200 focus:ring-2 focus:ring-maroon-600 focus:border-maroon-600 outline-none"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="House / Flat No., Building, Street"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1.5 text-sm">Address Line 2 (Optional)</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2.5 border border-gray-200 focus:ring-2 focus:ring-maroon-600 focus:border-maroon-600 outline-none"
                        value={addressLine2}
                        onChange={(e) => setAddressLine2(e.target.value)}
                        placeholder="Landmark, Area"
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1.5 text-sm">City *</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2.5 border border-gray-200 focus:ring-2 focus:ring-maroon-600 focus:border-maroon-600 outline-none"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="City"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1.5 text-sm">State *</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2.5 border border-gray-200 focus:ring-2 focus:ring-maroon-600 focus:border-maroon-600 outline-none"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            placeholder="State"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1.5 text-sm">Postal Code (Pincode) *</label>
                        <input
                            type="text"
                            required
                            maxLength={6}
                            className="w-full px-4 py-2.5 border border-gray-200 focus:ring-2 focus:ring-maroon-600 focus:border-maroon-600 outline-none"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value.replace(/\D/g, ''))}
                            placeholder="6-digit pincode"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1.5 text-sm">Country *</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2.5 border border-gray-200 focus:ring-2 focus:ring-maroon-600 focus:border-maroon-600 outline-none"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={!isValidPhone}
                    className="w-full btn-shop py-3 font-medium rounded disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    Continue to Payment
                </button>
            </form>
        </div>
    );
};

export default Shipping;
