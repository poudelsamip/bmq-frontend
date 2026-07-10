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
    isLoading?: boolean;
}

const skeletonStyle = `
@keyframes qd-shimmer {
  0%   { background-position: -600px 0; }
  100% { background-position:  600px 0; }
}
.qd-skel {
  border-radius: 0;
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0.03) 0%,
    rgba(255,255,255,0.06) 45%,
    rgba(255,255,255,0.03) 80%
  );
  background-size: 600px 100%;
  animation: qd-shimmer 2.2s infinite linear;
}
`;

function QueueDataSkeleton() {
    return (
        <div
            className="flex-1 p-6 flex flex-col gap-5 overflow-hidden"
            style={{ background: "var(--color-surface-container-lowest)" }}
        >
            <style>{skeletonStyle}</style>

            {/* Header skeleton */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="qd-skel" style={{ width: 180, height: 28 }} />
                    <div className="qd-skel" style={{ width: 52, height: 22 }} />
                </div>
                <div className="flex gap-2">
                    <div className="qd-skel" style={{ width: 100, height: 34 }} />
                    <div className="qd-skel" style={{ width: 110, height: 34 }} />
                    <div className="qd-skel" style={{ width: 80, height: 34 }} />
                </div>
            </div>

            {/* Stat cards skeleton — 6 cards */}
            <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(6, 1fr)" }}>
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="qd-skel"
                        style={{ height: 82 }}
                    />
                ))}
            </div>

            {/* Charts row skeleton */}
            <div className="flex gap-4" style={{ flex: 1, minHeight: 0 }}>
                <div className="qd-skel" style={{ flex: 2, minHeight: 220 }} />
                <div className="qd-skel" style={{ flex: 1, minHeight: 220 }} />
            </div>

            {/* Bottom chart skeleton */}
            <div className="qd-skel" style={{ height: 180 }} />
        </div>
    );
}

export default function QueueData({
    selectedQueue,
    queueStats,
    isLoading,
}: QueueDataProps) {
    if (isLoading) return <QueueDataSkeleton />;

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
