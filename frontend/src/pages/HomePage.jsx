import { Link, Navigate } from 'react-router-dom';
import { FiUsers, FiBook, FiAward, FiArrowRight, FiCheckCircle, FiGlobe, FiShield } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import PageTransition from '../components/common/PageTransition';
import { useAuth } from '../hooks/useAuth';

const HomePage = () => {
    const { isAuthenticated, user } = useAuth();

    // Redirect authenticated users to their dashboard
    if (isAuthenticated()) {
        const dashboardMap = {
            ADMIN: '/admin/dashboard',
            INSTITUTE: '/institute/dashboard',
            STUDENT: '/student/dashboard',
        };
        return <Navigate to={dashboardMap[user?.role] || '/login'} replace />;
    }
    const features = [
        {
            icon: FiBook,
            title: 'Course Management',
            description: 'Comprehensive course creation and management tools for institutes'
        },
        {
            icon: FiUsers,
            title: 'Student Portal',
            description: 'Interactive learning environment with assignments and materials'
        },
        {
            icon: FiAward,
            title: 'Progress Tracking',
            description: 'Monitor student progress and performance analytics'
        },
        {
            icon: FiGlobe,
            title: 'Global Access',
            description: 'Access your learning platform from anywhere, anytime'
        },
        {
            icon: FiShield,
            title: 'Secure Platform',
            description: 'Enterprise-grade security for all your educational data'
        },
        {
            icon: FiCheckCircle,
            title: 'Quality Assurance',
            description: 'Maintain high standards with built-in quality controls'
        }
    ];

    const roles = [
        {
            title: 'For Administrators',
            description: 'Manage institutes, monitor system performance, and oversee platform operations',
            features: ['Institute Management', 'System Analytics', 'User Oversight'],
            color: 'from-blue-500 to-blue-600',
            link: '/login'
        },
        {
            title: 'For Institutes',
            description: 'Create courses, manage students, and deliver quality education',
            features: ['Course Creation', 'Student Management', 'Content Delivery'],
            color: 'from-green-500 to-green-600',
            link: '/register/institute'
        },
        {
            title: 'For Students',
            description: 'Access courses, submit assignments, and track your learning progress',
            features: ['Course Access', 'Assignment Submission', 'Progress Tracking'],
            color: 'from-purple-500 to-purple-600',
            link: '/register/student'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100
            }
        }
    };

    return (
        <PageTransition>
            <div className="min-h-screen">
                {/* Navigation */}
                <motion.nav 
                    className="glass sticky top-0 z-50"
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <motion.div 
                                className="flex items-center"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 400 }}
                            >
                                <h1 className="text-2xl font-bold text-gradient">
                                    TechShare
                                </h1>
                            </motion.div>
                            <div className="flex items-center space-x-4">
                                <motion.div whileHover={{ y: -2 }}>
                                    <Link to="/about" className="text-gray-600 hover:text-primary-600 transition-colors font-medium">
                                        About Us
                                    </Link>
                                </motion.div>
                                <motion.div whileHover={{ y: -2 }}>
                                    <Link to="/feedback" className="text-gray-600 hover:text-primary-600 transition-colors font-medium">
                                        Feedback
                                    </Link>
                                </motion.div>
                                <Link to="/login">
                                    <Button variant="outline" size="small">Login</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.nav>

                {/* Hero Section */}
                <section className="relative bg-hero-gradient py-20 overflow-hidden">
                    <motion.div 
                        className="absolute inset-0 opacity-10"
                        animate={{
                            backgroundPosition: ['0% 0%', '100% 100%'],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            repeatType: 'reverse'
                        }}
                        style={{
                            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
                            backgroundSize: '50px 50px'
                        }}
                    />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <motion.div 
                            className="text-center"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <motion.h1 
                                className="text-5xl md:text-6xl font-bold text-white mb-6"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                Transform Education with
                                <motion.span 
                                    className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent"
                                    animate={{ 
                                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                                    }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                >
                                    TechShare Platform
                                </motion.span>
                            </motion.h1>
                            <motion.p 
                                className="text-xl text-white/90 mb-8 max-w-3xl mx-auto"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                            >
                                A comprehensive learning management system connecting administrators, institutes, and students 
                                in a seamless educational ecosystem.
                            </motion.p>
                            <motion.div 
                                className="flex flex-col sm:flex-row gap-4 justify-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.8 }}
                            >
                                <Link to="/register/institute">
                                    <Button size="large" className="w-full sm:w-auto bg-white text-primary-600 hover:bg-gray-100">
                                        Get Started as Institute
                                        <motion.div
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        >
                                            <FiArrowRight className="ml-2 h-5 w-5" />
                                        </motion.div>
                                    </Button>
                                </Link>
                                <Link to="/register/student">
                                    <Button variant="outline" size="large" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary-600">
                                        Join as Student
                                    </Button>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 bg-white/80 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div 
                            className="text-center mb-16"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Platform Highlights
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Discover the powerful features that make TechShare the perfect choice for modern education
                            </p>
                        </motion.div>
                        <motion.div 
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {features.map((feature, index) => (
                                <motion.div 
                                    key={index} 
                                    className="card-modern p-6 group"
                                    variants={itemVariants}
                                    whileHover={{ 
                                        y: -10,
                                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                                    }}
                                >
                                    <motion.div 
                                        className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <feature.icon className="w-6 h-6 text-white" />
                                    </motion.div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Role-based Sections */}
                <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div 
                            className="text-center mb-16"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Choose Your Role
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Whether you're an administrator, institute, or student, we have the perfect solution for you
                            </p>
                        </motion.div>
                        <motion.div 
                            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {roles.map((role, index) => (
                                <motion.div 
                                    key={index} 
                                    className="card-modern overflow-hidden group"
                                    variants={itemVariants}
                                    whileHover={{ y: -5 }}
                                >
                                    <motion.div 
                                        className={`h-2 bg-gradient-to-r ${role.color}`}
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: index * 0.2 }}
                                    />
                                    <div className="p-8">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{role.title}</h3>
                                        <p className="text-gray-600 mb-6">{role.description}</p>
                                        <ul className="space-y-2 mb-8">
                                            {role.features.map((feature, idx) => (
                                                <motion.li 
                                                    key={idx} 
                                                    className="flex items-center text-gray-700"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: idx * 0.1 + 0.3 }}
                                                >
                                                    <FiCheckCircle className="w-5 h-5 text-green-500 mr-3" />
                                                    {feature}
                                                </motion.li>
                                            ))}
                                        </ul>
                                        <Link to={role.link} className="block">
                                            <Button className="w-full group-hover:scale-105 transition-transform" variant="outline">
                                                Get Started
                                                <FiArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* CTA Section */}
                <motion.section 
                    className="py-20 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 relative overflow-hidden"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <motion.div 
                        className="absolute inset-0 opacity-20"
                        animate={{
                            backgroundPosition: ['0% 0%', '100% 100%'],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            repeatType: 'reverse'
                        }}
                        style={{
                            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 2px, transparent 2px)',
                            backgroundSize: '60px 60px'
                        }}
                    />
                    <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
                        <motion.h2 
                            className="text-3xl md:text-4xl font-bold text-white mb-6"
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            Ready to Transform Your Educational Experience?
                        </motion.h2>
                        <motion.p 
                            className="text-xl text-white/90 mb-8"
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Join thousands of educators and students already using TechShare to enhance their learning journey.
                        </motion.p>
                        <motion.div 
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <Link to="/register/institute">
                                <Button variant="secondary" size="large" className="w-full sm:w-auto bg-white text-primary-600 hover:bg-gray-100">
                                    Start Your Institute
                                </Button>
                            </Link>
                            <Link to="/feedback">
                                <Button variant="outline" size="large" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary-600">
                                    Share Feedback
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Footer */}
                <motion.footer 
                    className="bg-gray-900 text-white py-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <motion.h3 
                                className="text-2xl font-bold mb-4"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 400 }}
                            >
                                TechShare
                            </motion.h3>
                            <p className="text-gray-400 mb-6">
                                Empowering education through technology
                            </p>
                            <div className="flex justify-center space-x-6">
                                <motion.div whileHover={{ y: -2 }}>
                                    <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                                        About Us
                                    </Link>
                                </motion.div>
                                <motion.div whileHover={{ y: -2 }}>
                                    <Link to="/login" className="text-gray-400 hover:text-white transition-colors">
                                        Login
                                    </Link>
                                </motion.div>
                                <motion.div whileHover={{ y: -2 }}>
                                    <Link to="/feedback" className="text-gray-400 hover:text-white transition-colors">
                                        Feedback
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.footer>
            </div>
        </PageTransition>
    );
};

export default HomePage;