import { useState, useEffect } from 'react';
import { getStudentProfile, getAssignments, downloadAssignment } from '../../api/studentApi';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import Spinner from '../../components/common/Spinner';
import { FiFileText, FiDownload } from 'react-icons/fi';
import { useToast } from '../../hooks/useToast';

const StudentAssignments = () => {
    const { error: showError } = useToast();
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                setLoading(true);
                const data = await getAssignments();
                setAssignments(data);
            } catch (err) {
                showError('Failed to fetch assignments');
            } finally {
                setLoading(false);
            }
        };
        fetchAssignments();
    }, []);

    const formatDate = (dateValue) => {
        if (!dateValue) return 'No Deadline';
        // Handle array format [YYYY, MM, DD]
        if (Array.isArray(dateValue)) {
            const [year, month, day] = dateValue;
            return new Date(year, month - 1, day).toLocaleDateString();
        }
        // Handle string format or already a Date object
        return new Date(dateValue).toLocaleDateString();
    };

    const handleDownload = async (assignment) => {
        try {
            const blob = await downloadAssignment(assignment.id);
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            // Use fileName from backend if available, otherwise fallback
            const fileName = assignment.fileName || (assignment.fileUrl ? assignment.fileUrl.split('/').pop() : `assignment_${assignment.id}`);
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            showError('Failed to download assignment');
        }
    };

    const columns = [
        { header: 'Title', accessor: 'title' },
        { header: 'Description', accessor: 'description' },
        {
            header: 'Deadline',
            accessor: 'dueDate',
            render: (row) => formatDate(row.dueDate)
        },
        {
            header: 'Total Marks',
            accessor: 'totalMarks',
            render: (row) => row.totalMarks || 'N/A'
        },
        {
            header: 'Attachment',
            render: (row) => row.fileUrl ? (
                <Button
                    size="small"
                    variant="secondary"
                    icon={FiDownload}
                    onClick={() => handleDownload(row)}
                >
                    Download
                </Button>
            ) : 'No file'
        }
    ];

    if (loading) return <Spinner size="large" />;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <FiFileText className="text-primary-600" /> My Assignments
            </h1>

            <Card>
                <Table
                    columns={columns}
                    data={assignments}
                    emptyMessage="No assignments assigned to your course yet."
                />
            </Card>
        </div>
    );
};

export default StudentAssignments;
