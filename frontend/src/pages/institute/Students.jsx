import { useState, useEffect } from 'react';
import { getCurrentInstitute, getCoursesByInstitute, getStudentsByCourse, getAllStudents } from '../../api/instituteApi';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import Select from '../../components/common/Select';
import Spinner from '../../components/common/Spinner';
import { FiUsers, FiBookOpen } from 'react-icons/fi';
import { useToast } from '../../hooks/useToast';

const Students = () => {
    const { error: showError } = useToast();
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('all');
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [studentsLoading, setStudentsLoading] = useState(false);

    useEffect(() => {
        fetchInitialData();
    }, []);

    useEffect(() => {
        if (selectedCourse === 'all') {
            fetchAllStudents();
        } else if (selectedCourse) {
            fetchStudentsByCourse(selectedCourse);
        }
    }, [selectedCourse]);

    const fetchInitialData = async () => {
        try {
            setLoading(true);
            const profile = await getCurrentInstitute();
            const courseList = await getCoursesByInstitute(profile.id);
            setCourses(courseList);
            await fetchAllStudents();
        } catch (err) {
            showError('Failed to fetch initial data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchAllStudents = async () => {
        try {
            setStudentsLoading(true);
            const data = await getAllStudents();
            setStudents(Array.isArray(data) ? data : []);
        } catch (err) {
            showError('Failed to fetch all students');
        } finally {
            setStudentsLoading(false);
        }
    };

    const fetchStudentsByCourse = async (courseId) => {
        try {
            setStudentsLoading(true);
            const data = await getStudentsByCourse(courseId);
            setStudents(Array.isArray(data) ? data : []);
        } catch (err) {
            showError('Failed to fetch students for this course');
        } finally {
            setStudentsLoading(false);
        }
    };

    const columns = [
        { header: 'Name', accessor: 'studentName' },
        { header: 'Email', accessor: 'email' },
        { header: 'Gender', accessor: 'gender' },
        { header: 'Mobile', accessor: 'mobileNo' },
        { header: 'DOB', accessor: 'dob' },
        {
            header: 'Course',
            accessor: 'courseName',
            render: (row) => <span className="font-medium text-primary-600">{row.courseName}</span>
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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                    <FiUsers /> Students by Course
                </h1>
            </div>

            <Card>
                <div className="mb-6">
                    <div className="max-w-md">
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                            <FiBookOpen className="text-primary-500" /> Select Course
                        </label>
                        <Select
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                            placeholder={null}
                            options={[
                                { value: 'all', label: 'All Courses' },
                                ...courses.map(c => ({ value: c.id, label: c.courseName }))
                            ]}
                        />
                    </div>
                </div>

                {studentsLoading ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <Spinner size="medium" />
                        <p className="mt-4 text-gray-500">Loading students...</p>
                    </div>
                ) : (
                    <Table
                        columns={columns}
                        data={students}
                        emptyMessage={
                            selectedCourse === 'all'
                                ? "No students enrolled in this institute yet."
                                : "No students found for this course."
                        }
                    />
                )}
            </Card>
        </div>
    );
};

export default Students;
