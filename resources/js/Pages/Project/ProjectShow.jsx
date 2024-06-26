import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    PROJECT_STATUS_CLASS_MAP,
    PROJECT_STATUS_TEXT_MAP,
} from "@/constants.jsx";
import TasksTable from "../Tasks/TasksTable";

export default function ProjectShow({ auth, success, project, tasks, queryParams }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {`Project title: ${project.name}`}
                </h2>
            }
        >
            <Head title={`Project title: ${project.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div>
                            <img
                                src={project.image_path}
                                alt=""
                                className="w-full h-64 object-cover"
                            />
                        </div>
                        <div className="p-6 text-gray-900">
                            <div className="grid gap-1 grid-cols-2 mt-2">
                                <div>
                                    <div>
                                        <label className="font-bold text-lg">
                                            Project ID
                                        </label>
                                        <p className="mt-1">{project.id}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Project Title
                                        </label>
                                        <p className="mt-1">{project.name}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Project Status
                                        </label>
                                        <p className="mt-1">
                                            <span
                                                className={`px-2 py-1 rounded text-white ${
                                                    PROJECT_STATUS_CLASS_MAP[
                                                        project.status
                                                    ]
                                                }`}
                                            >
                                                {
                                                    PROJECT_STATUS_TEXT_MAP[
                                                        project.status
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
                                            {project.deadline}
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Start Date
                                        </label>
                                        <p className="mt-1">
                                            {project.created_at}
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Project Updated
                                        </label>
                                        <p className="mt-1">
                                            {project.updated_at} by{" "}
                                            {project.updated_by.name}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="font-bold text-lg">
                                    Project Description
                                </label>
                                <p className="mt-1">{project.description}</p>
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
                                    hideProjectInfo={true}
                                    success={success}
                                />
                            ) : (
                                <div className="text-center">
                                    <p className="text-lg font-semibold">
                                        No tasks found for this project.
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
