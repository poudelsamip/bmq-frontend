import { useEffect, useState } from "react";
import { projectApi, type AllProjects } from "../api/projects.api";
import { useAuth } from "../context/AuthContext";
import PlanUsageBanner from "../components/dashboard/PlanUsageBanner";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../components/dashboard/ProjectCard";
import CreateProjectCard from "../components/dashboard/CreateProjectCard";
import CreateProjectModal from "../components/projects/CreateProjectModal";
import { PLAN_PROJECT_LIMITS } from "../constants/plans";

export default function ProjectsPage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    
    const planLimit = user?.plan === "pro" ? PLAN_PROJECT_LIMITS.pro : PLAN_PROJECT_LIMITS.free;

    const [projects, setProjects] = useState<AllProjects[]>([]);
    const [showModal, setShowModal] = useState(false);

    const getProjects = async () => {
        const res = await projectApi.getAll();
        setProjects(res.data);
    };

    const onNavigate = (id: string) => {
        navigate(`/dashboard/projects/${id}`);
    };

    const onDeleteProject = async (id: string) => {
        try {
            await projectApi.deleteProject(id);
            getProjects();
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
        try {
            await projectApi.createProject(
                form.name,
                form.redisConnection,
                form.description,
            );
            onCloseModal();
            getProjects();
        } catch (error) {
            console.error("Error creating project:", error);
        }
    };

    useEffect(() => {
        getProjects();
    }, []);

    return (
        <div className="flex flex-col" style={{ maxWidth: "1440px", margin:"0 auto", gap: 24 }}>
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
