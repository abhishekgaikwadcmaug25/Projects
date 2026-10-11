import { motion } from 'framer-motion';

const LoadingSkeleton = ({ type = 'card', count = 1 }) => {
    const shimmerVariants = {
        initial: { x: '-100%' },
        animate: { x: '100%' },
    };

    const containerVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { 
            opacity: 1, 
            y: 0,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        initial: { opacity: 0, scale: 0.95 },
        animate: { 
            opacity: 1, 
            scale: 1,
            transition: {
                duration: 0.3
            }
        }
    };

    const CardSkeleton = () => (
        <motion.div 
            className="card-modern p-6 relative overflow-hidden"
            variants={itemVariants}
        >
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded-lg w-3/4 mb-3 relative overflow-hidden">
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                            variants={shimmerVariants}
                            initial="initial"
                            animate="animate"
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: 'linear'
                            }}
                        />
                    </div>
                    <div className="h-8 bg-gray-200 rounded-lg w-1/2 relative overflow-hidden">
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                            variants={shimmerVariants}
                            initial="initial"
                            animate="animate"
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: 'linear',
                                delay: 0.2
                            }}
                        />
                    </div>
                </div>
                <div className="w-12 h-12 bg-gray-200 rounded-xl relative overflow-hidden">
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                        variants={shimmerVariants}
                        initial="initial"
                        animate="animate"
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: 0.4
                        }}
                    />
                </div>
            </div>
        </motion.div>
    );

    const TableSkeleton = () => (
        <motion.div 
            className="card-modern p-6 relative overflow-hidden"
            variants={itemVariants}
        >
            <div className="h-6 bg-gray-200 rounded-lg w-1/4 mb-4 relative overflow-hidden">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                />
            </div>
            <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex space-x-4">
                        {[...Array(3)].map((_, j) => (
                            <div key={j} className="h-4 bg-gray-200 rounded-lg flex-1 relative overflow-hidden">
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                                    variants={shimmerVariants}
                                    initial="initial"
                                    animate="animate"
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: 'linear',
                                        delay: (i * 0.1) + (j * 0.05)
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </motion.div>
    );

    const ListSkeleton = () => (
        <motion.div 
            className="card-modern p-6 relative overflow-hidden"
            variants={itemVariants}
        >
            <div className="h-6 bg-gray-200 rounded-lg w-1/3 mb-4 relative overflow-hidden">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                />
            </div>
            <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full relative overflow-hidden">
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                                variants={shimmerVariants}
                                initial="initial"
                                animate="animate"
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: 'linear',
                                    delay: i * 0.2
                                }}
                            />
                        </div>
                        <div className="flex-1">
                            <div className="h-4 bg-gray-200 rounded-lg w-3/4 mb-2 relative overflow-hidden">
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                                    variants={shimmerVariants}
                                    initial="initial"
                                    animate="animate"
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: 'linear',
                                        delay: i * 0.2 + 0.1
                                    }}
                                />
                            </div>
                            <div className="h-3 bg-gray-200 rounded-lg w-1/2 relative overflow-hidden">
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                                    variants={shimmerVariants}
                                    initial="initial"
                                    animate="animate"
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: 'linear',
                                        delay: i * 0.2 + 0.2
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );

    const renderSkeleton = () => {
        switch (type) {
            case 'table':
                return <TableSkeleton />;
            case 'list':
                return <ListSkeleton />;
            default:
                return <CardSkeleton />;
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="space-y-4"
        >
            {[...Array(count)].map((_, index) => (
                <div key={index}>
                    {renderSkeleton()}
                </div>
            ))}
        </motion.div>
    );
};

export default LoadingSkeleton;