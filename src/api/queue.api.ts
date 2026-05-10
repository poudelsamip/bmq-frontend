import type { ApiResponse } from "./auth.api";
import api from "./client";

export interface QueueStats {
    queueName: string;
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
};
