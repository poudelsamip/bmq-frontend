import DrawerSection from "./DrawerSection";

export default function JobPayload({
    payload,
}: {
    payload: Record<string, unknown>;
}) {
    return (
        <DrawerSection title="Payload">
            <pre className="text-xs italic bg-gray-50 border rounded p-3 overflow-x-auto">
                {JSON.stringify(payload, null, 2)}
            </pre>
        </DrawerSection>
    );
}
