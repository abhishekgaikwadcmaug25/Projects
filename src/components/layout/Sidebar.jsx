import { NavLink } from 'react-router-dom';

const Sidebar = ({ links }) => {
    return (
        <aside className="w-64 bg-white shadow-md min-h-screen border-r border-gray-200">
            <nav className="p-4 space-y-1">
                {links.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                ? 'bg-primary-50 text-primary-700 font-medium'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`
                        }
                    >
                        {link.icon && <link.icon className="w-5 h-5" />}
                        <span>{link.label}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
