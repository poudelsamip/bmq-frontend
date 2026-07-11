import type { ApiResponse } from "./auth.api";
import api from "./client";

export interface QueueStats {
    queueName: string;
    isPaused: boolean;
    counts: {
        [index: string]: number;
    };
}

export type JobStatus =
    | "active"
    | "completed"
    | "failed"
    | "waiting"
    | "delayed";

interface pagination {
    page: number;
    pageSize: number;
    hasMore: boolean;
}

export interface Job {
    id: string | undefined;
    name: string;
    queueName: string;
    state: "waiting" | "active" | "completed" | "failed" | "delayed";
    attemptsMade: number;
    timestamp: number;
    processedOn: number | undefined;
    finishedOn: number | undefined;
    duration: number | null;
    failedReason: string;
    parent: string;
    isFailed: boolean;
    isCompleted: boolean;
}

export interface JobDetails {
    id: string;
    name: string;
    queueName: string;

    state: JobStatus;

    payload: Record<string, unknown>;
    result: unknown;

    error: {
        message: string | null;
        stack: string[] | null;
    };

    attempts: {
        made: number;
        max: number | null;
    };

    timing: {
        createdAt: number;
        processedAt: number | null;
        finishedAt: number | null;
        duration: number | null;
    };

    config: {
        delay: number | null;
        priority: number | null;
        backoff: unknown;
        removeOnComplete: number | boolean | null;
        removeOnFail: number | boolean | null;
    };

    relations: {
        parent: unknown;
    };

    progress: number | object;

    logs: string[];
}

// ── New types for Tier 1 features ─────────────────────────────────────────────

export interface RetryJobOutcome {
    jobId: string;
    status: "retried" | "skipped" | "failed";
    reason?: string;
}

export interface RetryJobsSummary {
    total: number;
    retried: number;
    skipped: number;
    failed: number;
    results?: RetryJobOutcome[];
}

export interface CleanJobsResult {
    removed: number;
}

export interface CleanJobsOptions {
    grace?: number;
    limit?: number;
}

// ── API functions ─────────────────────────────────────────────────────────────

export const queueApi = {
    getStats: async (projectId: string, queueName: string) => {
        const response = await api.get<ApiResponse<QueueStats>>(
            `/project/${projectId}/queues/${queueName}/stats`,
        );
        return response.data;
    },

    getJobs: async (projectId: string, queueName: string) => {
        const response = await api.get<
            ApiResponse<{ jobs: Job[]; pagination: pagination }>
        >(`/project/${projectId}/queues/${queueName}/jobs`);
        return response.data;
    },

    getJobDetails: async (
        projectId: string,
        queueName: string,
        jobId: string,
    ) => {
        const response = await api.get<ApiResponse<JobDetails>>(
            `/project/${projectId}/queues/${queueName}/jobs/${jobId}`,
        );
        return response.data;
    },

    streamEventSource: (projectId: string, queueName: string) => {
        return `http://localhost:3000/api/project/${projectId}/queues/${queueName}/stream`;
    },

    streamAllEventSource: (projectId: string) => {
        return `http://localhost:3000/api/project/${projectId}/queues/stream`;
    },

    retryJob: async (projectId: string, queueName: string, jobId: string) => {
        const response = await api.post<ApiResponse<null>>(
            `/project/${projectId}/queues/${queueName}/jobs/${jobId}/retry`,
        );
        return response.data;
    },

    // ── New Tier 1 API functions ───────────────────────────────────────────────

    removeJob: async (
        projectId: string,
        queueName: string,
        jobId: string,
    ) => {
        const response = await api.delete<ApiResponse<null>>(
            `/project/${projectId}/queues/${queueName}/jobs/${jobId}`,
        );
        return response.data;
    },

    retryAllFailed: async (projectId: string, queueName: string) => {
        const response = await api.post<ApiResponse<RetryJobsSummary>>(
            `/project/${projectId}/queues/${queueName}/jobs/retry-all`,
        );
        return response.data;
    },

    retrySelected: async (
        projectId: string,
        queueName: string,
        jobIds: string[],
    ) => {
        const response = await api.post<ApiResponse<RetryJobsSummary>>(
            `/project/${projectId}/queues/${queueName}/jobs/retry-selected`,
            { jobIds },
        );
        return response.data;
    },

    cleanCompleted: async (
        projectId: string,
        queueName: string,
        options: CleanJobsOptions = {},
    ) => {
        const response = await api.post<ApiResponse<CleanJobsResult>>(
            `/project/${projectId}/queues/${queueName}/clean/completed`,
            options,
        );
        return response.data;
    },

    cleanFailed: async (
        projectId: string,
        queueName: string,
        options: CleanJobsOptions = {},
    ) => {
        const response = await api.post<ApiResponse<CleanJobsResult>>(
            `/project/${projectId}/queues/${queueName}/clean/failed`,
            options,
        );
        return response.data;
    },

    drainQueue: async (projectId: string, queueName: string) => {
        const response = await api.post<ApiResponse<null>>(
            `/project/${projectId}/queues/${queueName}/drain`,
        );
        return response.data;
    },

    pauseQueue: async (projectId: string, queueName: string) => {
        const response = await api.post<ApiResponse<null>>(
            `/project/${projectId}/queues/${queueName}/pause`,
        );
        return response.data;
    },

    resumeQueue: async (projectId: string, queueName: string) => {
        const response = await api.post<ApiResponse<null>>(
            `/project/${projectId}/queues/${queueName}/resume`,
        );
        return response.data;
    },
};
