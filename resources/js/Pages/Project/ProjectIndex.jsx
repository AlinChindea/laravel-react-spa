import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants.jsx";
import { Head, Link } from '@inertiajs/react';

export default function ProjectIndex({ auth, projects }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Projects</h2>}
        >
            <Head title="Projects" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                                    <thead className="ltr:text-left rtl:text-right">
                                    <tr>
                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">ID</th>
                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Image</th>
                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Status</th>
                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Created</th>
                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Ends on</th>
                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Created by</th>
                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Action</th>
                                        <th className="px-4 py-2"></th>
                                    </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-200">
                                        {projects.data.map((project) => (

                                            <tr key={project.id}>
                                                <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">{project.id}</td>
                                                <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                                                    <img src={project.image_path} alt='' />
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3 text-gray-700">{project.name}</td>
                                                <td className="whitespace-nowrap px-4 py-3 text-gray-700"><span className={`px-2 py-1 rounded text-white ${PROJECT_STATUS_CLASS_MAP[project.status]}`}>{PROJECT_STATUS_TEXT_MAP[project.status]}</span></td>
                                                <td className="whitespace-nowrap px-4 py-3 text-gray-700">{project.created_at}</td>
                                                <td className="whitespace-nowrap px-4 py-3 text-gray-700">{project.deadline}</td>
                                                <td className="whitespace-nowrap px-4 py-3 text-gray-700">{project.created_by.name}</td>
                                                <td className="whitespace-nowrap px-4 py-3">
                                                    <Link
                                                        href={route('project.show', project.id)}
                                                        className="inline-block rounded bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                                                    >
                                                        View
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <Pagination links={projects.meta.links }/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
