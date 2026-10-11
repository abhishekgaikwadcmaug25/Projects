export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const ROLES = {
    ADMIN: 'ADMIN',
    INSTITUTE: 'INSTITUTE',
    STUDENT: 'STUDENT',
};

export const ROUTES = {
    // Public routes
    LOGIN: '/login',
    STUDENT_REGISTER: '/register/student',
    INSTITUTE_REGISTER: '/register/institute',

    // Admin routes
    ADMIN_DASHBOARD: '/admin/dashboard',
    ADMIN_INSTITUTES: '/admin/institutes',
    ADMIN_INSTITUTE_DETAIL: '/admin/institutes/:id',

    // Institute routes
    INSTITUTE_DASHBOARD: '/institute/dashboard',
    INSTITUTE_COURSES: '/institute/courses',
    INSTITUTE_REQUESTS: '/institute/requests',
    INSTITUTE_ANNOUNCEMENTS: '/institute/announcements',
    INSTITUTE_SCHEDULES: '/institute/schedules',
    INSTITUTE_ASSIGNMENTS: '/institute/assignments',
    INSTITUTE_MATERIALS: '/institute/materials',

    // Student routes
    STUDENT_DASHBOARD: '/student/dashboard',
    STUDENT_COURSES: '/student/courses',
    STUDENT_COURSE_DETAIL: '/student/courses/:id',
    STUDENT_ANNOUNCEMENTS: '/student/announcements',
    STUDENT_TIMETABLE: '/student/timetable',
    STUDENT_ASSIGNMENTS: '/student/assignments',
    STUDENT_MATERIALS: '/student/materials',
};

export const MATERIAL_TYPES = {
    NOTES: 'NOTES',
    QUESTION_BANK: 'QUESTION_BANK',
};

export const SCHEDULE_TYPES = {
    LECTURE: 'LECTURE',
    EXAM: 'EXAM',
    EVENT: 'SESSION',
};

export const REQUEST_STATUS = {
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
};

export const GENDER = {
    MALE: 'MALE',
    FEMALE: 'FEMALE',
    OTHER: 'OTHER',
};

export const INSTITUTE_TYPES = ['SCHOOL', 'COLLEGE', 'UNIVERSITY', 'TRAINING_CENTRE'];
