import { useState, useEffect } from 'react';
import { getStudentProfile, getAnnouncementsByCourse } from '../../api/studentApi';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import Spinner from '../../components/common/Spinner';
import { FiBell } from 'react-icons/fi';
import { useToast } from '../../hooks/useToast';

const StudentAnnouncements = () => {
    const { error: showError } = useToast();
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                setLoading(true);
                // 1. Get student profile to get courseId
                const profile = await getStudentProfile();

                // 2. Fetch announcements for that course
                const data = await getAnnouncementsByCourse(profile.courseId);
                setAnnouncements(data);
            } catch (err) {
                showError('Failed to fetch announcements');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncements();
    }, []);

    const columns = [
        { header: 'Title', accessor: 'title' },
        {
            header: 'Message',
            accessor: 'message',
            render: (row) => (
                <p className="whitespace-pre-wrap">{row.message}</p>
            )
        },
        {
            header: 'Date',
            accessor: 'publishedAt',
            render: (row) => row.publishedAt ? new Date(row.publishedAt).toLocaleDateString() : 'N/A'
        },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Spinner size="large" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <FiBell className="text-primary-600" /> Announcements
            </h1>

            <Card>
                <Table
                    columns={columns}
                    data={announcements}
                    emptyMessage="No announcements for your course yet."
                />
            </Card>
        </div>
    );
};

export default StudentAnnouncements;
