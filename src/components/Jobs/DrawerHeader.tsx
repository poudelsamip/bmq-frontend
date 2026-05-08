export default function DrawerHeader({
    title,
    subtitle,
    onClose,
}: {
    title: string;
    subtitle: string;
    onClose: () => void;
}) {
    return (
        <div className="px-6 py-4 border-b flex justify-between items-center">
            <div>
                <h2 className="text-lg font-medium text-blue-700">{title}</h2>
                <p className="text-gray-500 text-sm">{subtitle}</p>

                <span className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 text-[10px] border border-red-500 text-red-600 rounded">
                    ● FAILED
                </span>
            </div>

            <button
                onClick={onClose}
                className="text-gray-500 hover:text-black"
            >
                ✕
            </button>
        </div>
    );
}
