import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { FiHome, FiBook, FiBell, FiCalendar, FiFileText, FiFolder } from 'react-icons/fi';

const StudentLayout = () => {
    const links = [
        { path: '/student/dashboard', label: 'Dashboard', icon: FiHome },
        { path: '/student/courses', label: 'Courses', icon: FiBook },
        { path: '/student/announcements', label: 'Announcements', icon: FiBell },
        { path: '/student/timetable', label: 'Timetable', icon: FiCalendar },
        { path: '/student/assignments', label: 'Assignments', icon: FiFileText },
        { path: '/student/materials', label: 'Study Materials', icon: FiFolder },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar title="Student Portal" />
            <div className="flex">
                <Sidebar links={links} />
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default StudentLayout;
