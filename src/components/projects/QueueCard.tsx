import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { QueueStats } from "../../api/queue.api";
import { queueApi } from "../../api/queue.api";

interface QueueCardProps {
    stats: QueueStats;
    projectId: string;
}

export default function QueueCard({ stats, projectId }: QueueCardProps) {
    const navigate = useNavigate();
    const [isPausing, setIsPausing] = useState(false);

    const { queueName, isPaused, counts } = stats;

    const completed = counts?.completed || 0;
    const waiting = counts?.waiting || 0;
    const active = counts?.active || 0;
    const delayed = counts?.delayed || 0;
    const failed = counts?.failed || 0;

    let statusTag = "LIVE";
    let statusColor = "#3949AB";
    let statusBg = "rgba(57, 73, 171, 0.15)";
    
    if (isPaused) {
        statusTag = "PAUSED";
        statusColor = "#FBC02D";
        statusBg = "rgba(251, 192, 45, 0.15)";
    } else if (failed > 0) {
        statusTag = `${failed} FAILED`;
        statusColor = "#E53935";
        statusBg = "rgba(229, 57, 53, 0.15)";
    } else if (active === 0 && waiting === 0) {
        statusTag = "HEALTHY";
        statusColor = "#3949AB";
        statusBg = "rgba(57, 73, 171, 0.15)";
    }

    const handleViewJobs = () => {
        navigate(`queues/${queueName}/jobs`);
    };

    const handlePauseResume = async () => {
        if (isPausing) return;
        setIsPausing(true);
        try {
            if (isPaused) {
                await queueApi.resumeQueue(projectId, queueName);
            } else {
                await queueApi.pauseQueue(projectId, queueName);
            }
        } catch (err) {
            console.error("Failed to pause/resume queue", err);
        } finally {
            setIsPausing(false);
        }
    };

    return (
        <div
            className="flex flex-col overflow-hidden"
            style={{
                background: "#16161D", // Dark card background from image
                border: "1px solid rgba(255, 255, 255, 0.05)",
                borderRadius: "4px",
            }}
        >
            <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                        <div 
                            style={{ 
                                width: 6, 
                                height: 6, 
                                borderRadius: "50%", 
                                background: statusColor 
                            }} 
                        />
                        <span 
                            className="font-medium text-sm" 
                            style={{ color: "#E0E0E0" }}
                        >
                            {queueName}
                        </span>
                    </div>
                    <div
                        className="px-2 py-0.5 rounded text-[10px] font-bold"
                        style={{
                            color: statusColor,
                            background: statusBg,
                            letterSpacing: "0.05em",
                        }}
                    >
                        {statusTag}
                    </div>
                </div>

                <div className="flex items-baseline gap-2 mb-2">
                    <span 
                        className="text-3xl font-semibold tracking-tight" 
                        style={{ color: "#FFFFFF" }}
                    >
                        {completed.toLocaleString()}
                    </span>
                    <span 
                        className="text-xs" 
                        style={{ color: "#8E8E93" }}
                    >
                        completed
                    </span>
                </div>

                <div className="w-full h-[40px] mt-2 mb-4">
                    {/* Dummy Sparkline */}
                    <svg
                        className="w-full h-full"
                        viewBox="0 0 100 20"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M0,10 Q10,2 20,12 T40,8 T60,15 T80,5 T100,10"
                            fill="none"
                            stroke={statusColor}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

                <div 
                    className="h-[1px] w-full mb-3" 
                    style={{ background: "rgba(255,255,255,0.05)" }} 
                />

                <div className="flex justify-between mb-4 px-1">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-semibold text-[#8E8E93] mb-1 uppercase tracking-wider">Waiting</span>
                        <span className="text-sm font-medium text-[#FBC02D]">{waiting}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-semibold text-[#8E8E93] mb-1 uppercase tracking-wider">Active</span>
                        <span className="text-sm font-medium text-[#FFFFFF]">{active}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-semibold text-[#8E8E93] mb-1 uppercase tracking-wider">
                            {failed > 0 ? "Failed" : "Delayed"}
                        </span>
                        <span className="text-sm font-medium text-[#FFFFFF]">
                            {failed > 0 ? failed : delayed}
                        </span>
                    </div>
                </div>

                <div className="mt-auto flex gap-3 pt-2">
                    <button
                        onClick={handlePauseResume}
                        disabled={isPausing}
                        className="flex-1 py-2 text-xs font-medium rounded transition-colors"
                        style={{
                            background: "transparent",
                            color: "#E0E0E0",
                            border: "1px solid rgba(255,255,255,0.1)",
                            opacity: isPausing ? 0.5 : 1
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                        {isPaused ? "Resume" : "Pause"}
                    </button>
                    <button
                        onClick={handleViewJobs}
                        className="flex-1 py-2 text-xs font-medium rounded transition-colors"
                        style={{
                            background: "rgba(57, 73, 171, 0.2)",
                            color: "#8C9EFF",
                            border: "1px solid rgba(57, 73, 171, 0.4)",
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
                        View jobs
                    </button>
                </div>
            </div>
        </div>
    );
}
