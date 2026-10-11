import { motion } from 'framer-motion';

const Card = ({ children, className = '', title, actions, hover = true }) => {
    return (
        <motion.div 
            className={`card-modern ${className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={hover ? { 
                y: -5, 
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' 
            } : {}}
        >
            {(title || actions) && (
                <motion.div 
                    className="px-6 py-4 border-b border-gray-200/50 flex items-center justify-between bg-gradient-to-r from-gray-50/50 to-white/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    {title && (
                        <motion.h3 
                            className="text-lg font-semibold text-gray-900"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            {title}
                        </motion.h3>
                    )}
                    {actions && (
                        <motion.div 
                            className="flex items-center gap-2"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            {actions}
                        </motion.div>
                    )}
                </motion.div>
            )}
            <motion.div 
                className="p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
};

export default Card;
