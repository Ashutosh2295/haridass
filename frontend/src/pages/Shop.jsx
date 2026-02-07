import { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { staticProducts, productImages } from '../data/staticProducts';

const Shop = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const q = searchParams.get('q') || '';
    const cat = searchParams.get('cat') || '';
    const searchInputRef = useRef(null);

    const handleSearch = (e) => {
        e.preventDefault();
        const trimmed = (searchInputRef.current?.value || '').trim();
        if (trimmed) {
            setSearchParams({ ...(cat && { cat }), q: trimmed });
        } else if (cat) {
            setSearchParams({ cat });
        } else {
            setSearchParams({});
        }
    };

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/products');
                const apiProducts = (data.data || []).map((p, i) => ({
                    ...p,
                    image: productImages[i % 3]
                }));
                setProducts(apiProducts);
                setLoading(false);
            } catch {
                setProducts(staticProducts);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = useMemo(() => {
        let list = products;
        const searchLower = q.trim().toLowerCase();
        const catLower = cat.trim().toLowerCase();

        if (catLower) {
            list = list.filter(
                (p) =>
                    (p.category || '').toLowerCase().includes(catLower) ||
                    (p.brand || '').toLowerCase().includes(catLower)
            );
        }
        if (searchLower) {
            list = list.filter(
                (p) =>
                    (p.name || '').toLowerCase().includes(searchLower) ||
                    (p.description || '').toLowerCase().includes(searchLower) ||
                    (p.category || '').toLowerCase().includes(searchLower) ||
                    (p.brand || '').toLowerCase().includes(searchLower)
            );
        }
        return list;
    }, [products, q, cat]);

    return (
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fade-in bg-cream-50 min-h-screen">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-cursive text-center text-maroon-700 mb-2">Shop the Collection</h1>
            <p className="text-center text-maroon-700/80 text-sm sm:text-base mb-6">Pure & Spiritual Products</p>

            <form onSubmit={handleSearch} className="max-w-md mx-auto mb-8">
                <div className="flex gap-2">
                    <input
                        ref={searchInputRef}
                        type="text"
                        key={q}
                        defaultValue={q}
                        placeholder="Search products..."
                        className="flex-1 px-4 py-2.5 text-sm border border-gold-400/40 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gold-500/50"
                    />
                    <button type="submit" className="px-5 py-2.5 bg-maroon-700 text-white rounded-r-lg hover:bg-maroon-800 transition-colors">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
            </form>

            {q && (
                <p className="text-center text-maroon-700/80 text-sm mb-4">
                    Search results for &quot;{q}&quot; — {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                </p>
            )}

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-2 border-pink-200 border-t-maroon-700"></div>
                </div>
            ) : filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                    <i className="fa-solid fa-magnifying-glass text-6xl text-gray-300 mb-4 block"></i>
                    <p className="text-maroon-700/80 text-lg mb-2">No products found</p>
                    <p className="text-maroon-700/60 text-sm">Try a different search term or browse all products</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                    {filteredProducts.map((product, index) => (
                        <ProductCard key={product._id} product={product} imageIndex={index} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Shop;
