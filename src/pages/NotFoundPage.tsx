import { Link } from "react-router-dom";
import { Boxes } from "lucide-react";

export default function NotFoundPage() {
    return (
        <div
            className="min-h-screen flex items-center justify-center px-4 py-6"
            style={{
                background: "var(--color-background)",
                color: "var(--color-on-surface)",
                fontFamily: "Inter, sans-serif",
            }}
        >
            <main
                className="w-full max-w-md rounded-md p-6 sm:p-8 flex flex-col items-center text-center"
                style={{
                    background: "var(--color-surface-container-low)",
                    border: "1px solid var(--color-outline-variant)",
                }}
            >
                {/* ── Header ── */}
                <div className="flex items-center gap-2.5 mb-6">
                    <div
                        className="flex items-center justify-center w-9 h-9 rounded-sm"
                        style={{
                            background: "var(--color-primary-container)",
                        }}
                    >
                        <Boxes
                            size={20}
                            style={{
                                color: "var(--color-on-primary-container)",
                            }}
                        />
                    </div>
                    <h1
                        className="text-xl font-semibold tracking-tight"
                        style={{
                            color: "var(--color-on-surface)",
                            fontFamily: "Manrope, sans-serif",
                        }}
                    >
                        Bull Console
                    </h1>
                </div>

                {/* ── 404 ── */}
                <p
                    className="text-6xl font-bold tracking-tight mb-2"
                    style={{
                        color: "var(--color-primary)",
                        fontFamily: "Manrope, sans-serif",
                    }}
                >
                    404
                </p>
                <h2
                    className="text-lg font-semibold mb-2"
                    style={{
                        color: "var(--color-on-surface)",
                        fontFamily: "Manrope, sans-serif",
                    }}
                >
                    Page not found
                </h2>
                <p
                    className="text-sm mb-8"
                    style={{ color: "var(--color-on-surface-variant)" }}
                >
                    The page you're looking for doesn't exist or may have been
                    moved.
                </p>

                {/* ── CTA ── */}
                <Link
                    to="/"
                    className="w-full py-2.5 text-sm font-semibold rounded-sm transition-all duration-150 active:scale-[0.98] text-center"
                    style={{
                        background: "var(--color-primary)",
                        color: "var(--color-on-primary)",
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.background =
                            "var(--color-primary-fixed)";
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.background =
                            "var(--color-primary)";
                    }}
                >
                    {"<- Home Page"}
                </Link>
            </main>
        </div>
    );
}
