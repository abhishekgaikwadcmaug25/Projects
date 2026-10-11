import { FiInbox, FiUsers, FiBook, FiBell, FiCalendar, FiFileText } from 'react-icons/fi';
import Button from './Button';

const EmptyState = ({ 
    type = 'default', 
    title, 
    description, 
    actionText, 
    onAction,
    className = '' 
}) => {
    const getIcon = () => {
        const iconMap = {
            students: FiUsers,
            courses: FiBook,
            announcements: FiBell,
            schedules: FiCalendar,
            assignments: FiFileText,
            materials: FiFileText,
            institutes: FiBook,
            default: FiInbox
        };
        
        const IconComponent = iconMap[type] || iconMap.default;
        return <IconComponent className="w-16 h-16 text-gray-400" />;
    };

    const getDefaultContent = () => {
        const contentMap = {
            students: {
                title: 'No Students Found',
                description: 'No students have enrolled yet. Students will appear here once they register and get approved.'
            },
            courses: {
                title: 'No Courses Available',
                description: 'Start by creating your first course to begin organizing your educational content.'
            },
            announcements: {
                title: 'No Announcements',
                description: 'Keep your students informed by creating announcements about important updates.'
            },
            schedules: {
                title: 'No Schedules',
                description: 'Create class schedules to help students stay organized and on track.'
            },
            assignments: {
                title: 'No Assignments',
                description: 'Create assignments to engage students and assess their learning progress.'
            },
            materials: {
                title: 'No Study Materials',
                description: 'Upload study materials to provide students with additional learning resources.'
            },
            institutes: {
                title: 'No Institutes',
                description: 'No institutes have registered yet. Institutes will appear here once they join the platform.'
            },
            default: {
                title: 'No Data Available',
                description: 'There is no data to display at the moment.'
            }
        };
        
        return contentMap[type] || contentMap.default;
    };

    const defaultContent = getDefaultContent();
    const displayTitle = title || defaultContent.title;
    const displayDescription = description || defaultContent.description;

    return (
        <div className={`text-center py-12 px-6 ${className}`}>
            <div className="flex justify-center mb-4">
                {getIcon()}
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
                {displayTitle}
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
                {displayDescription}
            </p>
            {actionText && onAction && (
                <Button onClick={onAction} variant="primary">
                    {actionText}
                </Button>
            )}
        </div>
    );
};

export default EmptyState;