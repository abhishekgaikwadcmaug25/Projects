import { useState } from 'react';

export const useToast = () => {
    const [toasts, setToasts] = useState([]);

    const showToast = (message, type = 'info') => {
        const id = Date.now();
        const toast = { id, message, type };

        setToasts((prev) => [...prev, toast]);

        // Auto remove after 5 seconds
        setTimeout(() => {
            removeToast(id);
        }, 5000);
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    const success = (message) => showToast(message, 'success');
    const error = (message) => showToast(message, 'error');
    const info = (message) => showToast(message, 'info');
    const warning = (message) => showToast(message, 'warning');

    return {
        toasts,
        showToast,
        removeToast,
        success,
        error,
        info,
        warning,
    };
};
