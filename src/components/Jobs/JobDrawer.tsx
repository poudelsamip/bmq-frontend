import type { JobDetails } from "../../api/queue.api";
import DrawerFooter from "./DrawerFooter";
import DrawerHeader from "./DrawerHeader";
import DrawerJobDetails from "./DrawerJobDetails";
import JobError from "./JobError";
import JobLogs from "./JobLogs";
import JobPayload from "./JobPayload";

export interface JobDrawerProps {
    job: JobDetails | null;
    onClose: () => void;
}

export default function JobDrawer({ job, onClose }: JobDrawerProps) {
    if (!job) return null;

    return (
        <aside className="fixed top-0 right-0 h-full w-100 bg-white border-l border-gray-200 flex flex-col z-50">
            <DrawerHeader
                title={job.name}
                subtitle={`ID: ${job.id}`}
                onClose={onClose}
            />

            <div className="h-1 bg-gray-100">
                <div className="h-full bg-blue-600 w-full" />
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
                <DrawerJobDetails jobId={job.id} />
                {job.error && <JobError error={job.error.message} />}
                <JobPayload payload={job.payload} />
                <JobLogs logs={job.logs} />
            </div>

            <DrawerFooter />
        </aside>
    );
}
