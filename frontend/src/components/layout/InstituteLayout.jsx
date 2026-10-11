import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { FiHome, FiBook, FiUsers, FiBell, FiCalendar, FiFileText, FiUpload } from 'react-icons/fi';

const InstituteLayout = () => {
    const links = [
        { path: '/institute/dashboard', label: 'Dashboard', icon: FiHome },
        { path: '/institute/courses', label: 'Courses', icon: FiBook },
        { path: '/institute/requests', label: 'Student Requests', icon: FiUsers },
        { path: '/institute/announcements', label: 'Announcements', icon: FiBell },
        { path: '/institute/schedules', label: 'Schedules', icon: FiCalendar },
        { path: '/institute/assignments', label: 'Assignments', icon: FiFileText },
        { path: '/institute/materials', label: 'Study Materials', icon: FiUpload },
        { path: '/institute/students', label: 'Students', icon: FiUsers },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar title="Institute Portal" />
            <div className="flex">
                <Sidebar links={links} />
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default InstituteLayout;
