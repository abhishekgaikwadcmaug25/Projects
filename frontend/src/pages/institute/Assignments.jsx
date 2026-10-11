import { useState, useEffect } from 'react';
import {
    getCurrentInstitute,
    getAssignments,
    addAssignment,
    updateAssignment,
    deleteAssignment,
    getCoursesByInstitute,
    downloadAssignment
} from '../../api/instituteApi';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import Spinner from '../../components/common/Spinner';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Textarea from '../../components/common/Textarea';
import Select from '../../components/common/Select';
import { useForm } from 'react-hook-form';
import { useToast } from '../../hooks/useToast';
import { FiPlus, FiTrash, FiFileText, FiDownload, FiEdit } from 'react-icons/fi';

const Assignments = () => {
    const { success, error: showError } = useToast();
    const [assignments, setAssignments] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [instituteId, setInstituteId] = useState(null);
    const [createModal, setCreateModal] = useState(false);
    const [creating, setCreating] = useState(false);
    const [editingAssignment, setEditingAssignment] = useState(null);
    const [deleteModal, setDeleteModal] = useState({ open: false, assignment: null });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const profile = await getCurrentInstitute();
            setInstituteId(profile.id);

            const [assignmentsData, coursesData] = await Promise.all([
                getAssignments(profile.id),
                getCoursesByInstitute(profile.id)
            ]);

            setAssignments(Array.isArray(assignmentsData) ? assignmentsData : []);
            setCourses(coursesData);
        } catch (err) {
            showError('Failed to fetch data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = async (data) => {
        try {
            setCreating(true);

            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('dueDate', data.dueDate);
            formData.append('totalMarks', data.totalMarks);
            formData.append('instituteId', instituteId);
            formData.append('courseId', data.courseId);

            if (data.file && data.file[0]) {
                formData.append('file', data.file[0]);
            }

            if (editingAssignment) {
                await updateAssignment(editingAssignment.id, formData);
                success('Assignment updated successfully');
            } else {
                await addAssignment(formData);
                success('Assignment created successfully');
            }

            setCreateModal(false);
            setEditingAssignment(null);
            reset({
                title: '',
                description: '',
                dueDate: '',
                totalMarks: '',
                courseId: '',
                file: null
            });

            // Refresh
            const updated = await getAssignments(instituteId);
            setAssignments(updated);
        } catch (err) {
            showError('Failed to create assignment');
            console.error(err);
        } finally {
            setCreating(false);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteAssignment(deleteModal.assignment.id);
            success('Assignment deleted successfully');
            setDeleteModal({ open: false, assignment: null });

            // Refresh
            const updated = await getAssignments(instituteId);
            setAssignments(updated);
        } catch (err) {
            showError('Failed to delete assignment');
            console.error(err);
        }
    };

    const columns = [
        { header: 'Title', accessor: 'title' },
        {
            header: 'Course',
            accessor: 'courseId',
            render: (row) => {
                if (!row.courseId) return 'N/A';
                const course = courses.find(c => c.id === row.courseId);
                return course ? course.courseName : 'Unknown';
            }
        },
        {
            header: 'Due Date',
            accessor: 'dueDate',
            render: (row) => new Date(row.dueDate).toLocaleDateString()
        },
        { header: 'Marks', accessor: 'totalMarks' },
        {
            header: 'File',
            accessor: 'fileUrl',
            render: (row) => row.fileUrl ? (
                <button
                    onClick={async () => {
                        try {
                            const response = await downloadAssignment(row.id);
                            const blob = response.data;
                            const url = window.URL.createObjectURL(blob);
                            const link = document.createElement('a');
                            link.href = url;

                            // Use fileName from row (DTO) or headers
                            let fileName = row.fileName;
                            if (!fileName) {
                                const contentDisposition = response.headers['content-disposition'];
                                if (contentDisposition) {
                                    const matches = contentDisposition.match(/filename="?([^"]+)"?/);
                                    if (matches && matches[1]) {
                                        fileName = matches[1];
                                    }
                                }
                            }

                            if (!fileName) fileName = `assignment_${row.id}`;

                            link.setAttribute('download', fileName);
                            document.body.appendChild(link);
                            link.click();
                            link.remove();
                            window.URL.revokeObjectURL(url);
                        } catch (error) {
                            showError('Download failed');
                            console.error(error);
                        }
                    }}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer bg-transparent border-none p-0"
                >
                    <FiDownload /> Download
                </button>
            ) : 'No File'
        },
        {
            header: 'Actions',
            render: (row) => (
                <div className="flex gap-2">
                    <Button
                        size="small"
                        variant="secondary"
                        icon={FiEdit}
                        onClick={() => {
                            setEditingAssignment(row);

                            // Format date for input
                            let formattedDate = '';
                            if (row.dueDate) {
                                if (Array.isArray(row.dueDate)) {
                                    const y = row.dueDate[0];
                                    const m = String(row.dueDate[1]).padStart(2, '0');
                                    const d = String(row.dueDate[2]).padStart(2, '0');
                                    formattedDate = `${y}-${m}-${d}`;
                                } else {
                                    formattedDate = new Date(row.dueDate).toISOString().split('T')[0];
                                }
                            }

                            reset({
                                title: row.title,
                                description: row.description,
                                dueDate: formattedDate,
                                totalMarks: row.totalMarks,
                                courseId: row.courseId || ''
                            });
                            setCreateModal(true);
                        }}
                    >
                        Edit
                    </Button>
                    <Button
                        size="small"
                        variant="danger"
                        icon={FiTrash}
                        onClick={() => setDeleteModal({ open: true, assignment: row })}
                    >
                        Delete
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
                <h1 className="text-3xl font-bold text-gray-900">Assignments</h1>
                <Button icon={FiPlus} onClick={() => {
                    setEditingAssignment(null);
                    reset({
                        title: '',
                        description: '',
                        dueDate: '',
                        totalMarks: '',
                        courseId: '',
                        file: null
                    });
                    setCreateModal(true);
                }}>
                    Create Assignment
                </Button>
            </div>

            <Card>
                <Table
                    columns={columns}
                    data={assignments}
                    emptyMessage="No assignments found."
                />
            </Card>

            {/* Create Modal */}
            <Modal
                isOpen={createModal}
                onClose={() => {
                    setCreateModal(false);
                    setEditingAssignment(null);
                    reset({
                        title: '',
                        description: '',
                        dueDate: '',
                        totalMarks: '',
                        courseId: '',
                        file: null
                    });
                }}
                title={editingAssignment ? "Edit Assignment" : "Create Assignment"}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input
                        label="Title"
                        {...register('title', { required: 'Title is required' })}
                        error={errors.title?.message}
                    />

                    <Textarea
                        label="Description"
                        rows={3}
                        {...register('description', { required: 'Description is required' })}
                        error={errors.description?.message}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Due Date"
                            type="date"
                            {...register('dueDate', { required: 'Due date is required' })}
                            error={errors.dueDate?.message}
                        />
                        <Input
                            label="Total Marks"
                            type="number"
                            {...register('totalMarks', { required: 'Total marks is required' })}
                            error={errors.totalMarks?.message}
                        />
                    </div>

                    <Select
                        label="Course"
                        options={[
                            { value: '', label: 'Select a Course' },
                            ...courses.map(c => ({ value: c.id, label: c.courseName }))
                        ]}
                        {...register('courseId', { required: 'Course is required' })}
                        error={errors.courseId?.message}
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Attachment (Optional)
                        </label>
                        <input
                            type="file"
                            className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100"
                            {...register('file')}
                        />
                    </div>

                    <div className="flex gap-3 justify-end mt-6">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setCreateModal(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" loading={creating}>
                            {editingAssignment ? 'Update' : 'Create'}
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Delete Modal */}
            <Modal
                isOpen={deleteModal.open}
                onClose={() => setDeleteModal({ open: false, assignment: null })}
                title="Delete Assignment"
            >
                <div className="space-y-4">
                    <p className="text-gray-600">
                        Are you sure you want to delete this assignment?
                    </p>
                    <div className="flex gap-3 justify-end">
                        <Button
                            variant="secondary"
                            onClick={() => setDeleteModal({ open: false, assignment: null })}
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

export default Assignments;
