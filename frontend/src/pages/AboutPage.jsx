import { Link } from 'react-router-dom';
import { FiArrowLeft, FiTarget, FiEye, FiHeart, FiUsers, FiAward, FiTrendingUp } from 'react-icons/fi';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const AboutPage = () => {
    const values = [
        {
            icon: FiTarget,
            title: 'Innovation',
            description: 'We continuously innovate to provide cutting-edge educational technology solutions.'
        },
        {
            icon: FiHeart,
            title: 'Quality',
            description: 'We are committed to delivering high-quality educational experiences for all users.'
        },
        {
            icon: FiUsers,
            title: 'Community',
            description: 'We believe in building strong educational communities that support growth and learning.'
        },
        {
            icon: FiAward,
            title: 'Excellence',
            description: 'We strive for excellence in everything we do, from platform design to user support.'
        }
    ];

    const stats = [
        { number: '10,000+', label: 'Students Enrolled' },
        { number: '500+', label: 'Institutes Connected' },
        { number: '1,000+', label: 'Courses Available' },
        { number: '99.9%', label: 'Uptime Reliability' }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                            <FiArrowLeft className="w-5 h-5 mr-2" />
                            Back to Home
                        </Link>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            TechShare
                        </h1>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        About TechShare
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Empowering education through innovative technology solutions that connect 
                        administrators, institutes, and students in a seamless learning ecosystem.
                    </p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <Card className="h-full">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FiTarget className="w-8 h-8 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    To revolutionize education by providing a comprehensive, user-friendly platform 
                                    that facilitates seamless communication and collaboration between educational 
                                    institutions and students, making quality education accessible to everyone.
                                </p>
                            </div>
                        </Card>

                        <Card className="h-full">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FiEye className="w-8 h-8 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    To become the leading educational technology platform that transforms how 
                                    institutions deliver education and how students learn, creating a global 
                                    community of empowered learners and educators.
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Our Impact in Numbers
                        </h2>
                        <p className="text-blue-100 text-lg">
                            See how we're making a difference in education
                        </p>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-blue-100 text-lg">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Our Core Values
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            The principles that guide everything we do and shape our commitment to educational excellence
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <Card key={index} className="text-center h-full hover:shadow-lg transition-all duration-300">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <value.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Card>
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
                        </div>
                        <div className="prose prose-lg mx-auto text-gray-600">
                            <p className="mb-6">
                                TechShare was born from a simple yet powerful idea: education should be accessible, 
                                engaging, and efficient for everyone involved. Founded by a team of educators and 
                                technologists, we recognized the growing need for a comprehensive platform that could 
                                bridge the gap between traditional education methods and modern digital learning.
                            </p>
                            <p className="mb-6">
                                Our journey began with extensive research into the challenges faced by educational 
                                institutions, administrators, and students. We discovered that while technology had 
                                the potential to transform education, many existing solutions were fragmented, 
                                difficult to use, or didn't address the real needs of the educational community.
                            </p>
                            <p>
                                Today, TechShare stands as a testament to what's possible when technology meets 
                                education with purpose. We continue to evolve, innovate, and grow, always keeping 
                                our users' needs at the heart of everything we do.
                            </p>
                        </div>
                    </Card>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        Ready to Join Our Community?
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Be part of the educational revolution and help us shape the future of learning.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/register/institute">
                            <Button size="large" className="w-full sm:w-auto">
                                Start Your Institute
                            </Button>
                        </Link>
                        <Link to="/register/student">
                            <Button variant="outline" size="large" className="w-full sm:w-auto">
                                Join as Student
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;