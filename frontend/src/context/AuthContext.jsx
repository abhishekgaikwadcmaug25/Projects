import { createContext, useState, useEffect } from 'react';
import { login as loginApi } from '../api/authApi';
import { ROLES } from '../utils/constants';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser && storedUser !== 'undefined') {
            try {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Error parsing stored user data:', error);
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await loginApi(email, password);
            console.log('Login response:', response);

            let { token: newToken, role } = response;

            // Remove ROLE_ prefix if present
            if (role && role.startsWith('ROLE_')) {
                role = role.substring(5);
            }

            console.log('Processed role:', role);

            const userData = { email, role };

            // Store in state
            setToken(newToken);
            setUser(userData);

            // Store in localStorage
            localStorage.setItem('token', newToken);
            localStorage.setItem('user', JSON.stringify(userData));

            return { success: true, role };
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    const isAuthenticated = () => {
        return !!token && !!user;
    };

    const hasRole = (role) => {
        return user?.role === role;
    };

    const value = {
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated,
        hasRole,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
