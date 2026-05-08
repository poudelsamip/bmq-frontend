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
            <div className="flex-1 p-10 flex justify-center text-gray-700">
                Select a queue to view its data
            </div>
        );
    }

    const navigate = useNavigate();

    const handleViewAllJobs = () => {
        navigate(`queues/${selectedQueue}/jobs`);
    };

    return (
        <div className="flex-1 p-6 flex flex-col gap-5 overflow-auto">
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
