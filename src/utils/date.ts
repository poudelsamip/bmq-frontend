/**
 * Formats a Unix timestamp (in milliseconds) into a user-friendly date and time string.
 * Returns "-" if the timestamp is missing, zero, or invalid.
 */
export function formatDateTime(timestamp: number | string | undefined | null): string {
    if (!timestamp || timestamp === 0 || timestamp === "0") {
        return "-";
    }
    const date = new Date(Number(timestamp));
    if (isNaN(date.getTime())) {
        return "-";
    }
    return date.toLocaleString();
}

/**
 * Parses a Unix timestamp (in milliseconds) and splits it into a separate date and time.
 * Returns null if the timestamp is missing, zero, or invalid.
 */
export function formatDateTimeSplit(timestamp: number | string | undefined | null): { date: string; time: string } | null {
    if (!timestamp || timestamp === 0 || timestamp === "0") {
        return null;
    }
    const date = new Date(Number(timestamp));
    if (isNaN(date.getTime())) {
        return null;
    }
    return {
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString(),
    };
}
