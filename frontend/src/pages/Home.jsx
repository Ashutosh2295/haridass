import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { staticProducts, productImages } from '../data/staticProducts';
import heroBanner from '../assets/images/hero_banner.jpeg';
import catImg1 from '../assets/images/product.png';
import catImg2 from '../assets/images/product1.png';
import catImg3 from '../assets/images/product2.png';

const categories = [
    { name: 'Premium Incense Sticks', description: 'Pure sandalwood & floral agarbatti for divine aroma', image: catImg1, to: '/products?cat=puja', icon: 'fa-fire' },
    { name: 'Japa Malas', description: 'Tulsi, rudraksha & gemstone malas for chanting', image: catImg2, to: '/products', icon: 'fa-circle-dot' },
    { name: 'Exquisite Attar & Oils', description: 'Natural oils for meditation & rituals', image: catImg3, to: '/products', icon: 'fa-droplet' },
    { name: 'Pooja Essentials', description: 'Thalis, diyas, bells & worship accessories', image: catImg1, to: '/products', icon: 'fa-hand-holding-heart' }
];

const Home = () => {
    const [bestSellers, setBestSellers] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/products');
                setBestSellers((data.data || []).slice(0, 4));
            } catch {
                setBestSellers(staticProducts.slice(0, 4));
            }
        };
        fetchProducts();
    }, []);

    const displayBestSellers = bestSellers.length >= 4 ? bestSellers : staticProducts.slice(0, 4);

    const getProductTitle = (product) => {
        const name = product?.name || '';
        if (name.toLowerCase().includes('sandalwood')) return 'Sandalwood Incense';
        if (name.toLowerCase().includes('dhoop')) return 'Divine Dhoop Cones';
        if (name.toLowerCase().includes('attar') || name.toLowerCase().includes('oudh')) return 'Royal Oudh Attar';
        if (name.toLowerCase().includes('thali') || name.toLowerCase().includes('puja')) return 'Brass Pooja Thali';
        if (name.toLowerCase().includes('mala')) return 'Handcrafted Mala';
        if (name.toLowerCase().includes('oil')) return 'Ritual Oil';
        return product?.name?.slice(0, 30) || 'Product';
    };

    return (
        <div className="animate-fade-in">
            {/* Hero Section */}
            <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-cream-50">
                <div className="absolute inset-0">
                    <img
                        src={heroBanner}
                        alt="Experience Divine Bliss"
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-cream-50/95 via-pink-50/70 to-transparent" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="max-w-xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-cursive text-maroon-700 mb-4">
                            Experience Divine Bliss
                        </h1>
                        <p className="text-xl md:text-2xl font-serif font-semibold text-maroon-700 uppercase tracking-wider mb-2">
                            Pure & Spiritual Products
                        </p>
                        <p className="text-lg text-maroon-700/80 mb-8">
                            Awaken Your Soul & Surroundings
                        </p>
                        <Link
                            to="/products"
                            className="btn-shop inline-block px-8 py-3 font-medium text-sm rounded"
                        >
                            Shop Now
                        </Link>
                    </div>
                </div>
            </section>

            {/* Product Categories */}
            <section className="py-16 md:py-24 bg-cream-50 bg-floral">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-cursive text-maroon-700 mb-3">
                            Shop by Category
                        </h2>
                        <p className="text-maroon-700/80 text-base md:text-lg max-w-2xl mx-auto">
                            Discover divine essentials for your spiritual journey — incense, malas, oils & pooja items
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {categories.map((cat, i) => (
                            <Link to={cat.to} key={i} className="group block">
                                <div className="h-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:border-gold-400/40 transition-all duration-300 border border-gold-400/20 flex flex-col">
                                    <div className="aspect-square flex items-center justify-center p-6 sm:p-8 bg-gradient-to-b from-cream-100 to-cream-50 overflow-hidden">
                                        <img
                                            src={cat.image}
                                            alt={cat.name}
                                            className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-5 sm:p-6 flex flex-col flex-grow">
                                        <div className="flex items-center gap-2 mb-2">
                                            <i className={`fa-solid ${cat.icon} text-gold-600 text-sm`}></i>
                                            <h3 className="font-serif font-semibold text-maroon-700 text-lg">
                                                {cat.name}
                                            </h3>
                                        </div>
                                        <p className="text-maroon-700/70 text-sm mb-4 flex-grow line-clamp-2">
                                            {cat.description}
                                        </p>
                                        <span className="btn-shop inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm rounded-lg w-fit">
                                            <i className="fa-solid fa-arrow-right text-xs"></i>
                                            Shop Now
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Best Sellers */}
            <section className="py-16 md:py-20 bg-cream-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-cursive text-maroon-700 mb-2">
                            Best Sellers
                        </h2>
                        <p className="text-maroon-700/80">Our Most Popular Spiritual Products</p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        {displayBestSellers.map((product, i) => (
                            <Link to={`/product/${product._id}`} key={product._id} className="group block">
                                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all border border-gold-400/20">
                                    <div className="aspect-square flex items-center justify-center p-4 sm:p-6 bg-cream-50">
                                        <img
                                            src={productImages[i % 3] || product.image}
                                            alt={product.name}
                                            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-3 sm:p-4 text-center">
                                        <h3 className="font-serif font-medium text-maroon-700 mb-2 text-sm line-clamp-1">
                                            {getProductTitle(product)}
                                        </h3>
                                        <span className="btn-shop inline-block px-5 py-2 text-sm rounded">Shop Now</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-16 md:py-20 bg-cream-50 bg-floral text-center">
                <h2 className="text-3xl md:text-4xl font-cursive text-maroon-700 mb-6">
                    Embrace the Essence of Spirituality
                </h2>
                <Link
                    to="/products"
                    className="btn-shop inline-block px-10 py-3 font-medium rounded"
                >
                    Shop Now
                </Link>
            </section>
        </div>
    );
};

export default Home;
