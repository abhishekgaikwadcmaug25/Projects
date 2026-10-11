import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { registerStudent, getInstitutes, getCourses } from '../../api/authApi';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Card from '../../components/common/Card';
import { FiUserPlus } from 'react-icons/fi';
import { GENDER } from '../../utils/constants';

const StudentRegister = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [institutes, setInstitutes] = useState([]);
    const [courses, setCourses] = useState([]);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const password = watch("password");
    const watchedInstituteId = watch('instituteId');

    // Fetch institutes on mount
    useEffect(() => {
        const fetchInstitutes = async () => {
            try {
                const data = await getInstitutes();
                setInstitutes(data);
            } catch (err) {
                console.error('Error fetching institutes:', err);
            }
        };
        fetchInstitutes();
    }, []);

    // Fetch courses when institute changes
    useEffect(() => {
        if (watchedInstituteId) {
            const fetchCourses = async () => {
                try {
                    const data = await getCourses(watchedInstituteId);
                    setCourses(data);
                } catch (err) {
                    console.error('Error fetching courses:', err);
                }
            };
            fetchCourses();
        } else {
            setCourses([]);
        }
    }, [watchedInstituteId]);

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            setError('');
            // Remove confirmPassword from data before sending to API
            const { confirmPassword, ...studentData } = data;
            await registerStudent(studentData);
            setSuccess(true);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="max-w-md mx-auto">
                <Card>
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                            <FiUserPlus className="w-8 h-8 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
                        <p className="text-gray-600 mb-6">
                            Your registration request has been sent to the institute. You will be able to log in once your request is approved.
                        </p>
                        <Button onClick={() => navigate('/login')}>Go to Login</Button>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                        <FiUserPlus className="w-8 h-8 text-primary-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Student Registration</h2>
                    <p className="text-gray-600 mt-2">Create your student account</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Full Name"
                            placeholder="Enter your full name"
                            {...register('studentName', {
                                required: 'Name is required',
                                pattern: {
                                    value: /^[A-Za-z\s\-'.]{3,50}$/,
                                    message: 'Name must be 3-50 characters with only letters, spaces, hyphens, and apostrophes'
                                }
                            })}
                            error={errors.studentName?.message}
                        />

                        <Input
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Please enter a valid email address',
                                },
                            })}
                            error={errors.email?.message}
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters'
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                    message: 'Must contain uppercase, lowercase, number, and special character'
                                }
                            })}
                            error={errors.password?.message}
                        />

                        <Input
                            label="Confirm Password"
                            type="password"
                            placeholder="Confirm your password"
                            {...register('confirmPassword', {
                                required: 'Please confirm your password',
                                validate: value =>
                                    value === password || 'Passwords do not match'
                            })}
                            error={errors.confirmPassword?.message}
                        />

                        <Input
                            label="Mobile Number"
                            type="tel"
                            placeholder="Enter 10-digit mobile number"
                            {...register('mobileNo', {
                                required: 'Mobile number is required',
                                pattern: {
                                    value: /^[6-9]\d{9}$/,
                                    message: 'Please enter a valid 10-digit Indian mobile number'
                                },
                                minLength: {
                                    value: 10,
                                    message: 'Mobile number must be exactly 10 digits'
                                },
                                maxLength: {
                                    value: 10,
                                    message: 'Mobile number must be exactly 10 digits'
                                }
                            })}
                            error={errors.mobileNo?.message}
                        />

                        <Input
                            label="Date of Birth"
                            type="date"
                            {...register('dob', {
                                required: 'Date of birth is required',
                                validate: value => {
                                    const dob = new Date(value);
                                    const today = new Date();
                                    const age = today.getFullYear() - dob.getFullYear();
                                    const monthDiff = today.getMonth() - dob.getMonth();

                                    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
                                        return age - 1 >= 13 || 'You must be at least 13 years old';
                                    }
                                    return age >= 13 || 'You must be at least 13 years old';
                                }
                            })}
                            error={errors.dob?.message}
                        />

                        <Select
                            label="Gender"
                            options={[
                                { value: GENDER.MALE, label: 'Male' },
                                { value: GENDER.FEMALE, label: 'Female' },
                                { value: GENDER.OTHER, label: 'Other' },
                            ]}
                            {...register('gender', { required: 'Gender is required' })}
                            error={errors.gender?.message}
                        />

                        <Select
                            label="Institute"
                            options={institutes.map((inst) => ({
                                value: inst.id,
                                label: inst.instituteName,
                            }))}
                            {...register('instituteId', { required: 'Institute is required' })}
                            error={errors.instituteId?.message}
                        />

                        <Select
                            label="Course"
                            options={courses.map((course) => ({
                                value: course.id,
                                label: course.courseName,
                            }))}
                            {...register('courseId', { required: 'Course is required' })}
                            error={errors.courseId?.message}
                            disabled={!watchedInstituteId}
                        />
                    </div>

                    <Button type="submit" loading={loading} className="w-full" icon={FiUserPlus}>
                        Register
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                            Sign In
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    );
};

export default StudentRegister;