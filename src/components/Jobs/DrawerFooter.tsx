export default function DrawerFooter() {
    return (
        <div className="p-4 border-t flex gap-3">
            <button className="flex-1 border border-red-500 text-red-600 py-2 rounded">
                Retry job
            </button>
            <button className="flex-1 bg-blue-600 text-white py-2 rounded">
                View flow tree
            </button>
        </div>
    );
}
