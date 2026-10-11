import { FiCheckCircle, FiXCircle, FiInfo, FiAlertTriangle, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Toast = ({ toasts, onClose }) => {
    const icons = {
        success: FiCheckCircle,
        error: FiXCircle,
        info: FiInfo,
        warning: FiAlertTriangle,
    };

    const colors = {
        success: 'bg-green-50/90 backdrop-blur-sm border-green-500 text-green-800',
        error: 'bg-red-50/90 backdrop-blur-sm border-red-500 text-red-800',
        info: 'bg-blue-50/90 backdrop-blur-sm border-blue-500 text-blue-800',
        warning: 'bg-yellow-50/90 backdrop-blur-sm border-yellow-500 text-yellow-800',
    };

    const iconColors = {
        success: 'text-green-600',
        error: 'text-red-600',
        info: 'text-blue-600',
        warning: 'text-yellow-600',
    };

    return (
        <div className="fixed top-4 right-4 z-50 space-y-2">
            <AnimatePresence>
                {toasts.map((toast) => {
                    const Icon = icons[toast.type];
                    return (
                        <motion.div
                            key={toast.id}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border-l-4 shadow-lg min-w-[300px] max-w-md ${colors[toast.type]}`}
                            initial={{ opacity: 0, x: 300, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 300, scale: 0.8 }}
                            transition={{ 
                                type: 'spring', 
                                stiffness: 300, 
                                damping: 30,
                                duration: 0.3
                            }}
                            whileHover={{ scale: 1.02 }}
                            layout
                        >
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.2, type: 'spring', stiffness: 500 }}
                            >
                                <Icon className={`w-5 h-5 flex-shrink-0 ${iconColors[toast.type]}`} />
                            </motion.div>
                            <motion.p 
                                className="flex-1 text-sm font-medium"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                {toast.message}
                            </motion.p>
                            <motion.button
                                onClick={() => onClose(toast.id)}
                                className="flex-shrink-0 hover:opacity-70 transition-all duration-200 p-1 rounded-full hover:bg-black/10"
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <FiX className="w-4 h-4" />
                            </motion.button>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
};

export default Toast;
