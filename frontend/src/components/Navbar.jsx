import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState, useRef, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import CartContext from '../context/CartContext';
import logo from '../assets/images/harridaaslogo.png';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const userMenuRef = useRef(null);
    const searchInputRef = useRef(null);

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/products', label: 'Products' },
        { to: '/saints', label: 'Our Story' },
        { to: '/contact', label: 'Contact' }
    ];

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        setUserMenuOpen(false);
        logout();
        navigate('/');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchOpen(false);
            setSearchQuery('');
        }
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setUserMenuOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (searchOpen && searchInputRef.current) searchInputRef.current.focus();
    }, [searchOpen]);

    return (
        <nav className="glass-nav sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-14 sm:h-16 md:h-20 gap-2">
                    <div className="flex-shrink-0 md:flex-1 flex justify-start">
                        <Link to="/" className="flex items-center">
                            <img src={logo} alt="Haridass" className="h-10 sm:h-12 md:h-14 w-auto object-contain" />
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center gap-6 lg:gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`text-sm font-medium transition-colors whitespace-nowrap ${
                                    isActive(link.to)
                                        ? 'text-maroon-700 border-b-2 border-gold-500 pb-1'
                                        : 'text-maroon-700/80 hover:text-maroon-700'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2">
                        {searchOpen ? (
                            <form onSubmit={handleSearch} className="flex-1 flex items-center max-w-[180px] sm:max-w-[220px]">
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search products..."
                                    className="w-full px-3 py-1.5 text-sm border border-gold-400/40 rounded-l focus:outline-none focus:ring-1 focus:ring-gold-500"
                                />
                                <button type="submit" className="p-1.5 bg-maroon-700 text-white rounded-r">
                                    <i className="fa-solid fa-magnifying-glass text-sm"></i>
                                </button>
                                <button type="button" onClick={() => { setSearchOpen(false); setSearchQuery(''); }} className="p-1.5 text-maroon-700">
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </form>
                        ) : (
                            <button
                                onClick={() => setSearchOpen(true)}
                                className="p-2 sm:p-2.5 text-maroon-700 hover:text-gold-600 transition-colors touch-manipulation"
                                aria-label="Search"
                            >
                                <i className="fa-solid fa-magnifying-glass text-base sm:text-lg"></i>
                            </button>
                        )}
                        <Link to="/cart" className="relative p-2 sm:p-2.5 text-maroon-700 hover:text-gold-600 transition-colors touch-manipulation">
                            <i className="fa-solid fa-cart-shopping text-base sm:text-lg"></i>
                            {cartItems.length > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 bg-maroon-700 text-white text-[10px] sm:text-xs rounded-full min-w-[16px] sm:min-w-[18px] h-4 sm:h-[18px] flex items-center justify-center px-1">
                                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                                </span>
                            )}
                        </Link>

                        {user ? (
                            <div className="relative" ref={userMenuRef}>
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center gap-1 p-2 sm:p-2.5 text-maroon-700 hover:text-gold-600 transition-colors touch-manipulation"
                                    aria-expanded={userMenuOpen}
                                >
                                    <i className="fa-solid fa-user text-base sm:text-lg"></i>
                                    <span className="text-sm font-medium hidden lg:block truncate max-w-[80px]">{user.name?.split(' ')[0]}</span>
                                </button>
                                {userMenuOpen && (
                                    <div className="absolute right-0 mt-1 w-44 sm:w-48 bg-white rounded-md shadow-lg border border-gray-100 py-1 z-50">
                                        {user.role === 'admin' && (
                                            <Link to="/admin" className="block px-4 py-2.5 text-sm text-maroon-700 hover:bg-pink-50" onClick={() => setUserMenuOpen(false)}>Admin Dashboard</Link>
                                        )}
                                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 font-medium">Logout</button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" className="p-2 sm:p-2.5 text-maroon-700 hover:text-gold-600 transition-colors touch-manipulation">
                                <i className="fa-solid fa-user text-base sm:text-lg"></i>
                            </Link>
                        )}

                        <button
                            className="md:hidden p-2 text-maroon-700 touch-manipulation"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Menu"
                        >
                            <i className="fa-solid fa-bars text-lg"></i>
                        </button>
                    </div>
                </div>

                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-100">
                        <form onSubmit={handleSearch} className="mb-4 px-2">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search products..."
                                    className="flex-1 px-3 py-2 text-sm border border-gold-400/40 rounded"
                                />
                                <button type="submit" className="px-4 py-2 bg-maroon-700 text-white rounded text-sm">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </button>
                            </div>
                        </form>
                        <div className="flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={`px-4 py-3 text-sm font-medium ${isActive(link.to) ? 'text-maroon-700 bg-pink-50' : 'text-maroon-700'}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
