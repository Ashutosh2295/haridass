import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import OrderDetailsModal from '../components/OrderDetailsModal';
const API_URL = 'http://localhost:5000';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const fetchOrders = async () => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                withCredentials: true
            };
            const { data } = await axios.get(`${API_URL}/api/orders`, config);
            if (data.success) setOrders(data.data);
        } catch (error) {
            console.error('Error fetching orders', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/');
            return;
        }
        fetchOrders();
    }, [user, navigate]);

    const updateStatusHandler = async (order, status) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                withCredentials: true
            };
            const isDelivered = status === 'Delivered';
            const { data } = await axios.put(
                `${API_URL}/api/orders/${order._id}`,
                { isDelivered },
                config
            );
            if (data.success) {
                setOrders(prev => prev.map(o => o._id === order._id ? data.data : o));
                if (selectedOrder?._id === order._id) setSelectedOrder(data.data);
            }
        } catch (error) {
            alert('Failed to update order: ' + (error.response?.data?.message || error.message));
        }
    };

    const deleteOrderHandler = async (orderId, e) => {
        e?.stopPropagation();
        if (!window.confirm('Are you sure you want to delete this order?')) return;
        try {
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                withCredentials: true
            };
            const { data } = await axios.delete(`${API_URL}/api/orders/${orderId}`, config);
            if (data.success) {
                setOrders(prev => prev.filter(o => o._id !== orderId));
                if (selectedOrder?._id === orderId) setSelectedOrder(null);
            }
        } catch (error) {
            alert('Failed to delete order: ' + (error.response?.data?.message || error.message));
        }
    };

    if (loading) return <div className="text-center py-20">Loading orders...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
            <h1 className="text-3xl font-serif font-semibold text-maroon-700 mb-6">Order Management</h1>
            <p className="text-gray-600 text-sm mb-6">View, update status, and manage orders. Order confirmations are emailed to ashutosh@bsbfortrade.com</p>

            <div className="bg-white border border-gray-100 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-pink-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Order ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Total</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Paid</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {orders.length === 0 ? (
                            <tr><td colSpan="7" className="px-6 py-12 text-center text-gray-500">No orders yet</td></tr>
                        ) : (
                            orders.map(order => (
                                <tr
                                    key={order._id}
                                    className="hover:bg-gray-50 cursor-pointer"
                                    onClick={() => setSelectedOrder(order)}
                                >
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{String(order._id).slice(-8)}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{order.user?.name || 'N/A'}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">₹{order.totalPrice}</td>
                                    <td className="px-6 py-4">
                                        {order.isPaid ? (
                                            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">Paid</span>
                                        ) : (
                                            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-800">Not Paid</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {order.isDelivered ? (
                                            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">Delivered</span>
                                        ) : (
                                            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-amber-100 text-amber-800">Processing</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4" onClick={e => e.stopPropagation()}>
                                        <button
                                            onClick={(e) => deleteOrderHandler(order._id, e)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                                            title="Delete order"
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {selectedOrder && (
                <OrderDetailsModal
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                    onUpdateStatus={updateStatusHandler}
                    onDelete={() => deleteOrderHandler(selectedOrder._id)}
                />
            )}
        </div>
    );
};

export default AdminOrders;
