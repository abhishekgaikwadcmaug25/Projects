import axiosInstance from './axios';

// PROFILE 
export const getStudentProfile = async () => {
    const response = await axiosInstance.get('/api/student/profile');
    return response.data;
};

// ANNOUNCEMENTS 
export const getAnnouncementsByCourse = async (courseId) => {
    const response = await axiosInstance.get(`/api/student/announcements/${courseId}`);
    return response.data;
};

// SCHEDULES 
export const getScheduleByCourse = async (courseId) => {
    const response = await axiosInstance.get(`/api/student/schedule/${courseId}`);
    return response.data;
};

// ASSIGNMENTS 
export const getAssignments = async () => {
    const response = await axiosInstance.get('/api/student/assignments');
    return response.data;
};

export const downloadAssignment = async (assignmentId) => {
    const response = await axiosInstance.get(`/api/student/assignments/download/${assignmentId}`, {
        responseType: 'blob',
    });
    return response.data;
};

// STUDY MATERIALS 
export const getMaterials = async () => {
    const response = await axiosInstance.get('/api/student/materials');
    return response.data;
};

export const getMaterialsByType = async (type) => {
    const response = await axiosInstance.get(`/api/student/materials/type/${type}`);
    return response.data;
};

export const downloadMaterial = async (materialId) => {
    const response = await axiosInstance.get(`/api/student/materials/download/${materialId}`, {
        responseType: 'blob',
    });
    return response.data;
};
