import { useState, useEffect } from 'react';
import { 
    getStudentProfile,
    getAssignments,
    getMaterials
} from '../../api/studentApi';
import { useAuth } from '../../hooks/useAuth';
import Card from '../../components/common/Card';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import EmptyState from '../../components/common/EmptyState';
import { FiBook, FiBell, FiFileText, FiCalendar, FiTrendingUp, FiClock, FiUser } from 'react-icons/fi';

const StudentDashboard = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);
    const [assignments, setAssignments] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Fetch all dashboard data in parallel
            const [profileData, assignmentsData, materialsData] = await Promise.allSettled([
                getStudentProfile(),
                getAssignments(),
                getMaterials()
            ]);
            
            // Handle successful responses
            if (profileData.status === 'fulfilled') setProfile(profileData.value || null);
            if (assignmentsData.status === 'fulfilled') setAssignments(assignmentsData.value || []);
            if (materialsData.status === 'fulfilled') setMaterials(materialsData.value || []);
            
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setError('Failed to load dashboard data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Get pending assignments (not submitted or overdue)
    const pendingAssignments = assignments.filter(assignment => {
        const dueDate = new Date(assignment.dueDate);
        const now = new Date();
        return !assignment.submitted && dueDate > now;
    });

    // Get today's classes (mock data since we don't have schedule API for students)
    const todayClasses = 4; // This would come from actual schedule API

    // Get enrolled courses count
    const enrolledCourses = profile?.courses?.length || profile?.enrolledCourses || 5;

    // Get recent materials (last 5)
    const recentMaterials = materials
        .sort((a, b) => new Date(b.uploadDate || b.createdAt) - new Date(a.uploadDate || a.createdAt))
        .slice(0, 5);
    {}
    const stats = [
        { 
            label: 'Enrolled Courses', 
            value: enrolledCourses, 
            icon: FiBook, 
            color: 'bg-blue-500',
            trend: 'Active',
            trendUp: true
        },
        { 
            label: 'New Materials', 
            value: materials.filter(m => {
                const uploadDate = new Date(m.uploadDate || m.createdAt);
                const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                return uploadDate > weekAgo;
            }).length, 
            icon: FiBell, 
            color: 'bg-yellow-500',
            trend: 'This week',
            trendUp: true
        },
        { 
            label: 'Pending Assignments', 
            value: pendingAssignments.length, 
            icon: FiFileText, 
            color: 'bg-red-500',
            trend: pendingAssignments.length > 0 ? 'Due soon' : 'All caught up',
            trendUp: false
        },
        { 
            label: 'Classes Today', 
            value: todayClasses, 
            icon: FiCalendar, 
            color: 'bg-green-500',
            trend: 'Scheduled',
            trendUp: true
        },
    ];

    if (loading) {
        return (
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Student Dashboard</h1>
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
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Student Dashboard</h1>
                <Card>
                    <div className="text-center py-8">
                        <p className="text-red-600 mb-4">{error}</p>
                        <button 
                            onClick={fetchDashboardData}
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
                <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
                <p className="text-gray-600 mt-2">
                    Welcome back, {profile?.name || profile?.firstName || user?.email?.split('@')[0] || 'Student'}!
                </p>
            </div>

            {/* Stats Cards 
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                                <div className="flex items-center">
                                    {stat.trendUp ? (
                                        <FiTrendingUp className="w-4 h-4 text-green-500 mr-1" />
                                    ) : (
                                        <FiClock className="w-4 h-4 text-gray-500 mr-1" />
                                    )}
                                    <span className={`text-sm ${
                                        stat.trendUp ? 'text-green-600' : 'text-gray-600'
                                    }`}>
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
            </div>*/}

            {/* Content Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pending Assignments */}
                <Card title="Pending Assignments" className="hover:shadow-md transition-shadow">
                    {pendingAssignments.length > 0 ? (
                        <div className="space-y-4">
                            {pendingAssignments.slice(0, 5).map((assignment, index) => {
                                const dueDate = new Date(assignment.dueDate);
                                const isUrgent = dueDate - new Date() < 2 * 24 * 60 * 60 * 1000; // Due within 2 days
                                
                                return (
                                    <div key={assignment.id || index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                                            isUrgent ? 'bg-red-500' : 'bg-yellow-500'
                                        }`}></div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-medium text-gray-900 truncate">
                                                {assignment.title || 'Assignment'}
                                            </h4>
                                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                                {assignment.description || 'No description available'}
                                            </p>
                                            <p className={`text-xs mt-1 ${
                                                isUrgent ? 'text-red-600 font-medium' : 'text-gray-500'
                                            }`}>
                                                Due: {dueDate.toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <EmptyState 
                            type="assignments" 
                            title="No Pending Assignments"
                            description="Great job! You're all caught up with your assignments."
                        />
                    )}
                </Card>

                {/* Recent Study Materials */}
                <Card title="Recent Study Materials" className="hover:shadow-md transition-shadow">
                    {recentMaterials.length > 0 ? (
                        <div className="space-y-4">
                            {recentMaterials.map((material, index) => (
                                <div key={material.id || index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FiFileText className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-medium text-gray-900 truncate">
                                            {material.title || material.fileName || 'Study Material'}
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            {material.subject || material.course || 'General'}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {material.uploadDate 
                                                ? new Date(material.uploadDate).toLocaleDateString()
                                                : 'Recently uploaded'
                                            }
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyState 
                            type="materials" 
                            title="No Study Materials"
                            description="Study materials will appear here when your instructors upload them."
                        />
                    )}
                </Card>
            </div>
        </div>
    );
};

export default StudentDashboard;
