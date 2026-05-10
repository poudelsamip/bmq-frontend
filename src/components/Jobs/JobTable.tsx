import type { Job } from "../../api/queue.api";
import { JobRow } from "./TableRow";

export const JobsTable = ({
    jobs,
    onJobClick,
}: {
    jobs: Job[];
    onJobClick: (jobId: string) => void;
}) => {
    return (
        <div className="border border-gray-200 rounded overflow-hidden">
            {/* scroll container */}
            <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                        <tr className="text-xs text-gray-500 uppercase">
                            <th className="px-4 py-2">Job ID</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2 text-center">Attempts</th>
                            <th className="px-4 py-2">Duration</th>
                            <th className="px-4 py-2">Processed On</th>
                            <th className="px-4 py-2 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {jobs.map((job) => (
                            <JobRow
                                key={job.id}
                                job={job}
                                onJobClick={onJobClick}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
