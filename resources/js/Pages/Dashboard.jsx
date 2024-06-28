import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TaskStatusReportCard from '@/Components/TaskStatusReportCard';
import TableHeading from "@/Components/TableHeading";
import { Head, Link } from '@inertiajs/react';
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants.jsx";

export default function Dashboard({
    auth,
    usersPendingTasks,
    totalPendingTasks,
    usersOngoingTasks,
    totalOngoingTasks,
    usersCompletedTasks,
    totalCompletedTasks,
    activeTasks
}) {
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

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
                    <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg'>
                        <div className='p-6 text-gray-900 dark:text-gray-100'>
                            <h3 className="text-gray-900 text-xl font-semibold mb-4">
                                Overview of active tasks
                            </h3>

                            <table>
                                <thead className="text-xs text-gray-900 uppercase bg-gray-300">
                                    <tr>
                                        <TableHeading name="id" sortable={false}>ID</TableHeading>
                                        <TableHeading name="project_tile" sortable={false}>Project Title</TableHeading>
                                        <TableHeading name="name" sortable={false}>Name</TableHeading>
                                        <TableHeading name="status" sortable={false}>Status</TableHeading>
                                        <TableHeading name="deadline" sortable={false}>Due Date</TableHeading>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {activeTasks.data.map((task) => (
                                        <tr key={task.id}>
                                            <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">
                                                {task.id}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-3 text-gray-700 hover:underline cursor-pointer">
                                                <Link href={route('project.show', task.project.id)}>
                                                    {task.project.name}
                                                </Link>
                                            </td>
                                            <td className="px-4 py-3 text-gray-700 hover:underline cursor-pointer">
                                                <Link href={route('task.show', task.id)}>
                                                    {task.name}
                                                </Link>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                                    <span
                                        className={`px-2 py-1 rounded text-white ${
                                            TASK_STATUS_CLASS_MAP[task.status]
                                        }`}
                                    >
                                        {TASK_STATUS_TEXT_MAP[task.status]}
                                    </span>
                                </td>
                                            <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                                    {task.due_date}
                                </td>
                                        </tr>

                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
