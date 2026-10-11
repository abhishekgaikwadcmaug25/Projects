import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FiPlus, FiX, FiMessageCircle, FiHelpCircle, FiSettings } from 'react-icons/fi';

const FloatingActionButton = ({ actions = [] }) => {
    const [isOpen, setIsOpen] = useState(false);

    const defaultActions = [
        {
            icon: FiMessageCircle,
            label: 'Feedback',
            onClick: () => window.location.href = '/feedback',
            color: 'bg-blue-500 hover:bg-blue-600'
        },
        {
            icon: FiHelpCircle,
            label: 'Help',
            onClick: () => window.location.href = '/about',
            color: 'bg-green-500 hover:bg-green-600'
        },
        {
            icon: FiSettings,
            label: 'Settings',
            onClick: () => console.log('Settings clicked'),
            color: 'bg-purple-500 hover:bg-purple-600'
        }
    ];

    const finalActions = actions.length > 0 ? actions : defaultActions;

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="flex flex-col space-y-3 mb-4"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                    >
                        {finalActions.map((action, index) => (
                            <motion.button
                                key={index}
                                className={`${action.color} text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 group`}
                                onClick={action.onClick}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <action.icon className="w-5 h-5" />
                                <motion.span
                                    className="text-sm font-medium whitespace-nowrap pr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                    initial={{ width: 0 }}
                                    whileHover={{ width: 'auto' }}
                                >
                                    {action.label}
                                </motion.span>
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                className="bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.2 }}
            >
                {isOpen ? (
                    <FiX className="w-6 h-6" />
                ) : (
                    <FiPlus className="w-6 h-6" />
                )}
            </motion.button>
        </div>
    );
};

export default FloatingActionButton;