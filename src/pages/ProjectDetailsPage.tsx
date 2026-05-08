import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { projectApi, type Project } from "../api/projects.api";
import ProjectSidebar from "../components/projects/ProjectSidebar";
import QueueData from "../components/projects/QueueData";
import { useState } from "react";
import { queueApi, type QueueStats } from "../api/queue.api";

export default function ProjectDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [selectedQueue, setSelectedQueue] = useState<string | null>(null);
    const [queueStats, setQueueStats] = useState<QueueStats | null>(null);

    const {
        data: project,
        isLoading,
        isError,
    } = useQuery<Project>({
        queryKey: ["project", id],
        queryFn: async () => {
            const res = await projectApi.getProject(id!);
            return res.data;
        },
        enabled: !!id, // skip the query if id is missing
        staleTime: 30_000, // treat data as fresh for 30s
        retry: 2, // retry failed requests twice
    });

    const handleQueueSelect = async (queueName: string) => {
        setSelectedQueue(queueName);
        const res = await queueApi.getStats(id!, queueName);
        setQueueStats(res.data);
    };

    if (!id) {
        navigate("/dashboard");
        return null;
    }

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Failed to load project.</div>;

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
