import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getInstitutes, deleteInstitute } from '../../api/adminApi';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import Spinner from '../../components/common/Spinner';
import Modal from '../../components/common/Modal';
import { FiEdit, FiTrash, FiEye } from 'react-icons/fi';
import { useToast } from '../../hooks/useToast';

const Institutes = () => {
    const navigate = useNavigate();
    const { success, error: showError } = useToast();
    const [institutes, setInstitutes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteModal, setDeleteModal] = useState({ open: false, institute: null });

    useEffect(() => {
        fetchInstitutes();
    }, []);

    const fetchInstitutes = async () => {
        try {
            const data = await getInstitutes();
            setInstitutes(data);
        } catch (err) {
            showError('Failed to fetch institutes');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteInstitute(deleteModal.institute.id);
            success('Institute deleted successfully');
            setDeleteModal({ open: false, institute: null });
            fetchInstitutes();
        } catch (err) {
            showError('Failed to delete institute');
            console.error(err);
        }
    };

    const columns = [
        { header: 'ID', accessor: 'id' },
        { header: 'Institute Name', accessor: 'instituteName' },
        { header: 'Email', accessor: 'email' },
        { header: 'Contact', accessor: 'phoneNo' },
        { header: 'Type', accessor: 'instituteType' },
        { header: 'Students', accessor: 'studentCount' },
        {
            header: 'Actions',
            render: (row) => (
                <div className="flex gap-2">
                    <Button
                        size="small"
                        variant="outline"
                        icon={FiEye}
                        onClick={() => navigate(`/admin/institutes/${row.id}`)}
                    >
                        View
                    </Button>
                    <Button
                        size="small"
                        variant="danger"
                        icon={FiTrash}
                        onClick={() => setDeleteModal({ open: true, institute: row })}
                    >
                        Delete
                    </Button>
                </div>
            ),
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
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Institutes Management</h1>
            </div>

            <Card>
                <Table
                    columns={columns}
                    data={institutes}
                    emptyMessage="No institutes found"
                />
            </Card>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={deleteModal.open}
                onClose={() => setDeleteModal({ open: false, institute: null })}
                title="Delete Institute"
            >
                <div className="space-y-4">
                    <p className="text-gray-600">
                        Are you sure you want to delete{' '}
                        <span className="font-semibold">{deleteModal.institute?.instituteName}</span>?
                        This action cannot be undone.
                    </p>
                    <div className="flex gap-3 justify-end">
                        <Button
                            variant="secondary"
                            onClick={() => setDeleteModal({ open: false, institute: null })}
                        >
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleDelete}>
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Institutes;
