import { useNavigate } from "react-router-dom";
import LatencyChart from "./LatencyChart";
import QueueHeader from "./QueueHeader";
import QueueStats from "./QueueStats";
import StatusDistribution from "./StatusDistribution";
import ThroughputChart from "./Throughput";

interface QueueDataProps {
    selectedQueue: string | null;
    queueStats: {
        [index: string]: number;
    } | null;
}

export default function QueueData({
    selectedQueue,
    queueStats,
}: QueueDataProps) {
    if (!selectedQueue) {
        return (
            <div
                className="flex-1 p-10 flex flex-col items-center justify-center gap-4"
                style={{ background: "var(--color-surface-container-lowest)" }}
            >
                <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(183,196,255,0.1)" }}
                >
                    <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--color-primary)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M3 6h18M3 12h18M3 18h18" />
                    </svg>
                </div>
                <p
                    className="text-[16px] font-medium"
                    style={{ color: "var(--color-on-surface-variant)" }}
                >
                    Select a queue to view its data
                </p>
            </div>
        );
    }

    const navigate = useNavigate();

    const handleViewAllJobs = () => {
        navigate(`queues/${selectedQueue}/jobs`);
    };

    return (
        <div
            className="flex-1 p-6 flex flex-col gap-5 overflow-auto"
            style={{ background: "var(--color-surface-container-lowest)" }}
        >
            <QueueHeader
                queueName={selectedQueue}
                onViewAllJobs={handleViewAllJobs}
            />
            <QueueStats queueStats={queueStats} />
            <div className="flex gap-4">
                <ThroughputChart />
                <StatusDistribution />
            </div>
            <LatencyChart />
        </div>
    );
}
