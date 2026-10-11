import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import { FiMail, FiLock, FiLogIn, FiHome } from 'react-icons/fi';
import { ROLES } from '../../utils/constants';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            setError('');
            const { role } = await login(data.email, data.password);

            // Redirect based on role
            const redirectMap = {
                [ROLES.ADMIN]: '/admin/dashboard',
                [ROLES.INSTITUTE]: '/institute/dashboard',
                [ROLES.STUDENT]: '/student/dashboard',
            };

            navigate(redirectMap[role] || '/');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Simple Navbar for Login */}
            <motion.nav 
                className="glass border-b border-white/20 sticky top-0 z-50"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <motion.div 
                            className="flex items-center"
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <motion.h1 
                                className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 400 }}
                            >
                                TechShare
                            </motion.h1>
                        </motion.div>

                        <motion.div 
                            className="flex items-center gap-4"
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <motion.div whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 400 }}>
                                <Link 
                                    to="/" 
                                    className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-white/50"
                                >
                                    <FiHome className="w-4 h-4" />
                                    Home
                                </Link>
                            </motion.div>
                            <motion.div whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 400 }}>
                                <Link 
                                    to="/feedback" 
                                    className="text-gray-700 hover:text-primary-600 transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-white/50"
                                >
                                    Feedback
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </motion.nav>
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-20">
                <div className="max-w-md mx-auto px-4">
            <Card>
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                        <FiLogIn className="w-8 h-8 text-primary-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
                    <p className="text-gray-600 mt-2">Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address',
                            },
                        })}
                        error={errors.email?.message}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters',
                            },
                        })}
                        error={errors.password?.message}
                    />

                    <Button type="submit" loading={loading} className="w-full" icon={FiLogIn}>
                        Sign In
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm">
                    <p className="text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register/student" className="text-primary-600 hover:text-primary-700 font-medium">
                            Register as Student
                        </Link>
                        {' or '}
                        <Link to="/register/institute" className="text-primary-600 hover:text-primary-700 font-medium">
                            Register as Institute
                        </Link>
                    </p>
                </div>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default Login;
