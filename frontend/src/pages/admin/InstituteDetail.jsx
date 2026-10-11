import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getInstituteById, updateInstitute } from '../../api/adminApi';
import { useForm } from 'react-hook-form';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Textarea from '../../components/common/Textarea';
import Spinner from '../../components/common/Spinner';
import { FiSave, FiArrowLeft } from 'react-icons/fi';
import { useToast } from '../../hooks/useToast';
import { INSTITUTE_TYPES } from '../../utils/constants';

const InstituteDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { success, error: showError } = useToast();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    useEffect(() => {
        fetchInstitute();
    }, [id]);

    const fetchInstitute = async () => {
        try {
            const data = await getInstituteById(id);
            reset(data);
        } catch (err) {
            showError('Failed to fetch institute details');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = async (data) => {
        try {
            setSaving(true);
            await updateInstitute(id, data);
            success('Institute updated successfully');
            navigate('/admin/institutes');
        } catch (err) {
            showError('Failed to update institute');
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Spinner size="large" />
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center gap-4 mb-6">
                <Button
                    variant="outline"
                    icon={FiArrowLeft}
                    onClick={() => navigate('/admin/institutes')}
                >
                    Back
                </Button>
                <h1 className="text-3xl font-bold text-gray-900">Institute Details</h1>
            </div>

            <Card>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Institute Name"
                            {...register('instituteName', { required: 'Institute name is required' })}
                            error={errors.instituteName?.message}
                        />

                        <Input
                            label="Email"
                            type="email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address',
                                },
                            })}
                            error={errors.email?.message}
                        />

                        <Input
                            label="Phone Number"
                            {...register('phoneNo', { required: 'Phone number is required' })}
                            error={errors.phoneNo?.message}
                        />

                        <Select
                            label="Institute Type"
                            placeholder="Select Institute Type"
                            options={INSTITUTE_TYPES.map((type) => ({
                                value: type,
                                label: type.charAt(0) + type.slice(1).toLowerCase()
                            }))}
                            {...register('instituteType', { required: 'Institute type is required' })}
                            error={errors.instituteType?.message}
                        />
                    </div>

                    <Textarea
                        label="Address"
                        rows={3}
                        {...register('address', { required: 'Address is required' })}
                        error={errors.address?.message}
                    />

                    <div className="flex gap-3 justify-end">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => navigate('/admin/institutes')}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" loading={saving} icon={FiSave}>
                            Save Changes
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default InstituteDetail;
