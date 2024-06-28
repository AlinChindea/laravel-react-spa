export default function TaskStatusReportCard({ user, className = '', title, usersStats, totalStats  }) {
    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
                <h3 className={`text-2xl font-semibold ` + className }>{title}</h3>
                <p className='text-xl mt-4'>{usersStats}/{totalStats}</p>
            </div>
        </div>
    );
}
