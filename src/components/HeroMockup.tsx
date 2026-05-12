const bars = [
    { height: "20%", color: "bg-[#e0e3e5]" },
    { height: "40%", color: "bg-[#e0e3e5]" },
    { height: "30%", color: "bg-[#e0e3e5]" },
    { height: "60%", color: "bg-[#dae2fd]" },
    { height: "50%", color: "bg-[#e0e3e5]" },
    { height: "80%", color: "bg-[#4f46e5]" },
    { height: "70%", color: "bg-[#e0e3e5]" },
    { height: "90%", color: "bg-[#6ffbbe]" },
    { height: "85%", color: "bg-[#e0e3e5]" },
];

export default function HeroMockup() {
    return (
        <div className="relative z-10 w-full h-100 lg:h-150 rounded-sm border border-[#e0e3e5] bg-white shadow-sm overflow-hidden flex flex-col">
            {/* Window Chrome */}
            <div className="h-12 border-b border-[#e0e3e5] bg-[#f2f4f6] flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ffdad6] border border-[#c7c4d8]" />
                    <div className="w-3 h-3 rounded-full bg-[#e0e3e5] border border-[#c7c4d8]" />
                    <div className="w-3 h-3 rounded-full bg-[#6ffbbe] border border-[#c7c4d8]" />
                </div>
                <div className="mx-auto w-1/3 h-4 bg-[#e0e3e5] rounded" />
            </div>

            {/* Body */}
            <div className="grow p-6 flex flex-col gap-4 bg-white relative">
                {/* Top row placeholders */}
                <div className="flex justify-between items-end relative z-10">
                    <div className="w-1/4 h-8 bg-[#e0e3e5] rounded" />
                    <div className="w-1/6 h-6 bg-[#dae2fd] rounded" />
                </div>

                {/* Bar Chart */}
                <div className="grow border border-[#e0e3e5] rounded flex items-end p-4 gap-2 relative z-10 bg-white/50 backdrop-blur-sm">
                    {bars.map((bar, i) => (
                        <div
                            key={i}
                            className={`w-full rounded-t ${bar.color} transition-all duration-300`}
                            style={{ height: bar.height }}
                        />
                    ))}
                </div>

                {/* Data rows */}
                <div className="space-y-2 relative z-10">
                    {[
                        { indicator: "bg-[#6ffbbe]" },
                        { indicator: "bg-[#ffdad6]" },
                    ].map((row, i) => (
                        <div
                            key={i}
                            className="w-full h-10 bg-[#f2f4f6] border border-[#e0e3e5] rounded flex items-center px-4 justify-between"
                        >
                            <div className="w-1/4 h-3 bg-[#e0e3e5] rounded" />
                            <div
                                className={`w-1/5 h-3 rounded ${row.indicator}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
