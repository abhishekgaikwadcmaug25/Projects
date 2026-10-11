import { forwardRef } from 'react';

const Textarea = forwardRef(({
    label,
    error,
    rows = 4,
    placeholder,
    className = '',
    ...props
}, ref) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <textarea
                ref={ref}
                rows={rows}
                placeholder={placeholder}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-vertical ${error ? 'border-red-500' : 'border-gray-300'
                    } ${className}`}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
});

Textarea.displayName = 'Textarea';

export default Textarea;
