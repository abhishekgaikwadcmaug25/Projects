import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { FiHome, FiBook } from 'react-icons/fi';

const AdminLayout = () => {
    const links = [
        { path: '/admin/dashboard', label: 'Dashboard', icon: FiHome },
        { path: '/admin/institutes', label: 'Institutes', icon: FiBook },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar title="Admin Panel" />
            <div className="flex">
                <Sidebar links={links} />
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
