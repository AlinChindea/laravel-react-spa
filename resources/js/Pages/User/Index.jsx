import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
import {
    PencilSquareIcon,
    TrashIcon,
} from "@heroicons/react/16/solid";

export default function Index({ auth, users, queryParams = null, success }) {
    queryParams = queryParams || {};
    const searchFieldChanged = (field, value) => {
        if (value) {
            queryParams[field] = value;
        } else {
            delete queryParams[field];
        }

        router.get(route("user.index", queryParams));
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

        router.get(route("user.index", queryParams));
    };

    const deleteUser = (user) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }

        router.delete(route("user.destroy", user));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Users
                    </h2>
                    <Link
                        href={route("user.create")}
                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all"
                    >
                        Create User
                    </Link>
                </div>
            }
        >
            <Head title="Users" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {success && (
                        <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                            {success}
                        </div>
                    )}
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
                                                name="name"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortField={sortField}
                                            >
                                                Name
                                            </TableHeading>
                                            <TableHeading
                                                name="email"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortField={sortField}
                                            >
                                                Email
                                            </TableHeading>
                                            <TableHeading
                                                name="created_at"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortField={sortField}
                                            >
                                                Created
                                            </TableHeading>
                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-center">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <thead className="ltr:text-left rtl:text-right">
                                        <tr>
                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></th>
                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                <TextInput
                                                    className="w-fit lg:w-full"
                                                    defaultValue={
                                                        queryParams.name
                                                    }
                                                    placeholder="Search by user name"
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
                                                <TextInput
                                                    className="w-fit lg:w-full"
                                                    defaultValue={
                                                        queryParams.email
                                                    }
                                                    placeholder="Search by user email"
                                                    onBlur={(e) =>
                                                        searchFieldChanged(
                                                            "email",
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyPress={(e) =>
                                                        keyPressed("email", e)
                                                    }
                                                />
                                            </th>

                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></th>
                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-200">
                                        {users.data.map((user) => (
                                            <tr key={user.id}>
                                                <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">
                                                    {user.id}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3 text-gray-700 text-nowrap">
                                                    {user.name}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                                                    {user.email}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                                                    {user.created_at}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3">
                                                    <div className="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1">
                                                        <Link
                                                            href={route(
                                                                "user.edit",
                                                                user.id
                                                            )}
                                                            className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-blue-500 hover:text-blue-700 focus:relative"
                                                        >
                                                            <PencilSquareIcon className="h-4 w-4" />
                                                            Edit
                                                        </Link>

                                                        <button
                                                            onClick={(e) =>
                                                                deleteUser(user)
                                                            }
                                                            className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm text-red-500 hover:text-red-700 shadow-sm focus:relative"
                                                        >
                                                            <TrashIcon className="h-4 w-4" />
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <Pagination links={users.meta.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
