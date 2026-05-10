import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { queueApi, type JobDetails } from "../../api/queue.api";
import { X } from "lucide-react";

export default function JobDrawer({
    jobId,
    onClose,
}: {
    jobId: string | null;
    onClose: () => void;
}) {
    const { id, queueName } = useParams();

    const {
        data: job,
        isLoading,
        isError,
    } = useQuery<JobDetails>({
        queryKey: ["jobDetails", id, queueName, jobId],
        queryFn: async () => {
            const res = await queueApi.getJobDetails(id!, queueName!, jobId!);
            return res.data;
        },
        enabled: !!id && !!queueName && !!jobId,
    });

    if (!jobId) return null;

    return (
        <aside className="fixed top-0 right-0 h-full w-100 bg-white border-l border-gray-200 flex flex-col z-50">
            {/* HEADER */}
            <div className="px-5 py-4 border-b flex justify-between items-start">
                <div>
                    <h2 className="text-base font-semibold text-gray-800">
                        {job?.name || "Loading..."}
                    </h2>
                    <p className="text-xs text-gray-500">ID: {job?.id}</p>

                    {job && (
                        <span className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 text-[10px] border border-red-500 text-red-600 rounded">
                            ● {job.state.toUpperCase()}
                        </span>
                    )}
                </div>

                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-700 text-sm"
                >
                    <X size={30} className="text-slate-600 cursor-pointer" />
                </button>
            </div>

            {/* BODY */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5 text-sm">
                {isLoading && <p>Loading...</p>}
                {isError && <p>Error loading job.</p>}

                {job && (
                    <>
                        {/* META GRID */}
                        <div className="grid grid-cols-2 gap-y-3 text-sm">
                            <div>
                                <p className="text-gray-500 text-xs">Queue</p>
                                <p className="text-gray-800">{job.queueName}</p>
                            </div>

                            <div>
                                <p className="text-gray-500 text-xs">
                                    Attempts
                                </p>
                                <p>
                                    {job.attempts.made} / {job.attempts.max}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500 text-xs">
                                    Duration
                                </p>
                                <p>{job.timing.duration}</p>
                            </div>

                            <div>
                                <p className="text-gray-500 text-xs">Created</p>
                                <p>{job.timing.createdAt}</p>
                            </div>
                        </div>

                        {/* ERROR */}
                        {job.error?.message && (
                            <Section title="Error">
                                <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 font-mono text-xs">
                                    {job.error.message}
                                </div>
                            </Section>
                        )}

                        {/* PAYLOAD */}
                        <Section title="Payload">
                            <pre
                                className="bg-[#0f172a] border border-gray-800 rounded-md p-4 overflow-x-auto text-xs tracking-wide leading-relaxed"
                                style={{ fontFamily: "Jetbrains Mono" }}
                            >
                                <code
                                    className="font-mono text-gray-200"
                                    dangerouslySetInnerHTML={{
                                        __html: JSON.stringify(
                                            job.payload,
                                            null,
                                            2,
                                        )
                                            // keys
                                            .replace(/"(.*?)":/g, `"§$1§":`)
                                            .replace(
                                                /"§(.*?)§":/g,
                                                `<span class="text-blue-400">"$1"</span>:`,
                                            )
                                            // strings
                                            .replace(
                                                /: "(.*?)"/g,
                                                `: <span class="text-green-400">"$1"</span>`,
                                            )
                                            // numbers / booleans / null
                                            .replace(
                                                /: (\d+|true|false|null)/g,
                                                `: <span class="text-yellow-400">$1</span>`,
                                            ),
                                    }}
                                />
                            </pre>
                        </Section>

                        {/* LOGS */}
                        <Section title="Runtime Logs">
                            <div className="border rounded overflow-hidden font-mono text-xs">
                                {job.logs.map((log, i) => {
                                    const [time, ...rest] = log.split(" ");
                                    return (
                                        <div
                                            key={i}
                                            className="flex gap-3 px-3 py-2 border-b last:border-0"
                                        >
                                            <span className="text-gray-400 w-20 shrink-0">
                                                {time?.replace(/[\[\]]/g, "")}
                                            </span>
                                            <span className="text-gray-700 break-all">
                                                {rest.join(" ")}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </Section>
                    </>
                )}
            </div>

            {/* FOOTER */}
            <div className="px-5 py-3 border-t flex gap-3">
                <button className="flex-1 border border-red-500 text-red-600 py-2 rounded text-sm">
                    Retry
                </button>
                <button className="flex-1 bg-blue-600 text-white py-2 rounded text-sm">
                    Flow Tree
                </button>
            </div>
        </aside>
    );
}

/* SMALL HELPER */
function Section({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section>
            <h3 className="text-[11px] font-semibold text-gray-500 uppercase mb-2 tracking-wide">
                {title}
            </h3>
            {children}
        </section>
    );
}
