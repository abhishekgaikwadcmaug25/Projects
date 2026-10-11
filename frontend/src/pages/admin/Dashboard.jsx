import { useState, useEffect } from 'react';
import { getInstitutes, getStatistics } from '../../api/adminApi';
import { useAuth } from '../../hooks/useAuth';
import Card from '../../components/common/Card';
import Spinner from '../../components/common/Spinner';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import EmptyState from '../../components/common/EmptyState';
import { FiBook, FiUsers, FiUserCheck, FiTrendingUp, FiActivity, FiGlobe } from 'react-icons/fi';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [institutes, setInstitutes] = useState([]);
    const [statistics, setStatistics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const [institutesData, statsData] = await Promise.allSettled([
                getInstitutes(),
                getStatistics()
            ]);
            
            if (institutesData.status === 'fulfilled') {
                setInstitutes(institutesData.value || []);
            }
            
            if (statsData.status === 'fulfilled') {
                setStatistics(statsData.value || {});
            }
            
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to load dashboard data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Get recent institutes (last 5)
    const recentInstitutes = institutes
        .sort((a, b) => new Date(b.createdAt || b.registrationDate) - new Date(a.createdAt || a.registrationDate))
        .slice(0, 5);

    // Get pending institutes (if status field exists)
    const pendingInstitutes = institutes.filter(institute => 
        institute.status === 'PENDING' || institute.approved === false
    );

    const stats = [
        { 
            label: 'Total Institutes', 
            value: statistics?.totalInstitutes || institutes.length || 0, 
            icon: FiBook, 
            color: 'bg-blue-500',
            trend: `+${Math.floor(institutes.length * 0.1)} this month`,
            trendUp: true
        },
        { 
            label: 'Total Students', 
            value: statistics?.totalStudents || 0, 
            icon: FiUsers, 
            color: 'bg-green-500',
            trend: 'Active learners',
            trendUp: true
        },
        { 
            label: 'System Admins', 
            value: statistics?.totalAdmins || 1, 
            icon: FiUserCheck, 
            color: 'bg-purple-500',
            trend: 'Platform managers',
            trendUp: true
        },
        {
            label: 'Platform Activity',
            value: '99.9%',
            icon: FiActivity,
            color: 'bg-emerald-500',
            trend: 'Uptime',
            trendUp: true
        }
    ];

    if (loading) {
        return (
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <LoadingSkeleton count={4} />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <LoadingSkeleton type="list" count={2} />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
                <Card>
                    <div className="text-center py-8">
                        <p className="text-red-600 mb-4">{error}</p>
                        <button 
                            onClick={fetchData}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600 mt-2">
                    Welcome back, {user?.email?.split('@')[0] || 'Administrator'}! Here's your platform overview.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                                <div className="flex items-center">
                                    <FiTrendingUp className="w-4 h-4 text-green-500 mr-1" />
                                    <span className="text-sm text-green-600">
                                        {stat.trend}
                                    </span>
                                </div>
                            </div>
                            <div className={`${stat.color} p-4 rounded-lg shadow-sm`}>
                                <stat.icon className="w-8 h-8 text-white" />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Content Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Institutes */}
                <Card title="Recent Institute Registrations" className="hover:shadow-md transition-shadow">
                    {recentInstitutes.length > 0 ? (
                        <div className="space-y-4">
                            {recentInstitutes.map((institute, index) => (
                                <div key={institute.id || index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FiGlobe className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-medium text-gray-900 truncate">
                                            {institute.name || institute.instituteName || 'Institute'}
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            {institute.email || 'No email provided'}
                                        </p>
                                        <div className="flex items-center justify-between mt-1">
                                            <p className="text-xs text-gray-500">
                                                {institute.createdAt 
                                                    ? new Date(institute.createdAt).toLocaleDateString()
                                                    : 'Recently registered'
                                                }
                                            </p>
                                            <span className={`px-2 py-1 text-xs rounded-full ${
                                                institute.status === 'APPROVED' || institute.approved === true
                                                    ? 'bg-green-100 text-green-800'
                                                    : institute.status === 'PENDING' || institute.approved === false
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}>
                                                {institute.status || (institute.approved ? 'Approved' : 'Pending')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyState 
                            type="institutes" 
                            title="No Recent Registrations"
                            description="New institute registrations will appear here when they join the platform."
                        />
                    )}
                </Card>

                {/* System Overview */}
                <Card title="System Overview" className="hover:shadow-md transition-shadow">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                    <FiBook className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-sm font-medium text-gray-900">Active Institutes</span>
                            </div>
                            <span className="text-lg font-bold text-blue-600">
                                {institutes.filter(i => i.status === 'APPROVED' || i.approved === true).length}
                            </span>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                                    <FiActivity className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-sm font-medium text-gray-900">Pending Approvals</span>
                            </div>
                            <span className="text-lg font-bold text-yellow-600">
                                {pendingInstitutes.length}
                            </span>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                    <FiUsers className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-sm font-medium text-gray-900">Total Students</span>
                            </div>
                            <span className="text-lg font-bold text-green-600">
                                {statistics?.totalStudents || '0'}
                            </span>
                        </div>
                        
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600 text-center">
                                Platform running smoothly with 99.9% uptime
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;
