import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import PublicLayout from '../components/layout/PublicLayout';
import AdminLayout from '../components/layout/AdminLayout';
import InstituteLayout from '../components/layout/InstituteLayout';
import StudentLayout from '../components/layout/StudentLayout';

// Public pages
import HomePage from '../pages/HomePage';
import FeedbackPage from '../pages/FeedbackPage';
import AboutPage from '../pages/AboutPage';

// Auth pages
import Login from '../pages/auth/Login';
import StudentRegister from '../pages/auth/StudentRegister';
import InstituteRegister from '../pages/auth/InstituteRegister';

// Admin pages
import AdminDashboard from '../pages/admin/Dashboard';
import Institutes from '../pages/admin/Institutes';
import InstituteDetail from '../pages/admin/InstituteDetail';

// Institute pages
import InstituteDashboard from '../pages/institute/Dashboard';
import Courses from '../pages/institute/Courses';
import Announcements from '../pages/institute/Announcements';
import Schedules from '../pages/institute/Schedules';
import Assignments from '../pages/institute/Assignments';
import StudyMaterials from '../pages/institute/StudyMaterials';
import StudentRequests from '../pages/institute/StudentRequests';
import Students from '../pages/institute/Students';

// Student pages
import StudentDashboard from '../pages/student/Dashboard';
import StudentAnnouncements from '../pages/student/Announcements';
import StudentCourses from '../pages/student/Courses';
import StudentTimetable from '../pages/student/Schedules';
import StudentAssignments from '../pages/student/Assignments';
import StudentMaterials from '../pages/student/StudyMaterials';

// Not Found
import NotFound from '../pages/NotFound';

import { ROLES } from '../utils/constants';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/about" element={<AboutPage />} />

            <Route element={<PublicLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register/student" element={<StudentRegister />} />
                <Route path="/register/institute" element={<InstituteRegister />} />
            </Route>

            {/* Admin Routes */}
            <Route
                path="/admin"
                element={
                    <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="institutes" element={<Institutes />} />
                <Route path="institutes/:id" element={<InstituteDetail />} />
            </Route>

            {/* Institute Routes */}
            <Route
                path="/institute"
                element={
                    <ProtectedRoute allowedRoles={[ROLES.INSTITUTE]}>
                        <InstituteLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Navigate to="/institute/dashboard" replace />} />
                <Route path="dashboard" element={<InstituteDashboard />} />
                <Route path="requests" element={<StudentRequests />} />
                <Route path="courses" element={<Courses />} />
                <Route path="announcements" element={<Announcements />} />
                <Route path="schedules" element={<Schedules />} />
                <Route path="assignments" element={<Assignments />} />
                <Route path="materials" element={<StudyMaterials />} />
                <Route path="students" element={<Students />} />
                {/* Add more institute routes here as you create the pages */}
            </Route>

            {/* Student Routes */}
            <Route
                path="/student"
                element={
                    <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
                        <StudentLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Navigate to="/student/dashboard" replace />} />
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="announcements" element={<StudentAnnouncements />} />
                <Route path="courses" element={<StudentCourses />} />
                <Route path="timetable" element={<StudentTimetable />} />
                <Route path="assignments" element={<StudentAssignments />} />
                <Route path="materials" element={<StudentMaterials />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
