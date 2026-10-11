import axiosInstance from './axios';


//Get current institute profile
export const getCurrentInstitute = async () => {
    const response = await axiosInstance.get('/api/institute/current');
    return response.data;
};


//Get courses by institute ID
export const getCoursesByInstitute = async (instituteId) => {
    const response = await axiosInstance.get(`/api/institute/courses/institute/${instituteId}`);
    return response.data;
};


//Create a new course
export const createCourse = async (courseData) => {
    const response = await axiosInstance.post('/api/institute/courses/create', courseData);
    return response.data;
};

//Announcements

//Get announcements by institute ID
export const getAnnouncements = async (instituteId) => {
    const response = await axiosInstance.get(`/api/institute/announcements/institute/${instituteId}`);
    return response.data;
};
//Create a new announcement
export const createAnnouncement = async (data) => {
    const response = await axiosInstance.post('/api/institute/announcements/add', data);
    return response.data;
};

//Delete announcement
export const deleteAnnouncement = async (id) => {
    const response = await axiosInstance.delete(`/api/institute/announcements/delete/${id}`);
    return response.data;
};

//Update announcement
export const updateAnnouncement = async (id, announcementData) => {
    const response = await axiosInstance.put(`/api/institute/announcements/update/${id}`, announcementData);
    return response.data;
};

//Schedules

//Get schedules by institute ID
export const getSchedules = async (instituteId) => {
    const response = await axiosInstance.get(`/api/institute/schedules/institute/${instituteId}`);
    return response.data;
};

//Create a new schedule
export const createSchedule = async (data) => {
    const response = await axiosInstance.post('/api/institute/schedules/create', data);
    return response.data;
};

//Delete schedule
export const deleteSchedule = async (id) => {
    const response = await axiosInstance.delete(`/api/institute/schedules/delete/${id}`);
    return response.data;
};

//Update schedule
export const updateSchedule = async (id, scheduleData) => {
    const response = await axiosInstance.put(`/api/institute/schedules/update/${id}`, scheduleData);
    return response.data;
};

//Assignments

//Get assignments by institute ID
export const getAssignments = async (instituteId) => {
    const response = await axiosInstance.get(`/api/institute/assignments/institute/${instituteId}`);
    return response.data;
};

//Add assignment with file
export const addAssignment = async (formData) => {
    const response = await axiosInstance.post('/api/institute/assignments/add', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

//Update assignment
export const updateAssignment = async (id, formData) => {
    const response = await axiosInstance.put(`/api/institute/assignments/update/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

//Delete assignment
export const deleteAssignment = async (id) => {
    const response = await axiosInstance.delete(`/api/institute/assignments/delete/${id}`);
    return response.data;
};

//Download assignment file
export const downloadAssignment = async (assignmentId) => {
    const response = await axiosInstance.get(`/api/institute/assignments/download/${assignmentId}`, {
        responseType: 'blob',
    });
    return response;
};

//Study Materials

//Download study material file
export const downloadMaterial = async (materialId) => {
    const response = await axiosInstance.get(`/api/institute/materials/download/${materialId}`, {
        responseType: 'blob',
    });
    return response;
};

//Get study materials for institute
export const getMaterials = async (instituteId) => {
    try {
        const response = await axiosInstance.get(`/api/institute/materials/all?instituteId=${instituteId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Upload Material
export const uploadMaterial = async (formData) => {
    try {
        const response = await axiosInstance.post('/api/institute/materials/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Update Material
export const updateMaterial = async (materialId, formData) => {
    try {
        const response = await axiosInstance.put(`/api/institute/materials/update/${materialId}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Delete Material
export const deleteMaterial = async (materialId) => {
    try {
        const response = await axiosInstance.delete(`/api/institute/materials/delete/${materialId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Download Material
export const downloadMaterialFile = async (url) => {
    try {
        const response = await axiosInstance.get(url, {
            responseType: 'blob'
        });
        return response;
    } catch (error) {
        console.error("Download error:", error);
        throw error;
    }
};


// REQUESTS

//Get pending students
export const getPendingStudents = async (instituteId) => {
    try {
        const response = await axiosInstance.get(`/api/institute/requests/pending/${instituteId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

//Approve student
export const approveStudent = async (requestId) => {
    try {
        const response = await axiosInstance.put(`/api/institute/requests/approve/${requestId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

//Reject student
export const rejectStudent = async (requestId) => {
    try {
        const response = await axiosInstance.put(`/api/institute/requests/reject/${requestId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

//Students

//Get students by course
export const getStudentsByCourse = async (courseId) => {
    try {
        const response = await axiosInstance.get(`/api/institute/students/course/${courseId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

//Get all students
export const getAllStudents = async () => {
    try {
        const response = await axiosInstance.get('/api/institute/students/all');
        return response.data;
    } catch (error) {
        throw error;
    }
};
