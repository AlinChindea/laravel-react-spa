import { Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/TableHeading";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants.jsx";

export default function TasksTable({ tasks, queryParams = null, hideProjectInfo = false}) {
    queryParams = queryParams || {};

    const searchFieldChanged = (field, value) => {
        if (value) {
            queryParams[field] = value;
        } else {
            delete queryParams[field];
        }

        router.get(route("task.index", queryParams));
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

        router.get(route("task.index", queryParams));
    };

    return (
        <>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-900 divide-y-2 divide-gray-200">
                    <thead className="text-xs text-gray-900 uppercase bg-gray-300">
                        <tr>
                            <TableHeading name="id" sortable={false}>
                                ID
                            </TableHeading>

                            <TableHeading name="image_path" sortable={false}>
                                Image
                            </TableHeading>

                            {!hideProjectInfo && (<TableHeading name="project_title" sortable={false}>
                                Project Title
                            </TableHeading>
                          )}

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
                            <TableHeading name="created_by" sortable={false}>
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
                            {!hideProjectInfo && (
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></th>
                            )}
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                <TextInput
                                    className="w-fit lg:w-full"
                                    defaultValue={queryParams.name}
                                    placeholder="Search by task name"
                                    onBlur={(e) =>
                                        searchFieldChanged(
                                            "name",
                                            e.target.value
                                        )
                                    }
                                    onKeyPress={(e) => keyPressed("name", e)}
                                />
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                <SelectInput
                                    className="w-full"
                                    defaultValue={queryParams.status}
                                    onChange={(e) =>
                                        searchFieldChanged(
                                            "status",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">Select status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">
                                        In progress
                                    </option>
                                    <option value="completed">Completed</option>
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
                        {tasks.data.map((task) => (
                            <tr key={task.id}>
                                <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">
                                    {task.id}
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                                    <img src={task.image_path} alt="" />
                                </td>
                                {!hideProjectInfo && (
                                    <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                                        {task.project.name}
                                    </td>
                                )}
                                <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                                    {task.name}
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
                                    {task.created_at}
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                                    {task.deadline}
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                                    {task.created_by.name}
                                </td>
                                <td className="whitespace-nowrap px-4 py-3">
                                    <Link
                                        href={route("task.show", task.id)}
                                        className="inline-block rounded bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                                    >
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination links={tasks.meta.links} />
            </div>
        </>
    );
}
