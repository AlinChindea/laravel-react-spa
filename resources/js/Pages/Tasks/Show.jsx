import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    TASK_STATUS_CLASS_MAP,
    TASK_STATUS_TEXT_MAP,
} from "@/constants.jsx";
import TasksTable from "../Tasks/TasksTable";

export default function Show({ auth, task, tasks, queryParams }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {`Task title: ${task.name}`}
                </h2>
            }
        >
            <Head title={`Task title: ${task.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div>
                            <img
                                src={task.image_path}
                                alt=""
                                className="w-full h-64 object-cover"
                            />
                        </div>
                        <div className="p-6 text-gray-900">
                            <div className="grid gap-1 grid-cols-2 mt-2">
                                <div>
                                    <div>
                                        <label className="font-bold text-lg">
                                            Task ID
                                        </label>
                                        <p className="mt-1">{task.id}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Task Title
                                        </label>
                                        <p className="mt-1">{task.name}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Task Status
                                        </label>
                                        <p className="mt-1">
                                            <span
                                                className={`px-2 py-1 rounded text-white ${
                                                    TASK_STATUS_CLASS_MAP[
                                                        task.status
                                                    ]
                                                }`}
                                            >
                                                {
                                                    TASK_STATUS_TEXT_MAP[
                                                        task.status
                                                    ]
                                                }
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label className="font-bold text-lg">
                                            Deadline
                                        </label>
                                        <p className="mt-1">
                                            {task.deadline}
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Start Date
                                        </label>
                                        <p className="mt-1">
                                            {task.created_at}
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Task Updated
                                        </label>
                                        <p className="mt-1">
                                            {task.updated_at} by{" "}
                                            {task.updated_by.name}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="font-bold text-lg">
                                    Task Description
                                </label>
                                <p className="mt-1">{task.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {tasks.data.length > 0 ? (
                                <TasksTable
                                    tasks={tasks}
                                    queryParams={queryParams}
                                    hideTaskInfo={true}
                                />
                            ) : (
                                <div className="text-center">
                                    <p className="text-lg font-semibold">
                                        No tasks found for this task.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
