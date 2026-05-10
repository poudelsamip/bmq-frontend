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
            setSelectedQueue(null);
        };
    }, [selectedQueue, id]);

    console.log("Project response:", projectResponse);

    if (isLoading) return <div>Loading...</div>;
    if (isError) {
        return (
            <div className="flex flex-col items-center h-screen">
                <h1 className="text-2xl font-semibold text-red-600">
                    {error?.message || "Error loading project"}
                </h1>
                <p>Please make sure your redis connection is active.</p>
                <button
                    onClick={() => navigate("/dashboard")}
                    className="mt-4 text-blue-500 underline"
                >
                    Back to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div
            className="flex min-h-screen"
            style={{
                background: "#f9f9ff",
                fontFamily: "Inter, sans-serif",
                margin: "-24px", // offset padding for full-width sidebar
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
                queueStats={queueStats?.counts || null}
            />
        </div>
    );
}
