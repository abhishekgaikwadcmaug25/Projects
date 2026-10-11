import { useState, useEffect } from 'react';
import {
    getCurrentInstitute,
    getSchedules,
    createSchedule,
    updateSchedule,
    deleteSchedule,
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
import { FiPlus, FiTrash, FiEdit } from 'react-icons/fi';

const Schedules = () => {
    const { success, error: showError } = useToast();

    const [schedules, setSchedules] = useState([]);
    const [courses, setCourses] = useState([]);
    const [instituteId, setInstituteId] = useState(null);
    const [loading, setLoading] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);
    const [editingSchedule, setEditingSchedule] = useState(null);
    const [deleteModal, setDeleteModal] = useState({ open: false, schedule: null });
    const [submitting, setSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const institute = await getCurrentInstitute();
            setInstituteId(institute.id);

            const [scheduleData, courseData] = await Promise.all([
                getSchedules(institute.id),
                getCoursesByInstitute(institute.id)
            ]);

            setSchedules(scheduleData);
            setCourses(courseData);
        } catch {
            showError('Failed to load schedules');
        } finally {
            setLoading(false);
        }
    };

    // ================= SUBMIT =================
    const onSubmit = async (data) => {
        try {
            setSubmitting(true);

            const payload = {
                title: data.title,
                description: data.description,
                date: data.date,
                type: data.type,
                startTime: data.startTime?.slice(0, 5),
                endTime: data.endTime?.slice(0, 5),
                instituteId,
                courseId: parseInt(data.courseId, 10) 
            };

            if (editingSchedule) {
                await updateSchedule(editingSchedule.id, payload);
                success('Schedule updated successfully');
            } else {
                await createSchedule(payload);
                success('Schedule created successfully');
            }

            closeModal();
            refreshSchedules();
        } catch {
            showError('Failed to save schedule');
        } finally {
            setSubmitting(false);
        }
    };

    const refreshSchedules = async () => {
        const updated = await getSchedules(instituteId);
        setSchedules(updated);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditingSchedule(null);
        reset({
            title: '',
            description: '',
            date: '',
            type: '',
            startTime: '',
            endTime: '',
            courseId: ''
        });
    };

    // ================= DELETE =================
    const confirmDelete = async () => {
        if (!deleteModal.schedule?.id) return;

        try {
            await deleteSchedule(deleteModal.schedule.id);
            success('Schedule deleted');
            setDeleteModal({ open: false, schedule: null });
            refreshSchedules();
        } catch {
            showError('Delete failed');
        }
    };

    // ================= TABLE =================
    const columns = [
        { header: 'Title', accessor: 'title' },
        { header: 'Type', accessor: 'type' },
        {
            header: 'Course',
            render: row =>
                courses.find(c => c.id === row.courseId)?.courseName || 'N/A'
        },
        { header: 'Date', accessor: 'date' },
        {
            header: 'Time',
            render: row => `${row.startTime} - ${row.endTime}`
        },
        {
            header: 'Actions',
            render: row => (
                <div className="flex gap-2">
                    <Button
                        size="small"
                        variant="secondary"
                        icon={FiEdit}
                        onClick={() => {
                            setEditingSchedule(row);
                            reset({
                                title: row.title,
                                description: row.description,
                                date: row.date,
                                type: row.type,
                                startTime: row.startTime,
                                endTime: row.endTime,
                                courseId: row.courseId
                            });
                            setModalOpen(true);
                        }}
                    >
                        Edit
                    </Button>

                    <Button
                        size="small"
                        variant="danger"
                        icon={FiTrash}
                        onClick={() => setDeleteModal({ open: true, schedule: row })}
                    >
                        Delete
                    </Button>
                </div>
            )
        }
    ];

    // ================= LOADER =================
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Spinner size="large" />
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Schedules</h1>
                <Button icon={FiPlus} onClick={() => setModalOpen(true)}>
                    Add Schedule
                </Button>
            </div>

            <Card>
                <Table
                    columns={columns}
                    data={schedules}
                    emptyMessage="No schedules found"
                />
            </Card>

            {/* CREATE / EDIT MODAL */}
            <Modal
                isOpen={modalOpen}
                onClose={closeModal}
                title={editingSchedule ? 'Edit Schedule' : 'Add Schedule'}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input
                        label="Title"
                        {...register('title', { required: 'Title required' })}
                        error={errors.title?.message}
                    />

                    <Textarea
                        label="Description"
                        rows={3}
                        {...register('description')}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            type="date"
                            label="Date"
                            {...register('date', { required: 'Date required' })}
                            error={errors.date?.message}
                        />

                        <Select
                            label="Type"
                            options={[
                                { value: 'LECTURE', label: 'Lecture' },
                                { value: 'EXAM', label: 'Exam' },
                                { value: 'EVENT', label: 'Event' }
                            ]}
                            {...register('type', { required: 'Type required' })}
                            error={errors.type?.message}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            type="time"
                            label="Start Time"
                            {...register('startTime', { required: true })}
                        />
                        <Input
                            type="time"
                            label="End Time"
                            {...register('endTime', { required: true })}
                        />
                    </div>

                    <Select
                        label="Course"
                        options={courses.map(c => ({
                            value: c.id,
                            label: c.courseName
                        }))}
                        {...register('courseId', { required: 'Course required' })}
                        error={errors.courseId?.message}
                    />

                    <div className="flex justify-end gap-3">
                        <Button variant="secondary" type="button" onClick={closeModal}>
                            Cancel
                        </Button>
                        <Button type="submit" loading={submitting}>
                            {editingSchedule ? 'Update' : 'Create'}
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* DELETE MODAL */}
            <Modal
                isOpen={deleteModal.open}
                onClose={() => setDeleteModal({ open: false, schedule: null })}
                title="Delete Schedule"
            >
                <p>Are you sure you want to delete this schedule?</p>
                <div className="flex justify-end gap-3 mt-4">
                    <Button
                        variant="secondary"
                        onClick={() => setDeleteModal({ open: false, schedule: null })}
                    >
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Delete
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default Schedules;
