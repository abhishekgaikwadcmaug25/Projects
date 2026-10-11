import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { registerInstitute, sendOtp, verifyOtp } from '../../api/authApi';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Textarea from '../../components/common/Textarea';
import Card from '../../components/common/Card';
import { FiHome, FiCheck } from 'react-icons/fi';
import { INSTITUTE_TYPES } from '../../utils/constants';

const InstituteRegister = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    // OTP States
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpLoading, setOtpLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        trigger,
        formState: { errors },
    } = useForm();

    const password = watch("password");
    const email = watch("email");

    // Handle Send OTP
    const handleSendOtp = async () => {
        const isValidEmail = await trigger("email");
        if (!isValidEmail) return;

        try {
            setOtpLoading(true);
            setError('');
            await sendOtp(email);
            setShowOtpInput(true);
            setSuccessMsg('OTP sent to your email!');
        } catch (err) {
            setError(err.response?.data || 'Failed to send OTP.');
        } finally {
            setOtpLoading(false);
        }
    };

    // Handle Verify OTP
    const handleVerifyOtp = async () => {
        if (!otp) {
            setError('Please enter the OTP.');
            return;
        }

        try {
            setOtpLoading(true);
            setError('');
            const isValid = await verifyOtp(email, otp);
            if (isValid) {
                setIsVerified(true);
                setShowOtpInput(false);
                setSuccessMsg('Email successfully verified! You can now register.');
            } else {
                setError('Invalid OTP. Please try again.');
            }
        } catch (err) {
            setError('Verification failed.');
        } finally {
            setOtpLoading(false);
        }
    };

    const onSubmit = async (data) => {
        if (!isVerified) {
            setError('Please verify your email first.');
            return;
        }

        try {
            setLoading(true);
            setError('');

            const { confirmPassword, ...instituteData } = data;
            // Add verified flag (backend checks this too)
            const payload = { ...instituteData, verified: true };

            await registerInstitute(payload);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                        <FiHome className="w-8 h-8 text-primary-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Institute Registration</h2>
                    <p className="text-gray-600 mt-2">Register your educational institution</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                            {error}
                        </div>
                    )}
                    {successMsg && (
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-600">
                            {successMsg}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Institute Name"
                            placeholder="Enter institute name"
                            {...register('instituteName', {
                                required: 'Institute name is required',
                                pattern: {
                                    value: /^[A-Za-z\s\-&.,'()]{3,100}$/,
                                    message: 'Name must be 3-100 characters'
                                }
                            })}
                            error={errors.instituteName?.message}
                        />

                        {/* Email & OTP Section */}
                        <div className="flex flex-col">
                            <div className="flex gap-2 items-end">
                                <div className="flex-grow">
                                    <Input
                                        label="Email"
                                        type="email"
                                        placeholder="Enter institute email"
                                        disabled={isVerified}
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: 'Invalid email address'
                                            },
                                        })}
                                        error={errors.email?.message}
                                    />
                                </div>
                                {!isVerified && !showOtpInput && (
                                    <Button
                                        type="button"
                                        onClick={handleSendOtp}
                                        loading={otpLoading}
                                        variant="secondary"
                                        className="mb-1"
                                    >
                                        Send OTP
                                    </Button>
                                )}
                                {isVerified && (
                                    <div className="mb-3 text-green-600 font-bold flex items-center">
                                        <FiCheck className="mr-1" /> Verified
                                    </div>
                                )}
                            </div>

                            {/* OTP Input Box */}
                            {showOtpInput && (
                                <div className="mt-2 flex gap-2 items-center">
                                    <input
                                        type="text"
                                        placeholder="Enter OTP"
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                    <Button
                                        type="button"
                                        onClick={handleVerifyOtp}
                                        loading={otpLoading}
                                        size="small"
                                    >
                                        Verify
                                    </Button>
                                    <button
                                        onClick={() => setShowOtpInput(false)}
                                        className="text-gray-500 text-sm hover:underline"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>

                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter password"
                            disabled={!isVerified}
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: 'Min 8 chars'
                                }
                            })}
                            error={errors.password?.message}
                        />

                        <Input
                            label="Confirm Password"
                            type="password"
                            placeholder="Confirm password"
                            disabled={!isVerified}
                            {...register('confirmPassword', {
                                required: 'Please confirm password',
                                validate: value =>
                                    value === password || 'Passwords do not match'
                            })}
                            error={errors.confirmPassword?.message}
                        />

                        <Input
                            label="Contact Number"
                            type="tel"
                            disabled={!isVerified}
                            placeholder="Enter 10-digit mobile number"
                            {...register('phoneNo', {
                                required: 'Contact number is required',
                                pattern: {
                                    value: /^[6-9]\d{9}$/,
                                    message: 'Invalid mobile number'
                                }
                            })}
                            error={errors.phoneNo?.message}
                            onChange={(e) => {
                                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
                            }}
                        />

                        <Select
                            label="Institute Type"
                            placeholder="Select Type"
                            disabled={!isVerified}
                            options={INSTITUTE_TYPES.map((type) => ({
                                value: type,
                                label: type.charAt(0) + type.slice(1).toLowerCase()
                            }))}
                            {...register('instituteType', { required: 'Required' })}
                            error={errors.instituteType?.message}
                        />
                    </div>

                    <Textarea
                        label="Address"
                        placeholder="Enter complete address"
                        disabled={!isVerified}
                        rows={3}
                        {...register('address', {
                            required: 'Address is required'
                        })}
                        error={errors.address?.message}
                    />

                    <Button type="submit" loading={loading} disabled={!isVerified} className="w-full" icon={FiHome}>
                        Register Institute
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

export default InstituteRegister;