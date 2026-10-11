import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiSend, FiCheckCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Textarea from '../components/common/Textarea';
import Card from '../components/common/Card';
import PageTransition from '../components/common/PageTransition';

const FeedbackPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const roleOptions = [
        { value: '', label: 'Select your role' },
        { value: 'ADMIN', label: 'Administrator' },
        { value: 'INSTITUTE', label: 'Institute' },
        { value: 'STUDENT', label: 'Student' }
    ];

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.role) {
            newErrors.role = 'Please select your role';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            console.log('Feedback submitted:', formData);
            setIsSubmitted(true);
            
            // Reset form after successful submission
            setTimeout(() => {
                setFormData({
                    name: '',
                    email: '',
                    role: '',
                    message: ''
                });
                setIsSubmitted(false);
            }, 3000);
            
        } catch (error) {
            console.error('Error submitting feedback:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <PageTransition>
                <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                        <Card className="max-w-md w-full text-center" hover={false}>
                            <div className="py-8">
                                <motion.div 
                                    className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4"
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: 0.2, type: 'spring', stiffness: 500 }}
                                >
                                    <FiCheckCircle className="w-8 h-8 text-white" />
                                </motion.div>
                                <motion.h2 
                                    className="text-2xl font-bold text-gray-900 mb-2"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    Thank You!
                                </motion.h2>
                                <motion.p 
                                    className="text-gray-600 mb-6"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    Your feedback has been submitted successfully. We appreciate your input!
                                </motion.p>
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <Link to="/">
                                        <Button className="w-full">
                                            Back to Home
                                        </Button>
                                    </Link>
                                </motion.div>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </PageTransition>
        );
    }

    return (
        <PageTransition>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                {/* Navigation */}
                <motion.nav 
                    className="glass border-b border-white/20"
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <motion.div
                                whileHover={{ x: -5 }}
                                transition={{ type: 'spring', stiffness: 400 }}
                            >
                                <Link to="/" className="flex items-center text-gray-600 hover:text-primary-600 transition-colors font-medium">
                                    <FiArrowLeft className="w-5 h-5 mr-2" />
                                    Back to Home
                                </Link>
                            </motion.div>
                            <motion.h1 
                                className="text-2xl font-bold text-gradient"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 400 }}
                            >
                                TechShare
                            </motion.h1>
                        </div>
                    </div>
                </motion.nav>

                {/* Main Content */}
                <div className="py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto">
                        <motion.div 
                            className="text-center mb-8"
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                We'd Love Your Feedback
                            </h1>
                            <p className="text-lg text-gray-600">
                                Help us improve TechShare by sharing your thoughts and suggestions
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <Card className="shadow-xl" hover={false}>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <motion.div 
                                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3, staggerChildren: 0.1 }}
                                    >
                                        <motion.div
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.4 }}
                                        >
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Full Name *
                                            </label>
                                            <Input
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Enter your full name"
                                                error={errors.name}
                                            />
                                        </motion.div>

                                        <motion.div
                                            initial={{ x: 20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address *
                                            </label>
                                            <Input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Enter your email"
                                                error={errors.email}
                                            />
                                        </motion.div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.6 }}
                                    >
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Your Role *
                                        </label>
                                        <Select
                                            name="role"
                                            value={formData.role}
                                            onChange={handleChange}
                                            options={roleOptions}
                                            error={errors.role}
                                        />
                                    </motion.div>

                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.7 }}
                                    >
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Your Message *
                                        </label>
                                        <Textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Share your feedback, suggestions, or report any issues..."
                                            rows={6}
                                            error={errors.message}
                                        />
                                        <p className="text-sm text-gray-500 mt-1">
                                            Minimum 10 characters ({formData.message.length}/10)
                                        </p>
                                    </motion.div>

                                    <motion.div 
                                        className="pt-4"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.8 }}
                                    >
                                        <Button
                                            type="submit"
                                            loading={isSubmitting}
                                            disabled={isSubmitting}
                                            className="w-full"
                                            size="large"
                                        >
                                            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                                            {!isSubmitting && <FiSend className="ml-2 h-5 w-5" />}
                                        </Button>
                                    </motion.div>
                                </form>
                            </Card>
                        </motion.div>

                        {/* Additional Info */}
                        <motion.div 
                            className="mt-8 text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        >
                            <p className="text-gray-600">
                                Your feedback is important to us and helps make TechShare better for everyone.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default FeedbackPage;