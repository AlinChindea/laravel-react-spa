import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import TextareaInput from "@/Components/TextareaInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ auth, task, projects, users }) {
    const { data, setData, post, errors, reset } = useForm({
        image: "",
        name: task.name ||"",
        status: task.status ||"",
        description: task.description ||"",
        due_date: task.due_date ||"",
        project_id: task.project_id ||"",
        priority: task.priority ||"",
        assigned_to: task.assigned_to ||"",
        _method: "PUT",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("task.update", task.id));
    };

    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit task <span className="font-bold italic">{task.name}</span>
                </h2>
            }
        >
            <Head title="Edit task" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <form
                            onSubmit={handleSubmit}
                            className="p-4 sm:p-8 bg-white shadow sm:rounded-lg"
                        >
                            {task.image_path && <div className="mb-4">
                                <img src={task.image_path} alt="" className="w-64"/>
                                </div>}
                            <div>
                                <InputLabel
                                    htmlFor="task_image_path"
                                    value="Task Image"
                                />
                                <TextInput
                                    id="task_image_path"
                                    type="file"
                                    name="image"
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("image", e.target.files[0])
                                    }
                                />
                                <InputError
                                    message={errors.image}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="task_project_id"
                                    value="Parent project"
                                />

                                <SelectInput
                                    name="project_id"
                                    id="task_project_id"
                                    value={data.project_id}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("project_id", e.target.value)
                                    }
                                >
                                    <option value="">Select project</option>
                                    {projects.data.map((project) => (
                                        <option key={project.id} value={project.id}>
                                            {project.name}
                                        </option>
                                    ))}
                                </SelectInput>

                                <InputError
                                    message={errors.project_id}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="task_name"
                                    value="Task Name"
                                />
                                <TextInput
                                    id="task_name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="task_description"
                                    value="Task Description"
                                />
                                <TextareaInput
                                    id="task_description"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.description}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="task_due_date"
                                    value="Task Deadline"
                                />
                                <TextInput
                                    id="task_due_date"
                                    type="date"
                                    name="due_date"
                                    value={data.due_date}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("due_date", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.due_date}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="task_status"
                                    value="Task Status"
                                />

                                <SelectInput
                                    name="status"
                                    id="task_status"
                                    value={data.status}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                >
                                    <option value="">Select Status</option>
                                    <option value="open">Open</option>
                                    <option value="in_progress">
                                        In Progress
                                    </option>
                                    <option value="completed">Completed</option>
                                    <option value="closed">Closed</option>
                                </SelectInput>

                                <InputError
                                    message={errors.status}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="task_priority"
                                    value="Task priority"
                                />

                                <SelectInput
                                    name="priority"
                                    id="task_priority"
                                    value={data.priority}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("priority", e.target.value)
                                    }
                                >
                                    <option value="">Select priority</option>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                    <option value="urgent">Urgent</option>
                                </SelectInput>

                                <InputError
                                    message={errors.priority}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="task_assigned_to"
                                    value="Assigned project manager"
                                />

                                <SelectInput
                                    name="assigned_to"
                                    id="task_assigned_to"
                                    value={data.assigned_to}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("assigned_to", e.target.value)
                                    }
                                >
                                    <option value="">Select PM</option>
                                    {users.data.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </SelectInput>

                                <InputError
                                    message={errors.assigned_to}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4 text-right">
                                <Link
                                    href={route("task.index")}
                                    className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                                >
                                    Cancel
                                </Link>
                                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                                    Edit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
