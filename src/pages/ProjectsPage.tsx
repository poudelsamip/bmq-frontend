import { useEffect, useRef, useState } from "react";
import { projectApi, type AllProjects } from "../api/projects.api";
import { useAuth } from "../context/AuthContext";
import PlanUsageBanner from "../components/dashboard/PlanUsageBanner";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../components/dashboard/ProjectCard";
import CreateProjectCard from "../components/dashboard/CreateProjectCard";
import CreateProjectModal from "../components/projects/CreateProjectModal";
import { PLAN_PROJECT_LIMITS } from "../constants/plans";

// Module-level cache: survives route changes, prevents re-fetch & empty flash on navigation
let projectsCache: AllProjects[] | null = null;

export default function ProjectsPage() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const planLimit =
        user?.plan === "pro" ? PLAN_PROJECT_LIMITS.pro : PLAN_PROJECT_LIMITS.free;

    // Initialise from cache so there's no empty flash when navigating back
    const [projects, setProjects] = useState<AllProjects[]>(projectsCache ?? []);
    const [isLoading, setIsLoading] = useState(projectsCache === null);
    const [showModal, setShowModal] = useState(false);
    // Track whether we've already fetched this session
    const hasFetched = useRef(projectsCache !== null);

    /**
     * @param silent – if true, skip the loading spinner (used for post-mutation refresh)
     */
    const fetchProjects = async (silent = false) => {
        if (!silent) setIsLoading(true);
        try {
            const res = await projectApi.getAll();
            projectsCache = res.data;
            setProjects(res.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            if (!silent) setIsLoading(false);
        }
    };

    const onNavigate = (id: string) => {
        navigate(`/dashboard/projects/${id}`);
    };

    const onDeleteProject = async (id: string) => {
        try {
            await projectApi.deleteProject(id);
            // Silent refresh — no loading flash after delete
            fetchProjects(true);
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    const onCreateProject = () => {
        setShowModal(true);
    };

    const onCloseModal = () => {
        setShowModal(false);
    };

    const handleSubmit = async (form: {
        name: string;
        redisConnection: string;
        description: string;
    }) => {
        // Errors are intentionally caught by the modal to display them to the user
        await projectApi.createProject(
            form.name,
            form.redisConnection,
            form.description,
        );
        onCloseModal();
        // Silent refresh — no loading flash after create
        fetchProjects(true);
    };

    useEffect(() => {
        // Only fetch from the network once per session (cache handles navigation)
        if (!hasFetched.current) {
            hasFetched.current = true;
            fetchProjects();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Skeleton placeholder card
    const SkeletonCard = () => (
        <div
            style={{
                borderRadius: 12,
                background: "var(--color-surface-container)",
                border: "1px solid var(--color-outline-variant)",
                height: 160,
                animation: "skeletonPulse 1.5s ease-in-out infinite",
            }}
        />
    );

    return (
        <div className="flex flex-col" style={{ maxWidth: "1440px", margin: "0 auto", gap: 24 }}>
            <style>{`
                @keyframes skeletonPulse {
                    0%, 100% { opacity: 1; }
                    50%       { opacity: 0.35; }
                }
            `}</style>

            {/* Plan usage slim bar */}
            <PlanUsageBanner
                used={projects.length}
                total={planLimit}
                onUpgrade={() => navigate("/dashboard/billing")}
            />

            {/* Projects grid */}
            <section
                className="grid grid-cols-1"
                style={{
                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: 16,
                }}
            >
                {isLoading ? (
                    <>
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                    </>
                ) : (
                    <>
                        {projects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onNavigate={onNavigate}
                                onDelete={onDeleteProject}
                            />
                        ))}
                        <CreateProjectCard
                            onCreate={onCreateProject}
                            disabled={user?.plan !== "pro" && projects.length >= planLimit}
                            disabledMessage={`Free plan allows up to ${planLimit} projects. Upgrade to Pro`}
                        />
                    </>
                )}
            </section>

            {/* Create Project Modal */}
            {showModal && (
                <CreateProjectModal
                    onClose={onCloseModal}
                    onSubmit={handleSubmit}
                />
            )}
        </div>
    );
}
