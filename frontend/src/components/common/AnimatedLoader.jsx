import { motion } from 'framer-motion';

const AnimatedLoader = ({ size = 'medium', text = 'Loading...', variant = 'spinner' }) => {
    const sizeClasses = {
        small: 'w-4 h-4',
        medium: 'w-8 h-8',
        large: 'w-12 h-12'
    };

    const SpinnerLoader = () => (
        <motion.div
            className={`${sizeClasses[size]} border-4 border-gray-200 border-t-primary-600 rounded-full`}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
    );

    const DotsLoader = () => (
        <div className="flex space-x-2">
            {[0, 1, 2].map((index) => (
                <motion.div
                    key={index}
                    className="w-3 h-3 bg-primary-600 rounded-full"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: index * 0.2
                    }}
                />
            ))}
        </div>
    );

    const PulseLoader = () => (
        <motion.div
            className={`${sizeClasses[size]} bg-primary-600 rounded-full`}
            animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
            }}
            transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut'
            }}
        />
    );

    const WaveLoader = () => (
        <div className="flex space-x-1">
            {[0, 1, 2, 3, 4].map((index) => (
                <motion.div
                    key={index}
                    className="w-1 bg-primary-600 rounded-full"
                    animate={{
                        height: ['20px', '40px', '20px']
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: index * 0.1
                    }}
                />
            ))}
        </div>
    );

    const renderLoader = () => {
        switch (variant) {
            case 'dots':
                return <DotsLoader />;
            case 'pulse':
                return <PulseLoader />;
            case 'wave':
                return <WaveLoader />;
            default:
                return <SpinnerLoader />;
        }
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {renderLoader()}
            {text && (
                <motion.p
                    className="text-gray-600 text-sm font-medium"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    {text}
                </motion.p>
            )}
        </motion.div>
    );
};

export default AnimatedLoader;