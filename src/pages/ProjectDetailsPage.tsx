import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { projectApi, type Project } from "../api/projects.api";
import ProjectSidebar from "../components/projects/ProjectSidebar";
import QueueData from "../components/projects/QueueData";
import { useEffect, useState } from "react";
import { queueApi, type QueueStats } from "../api/queue.api";
import type { ApiResponse } from "../api/auth.api";

export default function ProjectDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [selectedQueue, setSelectedQueue] = useState<string | null>(null);
    const [queueStats, setQueueStats] = useState<QueueStats | null>(null);
    const [isLoadingStats, setIsLoadingStats] = useState(false);

    const {
        data: projectResponse,
        isLoading,
        isError,
        error,
    } = useQuery<ApiResponse<Project>>({
        queryKey: ["project", id],
        queryFn: async () => {
            const res = await projectApi.getProject(id!);
            console.log(res);
            return res;
        },
        enabled: !!id, // skip the query if id is missing
        staleTime: 30_000, // treat data as fresh for 30s
        retry: 2, // retry failed requests twice
    });

    const handleQueueSelect = async (queueName: string) => {
        setSelectedQueue(queueName);
        setQueueStats(null);       // clear stale stats from previous queue
        setIsLoadingStats(true);   // show skeleton until first SSE message
    };

    if (!id) {
        navigate("/dashboard");
        return null;
    }

    let project;
    if (projectResponse) {
        project = projectResponse?.data;
    }

    useEffect(() => {
        if (!selectedQueue || !id) return;

        const source = new EventSource(
            queueApi.streamEventSource(id, selectedQueue),
            { withCredentials: true },
        );

        source.onmessage = (event) => {
            const data = JSON.parse(event.data) as QueueStats;
            setQueueStats(data);
            setIsLoadingStats(false); // skeleton done — real data arrived
            console.log("Received queue stats update:", data);
        };

        source.addEventListener("error", (event: MessageEvent) => {
            try {
                const data = JSON.parse(event.data);
                console.error("Stream error:", data.message);
            } catch {
                console.error("Unknown stream error");
            }
        });

        // connection-level error
        source.onerror = (err) => {
            console.error("Connection lost:", err);
        };

        return () => {
            source.close();
        };
    }, [selectedQueue, id]);

    console.log("Project response:", projectResponse);


    if (isError) {
        return (
            <div
                className="flex flex-col items-center justify-center h-screen gap-3"
                style={{ background: "var(--color-background)" }}
            >
                <h1
                    className="text-2xl font-semibold"
                    style={{ color: "var(--color-error)" }}
                >
                    {error?.message || "Error loading project"}
                </h1>
                <p style={{ color: "var(--color-on-surface-variant)" }}>
                    Please make sure your Redis connection is active.
                </p>
                <button
                    onClick={() => navigate("/dashboard")}
                    className="mt-2 underline"
                    style={{ color: "var(--color-primary)" }}
                >
                    Back to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div
            className="flex"
            style={{
                background: "var(--color-background)",
                fontFamily: "Inter, sans-serif",
                margin: "-24px", // offset padding for full-width sidebar
                height: "calc(100vh - 64px)", // fill exactly the main area below the header
                overflow: "hidden", // prevent this wrapper from scrolling
            }}
        >
            <ProjectSidebar
                queues={project?.queues || []}
                projectName={project?.project.name || "Project"}
                onQueueSelect={handleQueueSelect}
                selectedQeueue={selectedQueue}
            />
            <QueueData
                selectedQueue={selectedQueue}
                queueStats={queueStats}
                isLoading={isLoading || isLoadingStats}
            />
        </div>
    );
}
