import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/16/solid";

export default function TableHeading({
    name,
    sortable = true,
    sort_field = null,
    sort_direction = null,
    sortField = () => {},
    children,
}) {
    return (
        <th onClick={(e) => sortField(name)}>
            <div className={`whitespace-nowrap px-4 py-2 font-medium ${sortable ? 'flex items-center justify-between cursor-pointer' : ''}`}>
                {children}
                {sortable && (
                    <div>
                        <ChevronUpIcon
                            className={
                                "w-4 " +
                                (sort_field === name && sort_direction === "asc"
                                    ? "text-white"
                                    : "")
                            }
                        />
                        <ChevronDownIcon
                            className={
                                "w-4 -mt-1 " +
                                (sort_field === name &&
                                sort_direction === "desc"
                                    ? "text-white"
                                    : "")
                            }
                        />
                    </div>
                )}
            </div>
        </th>
    );
}
