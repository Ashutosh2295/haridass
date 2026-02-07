const Contact = () => {
    return (
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16 animate-fade-in bg-cream-50">
            <h1 className="text-4xl font-serif font-semibold text-maroon-700 text-center mb-12">Contact Us</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-cream-50 p-8 border border-gray-100 shadow-sm">
                    <h2 className="text-xl font-serif font-semibold text-maroon-700 mb-6">Get in Touch</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1 text-sm">Your Name</label>
                            <input type="text" className="w-full px-4 py-2.5 border border-gray-200 focus:ring-2 focus:ring-maroon-600 focus:border-maroon-600 outline-none transition" placeholder="Enter your name" />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1 text-sm">Email Address</label>
                            <input type="email" className="w-full px-4 py-2.5 border border-gray-200 focus:ring-2 focus:ring-maroon-600 focus:border-maroon-600 outline-none transition" placeholder="Enter your email" />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1 text-sm">Message</label>
                            <textarea rows="4" className="w-full px-4 py-2.5 border border-gray-200 focus:ring-2 focus:ring-maroon-600 focus:border-maroon-600 outline-none transition" placeholder="How can we help you?"></textarea>
                        </div>
                        <button className="w-full btn-shop py-3 font-medium rounded">
                            Send Message
                        </button>
                    </form>
                </div>

                <div className="space-y-6">
                    <div className="flex items-start gap-4 p-6 border border-gold-400/20 bg-white rounded-lg">
                        <div className="bg-pink-50 p-3 text-maroon-700">
                            <i className="fa-solid fa-location-dot text-xl"></i>
                        </div>
                        <div>
                            <h3 className="font-semibold text-maroon-700 mb-1">Visit Us</h3>
                            <p className="text-gray-600 text-sm">Krishna Nagar, Vrindavan, Mathura, UP - 281121</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-6 border border-gold-400/20 bg-white rounded-lg">
                        <div className="bg-pink-50 p-3 text-maroon-700">
                            <i className="fa-solid fa-envelope text-xl"></i>
                        </div>
                        <div>
                            <h3 className="font-semibold text-maroon-700 mb-1">Email Us</h3>
                            <p className="text-gray-600 text-sm">contact@haridass.com</p>
                            <p className="text-gray-600 text-sm">support@haridass.com</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-6 border border-gold-400/20 bg-white rounded-lg">
                        <div className="bg-pink-50 p-3 text-maroon-700">
                            <i className="fa-solid fa-phone text-xl"></i>
                        </div>
                        <div>
                            <h3 className="font-semibold text-maroon-700 mb-1">Call Us</h3>
                            <p className="text-gray-600 text-sm">+91 98765 43210</p>
                            <p className="text-gray-600 text-sm">Mon - Sat (9 AM - 6 PM)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
