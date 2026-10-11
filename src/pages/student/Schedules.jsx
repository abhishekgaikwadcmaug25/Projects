import { useState, useEffect } from 'react';
import { getStudentProfile, getScheduleByCourse } from '../../api/studentApi';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import Spinner from '../../components/common/Spinner';
import { FiCalendar } from 'react-icons/fi';
import { useToast } from '../../hooks/useToast';

const StudentTimetable = () => {
    const { error: showError } = useToast();
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                setLoading(true);
                const profile = await getStudentProfile();
                const data = await getScheduleByCourse(profile.courseId);
                setSchedules(data);
            } catch (err) {
                showError('Failed to fetch timetable');
            } finally {
                setLoading(false);
            }
        };
        fetchSchedule();
    }, []);

    const columns = [
        {
            header: 'Date',
            accessor: 'date',
            render: (row) => row.date ? new Date(row.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }) : 'N/A'
        },
        { header: 'Subject', accessor: 'title' },
        {
            header: 'Time',
            render: (row) => `${row.startTime?.substring(0, 5) || ''} - ${row.endTime?.substring(0, 5) || ''}`
        },
        { header: 'Type', accessor: 'type' },
    ];

    if (loading) return <Spinner size="large" />;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <FiCalendar className="text-primary-600" /> My Timetable
            </h1>

            <Card>
                <Table
                    columns={columns}
                    data={schedules}
                    emptyMessage="No schedule available for your course yet."
                />
            </Card>
        </div>
    );
};

export default StudentTimetable;
