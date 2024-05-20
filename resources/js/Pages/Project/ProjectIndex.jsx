import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    PROJECT_STATUS_CLASS_MAP,
    PROJECT_STATUS_TEXT_MAP,
} from "@/constants.jsx";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";

export default function ProjectIndex({ auth, projects, queryParams = null }) {
    queryParams = queryParams || {};
    const searchFieldChanged = (field, value) => {
        if (value) {
            queryParams[field] = value;
        } else {
            delete queryParams[field];
        }

        router.get(route("project.index", queryParams));
    };

    const keyPressed = (field, e) => {
        if (!e.key !== "Enter") return;

        searchFieldChanged(field, e.target.value);
    };

    const sortField = (field) => {
        let direction = "asc";
        if (
            queryParams.sort_field === field &&
            queryParams.sort_direction === "asc"
        ) {
            direction = "desc";
        }

        queryParams.sort_field = field;
        queryParams.sort_direction = direction;

        router.get(route("project.index", queryParams));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Projects
                    </h2>
                    <Link
                        href={route("project.create")}
                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all">
                        Create Project
                    </Link>
                </div>
            }
        >
            <Head title="Projects" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-900 divide-y-2 divide-gray-200">
                                    <thead className="text-xs text-gray-900 uppercase bg-gray-300">
                                        <tr>
                                            <TableHeading
                                                name="id"
                                                sortable={false}
                                                >
                                                ID
                                            </TableHeading>

                                            <TableHeading
                                                name="image_path"
                                                sortable={false}
                                                >
                                                Image
                                            </TableHeading>

                                            <TableHeading
                                                name="name"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortField={sortField}
                                                >
                                                Name
                                            </TableHeading>
                                            <TableHeading
                                                name="status"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortField={sortField}
                                                >
                                                Status
                                            </TableHeading>
                                            <TableHeading
                                                name="created_at"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortField={sortField}
                                                >
                                                Created
                                            </TableHeading>
                                            <TableHeading
                                                name="deadline"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortField={sortField}
                                                >
                                                Ends on
                                            </TableHeading>
                                            <TableHeading
                                                name="created_by"
                                                sortable={false}
                                                >
                                                Created by
                                            </TableHeading>
                                            <th className="whitespace-nowrap px-4 py-2 font-medium">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <thead className="ltr:text-left rtl:text-right">
                                        <tr>
                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></th>
                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></th>
                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                <TextInput
                                                    className="w-fit lg:w-full"
                                                    defaultValue={
                                                        queryParams.name
                                                    }
                                                    placeholder="Search by project name"
                                                    onBlur={(e) =>
                                                        searchFieldChanged(
                                                            "name",
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyPress={(e) =>
                                                        keyPressed("name", e)
                                                    }
                                                />
                                            </th>
                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                <SelectInput
                                                    className="w-full"
                                                    defaultValue={
                                                        queryParams.status
                                                    }
                                                    onChange={(e) =>
                                                        searchFieldChanged(
                                                            "status",
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        Select status
                                                    </option>
                                                    <option value="pending">
                                                        Pending
                                                    </option>
                                                    <option value="in_progress">
                                                        In progress
                                                    </option>
                                                    <option value="completed">
                                                        Completed
                                                    </option>
                                                </SelectInput>
                                            </th>
                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></th>
                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></th>
                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></th>
                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></th>
                                            <th className="px-4 py-2"></th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-200">
                                        {projects.data.map((project) => (
                                            <tr key={project.id}>
                                                <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">
                                                    {project.id}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                                                    <img
                                                        src={project.image_path}
                                                        alt=""
                                                    />
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3 text-gray-700 text-nowrap hover:underline">
                                                    <Link href={route("project.show", project.id)}>
                                                        {project.name}
                                                    </Link>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3 text-gray-700">
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
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                                                    {project.created_at}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                                                    {project.deadline}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                                                    {project.created_by.name}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3">
                                                    <Link
                                                        href={route(
                                                            "project.show",
                                                            project.id
                                                        )}
                                                        className="inline-block rounded bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                                                    >
                                                        View
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <Pagination links={projects.meta.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
