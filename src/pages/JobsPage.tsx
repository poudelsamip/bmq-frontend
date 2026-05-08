import JobsHeader from "../components/Jobs/JobsHeader";
import { JobsTable } from "../components/Jobs/JobTable";
import { queueApi, type Job } from "../api/queue.api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";
import DrawerJobDetails from "../components/Jobs/DrawerJobDetails";

export default function JobsPage() {
    const { id, queueName } = useParams();

    const [showDrawer, setShowDrawer] = useState<boolean>(false);
    const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

    const onJobClick = (jobId: string) => {
        setSelectedJobId(jobId);
        setShowDrawer(true);
    };

    const {
        data: jobs,
        isLoading,
        isError,
    } = useQuery<Job[]>({
        queryKey: ["jobs", id, queueName],
        queryFn: async () => {
            const res = await queueApi.getJobs(id!, queueName!);
            return res.data.jobs;
        },
        enabled: !!id && !!queueName,
        retry: 2,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error occurred while fetching jobs.</div>;
    }

    return (
        <main className="p-6 bg-white min-h-screen -m-6">
            {showDrawer && (
                <div className="absolute top-0 right-0 w-96 h-full bg-white shadow-lg p-4 z-50">
                    <DrawerJobDetails jobId={selectedJobId!} />
                </div>
            )}
            <>
                <JobsHeader />
                <JobsTable jobs={jobs || []} onJobClick={onJobClick} />
            </>
        </main>
    );
}
