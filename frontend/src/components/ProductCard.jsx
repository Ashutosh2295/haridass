import { Link } from 'react-router-dom';
import { useContext } from 'react';
import CartContext from '../context/CartContext';
import { productImages } from '../data/staticProducts';

const ProductCard = ({ product, imageIndex = 0 }) => {
    const { addToCart } = useContext(CartContext);
    const displayImage = product?.image || (productImages && productImages[imageIndex % 3]);

    return (
        <div className="bg-white border border-gold-400/20 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full group rounded-lg">
            <div className="relative bg-cream-50 p-4 flex items-center justify-center h-44 sm:h-48 border-b border-gold-400/10">
                <Link to={`/product/${product._id}`} className="w-full h-full flex items-center justify-center block">
                    <img
                        src={displayImage}
                        alt={product?.name || 'Product'}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                </Link>
            </div>

            <div className="p-3 sm:p-4 flex flex-col flex-grow">
                <Link to={`/product/${product._id}`} className="hover:text-maroon-600 transition-colors">
                    <h3 className="text-maroon-700 font-medium text-sm leading-tight line-clamp-1 mb-2 font-serif">
                        {product?.name}
                    </h3>
                </Link>

                <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                            <i key={i} className={`fa-solid fa-star text-xs ${i < Math.floor(product?.rating || 0) ? "text-amber-500" : "text-gray-200"}`}></i>
                        ))}
                    </div>
                    <span className="text-xs text-maroon-700/60">{product?.numReviews || 0}</span>
                </div>

                <div className="mb-3">
                    <span className="text-maroon-700/60 text-xs">₹</span>
                    <span className="text-lg font-semibold text-maroon-700">{Math.floor(product?.price || 0)}</span>
                </div>

                <div className="mt-auto">
                    <button
                        onClick={() => addToCart(product)}
                        className="w-full btn-shop font-medium py-2 text-xs sm:text-sm rounded"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
