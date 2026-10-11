import { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';

const Input = forwardRef(({
    label,
    error,
    type = 'text',
    placeholder,
    className = '',
    ...props
}, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <motion.div 
            className="w-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            {label && (
                <motion.label 
                    className="block text-sm font-medium text-gray-700 mb-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    {label}
                </motion.label>
            )}
            <motion.div className="relative">
                <motion.input
                    ref={ref}
                    type={type}
                    placeholder={placeholder}
                    className={`input-modern ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'} ${className}`}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    {...props}
                />
                {isFocused && (
                    <motion.div
                        className="absolute inset-0 rounded-xl border-2 border-primary-500 pointer-events-none"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    />
                )}
            </motion.div>
            {error && (
                <motion.p 
                    className="mt-2 text-sm text-red-600 flex items-center gap-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, delay: 0.1 }}
                    >
                        ⚠️
                    </motion.span>
                    {error}
                </motion.p>
            )}
        </motion.div>
    );
});

Input.displayName = 'Input';

export default Input;
