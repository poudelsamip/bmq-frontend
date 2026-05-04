import HeroMockup from "./HeroMockup";
import { Rocket, Code2 } from "lucide-react";
import Button from "./ui/Button";

const stats = [
    { value: "< 1ms", label: "Latency" },
    { value: "99.99%", label: "Uptime SLA" },
    { value: "50+", label: "Exchanges Connected" },
];

export default function HeroSection() {
    return (
        <main className="grow flex flex-col items-center justify-center relative overflow-hidden px-6 py-16 bg-white">
            {/* Background blobs */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
                <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] rounded-full bg-linear-to-br from-[#dae2fd] to-transparent blur-3xl" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-linear-to-tr from-[#eceef0] to-transparent blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 relative z-10 items-center">
                {/* Left Content */}
                <div className="col-span-1 lg:col-span-6 flex flex-col items-start gap-6 z-10">
                    {/* Status Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#f2f4f6] border border-[#e0e3e5] text-[#4f46e5] text-xs font-bold uppercase tracking-widest mb-2">
                        <span className="w-2 h-2 rounded-full bg-[#4f46e5] animate-pulse" />
                        System Status: Institutional Grade Active
                    </div>

                    <h1 className="text-5xl font-bold text-slate-900 leading-tight tracking-tight max-w-2xl">
                        Advance Monitoring
                        <div>For BullMQ</div>
                    </h1>

                    <p className="text-base text-slate-700 max-w-xl">
                        Monitor your BullMQ queues in real time, track job
                        progress, identify failures, and gain clear insights to
                        keep your background processes running smoothly and
                        efficiently.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full sm:w-auto">
                        <Button className="px-6 py-3 rounded text-sm font-medium w-full sm:w-auto flex items-center justify-center gap-2">
                            Get Started
                            <Rocket size={20} />
                        </Button>
                        <Button variant="outline" className="w-full sm:w-auto">
                            View API Docs
                            <Code2 size={20} />
                        </Button>
                    </div>

                    {/* Stats */}
                    <div className="mt-10 flex items-center gap-6 border-t border-[#e0e3e5] pt-6 w-full">
                        {stats.map((stat, i) => (
                            <>
                                {i > 0 && (
                                    <div
                                        key={`div-${i}`}
                                        className="w-px h-10 bg-[#e0e3e5]"
                                    />
                                )}
                                <div key={stat.label} className="flex flex-col">
                                    <span className="text-2xl font-semibold text-slate-900">
                                        {stat.value}
                                    </span>
                                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                                        {stat.label}
                                    </span>
                                </div>
                            </>
                        ))}
                    </div>
                </div>

                {/* Right Mockup */}
                <div className="col-span-1 lg:col-span-6">
                    <HeroMockup />
                </div>
            </div>
        </main>
    );
}
