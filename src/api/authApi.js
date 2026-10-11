import axiosInstance from './axios';

//Login user
export const login = async (email, password) => {
    const response = await axiosInstance.post('/api/auth/login', {
        email,
        password,
    });
    return response.data;
};

//Get all institutes (Public)
//Get all institutes (Public)
export const getInstitutes = async () => {
    const response = await axiosInstance.get('/api/auth/institutes');
    return response.data;
};

//Get courses for an institute (Public)
export const getCourses = async (instituteId) => {
    const response = await axiosInstance.get(`/api/auth/institutes/${instituteId}/courses`);
    return response.data;
};

//Register a new student
export const registerStudent = async (data) => {
    const response = await axiosInstance.post('/api/registration/request', data);
    return response.data;
};

//Register institute
export const registerInstitute = async (data) => {
    const response = await axiosInstance.post('/api/institute/register', data);
    return response.data;
};

// Send OTP
export const sendOtp = async (email) => {
    const response = await axiosInstance.post(`/api/auth/send-otp?email=${email}`);
    return response.data;
};

// Verify OTP
export const verifyOtp = async (email, otp) => {
    const response = await axiosInstance.post(`/api/auth/verify-otp?email=${email}&otp=${otp}`);
    return response.data;
};
