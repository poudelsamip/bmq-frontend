import type { ApiResponse } from "./auth.api";
import api from "./client";

export interface AllProjects {
    id: string;
    name: string;
    lastActive: Date;
    userId: string;
    createdAt: Date;
}

export interface Project {
    project: {
        id: string;
        name: string;
        userId: string;
        createdAt: Date;
    };
    stats: {
        totalQueues: number;
        totalCompleted: number;
        totalFailed: number;
        totalWaiting: number;
        totalActive: number;
        totalDelayed: number;
        totalPaused: number;
    };
    queues: string[];
}

export const projectApi = {
    getAll: async () => {
        const response = await api.get<ApiResponse<AllProjects[]>>("/project");
        return response.data;
    },

    getProject: async (id: string) => {
        const response = await api.get<ApiResponse<Project>>(`/project/${id}`);
        return response.data;
    },

    createProject: async (
        name: string,
        redisUrl: string,
        description: string | null,
    ) => {
        const response = await api.post("/project", {
            name,
            redis_url: redisUrl,
            description,
        });

        return response.data;
    },
};
