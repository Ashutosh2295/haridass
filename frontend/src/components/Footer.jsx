import { Link } from 'react-router-dom';
import logo from '../assets/images/harridaaslogo.png';

const Footer = () => {
    return (
        <footer className="bg-cream-100 border-t border-gold-400/30 pt-12 pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <Link to="/" className="inline-block mb-4">
                            <img src={logo} alt="Haridass" className="h-10 sm:h-12 w-auto object-contain" />
                        </Link>
                        <p className="text-maroon-700/80 text-sm leading-relaxed">
                            Spreading spirituality and devotion through satvik products. Your journey to inner peace starts here.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-maroon-700 mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link to="/products" className="text-maroon-700/80 hover:text-maroon-700 transition-colors">Shop</Link></li>
                            <li><Link to="/saints" className="text-maroon-700/80 hover:text-maroon-700 transition-colors">Our Story</Link></li>
                            <li><Link to="/contact" className="text-maroon-700/80 hover:text-maroon-700 transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-maroon-700 mb-4">Contact</h4>
                        <p className="text-maroon-700/80 text-sm">Vrindavan, India</p>
                        <p className="text-maroon-700/80 text-sm">support@haridass.com</p>
                    </div>
                </div>
                <div className="border-t border-gold-400/20 pt-6 text-center text-maroon-700/70 text-sm">
                    © {new Date().getFullYear()} Haridass. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
