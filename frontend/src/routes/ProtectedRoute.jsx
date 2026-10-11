import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Spinner from '../components/common/Spinner';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { isAuthenticated, user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spinner size="large" />
            </div>
        );
    }

    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
        // Redirect to appropriate dashboard based on role
        const dashboardMap = {
            ADMIN: '/admin/dashboard',
            INSTITUTE: '/institute/dashboard',
            STUDENT: '/student/dashboard',
        };
        return <Navigate to={dashboardMap[user?.role] || '/login'} replace />;
    }

    return children;
};

export default ProtectedRoute;
