import JobsHeader from "../components/Jobs/JobsHeader";
import { JobsTable } from "../components/Jobs/JobTable";
import { queueApi, type Job } from "../api/queue.api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import JobDrawer from "../components/Jobs/JobDrawer";
import { ChevronRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function JobsPage() {
    const { id, queueName } = useParams();
    const { user } = useAuth();

    const [showDrawer, setShowDrawer] = useState<boolean>(false);
    const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

    const isFreeTier = user?.plan !== "pro";

    const onJobClick = (jobId: string) => {
        setSelectedJobId(jobId);
        setShowDrawer(true);
    };

    const navigate = useNavigate();

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
        return (
            <div
                className="flex items-center justify-center h-screen text-sm"
                style={{ background: "var(--color-background)", color: "var(--color-on-surface-variant)" }}
            >
                Loading jobs…
            </div>
        );
    }

    if (isError) {
        return (
            <div
                className="flex flex-col items-center justify-center h-screen gap-3"
                style={{ background: "var(--color-background)" }}
            >
                <p className="text-base font-semibold" style={{ color: "var(--color-error)" }}>
                    Error occurred while fetching jobs.
                </p>
            </div>
        );
    }

    // The backend already enforces the free-tier limit — use jobs directly
    const visibleJobs = jobs ?? [];

    return (
        <main
            className="relative p-6 h-[calc(100vh-64px)] -m-6"
            style={{ background: "var(--color-background)" }}
        >
            {showDrawer && (
                <JobDrawer
                    jobId={selectedJobId}
                    onClose={() => setShowDrawer(false)}
                />
            )}
            <>
                <div className="flex items-center gap-2 mb-4">
                    <button onClick={() => navigate(-1)} className="underline text-xs font-medium uppercase tracking-wider underline-offset-2" style={{ color: "var(--color-primary)" }}>All Queues</button>
                    <ChevronRight size={16} style={{ color: "var(--color-on-surface)" }} />
                    <h1
                        className="text-2xl font-bold uppercase tracking-wider"
                        style={{ color: "var(--color-on-surface)", fontFamily: "Manrope, sans-serif" }}
                    >
                        {queueName}
                    </h1>
                </div>
                <JobsHeader />
                <JobsTable
                    jobs={visibleJobs}
                    onJobClick={onJobClick}
                    isFreeTier={isFreeTier}
                />
            </>
        </main>
    );
}
