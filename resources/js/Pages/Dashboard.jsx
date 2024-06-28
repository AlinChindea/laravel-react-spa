import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TaskStatusReportCard from '@/Components/TaskStatusReportCard';
import { Head } from '@inertiajs/react';

export default function Dashboard({
    auth,
    usersPendingTasks,
    totalPendingTasks,
    usersOngoingTasks,
    totalOngoingTasks,
    usersCompletedTasks,
    totalCompletedTasks }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-3 gap-2">
                    <TaskStatusReportCard className='text-amber-500' user={auth.user} title="Pending tasks" usersStats={usersPendingTasks} totalStats={totalPendingTasks} />
                    <TaskStatusReportCard className='text-blue-500' user={auth.user} title="In progress tasks" usersStats={usersOngoingTasks} totalStats={totalOngoingTasks} />
                    <TaskStatusReportCard className='text-green-500' user={auth.user} title="Completed tasks" usersStats={usersCompletedTasks} totalStats={totalCompletedTasks} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
