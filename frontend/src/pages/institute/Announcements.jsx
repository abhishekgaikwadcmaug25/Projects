import { useState, useEffect } from 'react';
import {
    getCurrentInstitute,
    getAnnouncements,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    getCoursesByInstitute
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
import { FiPlus, FiTrash, FiBell, FiEdit } from 'react-icons/fi';

const Announcements = () => {
    const { success, error: showError } = useToast();
    const [announcements, setAnnouncements] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [instituteId, setInstituteId] = useState(null);
    const [createModal, setCreateModal] = useState(false);
    const [creating, setCreating] = useState(false);
    const [editingAnnouncement, setEditingAnnouncement] = useState(null);
    const [deleteModal, setDeleteModal] = useState({ open: false, announcement: null });

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

            const [announcementsData, coursesData] = await Promise.all([
                getAnnouncements(profile.id),
                getCoursesByInstitute(profile.id)
            ]);

            setAnnouncements(announcementsData);
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
            const payload = {
                ...data,
                instituteId,
                courseId: data.courseId ? parseInt(data.courseId) : null
            };

            if (editingAnnouncement) {
                await updateAnnouncement(editingAnnouncement.id, payload);
                success('Announcement updated successfully');
            } else {
                await createAnnouncement(payload);
                success('Announcement created successfully');
            }

            setCreateModal(false);
            setEditingAnnouncement(null);
            reset({ title: '', message: '', courseId: '' });

            // Refresh
            const updated = await getAnnouncements(instituteId);
            setAnnouncements(updated);
        } catch (err) {
            showError('Failed to create announcement');
            console.error(err);
        } finally {
            setCreating(false);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteAnnouncement(deleteModal.announcement.id);
            success('Announcement deleted successfully');
            setDeleteModal({ open: false, announcement: null });

            // Refresh
            const updated = await getAnnouncements(instituteId);
            setAnnouncements(updated);
        } catch (err) {
            showError('Failed to delete announcement');
            console.error(err);
        }
    };

    const columns = [
        { header: 'Title', accessor: 'title' },
        {
            header: 'Message',
            accessor: 'message',
            render: (row) => (
                <span className="truncate block max-w-xs" title={row.message}>
                    {row.message}
                </span>
            )
        },
        {
            header: 'Course',
            accessor: 'courseId',
            render: (row) => {
                if (!row.courseId) return 'General';
                const course = courses.find(c => c.id === row.courseId);
                return course ? course.courseName : 'General';
            }
        },
        {
            header: 'Date',
            accessor: 'publishedAt',
            render: (row) => row.publishedAt ? new Date(row.publishedAt).toLocaleDateString() : 'N/A'
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
                            setEditingAnnouncement(row);
                            reset({
                                title: row.title,
                                message: row.message,
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
                        onClick={() => setDeleteModal({ open: true, announcement: row })}
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
                <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
                <Button icon={FiPlus} onClick={() => {
                    setEditingAnnouncement(null);
                    reset({ title: '', message: '', courseId: '' });
                    setCreateModal(true);
                }}>
                    New Announcement
                </Button>
            </div>

            <Card>
                <Table
                    columns={columns}
                    data={announcements}
                    emptyMessage="No announcements yet."
                />
            </Card>

            {/* Create Modal */}
            <Modal
                isOpen={createModal}
                onClose={() => {
                    setCreateModal(false);
                    setEditingAnnouncement(null);
                    reset({ title: '', message: '', courseId: '' });
                }}
                title={editingAnnouncement ? "Edit Announcement" : "Create Announcement"}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input
                        label="Title"
                        {...register('title', { required: 'Title is required' })}
                        error={errors.title?.message}
                    />

                    <Textarea
                        label="Message"
                        rows={4}
                        {...register('message', { required: 'Message is required' })}
                        error={errors.message?.message}
                    />

                    <Select
                        label="Course (Optional)"
                        options={[
                            ...courses.map(c => ({ value: c.id, label: c.courseName }))
                        ]}
                        {...register('courseId')}
                    />

                    <div className="flex gap-3 justify-end mt-6">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setCreateModal(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" loading={creating}>
                            {editingAnnouncement ? 'Update Announcement' : 'Post Announcement'}
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Delete Modal */}
            <Modal
                isOpen={deleteModal.open}
                onClose={() => setDeleteModal({ open: false, announcement: null })}
                title="Delete Announcement"
            >
                <div className="space-y-4">
                    <p className="text-gray-600">
                        Are you sure you want to delete this announcement?
                    </p>
                    <div className="flex gap-3 justify-end">
                        <Button
                            variant="secondary"
                            onClick={() => setDeleteModal({ open: false, announcement: null })}
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

export default Announcements;
