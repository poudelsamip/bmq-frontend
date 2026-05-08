import DrawerSection from "./DrawerSection";

export default function JobError({ error }: { error: string | null }) {
    return (
        <DrawerSection title="Error">
            <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-mono">
                {error}
            </div>
        </DrawerSection>
    );
}
