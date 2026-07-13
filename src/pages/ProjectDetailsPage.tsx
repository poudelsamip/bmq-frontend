import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { projectApi, type Project } from "../api/projects.api";
import { useEffect, useState } from "react";
import { queueApi, type QueueStats } from "../api/queue.api";
import type { ApiResponse } from "../api/auth.api";
import QueueCard, { QueueCardSkeleton } from "../components/projects/QueueCard";

export default function ProjectDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [allQueuesStats, setAllQueuesStats] = useState<QueueStats[]>([]);
    const [isPausingAll, setIsPausingAll] = useState(false);

    const {
        data: projectResponse,
        isLoading,
        isError,
        error,
    } = useQuery<ApiResponse<Project>>({
        queryKey: ["project", id],
        queryFn: async () => {
            const res = await projectApi.getProject(id!);
            return res;
        },
        enabled: !!id,
        staleTime: 30_000,
        retry: 2,
    });

    if (!id) {
        navigate("/dashboard");
        return null;
    }

    let project: Project | undefined;
    if (projectResponse) {
        project = projectResponse?.data;
    }

    useEffect(() => {
        if (!id) return;

        const source = new EventSource(
            queueApi.streamAllEventSource(id),
            { withCredentials: true },
        );

        source.onmessage = (event) => {
            const data = JSON.parse(event.data) as QueueStats[];
            setAllQueuesStats(data);
        };

        source.addEventListener("error", (event: MessageEvent) => {
            try {
                const data = JSON.parse(event.data);
                console.error("Stream error:", data.message);
            } catch {
                console.error("Unknown stream error");
            }
        });

        source.onerror = (err) => {
            console.error("Connection lost:", err);
        };

        return () => {
            source.close();
        };
    }, [id]);

    const handlePauseAll = async () => {
        if (!project || isPausingAll) return;
        setIsPausingAll(true);
        try {
            const promises = project.queues.map((q) => queueApi.pauseQueue(id, q));
            await Promise.all(promises);
        } catch (err) {
            console.error("Failed to pause all queues", err);
        } finally {
            setIsPausingAll(false);
        }
    };

    if (isError) {
        return (
            <div
                className="flex flex-col items-center justify-center h-screen gap-3"
                style={{ background: "#0D0E12" }}
            >
                <h1 className="text-2xl font-semibold text-red-500">
                    {error?.message || "Error loading project"}
                </h1>
                <p className="text-gray-400">
                    Please make sure your Redis connection is active.
                </p>
                <button
                    onClick={() => navigate("/dashboard")}
                    className="mt-2 text-indigo-400 underline"
                >
                    Back to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div
            className="flex flex-col p-8"
            style={{
                background: "#0D0E12", // Very dark background from mockup
                fontFamily: "Inter, sans-serif",
                margin: "-24px",
                height: "calc(100vh - 64px)",
                overflow: "auto",
                color: "#E0E0E0"
            }}
        >
            <div className="mb-8">
                <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest mb-4">
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="underline underline-offset-2"
                        style={{ color: "var(--color-primary)" }}
                    >
                        ALL PROJECTS
                    </button>
                    <span style={{ color: "#8E8E93" }}>&gt; {project?.project.name || "PROJECT"}</span>
                </div>
                
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-semibold text-white">Queues</h1>
                    <div className="flex gap-3">
                        <button 
                            className="px-4 py-2 text-xs font-medium rounded transition-colors"
                            onClick={handlePauseAll}
                            disabled={isPausingAll}
                            style={{
                                background: "rgba(57, 73, 171, 0.2)",
                                color: "#8C9EFF",
                                border: "1px solid rgba(57, 73, 171, 0.4)",
                                opacity: isPausingAll ? 0.5 : 1
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "rgba(57, 73, 171, 0.3)";
                                e.currentTarget.style.borderColor = "rgba(57, 73, 171, 0.6)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "rgba(57, 73, 171, 0.2)";
                                e.currentTarget.style.borderColor = "rgba(57, 73, 171, 0.4)";
                            }}
                        >
                            {isPausingAll ? "Pausing..." : "Pause All"}
                        </button>
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div 
                    className="grid gap-6 w-full"
                    style={{ gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))" }}
                >
                    {Array.from({ length: 4 }).map((_, i) => (
                        <QueueCardSkeleton key={i} />
                    ))}
                </div>
            ) : (
                <div 
                    className="grid gap-6 w-full"
                    style={{ gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))" }}
                >
                    {project?.queues.map((queueName) => {
                        // Find stats if we have them from SSE, otherwise create empty default
                        const stats = allQueuesStats.find((s) => s.queueName === queueName) || {
                            queueName,
                            isPaused: false,
                            counts: {
                                completed: 0,
                                waiting: 0,
                                active: 0,
                                delayed: 0,
                                failed: 0
                            }
                        };
                        
                        return (
                            <QueueCard 
                                key={queueName} 
                                stats={stats} 
                                projectId={id} 
                            />
                        );
                    })}
                    
                    {(!project?.queues || project.queues.length === 0) && (
                        <div className="col-span-full text-center py-12 text-[#8E8E93]">
                            No queues found in this project.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
