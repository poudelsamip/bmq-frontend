import type { Job } from "../../api/queue.api";
import StatusBadge from "../ui/StatusBadge";

export const JobRow = ({
    job,
    onJobClick,
}: {
    job: Job;
    onJobClick: (jobId: string) => void;
}) => {
    return (
        <tr className="border-t h-12 border-gray-200 hover:bg-gray-50">
            <td className="px-4 py-3 text-sm text-gray-500">{job.id}</td>

            <td
                className="px-4 py-3 text-sm text-blue-600 font-medium"
                onClick={() => onJobClick(job.id!)}
            >
                {job.name}
            </td>

            <td className="px-4 py-3">
                <StatusBadge status={job.state} />
            </td>

            <td className="px-4 py-3 text-sm text-center text-gray-500">
                {job.attemptsMade}
            </td>

            <td className="px-4 py-3 text-sm text-gray-500">{job.duration}</td>

            <td className="px-4 py-3 text-sm text-gray-500">
                {job.processedOn}
            </td>

            <td className="px-4 py-3 text-right">
                <button className="text-gray-500 hover:text-black">⋮</button>
            </td>
        </tr>
    );
};
