import { useState, useContext } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get('redirect') || '/';
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        setError('');
        if (!isValidEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }
        setLoading(true);
        try {
            await login(email, password);
            navigate(redirect);
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[60vh] py-12 animate-fade-in bg-white">
            <div className="w-full max-w-md p-8 border border-gray-100 shadow-sm">
                <h1 className="text-3xl font-serif font-semibold text-center text-maroon-700 mb-6">Welcome Back</h1>
                {error && (
                    <div className="bg-red-50 text-red-700 p-3 text-sm mb-4 flex items-center gap-2">
                        <span className="font-medium">!</span> {error}
                    </div>
                )}
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2 text-sm">Email Address</label>
                        <input
                            type="email"
                            autoComplete="email"
                            className="w-full px-4 py-2.5 border border-gray-200 focus:ring-2 focus:ring-teal-700 focus:border-teal-700 outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2 text-sm">Password</label>
                        <input
                            type="password"
                            autoComplete="current-password"
                            className="w-full px-4 py-2.5 border border-gray-200 focus:ring-2 focus:ring-teal-700 focus:border-teal-700 outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-shop py-3 font-medium rounded disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600 text-sm">
                    New Customer? <Link to="/register" className="text-maroon-700 font-medium hover:underline">Register Here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
