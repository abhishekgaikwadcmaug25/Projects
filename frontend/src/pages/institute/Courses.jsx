import { useState, useEffect } from 'react';
import { getCurrentInstitute, getCoursesByInstitute, createCourse } from '../../api/instituteApi';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import Spinner from '../../components/common/Spinner';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Textarea from '../../components/common/Textarea';
import { useForm } from 'react-hook-form';
import { useToast } from '../../hooks/useToast';
import { FiPlus, FiBook } from 'react-icons/fi';

const Courses = () => {
    const { success, error: showError } = useToast();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [instituteId, setInstituteId] = useState(null);
    const [createModal, setCreateModal] = useState(false);
    const [creating, setCreating] = useState(false);

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
            // First get the institute profile/ID
            const profile = await getCurrentInstitute();
            setInstituteId(profile.id);

            // Then get courses
            const coursesData = await getCoursesByInstitute(profile.id);
            setCourses(coursesData);
        } catch (err) {
            showError('Failed to fetch courses');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = async (data) => {
        try {
            setCreating(true);
            await createCourse({ ...data, instituteId });
            success('Course created successfully');
            setCreateModal(false);
            reset();

            // Refresh courses
            const updatedCourses = await getCoursesByInstitute(instituteId);
            setCourses(updatedCourses);
        } catch (err) {
            showError('Failed to create course');
            console.error(err);
        } finally {
            setCreating(false);
        }
    };

    const columns = [
        { header: 'Course Name', accessor: 'courseName' },
        { header: 'Description', accessor: 'description' },
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
                <h1 className="text-3xl font-bold text-gray-900">Manage Courses</h1>
                <Button icon={FiPlus} onClick={() => setCreateModal(true)}>
                    Add Course
                </Button>
            </div>

            <Card>
                <Table
                    columns={columns}
                    data={courses}
                    emptyMessage="No courses found. Create one to get started!"
                />
            </Card>

            {/* Create Course Modal */}
            <Modal
                isOpen={createModal}
                onClose={() => setCreateModal(false)}
                title="Create New Course"
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input
                        label="Course Name"
                        {...register('courseName', { required: 'Course name is required' })}
                        error={errors.courseName?.message}
                    />

                    <Textarea
                        label="Description"
                        rows={3}
                        {...register('description', { required: 'Description is required' })}
                        error={errors.description?.message}
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
                            Create Course
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Courses;
