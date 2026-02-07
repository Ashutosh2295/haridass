import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import CartContext from '../context/CartContext';
import { staticProducts } from '../data/staticProducts';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const staticMatch = staticProducts.find(p => p._id === id);
        if (staticMatch) {
            setProduct(staticMatch);
            setLoading(false);
            return;
        }
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(data.data);
            } catch {
                setProduct(staticProducts.find(p => p._id === id));
            }
            setLoading(false);
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-2 border-pink-200 border-t-maroon-700"></div>
            </div>
        );
    }

    if (!product) {
        return <div className="text-center py-16 text-gray-600">Product not found</div>;
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 animate-fade-in bg-white">
            <Link to="/products" className="inline-flex items-center text-gray-600 hover:text-maroon-600 mb-8 text-sm transition-colors">
                <i className="fa-solid fa-arrow-left mr-2"></i> Back to results
            </Link>

            <div className="flex flex-col lg:flex-row gap-12">
                <div className="w-full lg:w-2/5 flex justify-center bg-white p-8">
                    <img src={product.image} alt={product.name} className="max-w-full max-h-[450px] object-contain" />
                </div>

                <div className="flex-1">
                    <h1 className="text-2xl md:text-3xl font-serif font-semibold text-maroon-700 leading-tight mb-4">{product.name}</h1>

                    <Link to="/saints" className="text-sm text-maroon-700 hover:underline mb-4 inline-block">
                        Visit the Haridass Store
                    </Link>

                    <div className="flex items-center gap-2 mb-6">
                        <div className="flex text-amber-500">
                            {[...Array(5)].map((_, i) => (
                                <i key={i} className={`fa-solid fa-star ${i < Math.floor(product.rating) ? 'text-amber-500' : 'text-gray-200'}`}></i>
                            ))}
                        </div>
                        <span className="text-sm text-gray-500">{product.numReviews} ratings</span>
                    </div>

                    <div className="border-y border-gray-100 py-6 mb-6">
                        <div className="flex items-baseline gap-2">
                            <span className="text-gray-500 text-sm">₹</span>
                            <span className="text-3xl font-semibold text-maroon-700">{product.price}</span>
                        </div>
                        <div className="text-gray-500 text-sm mt-1">
                            M.R.P.: <span className="line-through">₹{Math.round(product.price * 1.2)}</span>
                        </div>
                    </div>

                    <div className="flex gap-6 mb-8 text-center">
                        <div className="flex flex-col items-center gap-2">
                            <div className="bg-gray-50 p-3 text-gray-700"><i className="fa-solid fa-rotate-left text-xl"></i></div>
                            <span className="text-xs text-gray-600">7 days Returnable</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="bg-gray-50 p-3 text-gray-700"><i className="fa-solid fa-shield-halved text-xl"></i></div>
                            <span className="text-xs text-gray-600">Secure Transaction</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="bg-gray-50 p-3 text-gray-700"><i className="fa-solid fa-truck text-xl"></i></div>
                            <span className="text-xs text-gray-600">Free Delivery</span>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="font-semibold text-maroon-700 mb-2">About this item</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => addToCart(product)}
                            className="flex-1 btn-shop py-3 font-medium rounded"
                            disabled={product.countInStock === 0}
                        >
                            Add to Cart
                        </button>
                        <button
                            className="flex-1 border border-teal-700 text-maroon-700 py-3 font-medium hover:bg-teal-50 transition-colors"
                            disabled={product.countInStock === 0}
                        >
                            Buy Now
                        </button>
                    </div>

                    <p className="text-maroon-700 text-sm font-medium mt-4">
                        {product.countInStock > 0 ? 'In Stock' : 'Currently unavailable'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
