import DrawerSection from "./DrawerSection";

export default function JobLogs({ logs }: { logs: string[] }) {
    return (
        <DrawerSection title="Runtime Logs">
            <div className="border rounded overflow-hidden text-sm font-mono">
                {logs.map((log, i) => (
                    <div
                        key={i}
                        className="flex gap-3 px-3 py-2 border-b last:border-0"
                    >
                        <span className="text-gray-400 w-16">
                            {log.split(" ")[0]}
                        </span>
                        <span className={"text-gray-700"}>
                            {log.split(" ")[1]}
                        </span>
                    </div>
                ))}
            </div>
        </DrawerSection>
    );
}
