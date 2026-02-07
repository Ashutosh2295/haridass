import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API_URL = 'http://localhost:5000';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        const storedToken = localStorage.getItem('token');
        if (storedUser && storedToken) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                localStorage.removeItem('userInfo');
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const { data } = await axios.post(`${API_URL}/api/auth/login`, { email, password });
        setUser(data.user);
        localStorage.setItem('userInfo', JSON.stringify(data.user));
        if (data.token) {
            localStorage.setItem('token', data.token);
        }
    };

    const register = async (name, email, password) => {
        const { data } = await axios.post(`${API_URL}/api/auth/register`, { name, email, password });
        setUser(data.user);
        localStorage.setItem('userInfo', JSON.stringify(data.user));
        if (data.token) {
            localStorage.setItem('token', data.token);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userInfo');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
