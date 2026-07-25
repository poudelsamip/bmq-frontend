export const PLAN_PROJECT_LIMITS = {
    free: 1,
    pro: 25,
} as const;

/** Maximum number of jobs visible per queue on each plan */
export const PLAN_JOB_LIMITS = {
    free: 10,
    pro: Infinity,
} as const;

export const PLANS = {
    free: "free",
    pro: "pro",
} as const;