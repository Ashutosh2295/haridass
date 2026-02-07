import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Shipping from './pages/Shipping';
import PlaceOrder from './pages/PlaceOrder';
import AdminOrders from './pages/AdminOrders';
import Saints from './pages/Saints';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/saints" element={<Saints />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/products" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/place-order" element={<PlaceOrder />} />
                <Route path="/admin" element={<AdminOrders />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
