import { useState, useEffect } from 'react';
import { 
    getCurrentInstitute, 
    getCoursesByInstitute, 
    getAnnouncements, 
    getPendingStudents,
    getSchedules 
} from '../../api/instituteApi';
import { useAuth } from '../../hooks/useAuth';
import Card from '../../components/common/Card';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import EmptyState from '../../components/common/EmptyState';
import { FiBook, FiUsers, FiBell, FiCalendar, FiTrendingUp, FiClock } from 'react-icons/fi';

const InstituteDashboard = () => {
    const { user } = useAuth();
    const [institute, setInstitute] = useState(null);
    const [courses, setCourses] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Get current institute first
            const instituteData = await getCurrentInstitute();
            setInstitute(instituteData);
            
            if (instituteData?.id) {
                // Fetch all dashboard data in parallel
                const [coursesData, announcementsData, pendingData, schedulesData] = await Promise.allSettled([
                    getCoursesByInstitute(instituteData.id),
                    getAnnouncements(instituteData.id),
                    getPendingStudents(instituteData.id),
                    getSchedules(instituteData.id)
                ]);
                
                // Handle successful responses
                if (coursesData.status === 'fulfilled') setCourses(coursesData.value || []);
                if (announcementsData.status === 'fulfilled') setAnnouncements(announcementsData.value || []);
                if (pendingData.status === 'fulfilled') setPendingRequests(pendingData.value || []);
                if (schedulesData.status === 'fulfilled') setSchedules(schedulesData.value || []);
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setError('Failed to load dashboard data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Get today's schedules
    const todaySchedules = schedules.filter(schedule => {
        const today = new Date().toDateString();
        const scheduleDate = new Date(schedule.date || schedule.startTime).toDateString();
        return scheduleDate === today;
    });

    // Get recent announcements (last 5)
    const recentAnnouncements = announcements
        .sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date))
        .slice(0, 5);

    const stats = [
        { 
            label: 'Total Courses', 
            value: courses.length, 
            icon: FiBook, 
            color: 'bg-blue-500',
            trend: '+12%',
            trendUp: true
        },
        { 
            label: 'Pending Requests', 
            value: pendingRequests.length, 
            icon: FiUsers, 
            color: 'bg-yellow-500',
            trend: pendingRequests.length > 0 ? 'Action needed' : 'All clear',
            trendUp: false
        },
        { 
            label: 'Announcements', 
            value: announcements.length, 
            icon: FiBell, 
            color: 'bg-green-500',
            trend: '+3 this week',
            trendUp: true
        },
        { 
            label: 'Today\'s Classes', 
            value: todaySchedules.length, 
            icon: FiCalendar, 
            color: 'bg-purple-500',
            trend: `${schedules.length} total`,
            trendUp: true
        },
    ];

    if (loading) {
        return (
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Institute Dashboard</h1>
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
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Institute Dashboard</h1>
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
                <h1 className="text-3xl font-bold text-gray-900">Institute Dashboard</h1>
                {institute && (
                    <p className="text-gray-600 mt-2">Welcome back, {institute.name || 'Institute'}!</p>
                )}
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
            </div>

            {/* Content Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Announcements */}
                <Card title="Recent Announcements" className="hover:shadow-md transition-shadow">
                    {recentAnnouncements.length > 0 ? (
                        <div className="space-y-4">
                            {recentAnnouncements.map((announcement, index) => (
                                <div key={announcement.id || index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-medium text-gray-900 truncate">
                                            {announcement.title || 'Announcement'}
                                        </h4>
                                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                            {announcement.content || announcement.description || 'No content available'}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {announcement.createdAt ? new Date(announcement.createdAt).toLocaleDateString() : 'Recently'}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyState 
                            type="announcements" 
                            title="No Recent Announcements"
                            description="Create announcements to keep your students informed about important updates."
                        />
                    )}
                </Card>

                {/* Today's Schedule */}
                <Card title="Today's Schedule" className="hover:shadow-md transition-shadow">
                    {todaySchedules.length > 0 ? (
                        <div className="space-y-4">
                            {todaySchedules.map((schedule, index) => (
                                <div key={schedule.id || index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FiClock className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-medium text-gray-900">
                                            {schedule.subject || schedule.title || 'Class'}
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            {schedule.startTime && schedule.endTime 
                                                ? `${schedule.startTime} - ${schedule.endTime}`
                                                : 'Time not specified'
                                            }
                                        </p>
                                        {schedule.room && (
                                            <p className="text-xs text-gray-500">Room: {schedule.room}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyState 
                            type="schedules" 
                            title="No Classes Today"
                            description="No classes are scheduled for today. Enjoy your free time!"
                        />
                    )}
                </Card>
            </div>
        </div>
    );
};

export default InstituteDashboard;
