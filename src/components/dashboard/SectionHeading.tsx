interface SectionHeadingProps {
    label: string;
}

export default function SectionHeading({ label }: SectionHeadingProps) {
    return (
        <div className="flex items-center gap-3">
            <span
                className="text-[10px] font-semibold uppercase tracking-widest whitespace-nowrap"
                style={{ color: "#444657" }}
            >
                {label}
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: "#c4c5da" }} />
        </div>
    );
}
