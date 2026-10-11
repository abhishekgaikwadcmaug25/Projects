import axiosInstance from './axios';

//Get dashboard statistics
export const getStatistics = async () => {
    const response = await axiosInstance.get('/api/admin/statistics');
    return response.data;
};

//Get all institutes
export const getInstitutes = async () => {
    const response = await axiosInstance.get('/api/admin/institutes');
    return response.data;
};

//Get institute by ID
export const getInstituteById = async (id) => {
    const response = await axiosInstance.get(`/api/admin/institutes/${id}`);
    return response.data;
};

//Update institute
export const updateInstitute = async (id, data) => {
    const response = await axiosInstance.put(`/api/admin/${id}`, data);
    return response.data;
};

//Delete institute
export const deleteInstitute = async (id) => {
    const response = await axiosInstance.delete(`/api/admin/${id}`);
    return response.data;
};
