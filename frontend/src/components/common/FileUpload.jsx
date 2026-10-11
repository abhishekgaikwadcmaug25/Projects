import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiX, FiFile } from 'react-icons/fi';

const FileUpload = ({ onFileSelect, accept, maxSize = 10485760, multiple = false, value }) => {
    const onDrop = useCallback(
        (acceptedFiles) => {
            if (multiple) {
                onFileSelect(acceptedFiles);
            } else {
                onFileSelect(acceptedFiles[0]);
            }
        },
        [onFileSelect, multiple]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept,
        maxSize,
        multiple,
    });

    const removeFile = () => {
        onFileSelect(null);
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    return (
        <div className="w-full">
            {!value ? (
                <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-300 hover:border-primary-400'
                        }`}
                >
                    <input {...getInputProps()} />
                    <FiUpload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    {isDragActive ? (
                        <p className="text-primary-600">Drop the file here...</p>
                    ) : (
                        <div>
                            <p className="text-gray-600 mb-2">
                                Drag and drop a file here, or click to select
                            </p>
                            <p className="text-sm text-gray-500">
                                Max size: {formatFileSize(maxSize)}
                            </p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="border border-gray-300 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <FiFile className="w-8 h-8 text-primary-600" />
                        <div>
                            <p className="text-sm font-medium text-gray-900">{value.name}</p>
                            <p className="text-xs text-gray-500">{formatFileSize(value.size)}</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={removeFile}
                        className="text-red-600 hover:text-red-700 transition-colors"
                    >
                        <FiX className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
