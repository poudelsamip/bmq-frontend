import { useParams } from "react-router-dom";
import { queueApi, type JobDetails } from "../../api/queue.api";
import DrawerSection from "./DrawerSection";
import { useQuery } from "@tanstack/react-query";
import DrawerHeader from "./DrawerHeader";
import DrawerFooter from "./DrawerFooter";
import JobError from "./JobError";
import JobPayload from "./JobPayload";
import JobLogs from "./JobLogs";
import JobDrawer from "./JobDrawer";

export default function DrawerJobDetails({ jobId }: { jobId: string }) {
    const { id, queueName } = useParams();

    const {
        data: job,
        isLoading,
        isError,
    } = useQuery<JobDetails>({
        queryKey: ["jobDetails", id, queueName, jobId],
        queryFn: async () => {
            const res = await queueApi.getJobDetails(id!, queueName!, jobId);
            return res.data;
        },
        enabled: !!id && !!queueName && !!jobId,
        retry: 2,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !job) {
        return <div>Error occurred while fetching job details.</div>;
    }

    return (
        <DrawerSection title="Job Details">
            <DrawerHeader
                title={job.name}
                subtitle={`ID: ${job.id}`}
                onClose={() => {}}
            />
            <div className="grid grid-cols-2 gap-y-4 text-sm">
                <div>
                    <p className="text-gray-500 text-xs">{job.state}</p>
                    <p className="text-red-600 font-medium">Critical Failure</p>
                </div>

                <div>
                    <p className="text-gray-500 text-xs">Queue</p>
                    <p>{job.queueName}</p>
                </div>

                <div>
                    <p className="text-gray-500 text-xs">Attempts</p>
                    <p>
                        {job.attempts.made} / {job.attempts.max}
                    </p>
                </div>

                <div>
                    <p className="text-gray-500 text-xs">Duration</p>
                    <p>{job.timing.duration}</p>
                </div>

                <div className="col-span-2">
                    <p className="text-gray-500 text-xs">Created</p>
                    <p>{job.timing.createdAt}</p>
                </div>
            </div>

            <JobError error={job.error.message} />
            <JobPayload payload={job.payload} />
            <JobLogs logs={job.logs} />
            {/* <JobDrawer job={job} onClose={() => {}} /> */}
            <DrawerFooter />
        </DrawerSection>
    );
}
