import { useState, useEffect } from 'react';
import {
    getCurrentInstitute,
    getMaterials,
    uploadMaterial,
    updateMaterial,
    deleteMaterial,
    getCoursesByInstitute,
    downloadMaterial
} from '../../api/instituteApi';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import Spinner from '../../components/common/Spinner';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import { useForm } from 'react-hook-form';
import { useToast } from '../../hooks/useToast';
import { FiPlus, FiTrash, FiUpload, FiDownload, FiEdit } from 'react-icons/fi';

const StudyMaterials = () => {
    const { success, error: showError } = useToast();
    const [materials, setMaterials] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [instituteId, setInstituteId] = useState(null);
    const [createModal, setCreateModal] = useState(false);
    const [creating, setCreating] = useState(false);
    const [editingMaterial, setEditingMaterial] = useState(null);
    const [deleteModal, setDeleteModal] = useState({ open: false, material: null });

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

            const [materialsData, coursesData] = await Promise.all([
                getMaterials(profile.id),
                getCoursesByInstitute(profile.id)
            ]);

            setMaterials(Array.isArray(materialsData) ? materialsData : []);
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
            formData.append('type', data.type);
            formData.append('instituteId', instituteId);
            formData.append('courseId', data.courseId);

            if (data.file && data.file[0]) {
                formData.append('file', data.file[0]);
            }

            if (editingMaterial) {
                await updateMaterial(editingMaterial.id, formData);
                success('Material updated successfully');
            } else {
                await uploadMaterial(formData);
                success('Material uploaded successfully');
            }

            setCreateModal(false);
            setEditingMaterial(null);
            reset({
                title: '',
                type: 'NOTES',
                courseId: '',
                file: null
            });

            // Refresh
            const updated = await getMaterials(instituteId);
            setMaterials(updated);
        } catch (err) {
            showError('Failed to save material');
            console.error(err);
        } finally {
            setCreating(false);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteMaterial(deleteModal.material.id);
            success('Material deleted successfully');
            setDeleteModal({ open: false, material: null });

            // Refresh
            const updated = await getMaterials(instituteId);
            setMaterials(updated);
        } catch (err) {
            showError('Failed to delete material');
            console.error(err);
        }
    };

    const columns = [
        { header: 'Title', accessor: 'title' },
        {
            header: 'Type',
            accessor: 'type',
            render: (row) => (
                <span className={`px-2 py-1 rounded text-xs font-semibold
                    ${row.type === 'NOTES' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                    {row.type}
                </span>
            )
        },
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
            header: 'File',
            accessor: 'fileUrl',
            render: (row) => row.fileUrl ? (
                <button
                    onClick={async () => {
                        try {
                            const response = await downloadMaterial(row.id);
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

                            if (!fileName) fileName = `material_${row.id}`;

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
                            setEditingMaterial(row);
                            reset({
                                title: row.title,
                                type: row.type || 'NOTES',
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
                        onClick={() => setDeleteModal({ open: true, material: row })}
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
                <h1 className="text-3xl font-bold text-gray-900">Study Materials</h1>
                <Button icon={FiUpload} onClick={() => {
                    setEditingMaterial(null);
                    reset({
                        title: '',
                        type: 'NOTES',
                        courseId: '',
                        file: null
                    });
                    setCreateModal(true);
                }}>
                    Upload Material
                </Button>
            </div>

            <Card>
                <Table
                    columns={columns}
                    data={materials}
                    emptyMessage="No study materials found."
                />
            </Card>

            {/* Create/Edit Modal */}
            <Modal
                isOpen={createModal}
                onClose={() => {
                    setCreateModal(false);
                    setEditingMaterial(null);
                    reset({
                        title: '',
                        type: 'NOTES',
                        courseId: '',
                        file: null
                    });
                }}
                title={editingMaterial ? "Edit Material" : "Upload Material"}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input
                        label="Title"
                        {...register('title', { required: 'Title is required' })}
                        error={errors.title?.message}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <Select
                            label="Type"
                            options={[
                                { value: 'NOTES', label: 'Notes' },
                                { value: 'QUESTION_BANK', label: 'Question Bank' }
                            ]}
                            {...register('type', { required: 'Type is required' })}
                            error={errors.type?.message}
                        />

                        <Select
                            label="Course"
                            options={[
                                { value: '', label: 'Select a Course' },
                                ...courses.map(c => ({ value: c.id, label: c.courseName }))
                            ]}
                            {...register('courseId', { required: 'Course is required' })}
                            error={errors.courseId?.message}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            File {editingMaterial && '(Optional)'}
                        </label>
                        <input
                            type="file"
                            className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100"
                            {...register('file', { required: !editingMaterial && 'File is required' })}
                        />
                        {errors.file && (
                            <p className="text-red-500 text-xs mt-1">{errors.file.message}</p>
                        )}
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
                            {editingMaterial ? 'Update' : 'Upload'}
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Delete Modal */}
            <Modal
                isOpen={deleteModal.open}
                onClose={() => setDeleteModal({ open: false, material: null })}
                title="Delete Material"
            >
                <div className="space-y-4">
                    <p className="text-gray-600">
                        Are you sure you want to delete this material?
                    </p>
                    <div className="flex gap-3 justify-end">
                        <Button
                            variant="secondary"
                            onClick={() => setDeleteModal({ open: false, material: null })}
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

export default StudyMaterials;
