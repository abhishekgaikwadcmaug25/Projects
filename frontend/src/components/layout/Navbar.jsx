import { Link } from 'react-router-dom';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';

const Navbar = ({ title }) => {
    const { user, logout } = useAuth();

    return (
        <motion.nav 
            className="glass border-b border-white/20 sticky top-0 z-50"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
            <div className="container-custom">
                <div className="flex items-center justify-between h-16">
                    <motion.div 
                        className="flex items-center"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <motion.h1 
                            className="text-xl font-bold text-gradient"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: 'spring', stiffness: 400 }}
                        >
                            TechShare
                        </motion.h1>
                        {title && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex items-center"
                            >
                                <span className="mx-3 text-gray-400">/</span>
                                <span className="text-gray-700 font-medium">{title}</span>
                            </motion.div>
                        )}
                    </motion.div>

                    <motion.div 
                        className="flex items-center gap-4"
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {/* Navigation links */}
                        <div className="flex items-center gap-6">
                            <motion.div whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 400 }}>
                                <Link 
                                    to="/about" 
                                    className="text-gray-700 hover:text-primary-600 transition-all duration-300 font-medium relative group"
                                >
                                    About Us
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                                </Link>
                            </motion.div>
                        </div>

                        <motion.div 
                            className="flex items-center gap-2 text-sm text-gray-700 bg-white/50 backdrop-blur-sm px-3 py-2 rounded-xl border border-gray-200/50"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 400 }}
                        >
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                            >
                                <FiUser className="w-4 h-4 text-primary-600" />
                            </motion.div>
                            <span className="font-medium">{user?.email}</span>
                            <motion.span 
                                className="px-2 py-1 bg-gradient-to-r from-primary-100 to-purple-100 text-primary-700 rounded-lg text-xs font-medium"
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: 'spring', stiffness: 400 }}
                            >
                                {user?.role}
                            </motion.span>
                        </motion.div>
                        
                        <motion.button
                            onClick={logout}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:text-white bg-white/50 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 rounded-xl transition-all duration-300 backdrop-blur-sm border border-red-200/50 hover:border-red-500"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 400 }}
                        >
                            <FiLogOut className="w-4 h-4" />
                            <span className="font-medium">Logout</span>
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
