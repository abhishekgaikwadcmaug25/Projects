import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-primary-600 mb-2">TechShare</h1>
                    <p className="text-gray-600">Educational Platform for Institutes and Students</p>
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default PublicLayout;
