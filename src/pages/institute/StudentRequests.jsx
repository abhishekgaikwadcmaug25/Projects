import { useState, useEffect } from 'react';
import {
    getCurrentInstitute,
    getPendingStudents,
    approveStudent,
    rejectStudent
} from '../../api/instituteApi';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import Spinner from '../../components/common/Spinner';
import Modal from '../../components/common/Modal';
import { useToast } from '../../hooks/useToast';
import { FiCheck, FiX, FiUsers } from 'react-icons/fi';

const StudentRequests = () => {
    const { success, error: showError } = useToast();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [instituteId, setInstituteId] = useState(null);
    const [confirmModal, setConfirmModal] = useState({ open: false, type: null, student: null });
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const profile = await getCurrentInstitute();
            setInstituteId(profile.id);

            const data = await getPendingStudents(profile.id);
            setRequests(Array.isArray(data) ? data : []);
        } catch (err) {
            showError('Failed to fetch pending requests');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async () => {
        try {
            setActionLoading(true);
            const { type, student } = confirmModal;

            if (type === 'APPROVE') {
                await approveStudent(student.requestId);
                success('Student request approved successfully');
            } else {
                await rejectStudent(student.requestId);
                success('Student request rejected');
            }

            setConfirmModal({ open: false, type: null, student: null });

            // Refresh list
            const updated = await getPendingStudents(instituteId);
            setRequests(updated);

        } catch (err) {
            showError('Action failed');
            console.error(err);
        } finally {
            setActionLoading(false);
        }
    };

    const columns = [
        { header: 'Student Name', accessor: 'studentName' },
        { header: 'Email', accessor: 'email' },
        { header: 'Gender', accessor: 'gender' },
        { header: 'Mobile', accessor: 'mobileNo' },
        {
            header: 'Course',
            accessor: 'courseName',
            render: (row) => <span className="font-semibold text-blue-700">{row.courseName}</span>
        },
        {
            header: 'Actions',
            render: (row) => (
                <div className="flex gap-2">
                    <Button
                        size="small"
                        className="bg-green-600 hover:bg-green-700 text-white"
                        icon={FiCheck}
                        onClick={() => setConfirmModal({ open: true, type: 'APPROVE', student: row })}
                    >
                        Approve
                    </Button>
                    <Button
                        size="small"
                        variant="danger"
                        icon={FiX}
                        onClick={() => setConfirmModal({ open: true, type: 'REJECT', student: row })}
                    >
                        Reject
                    </Button>
                </div>
            ),
        }
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Spinner size="large" />
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                    <FiUsers /> Student Requests
                </h1>
            </div>

            <Card>
                <Table
                    columns={columns}
                    data={requests}
                    emptyMessage="No pending student requests."
                />
            </Card>

            {/* Confirmation Modal */}
            <Modal
                isOpen={confirmModal.open}
                onClose={() => setConfirmModal({ open: false, type: null, student: null })}
                title={confirmModal.type === 'APPROVE' ? "Approve Student" : "Reject Request"}
            >
                <div className="space-y-4">
                    <p className="text-gray-600">
                        Are you sure you want to
                        <span className={`font-bold ${confirmModal.type === 'APPROVE' ? 'text-green-600' : 'text-red-600'}`}>
                            {confirmModal.type === 'APPROVE' ? ' approve ' : ' reject '}
                        </span>
                        the request from <b>{confirmModal.student?.studentName}</b>?
                    </p>
                    <div className="flex gap-3 justify-end">
                        <Button
                            variant="secondary"
                            onClick={() => setConfirmModal({ open: false, type: null, student: null })}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant={confirmModal.type === 'APPROVE' ? 'primary' : 'danger'}
                            onClick={handleAction}
                            loading={actionLoading}
                            className={confirmModal.type === 'APPROVE' ? 'bg-green-600 hover:bg-green-700' : ''}
                        >
                            {confirmModal.type === 'APPROVE' ? 'Confirm Approve' : 'Confirm Reject'}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default StudentRequests;
