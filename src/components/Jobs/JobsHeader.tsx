import { Search } from "lucide-react";
import Button from "../ui/Button";

export default function JobsHeader() {
    return (
        <div className="flex items-center justify-between mb-4">
            {/* Search */}
            <div className="relative w-full max-w-md">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                    <Search size={16} />
                </span>
                <input
                    placeholder="Search jobs by ID or name..."
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>

            {/* Action */}
            <Button variant="danger" className="ml-4">
                Pause Queue
            </Button>
        </div>
    );
}
