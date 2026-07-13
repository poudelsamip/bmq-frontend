// import { useState, useEffect, useCallback } from "react";
// import { useParams } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { queueApi, type FlowTreeNode } from "../../api/queue.api";
// import { X, ChevronDown, ChevronRight, GitBranch, AlertCircle, Clock, Layers } from "lucide-react";
// import { getStateBadgeStyle } from "../ui/StatusBadge";

// // ── Status helpers ─────────────────────────────────────────────────────────────

// function getStatusDotColor(status: string): string {
//     switch (status?.toLowerCase()) {
//         case "completed": return "#22c55e";
//         case "failed":    return "#ffb4ab";
//         case "active":    return "#60a5fa";
//         case "delayed":
//         case "waiting":   return "#facc15";
//         default:          return "var(--color-on-surface-variant)";
//     }
// }

// function getConnectorColor(status: string): string {
//     switch (status?.toLowerCase()) {
//         case "completed": return "rgba(34,197,94,0.4)";
//         case "failed":    return "rgba(255,180,171,0.4)";
//         case "active":    return "rgba(96,165,250,0.4)";
//         default:          return "rgba(67,70,85,0.7)";
//     }
// }

// // ── Children row ───────────────────────────────────────────────────────────────

// function ChildrenRow({
//     nodes,
//     onSelect,
//     selectedId,
//     parentStatus,
// }: {
//     nodes: FlowTreeNode[];
//     onSelect: (n: FlowTreeNode) => void;
//     selectedId: string | null;
//     parentStatus: string;
// }) {
//     const connColor = getConnectorColor(parentStatus);
//     return (
//         <div style={{ display: "flex", alignItems: "flex-start", gap: 36, position: "relative" }}>
//             {/* Horizontal bar across multiple children */}
//             {nodes.length > 1 && (
//                 <div style={{
//                     position: "absolute",
//                     top: 0,
//                     left: "50%",
//                     transform: "translateX(-50%)",
//                     width: "100%",
//                     height: 2,
//                     background: connColor,
//                 }} />
//             )}
//             {nodes.map((child) => (
//                 <div key={child.id} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//                     {/* Vertical drop */}
//                     <div style={{ width: 2, height: 18, background: connColor }} />
//                     <TreeNodeCard
//                         node={child}
//                         isSelected={selectedId === child.id}
//                         onSelect={onSelect}
//                         isRoot={false}
//                     />
//                 </div>
//             ))}
//         </div>
//     );
// }

// // ── Single node card ───────────────────────────────────────────────────────────

// function TreeNodeCard({
//     node,
//     isSelected,
//     onSelect,
//     isRoot,
// }: {
//     node: FlowTreeNode;
//     isSelected: boolean;
//     onSelect: (n: FlowTreeNode) => void;
//     isRoot: boolean;
// }) {
//     const [collapsed, setCollapsed] = useState(false);
//     const hasChildren = node.children.length > 0;
//     const connColor = getConnectorColor(node.status);

//     return (
//         <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//             {/* Card */}
//             <div
//                 onClick={() => onSelect(node)}
//                 style={{
//                     background: isSelected ? "rgba(183,196,255,0.1)" : "var(--color-surface-container)",
//                     border: isSelected
//                         ? "1.5px solid var(--color-primary)"
//                         : "1px solid var(--color-outline-variant)",
//                     borderRadius: 10,
//                     padding: "12px 16px",
//                     minWidth: 170,
//                     maxWidth: 230,
//                     cursor: "pointer",
//                     transition: "border-color 0.15s, background 0.15s, box-shadow 0.15s",
//                     boxShadow: isSelected
//                         ? "0 0 0 3px rgba(183,196,255,0.15), 0 4px 16px rgba(0,0,0,0.3)"
//                         : "0 2px 8px rgba(0,0,0,0.25)",
//                     position: "relative",
//                     userSelect: "none",
//                 }}
//                 onMouseEnter={(e) => {
//                     if (!isSelected) {
//                         e.currentTarget.style.borderColor = "var(--color-primary-container)";
//                         e.currentTarget.style.background = "var(--color-surface-container-high)";
//                     }
//                 }}
//                 onMouseLeave={(e) => {
//                     if (!isSelected) {
//                         e.currentTarget.style.borderColor = "var(--color-outline-variant)";
//                         e.currentTarget.style.background = "var(--color-surface-container)";
//                     }
//                 }}
//             >
//                 {/* ROOT badge */}
//                 {isRoot && (
//                     <div style={{
//                         position: "absolute",
//                         top: -11,
//                         left: "50%",
//                         transform: "translateX(-50%)",
//                         background: "var(--color-primary-container)",
//                         color: "white",
//                         fontSize: 9,
//                         fontWeight: 700,
//                         letterSpacing: "0.1em",
//                         padding: "1px 8px",
//                         borderRadius: 99,
//                         whiteSpace: "nowrap",
//                         boxShadow: "0 2px 8px rgba(107,137,255,0.4)",
//                     }}>ROOT</div>
//                 )}

//                 {/* Failed indicator strip */}
//                 {node.status === "failed" && (
//                     <div style={{
//                         position: "absolute",
//                         top: 0, left: 0, bottom: 0,
//                         width: 3,
//                         background: "var(--color-error)",
//                         borderRadius: "10px 0 0 10px",
//                     }} />
//                 )}

//                 <p style={{
//                     color: "var(--color-on-surface)",
//                     fontFamily: "Manrope, sans-serif",
//                     fontWeight: 600,
//                     fontSize: 13,
//                     marginBottom: 3,
//                     overflow: "hidden",
//                     textOverflow: "ellipsis",
//                     whiteSpace: "nowrap",
//                     paddingLeft: node.status === "failed" ? 6 : 0,
//                 }}>{node.name}</p>

//                 <p style={{
//                     color: "var(--color-on-surface-variant)",
//                     fontSize: 10,
//                     marginBottom: 8,
//                     overflow: "hidden",
//                     textOverflow: "ellipsis",
//                     whiteSpace: "nowrap",
//                 }}>{node.queueName}</p>

//                 <span style={{
//                     ...getStateBadgeStyle(node.status),
//                     fontSize: 9,
//                     fontFamily: "monospace",
//                     fontWeight: 700,
//                     display: "inline-flex",
//                     alignItems: "center",
//                     gap: 4,
//                     padding: "2px 8px",
//                     borderRadius: 99,
//                 }}>
//                     <span style={{
//                         width: 6, height: 6,
//                         borderRadius: "50%",
//                         background: getStatusDotColor(node.status),
//                         flexShrink: 0,
//                         boxShadow: `0 0 5px ${getStatusDotColor(node.status)}`,
//                     }} />
//                     {node.status.toUpperCase()}
//                 </span>

//                 {/* Collapse toggle button */}
//                 {hasChildren && (
//                     <button
//                         onClick={(e) => { e.stopPropagation(); setCollapsed((v) => !v); }}
//                         style={{
//                             position: "absolute",
//                             bottom: -13,
//                             left: "50%",
//                             transform: "translateX(-50%)",
//                             background: "var(--color-surface-container-highest)",
//                             border: `1px solid ${connColor}`,
//                             borderRadius: "50%",
//                             width: 24, height: 24,
//                             display: "flex", alignItems: "center", justifyContent: "center",
//                             cursor: "pointer",
//                             color: "var(--color-primary)",
//                             zIndex: 2, padding: 0,
//                             transition: "background 0.15s",
//                         }}
//                         title={collapsed ? "Expand" : "Collapse"}
//                     >
//                         {collapsed ? <ChevronRight size={13} /> : <ChevronDown size={13} />}
//                     </button>
//                 )}
//             </div>

//             {/* Children subtree */}
//             {hasChildren && !collapsed && (
//                 <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 26 }}>
//                     {/* Vertical stem */}
//                     <div style={{ width: 2, height: 14, background: connColor }} />
//                     <ChildrenRow
//                         nodes={node.children}
//                         onSelect={onSelect}
//                         selectedId={null}
//                         parentStatus={node.status}
//                     />
//                 </div>
//             )}

//             {/* Collapsed pill */}
//             {hasChildren && collapsed && (
//                 <div style={{
//                     marginTop: 30,
//                     fontSize: 10,
//                     color: "var(--color-on-surface-variant)",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 4,
//                     background: "var(--color-surface-container)",
//                     border: "1px solid var(--color-outline-variant)",
//                     padding: "2px 8px",
//                     borderRadius: 99,
//                 }}>
//                     <Layers size={10} />
//                     {node.children.length} hidden
//                 </div>
//             )}
//         </div>
//     );
// }

// // ── Stats bar ──────────────────────────────────────────────────────────────────

// function countStatuses(node: FlowTreeNode, acc: Record<string, number> = {}): Record<string, number> {
//     acc[node.status] = (acc[node.status] ?? 0) + 1;
//     for (const c of node.children) countStatuses(c, acc);
//     return acc;
// }

// function countTotal(node: FlowTreeNode): number {
//     return 1 + node.children.reduce((s, c) => s + countTotal(c), 0);
// }

// function TreeStatsBar({ root }: { root: FlowTreeNode }) {
//     const counts = countStatuses(root);
//     const total = countTotal(root);
//     const ORDER = ["completed", "active", "failed", "waiting", "delayed"];
//     return (
//         <div style={{
//             display: "flex", alignItems: "center", gap: 14,
//             padding: "8px 20px",
//             borderBottom: "1px solid var(--color-outline-variant)",
//             flexWrap: "wrap", flexShrink: 0,
//             background: "var(--color-surface-container-lowest)",
//         }}>
//             <span style={{
//                 color: "var(--color-on-surface-variant)", fontSize: 11,
//                 display: "flex", alignItems: "center", gap: 5,
//             }}>
//                 <Clock size={12} />
//                 {total} node{total !== 1 ? "s" : ""}
//             </span>
//             {ORDER.filter(s => counts[s]).map(status => (
//                 <span key={status} style={{
//                     ...getStateBadgeStyle(status),
//                     fontSize: 10, fontFamily: "monospace", fontWeight: 700,
//                     display: "inline-flex", alignItems: "center", gap: 4,
//                     padding: "2px 9px", borderRadius: 99,
//                 }}>
//                     ● {counts[status]} {status}
//                 </span>
//             ))}
//         </div>
//     );
// }

// // ── Node detail panel ──────────────────────────────────────────────────────────

// function NodeDetailPanel({ node }: { node: FlowTreeNode }) {
//     return (
//         <div style={{
//             width: 260, flexShrink: 0,
//             borderLeft: "1px solid var(--color-outline-variant)",
//             padding: "20px 18px",
//             overflowY: "auto",
//             background: "var(--color-surface-container-lowest)",
//         }}>
//             <h3 style={{
//                 color: "var(--color-primary)",
//                 fontFamily: "Manrope, sans-serif",
//                 fontWeight: 700, fontSize: 13,
//                 marginBottom: 18,
//                 display: "flex", alignItems: "center", gap: 6,
//             }}>
//                 <GitBranch size={14} /> Node Details
//             </h3>

//             <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
//                 {([
//                     ["Job ID", node.id, true],
//                     ["Name", node.name, false],
//                     ["Queue", node.queueName, false],
//                     ["Attempts Made", String(node.attemptsMade), false],
//                     ["Created At", new Date(node.timestamp).toLocaleString(), false],
//                 ] as [string, string, boolean][]).map(([label, value, mono]) => (
//                     <div key={label}>
//                         <p style={{
//                             color: "var(--color-on-surface-variant)",
//                             fontSize: 10, fontWeight: 600,
//                             textTransform: "uppercase", letterSpacing: "0.08em",
//                             marginBottom: 3,
//                         }}>{label}</p>
//                         <p style={{
//                             color: "var(--color-on-surface)",
//                             fontSize: 12,
//                             fontFamily: mono ? "monospace" : "inherit",
//                             wordBreak: "break-all",
//                         }}>{value || "—"}</p>
//                     </div>
//                 ))}

//                 {/* Status badge */}
//                 <div>
//                     <p style={{
//                         color: "var(--color-on-surface-variant)",
//                         fontSize: 10, fontWeight: 600,
//                         textTransform: "uppercase", letterSpacing: "0.08em",
//                         marginBottom: 6,
//                     }}>Status</p>
//                     <span style={{
//                         ...getStateBadgeStyle(node.status),
//                         fontSize: 10, fontFamily: "monospace", fontWeight: 700,
//                         display: "inline-flex", alignItems: "center", gap: 5,
//                         padding: "3px 10px", borderRadius: 99,
//                     }}>
//                         <span style={{
//                             width: 7, height: 7, borderRadius: "50%",
//                             background: getStatusDotColor(node.status),
//                             boxShadow: `0 0 6px ${getStatusDotColor(node.status)}`,
//                         }} />
//                         {node.status.toUpperCase()}
//                     </span>
//                 </div>

//                 {/* Children count */}
//                 {node.children.length > 0 && (
//                     <div>
//                         <p style={{
//                             color: "var(--color-on-surface-variant)",
//                             fontSize: 10, fontWeight: 600,
//                             textTransform: "uppercase", letterSpacing: "0.08em",
//                             marginBottom: 3,
//                         }}>Children</p>
//                         <p style={{ color: "var(--color-on-surface)", fontSize: 12, display: "flex", alignItems: "center", gap: 5 }}>
//                             <Layers size={12} style={{ color: "var(--color-primary)" }} />
//                             {node.children.length} child job{node.children.length !== 1 ? "s" : ""}
//                         </p>
//                     </div>
//                 )}

//                 {/* Failed reason */}
//                 {node.failedReason && (
//                     <div>
//                         <p style={{
//                             color: "var(--color-on-surface-variant)",
//                             fontSize: 10, fontWeight: 600,
//                             textTransform: "uppercase", letterSpacing: "0.08em",
//                             marginBottom: 6,
//                         }}>Failure Reason</p>
//                         <div style={{
//                             background: "rgba(147,0,10,0.2)",
//                             border: "1px solid rgba(255,180,171,0.25)",
//                             borderLeft: "3px solid var(--color-error)",
//                             borderRadius: 6,
//                             padding: "8px 10px",
//                             fontSize: 11,
//                             color: "var(--color-on-error-container)",
//                             fontFamily: "monospace",
//                             wordBreak: "break-word",
//                             lineHeight: 1.5,
//                         }}>
//                             <AlertCircle size={11} style={{ display: "inline", marginRight: 5, verticalAlign: "middle", color: "var(--color-error)" }} />
//                             {node.failedReason}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// // ── Modal export ───────────────────────────────────────────────────────────────

// export default function FlowTreeModal({
//     jobId,
//     jobName,
//     onClose,
// }: {
//     jobId: string;
//     jobName?: string;
//     onClose: () => void;
// }) {
//     const { id, queueName } = useParams();
//     const [selectedNode, setSelectedNode] = useState<FlowTreeNode | null>(null);

//     const { data: tree, isLoading, isError } = useQuery<FlowTreeNode>({
//         queryKey: ["flowTree", id, queueName, jobId],
//         queryFn: async () => {
//             const res = await queueApi.getFlowTree(id!, queueName!, jobId);
//             return res.data;
//         },
//         enabled: !!id && !!queueName && !!jobId,
//         staleTime: 15_000,
//     });

//     // Auto-select root node
//     useEffect(() => {
//         if (tree && !selectedNode) setSelectedNode(tree);
//     }, [tree]);

//     // ESC to close
//     const handleKey = useCallback((e: KeyboardEvent) => {
//         if (e.key === "Escape") onClose();
//     }, [onClose]);

//     useEffect(() => {
//         document.addEventListener("keydown", handleKey);
//         return () => document.removeEventListener("keydown", handleKey);
//     }, [handleKey]);

//     return (
//         <div
//             style={{
//                 position: "fixed", inset: 0,
//                 background: "rgba(10,9,18,0.80)",
//                 backdropFilter: "blur(6px)",
//                 zIndex: 100,
//                 display: "flex", alignItems: "center", justifyContent: "center",
//                 padding: "24px",
//             }}
//             onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
//         >
//             {/* Modal shell */}
//             <div
//                 onClick={(e) => e.stopPropagation()}
//                 style={{
//                     background: "var(--color-surface-container-low)",
//                     border: "1px solid var(--color-outline-variant)",
//                     borderRadius: 14,
//                     display: "flex", flexDirection: "column",
//                     overflow: "hidden",
//                     width: "100%", maxWidth: 1100,
//                     height: "100%", maxHeight: "calc(100vh - 48px)",
//                     boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
//                     animation: "ft-in 0.22s cubic-bezier(0.16,1,0.3,1)",
//                 }}
//             >
//                 {/* HEADER */}
//                 <div style={{
//                     padding: "14px 20px", flexShrink: 0,
//                     borderBottom: "1px solid var(--color-outline-variant)",
//                     display: "flex", alignItems: "center", justifyContent: "space-between",
//                 }}>
//                     <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                         <div style={{
//                             width: 34, height: 34, borderRadius: 8,
//                             background: "rgba(183,196,255,0.1)",
//                             border: "1px solid rgba(183,196,255,0.2)",
//                             display: "flex", alignItems: "center", justifyContent: "center",
//                         }}>
//                             <GitBranch size={17} style={{ color: "var(--color-primary)" }} />
//                         </div>
//                         <div>
//                             <h2 style={{
//                                 fontFamily: "Manrope, sans-serif",
//                                 fontWeight: 700, fontSize: 15,
//                                 color: "var(--color-on-surface)", margin: 0,
//                             }}>Flow Tree</h2>
//                             {jobName && (
//                                 <p style={{
//                                     fontSize: 11, color: "var(--color-on-surface-variant)",
//                                     margin: 0, marginTop: 1,
//                                 }}>
//                                     {jobName} · {queueName}
//                                 </p>
//                             )}
//                         </div>
//                     </div>

//                     <button
//                         onClick={onClose}
//                         style={{
//                             background: "transparent", border: "none",
//                             color: "var(--color-on-surface-variant)",
//                             cursor: "pointer", padding: 5, borderRadius: 6,
//                             display: "flex", alignItems: "center", justifyContent: "center",
//                             transition: "color 0.15s, background 0.15s",
//                         }}
//                         onMouseEnter={(e) => {
//                             e.currentTarget.style.color = "var(--color-on-surface)";
//                             e.currentTarget.style.background = "var(--color-surface-container)";
//                         }}
//                         onMouseLeave={(e) => {
//                             e.currentTarget.style.color = "var(--color-on-surface-variant)";
//                             e.currentTarget.style.background = "transparent";
//                         }}
//                         title="Close (Esc)"
//                     >
//                         <X size={20} />
//                     </button>
//                 </div>

//                 {/* STATS BAR */}
//                 {tree && <TreeStatsBar root={tree} />}

//                 {/* BODY */}
//                 <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
//                     {/* Tree canvas */}
//                     <div style={{ flex: 1, overflow: "auto", position: "relative" }}>
//                         {isLoading && (
//                             <div style={{
//                                 display: "flex", flexDirection: "column",
//                                 alignItems: "center", justifyContent: "center",
//                                 height: "100%", gap: 16,
//                                 color: "var(--color-on-surface-variant)",
//                             }}>
//                                 <div style={{
//                                     width: 38, height: 38,
//                                     border: "3px solid var(--color-outline-variant)",
//                                     borderTopColor: "var(--color-primary)",
//                                     borderRadius: "50%",
//                                     animation: "ft-spin 0.75s linear infinite",
//                                 }} />
//                                 <p style={{ fontSize: 13 }}>Building flow tree…</p>
//                             </div>
//                         )}

//                         {isError && (
//                             <div style={{
//                                 display: "flex", flexDirection: "column",
//                                 alignItems: "center", justifyContent: "center",
//                                 height: "100%", gap: 12, padding: 32, textAlign: "center",
//                             }}>
//                                 <div style={{
//                                     width: 56, height: 56, borderRadius: "50%",
//                                     background: "rgba(147,0,10,0.2)",
//                                     display: "flex", alignItems: "center", justifyContent: "center",
//                                 }}>
//                                     <AlertCircle size={28} style={{ color: "var(--color-error)" }} />
//                                 </div>
//                                 <p style={{ color: "var(--color-error)", fontSize: 15, fontWeight: 700, fontFamily: "Manrope, sans-serif" }}>
//                                     Flow tree unavailable
//                                 </p>
//                                 <p style={{ color: "var(--color-on-surface-variant)", fontSize: 13, maxWidth: 340, lineHeight: 1.6 }}>
//                                     This job may not belong to a BullMQ Flow, or it may be a standalone job with no parent/child relationships.
//                                 </p>
//                             </div>
//                         )}

//                         {tree && (
//                             <div style={{
//                                 display: "flex",
//                                 justifyContent: "center",
//                                 padding: "44px 32px 56px",
//                                 minWidth: "max-content",
//                             }}>
//                                 <TreeNodeCard
//                                     node={tree}
//                                     isSelected={selectedNode?.id === tree.id}
//                                     onSelect={setSelectedNode}
//                                     isRoot={true}
//                                 />
//                             </div>
//                         )}
//                     </div>

//                     {/* Detail panel */}
//                     {selectedNode && <NodeDetailPanel node={selectedNode} />}
//                 </div>
//             </div>

//             <style>{`
//                 @keyframes ft-in {
//                     from { opacity: 0; transform: scale(0.96) translateY(14px); }
//                     to   { opacity: 1; transform: scale(1)    translateY(0);    }
//                 }
//                 @keyframes ft-spin {
//                     to { transform: rotate(360deg); }
//                 }
//             `}</style>
//         </div>
//     );
// }


import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { queueApi, type FlowTreeNode } from "../../api/queue.api";
import {
    X,
    ChevronDown,
    ChevronRight,
    GitBranch,
    AlertCircle,
    Clock,
    Layers,
    Copy,
    Check,
    ZoomIn,
    ZoomOut,
    Maximize2,
} from "lucide-react";
import { getStateBadgeStyle } from "../ui/StatusBadge";

// ── Status helpers ─────────────────────────────────────────────────────────────

function getStatusDotColor(status: string): string {
    switch (status?.toLowerCase()) {
        case "completed": return "#22c55e";
        case "failed":    return "#ffb4ab";
        case "active":    return "#60a5fa";
        case "delayed":
        case "waiting":   return "#facc15";
        default:          return "var(--color-on-surface-variant)";
    }
}

function getConnectorColor(_status: string): string {
    // Whitish-grey connector lines, regardless of node status.
    return "rgba(200,205,220,0.25)";
}

function getStatusBorderColor(status: string): string {
    switch (status?.toLowerCase()) {
        case "completed": return "rgba(34,197,94,0.7)";
        case "failed":    return "rgba(255,100,80,0.75)";
        case "active":    return "rgba(96,165,250,0.7)";
        case "delayed":   return "rgba(250,204,21,0.65)";
        case "waiting":   return "rgba(250,204,21,0.65)";
        default:          return "var(--color-outline-variant)";
    }
}

// ── Children row ───────────────────────────────────────────────────────────────
//
// Each child gets its own wrapper with symmetric horizontal padding. The
// vertical "drop" to a child is always centered on that child's own card, and
// the horizontal connector is drawn per-child (half-width for the first/last,
// full-width for the ones in between) so the joints line up exactly under
// each card regardless of how wide individual cards are. This avoids the
// classic bug where a single full-width bar overshoots the outermost cards.

function ChildrenRow({
    nodes,
    onSelect,
    selectedId,
    parentStatus,
}: {
    nodes: FlowTreeNode[];
    onSelect: (n: FlowTreeNode) => void;
    selectedId: string | null;
    parentStatus: string;
}) {
    const connColor = getConnectorColor(parentStatus);
    const multiple = nodes.length > 1;

    return (
        <div style={{ display: "flex", alignItems: "flex-start" }}>
            {nodes.map((child, i) => {
                const isFirst = i === 0;
                const isLast = i === nodes.length - 1;
                return (
                    <div
                        key={child.id}
                        style={{
                            position: "relative",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: multiple ? "0 18px" : 0,
                        }}
                    >
                        {/* Horizontal connector segment for this child's slice of the row */}
                        {multiple && (
                            <div style={{
                                position: "absolute",
                                top: 0,
                                height: 2,
                                background: connColor,
                                left: isFirst ? "50%" : 0,
                                right: isLast ? "50%" : 0,
                            }} />
                        )}
                        {/* Vertical drop, centered on this child's card */}
                        <div style={{ width: 2, height: 18, background: connColor }} />
                        <TreeNodeCard
                            node={child}
                            selectedId={selectedId}
                            onSelect={onSelect}
                            isRoot={false}
                        />
                    </div>
                );
            })}
        </div>
    );
}

// ── Single node card ───────────────────────────────────────────────────────────

function TreeNodeCard({
    node,
    selectedId,
    onSelect,
    isRoot,
}: {
    node: FlowTreeNode;
    selectedId: string | null;
    onSelect: (n: FlowTreeNode) => void;
    isRoot: boolean;
}) {
    const [collapsed, setCollapsed] = useState(false);
    const hasChildren = node.children.length > 0;
    const connColor = getConnectorColor(node.status);
    const isSelected = selectedId === node.id;

    const activate = () => onSelect(node);

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* Card */}
            <div
                className="ft-node-card"
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                aria-label={`${node.name}, ${node.status}${hasChildren ? `, ${node.children.length} children` : ""}`}
                onClick={activate}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        activate();
                    }
                }}
                style={{
                    background: isSelected ? "rgba(183,196,255,0.1)" : "var(--color-surface-container)",
                    border: isSelected
                        ? `1.5px solid var(--color-primary)`
                        : `1.5px solid ${getStatusBorderColor(node.status)}`,
                    borderRadius: 10,
                    padding: "12px 16px",
                    minWidth: 170,
                    maxWidth: 230,
                    cursor: "pointer",
                    transition: "border-color 0.15s, background 0.15s, box-shadow 0.15s",
                    boxShadow: isSelected
                        ? "0 0 0 3px rgba(183,196,255,0.15), 0 4px 16px rgba(0,0,0,0.3)"
                        : "0 2px 8px rgba(0,0,0,0.25)",
                    position: "relative",
                    userSelect: "none",
                }}
                onMouseEnter={(e) => {
                    if (!isSelected) {
                        e.currentTarget.style.background = "var(--color-surface-container-high)";
                    }
                }}
                onMouseLeave={(e) => {
                    if (!isSelected) {
                        e.currentTarget.style.background = "var(--color-surface-container)";
                    }
                }}
            >
                {/* ROOT badge */}
                {isRoot && (
                    <div style={{
                        position: "absolute",
                        top: -11,
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "var(--color-primary-container)",
                        color: "white",
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        padding: "1px 8px",
                        borderRadius: 99,
                        whiteSpace: "nowrap",
                        boxShadow: "0 2px 8px rgba(107,137,255,0.4)",
                    }}>ROOT</div>
                )}

                <p style={{
                    color: "var(--color-on-surface)",
                    fontFamily: "Manrope, sans-serif",
                    fontWeight: 600,
                    fontSize: 13,
                    marginBottom: 3,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                }}>{node.name}</p>

                <p style={{
                    color: "var(--color-on-surface-variant)",
                    fontSize: 10,
                    marginBottom: 8,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                }}>{node.queueName}</p>

                <span style={{
                    ...getStateBadgeStyle(node.status),
                    fontSize: 9,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "2px 8px",
                    borderRadius: 99,
                }}>
                    <span style={{
                        width: 6, height: 6,
                        borderRadius: "50%",
                        background: getStatusDotColor(node.status),
                        flexShrink: 0,
                        boxShadow: `0 0 5px ${getStatusDotColor(node.status)}`,
                    }} />
                    {node.status.toUpperCase()}
                </span>

                {/* Collapse toggle button */}
                {hasChildren && (
                    <button
                        onClick={(e) => { e.stopPropagation(); setCollapsed((v) => !v); }}
                        aria-label={collapsed ? `Expand ${node.children.length} children` : "Collapse children"}
                        aria-expanded={!collapsed}
                        style={{
                            position: "absolute",
                            bottom: -13,
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: "var(--color-surface-container-highest)",
                            border: `1px solid ${connColor}`,
                            borderRadius: "50%",
                            width: 24, height: 24,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            cursor: "pointer",
                            color: "var(--color-primary)",
                            zIndex: 2, padding: 0,
                            transition: "background 0.15s",
                        }}
                        title={collapsed ? "Expand" : "Collapse"}
                    >
                        {collapsed ? <ChevronRight size={13} /> : <ChevronDown size={13} />}
                    </button>
                )}
            </div>

            {/* Children subtree */}
            {hasChildren && !collapsed && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 26 }}>
                    {/* Vertical stem */}
                    <div style={{ width: 2, height: 14, background: connColor }} />
                    <ChildrenRow
                        nodes={node.children}
                        onSelect={onSelect}
                        selectedId={selectedId}
                        parentStatus={node.status}
                    />
                </div>
            )}

            {/* Collapsed pill */}
            {hasChildren && collapsed && (
                <div style={{
                    marginTop: 30,
                    fontSize: 10,
                    color: "var(--color-on-surface-variant)",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    background: "var(--color-surface-container)",
                    border: "1px solid var(--color-outline-variant)",
                    padding: "2px 8px",
                    borderRadius: 99,
                }}>
                    <Layers size={10} />
                    {node.children.length} hidden
                </div>
            )}
        </div>
    );
}

// ── Stats bar ──────────────────────────────────────────────────────────────────

function countStatuses(node: FlowTreeNode, acc: Record<string, number> = {}): Record<string, number> {
    acc[node.status] = (acc[node.status] ?? 0) + 1;
    for (const c of node.children) countStatuses(c, acc);
    return acc;
}

function countTotal(node: FlowTreeNode): number {
    return 1 + node.children.reduce((s, c) => s + countTotal(c), 0);
}

function TreeStatsBar({ root }: { root: FlowTreeNode }) {
    const { counts, total } = useMemo(
        () => ({ counts: countStatuses(root), total: countTotal(root) }),
        [root]
    );
    const ORDER = ["completed", "active", "failed", "waiting", "delayed"];
    return (
        <div style={{
            display: "flex", alignItems: "center", gap: 14,
            padding: "8px 20px",
            borderBottom: "1px solid var(--color-outline-variant)",
            flexWrap: "wrap", flexShrink: 0,
            background: "var(--color-surface-container-lowest)",
        }}>
            <span style={{
                color: "var(--color-on-surface-variant)", fontSize: 11,
                display: "flex", alignItems: "center", gap: 5,
            }}>
                <Clock size={12} />
                {total} node{total !== 1 ? "s" : ""}
            </span>
            {ORDER.filter(s => counts[s]).map(status => (
                <span key={status} style={{
                    ...getStateBadgeStyle(status),
                    fontSize: 10, fontFamily: "monospace", fontWeight: 700,
                    display: "inline-flex", alignItems: "center", gap: 4,
                    padding: "2px 9px", borderRadius: 99,
                }}>
                    ● {counts[status]} {status}
                </span>
            ))}
        </div>
    );
}

// ── Node detail panel ──────────────────────────────────────────────────────────

function CopyableValue({ value }: { value: string }) {
    const [copied, setCopied] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => setCopied(false), 1500);
        } catch {
            // Clipboard API unavailable (e.g. insecure context) — fail silently.
        }
    };

    useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

    return (
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <p style={{
                color: "var(--color-on-surface)",
                fontSize: 12,
                fontFamily: "monospace",
                wordBreak: "break-all",
                margin: 0,
            }}>{value}</p>
            <button
                onClick={copy}
                aria-label={copied ? "Copied" : "Copy job ID"}
                title={copied ? "Copied" : "Copy"}
                style={{
                    background: "transparent",
                    border: "none",
                    color: copied ? "#22c55e" : "var(--color-on-surface-variant)",
                    cursor: "pointer",
                    padding: 2,
                    display: "flex",
                    flexShrink: 0,
                }}
            >
                {copied ? <Check size={12} /> : <Copy size={12} />}
            </button>
        </div>
    );
}

function NodeDetailPanel({ node }: { node: FlowTreeNode }) {
    return (
        <div style={{
            width: 260, flexShrink: 0,
            borderLeft: "1px solid var(--color-outline-variant)",
            padding: "20px 18px",
            overflowY: "auto",
            background: "var(--color-surface-container-lowest)",
        }}>
            <h3 style={{
                color: "var(--color-primary)",
                fontFamily: "Manrope, sans-serif",
                fontWeight: 700, fontSize: 13,
                marginBottom: 18,
                display: "flex", alignItems: "center", gap: 6,
            }}>
                <GitBranch size={14} /> Node Details
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                    <p style={{
                        color: "var(--color-on-surface-variant)",
                        fontSize: 10, fontWeight: 600,
                        textTransform: "uppercase", letterSpacing: "0.08em",
                        marginBottom: 3,
                    }}>Job ID</p>
                    <CopyableValue value={node.id} />
                </div>

                {([
                    ["Name", node.name],
                    ["Queue", node.queueName],
                    ["Attempts Made", String(node.attemptsMade)],
                    ["Created At", node.timestamp ? new Date(node.timestamp).toLocaleString() : "—"],
                ] as [string, string][]).map(([label, value]) => (
                    <div key={label}>
                        <p style={{
                            color: "var(--color-on-surface-variant)",
                            fontSize: 10, fontWeight: 600,
                            textTransform: "uppercase", letterSpacing: "0.08em",
                            marginBottom: 3,
                        }}>{label}</p>
                        <p style={{
                            color: "var(--color-on-surface)",
                            fontSize: 12,
                            wordBreak: "break-all",
                        }}>{value || "—"}</p>
                    </div>
                ))}

                {/* Status badge */}
                <div>
                    <p style={{
                        color: "var(--color-on-surface-variant)",
                        fontSize: 10, fontWeight: 600,
                        textTransform: "uppercase", letterSpacing: "0.08em",
                        marginBottom: 6,
                    }}>Status</p>
                    <span style={{
                        ...getStateBadgeStyle(node.status),
                        fontSize: 10, fontFamily: "monospace", fontWeight: 700,
                        display: "inline-flex", alignItems: "center", gap: 5,
                        padding: "3px 10px", borderRadius: 99,
                    }}>
                        <span style={{
                            width: 7, height: 7, borderRadius: "50%",
                            background: getStatusDotColor(node.status),
                            boxShadow: `0 0 6px ${getStatusDotColor(node.status)}`,
                        }} />
                        {node.status.toUpperCase()}
                    </span>
                </div>

                {/* Children count */}
                {node.children.length > 0 && (
                    <div>
                        <p style={{
                            color: "var(--color-on-surface-variant)",
                            fontSize: 10, fontWeight: 600,
                            textTransform: "uppercase", letterSpacing: "0.08em",
                            marginBottom: 3,
                        }}>Children</p>
                        <p style={{ color: "var(--color-on-surface)", fontSize: 12, display: "flex", alignItems: "center", gap: 5 }}>
                            <Layers size={12} style={{ color: "var(--color-primary)" }} />
                            {node.children.length} child job{node.children.length !== 1 ? "s" : ""}
                        </p>
                    </div>
                )}

                {/* Failed reason */}
                {node.failedReason && (
                    <div>
                        <p style={{
                            color: "var(--color-on-surface-variant)",
                            fontSize: 10, fontWeight: 600,
                            textTransform: "uppercase", letterSpacing: "0.08em",
                            marginBottom: 6,
                        }}>Failure Reason</p>
                        <div style={{
                            background: "rgba(147,0,10,0.2)",
                            border: "1px solid rgba(255,180,171,0.25)",
                            borderLeft: "3px solid var(--color-error)",
                            borderRadius: 6,
                            padding: "8px 10px",
                            fontSize: 11,
                            color: "var(--color-on-error-container)",
                            fontFamily: "monospace",
                            wordBreak: "break-word",
                            lineHeight: 1.5,
                            maxHeight: 160,
                            overflowY: "auto",
                        }}>
                            <AlertCircle size={11} style={{ display: "inline", marginRight: 5, verticalAlign: "middle", color: "var(--color-error)" }} />
                            {node.failedReason}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// ── Zoom controls ────────────────────────────────────────────────────────────

const ZOOM_MIN = 0.5;
const ZOOM_MAX = 1.5;
const ZOOM_STEP = 0.1;

function ZoomControls({
    zoom,
    onZoomIn,
    onZoomOut,
    onReset,
}: {
    zoom: number;
    onZoomIn: () => void;
    onZoomOut: () => void;
    onReset: () => void;
}) {
    const btnStyle: React.CSSProperties = {
        background: "var(--color-surface-container-highest)",
        border: "1px solid var(--color-outline-variant)",
        color: "var(--color-on-surface-variant)",
        cursor: "pointer",
        width: 26, height: 26,
        borderRadius: 6,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 0,
    };
    return (
        <div style={{
            position: "absolute",
            top: 12, right: 12,
            display: "flex", alignItems: "center", gap: 4,
            background: "var(--color-surface-container-low)",
            border: "1px solid var(--color-outline-variant)",
            borderRadius: 8,
            padding: 4,
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            zIndex: 3,
        }}>
            <button style={btnStyle} onClick={onZoomOut} disabled={zoom <= ZOOM_MIN} aria-label="Zoom out" title="Zoom out">
                <ZoomOut size={13} />
            </button>
            <span style={{ fontSize: 10, color: "var(--color-on-surface-variant)", minWidth: 32, textAlign: "center", fontFamily: "monospace" }}>
                {Math.round(zoom * 100)}%
            </span>
            <button style={btnStyle} onClick={onZoomIn} disabled={zoom >= ZOOM_MAX} aria-label="Zoom in" title="Zoom in">
                <ZoomIn size={13} />
            </button>
            <button style={btnStyle} onClick={onReset} aria-label="Reset zoom" title="Reset zoom">
                <Maximize2 size={12} />
            </button>
        </div>
    );
}

// ── Modal export ───────────────────────────────────────────────────────────────

export default function FlowTreeModal({
    jobId,
    jobName,
    onClose,
}: {
    jobId: string;
    jobName?: string;
    onClose: () => void;
}) {
    const { id, queueName } = useParams();
    const [selectedNode, setSelectedNode] = useState<FlowTreeNode | null>(null);
    const [zoom, setZoom] = useState(1);

    const modalRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    const { data: tree, isLoading, isError } = useQuery<FlowTreeNode>({
        queryKey: ["flowTree", id, queueName, jobId],
        queryFn: async () => {
            const res = await queueApi.getFlowTree(id!, queueName!, jobId);
            return res.data;
        },
        enabled: !!id && !!queueName && !!jobId,
        staleTime: 15_000,
    });

    // Reset selection whenever a different job is opened in this modal.
    useEffect(() => {
        setSelectedNode(null);
    }, [jobId]);

    // Auto-select the root node once the tree loads (or reloads after a reset).
    useEffect(() => {
        if (tree && !selectedNode) setSelectedNode(tree);
    }, [tree, selectedNode]);

    // Focus the close button on open so keyboard users land inside the modal.
    useEffect(() => {
        closeButtonRef.current?.focus();
    }, []);

    // ESC to close, Tab to stay trapped within the modal.
    const handleKey = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape") {
            onClose();
            return;
        }
        if (e.key === "Tab" && modalRef.current) {
            const focusables = Array.from(
                modalRef.current.querySelectorAll<HTMLElement>(
                    'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                )
            );
            if (focusables.length === 0) return;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    }, [onClose]);

    useEffect(() => {
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [handleKey]);

    const zoomIn = () => setZoom((z) => Math.min(ZOOM_MAX, Math.round((z + ZOOM_STEP) * 100) / 100));
    const zoomOut = () => setZoom((z) => Math.max(ZOOM_MIN, Math.round((z - ZOOM_STEP) * 100) / 100));
    const zoomReset = () => setZoom(1);

    return (
        <div
            style={{
                position: "fixed", inset: 0,
                background: "rgba(10,9,18,0.80)",
                backdropFilter: "blur(6px)",
                zIndex: 100,
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "24px",
            }}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            {/* Modal shell */}
            <div
                ref={modalRef}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="flow-tree-modal-title"
                style={{
                    background: "var(--color-surface-container-low)",
                    border: "1px solid var(--color-outline-variant)",
                    borderRadius: 14,
                    display: "flex", flexDirection: "column",
                    overflow: "hidden",
                    width: "100%", maxWidth: 1100,
                    height: "100%", maxHeight: "calc(100vh - 48px)",
                    boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
                    animation: "ft-in 0.22s cubic-bezier(0.16,1,0.3,1)",
                }}
            >
                {/* HEADER */}
                <div style={{
                    padding: "14px 20px", flexShrink: 0,
                    borderBottom: "1px solid var(--color-outline-variant)",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{
                            width: 34, height: 34, borderRadius: 8,
                            background: "rgba(183,196,255,0.1)",
                            border: "1px solid rgba(183,196,255,0.2)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                            <GitBranch size={17} style={{ color: "var(--color-primary)" }} />
                        </div>
                        <div>
                            <h2 id="flow-tree-modal-title" style={{
                                fontFamily: "Manrope, sans-serif",
                                fontWeight: 700, fontSize: 15,
                                color: "var(--color-on-surface)", margin: 0,
                            }}>Flow Tree</h2>
                            {jobName && (
                                <p style={{
                                    fontSize: 11, color: "var(--color-on-surface-variant)",
                                    margin: 0, marginTop: 1,
                                }}>
                                    {jobName} · {queueName}
                                </p>
                            )}
                        </div>
                    </div>

                    <button
                        ref={closeButtonRef}
                        onClick={onClose}
                        aria-label="Close flow tree"
                        style={{
                            background: "transparent", border: "none",
                            color: "var(--color-on-surface-variant)",
                            cursor: "pointer", padding: 5, borderRadius: 6,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            transition: "color 0.15s, background 0.15s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = "var(--color-on-surface)";
                            e.currentTarget.style.background = "var(--color-surface-container)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = "var(--color-on-surface-variant)";
                            e.currentTarget.style.background = "transparent";
                        }}
                        title="Close (Esc)"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* STATS BAR */}
                {tree && <TreeStatsBar root={tree} />}

                {/* BODY */}
                <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
                    {/* Tree canvas */}
                    <div style={{ flex: 1, overflow: "auto", position: "relative" }}>
                        {tree && (
                            <ZoomControls zoom={zoom} onZoomIn={zoomIn} onZoomOut={zoomOut} onReset={zoomReset} />
                        )}

                        {isLoading && (
                            <div style={{
                                display: "flex", flexDirection: "column",
                                alignItems: "center", justifyContent: "center",
                                height: "100%", gap: 16,
                                color: "var(--color-on-surface-variant)",
                            }}>
                                <div style={{
                                    width: 38, height: 38,
                                    border: "3px solid var(--color-outline-variant)",
                                    borderTopColor: "var(--color-primary)",
                                    borderRadius: "50%",
                                    animation: "ft-spin 0.75s linear infinite",
                                }} />
                                <p style={{ fontSize: 13 }}>Building flow tree…</p>
                            </div>
                        )}

                        {isError && (
                            <div style={{
                                display: "flex", flexDirection: "column",
                                alignItems: "center", justifyContent: "center",
                                height: "100%", gap: 12, padding: 32, textAlign: "center",
                            }}>
                                <div style={{
                                    width: 56, height: 56, borderRadius: "50%",
                                    background: "rgba(147,0,10,0.2)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                }}>
                                    <AlertCircle size={28} style={{ color: "var(--color-error)" }} />
                                </div>
                                <p style={{ color: "var(--color-error)", fontSize: 15, fontWeight: 700, fontFamily: "Manrope, sans-serif" }}>
                                    Flow tree unavailable
                                </p>
                                <p style={{ color: "var(--color-on-surface-variant)", fontSize: 13, maxWidth: 340, lineHeight: 1.6 }}>
                                    This job may not belong to a BullMQ Flow, or it may be a standalone job with no parent/child relationships.
                                </p>
                            </div>
                        )}

                        {tree && (
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                padding: "44px 32px 56px",
                                minWidth: "max-content",
                                transform: `scale(${zoom})`,
                                transformOrigin: "top center",
                                transition: "transform 0.15s ease-out",
                            }}>
                                <TreeNodeCard
                                    node={tree}
                                    selectedId={selectedNode?.id ?? null}
                                    onSelect={setSelectedNode}
                                    isRoot={true}
                                />
                            </div>
                        )}
                    </div>

                    {/* Detail panel */}
                    {selectedNode && <NodeDetailPanel node={selectedNode} />}
                </div>
            </div>

            <style>{`
                @keyframes ft-in {
                    from { opacity: 0; transform: scale(0.96) translateY(14px); }
                    to   { opacity: 1; transform: scale(1)    translateY(0);    }
                }
                @keyframes ft-spin {
                    to { transform: rotate(360deg); }
                }
                .ft-node-card:focus-visible {
                    outline: 2px solid var(--color-primary);
                    outline-offset: 2px;
                }
                @media (prefers-reduced-motion: reduce) {
                    * { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
                }
            `}</style>
        </div>
    );
}