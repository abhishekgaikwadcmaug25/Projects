import { useState, useEffect } from 'react';
import { getStudentProfile } from '../../api/studentApi';
import Card from '../../components/common/Card';
import Spinner from '../../components/common/Spinner';
import { FiBook } from 'react-icons/fi';

const StudentCourses = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getStudentProfile();
                setProfile(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) return <Spinner size="large" />;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <FiBook className="text-primary-600" /> My Course
            </h1>

            <Card className="max-w-md">
                <div className="space-y-4">
                    <div>
                        <h2 className="text-sm font-medium text-gray-500">Enrolled Course</h2>
                        <p className="text-xl font-semibold text-gray-900">{profile?.courseName}</p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default StudentCourses;
