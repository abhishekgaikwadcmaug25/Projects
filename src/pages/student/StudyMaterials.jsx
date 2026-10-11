import { useState, useEffect } from 'react';
import { getStudentProfile, getMaterials, downloadMaterial } from '../../api/studentApi';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import Spinner from '../../components/common/Spinner';
import { FiFolder, FiDownload } from 'react-icons/fi';
import { useToast } from '../../hooks/useToast';

const StudentMaterials = () => {
    const { error: showError } = useToast();
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                setLoading(true);
                const data = await getMaterials();
                setMaterials(data);
            } catch (err) {
                showError('Failed to fetch study materials');
            } finally {
                setLoading(false);
            }
        };
        fetchMaterials();
    }, []);

    const handleDownload = async (material) => {
        try {
            const blob = await downloadMaterial(material.id);
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            // Use fileName from row (DTO) or fallback
            const fileName = material.fileName || (material.fileUrl ? material.fileUrl.split('/').pop() : `material_${material.id}`);
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            showError('Failed to download material');
        }
    };

    const columns = [
        { header: 'Title', accessor: 'title' },
        {
            header: 'Type',
            accessor: 'type',
            render: (row) => (
                <span className={`px-2 py-1 rounded text-xs font-semibold
                    ${row.type === 'NOTES' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                    {row.type}
                </span>
            )
        },
        {
            header: 'Action',
            render: (row) => row.id ? (
                <Button
                    size="small"
                    variant="secondary"
                    icon={FiDownload}
                    onClick={() => handleDownload(row)}
                >
                    Download
                </Button>
            ) : 'No file'
        }
    ];

    if (loading) return <Spinner size="large" />;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <FiFolder className="text-primary-600" /> Study Materials
            </h1>

            <Card>
                <Table
                    columns={columns}
                    data={materials}
                    emptyMessage="No study materials available for your course yet."
                />
            </Card>
        </div>
    );
};

export default StudentMaterials;
