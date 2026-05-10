import { useEffect, useState } from "react";
import { projectApi, type AllProjects } from "../api/projects.api";
import PlanUsageBanner from "../components/dashboard/PlanUsageBanner";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../components/dashboard/ProjectCard";
import CreateProjectCard from "../components/dashboard/CreateProjectCard";
import CreateProjectModal from "../components/projects/CreateProjectModal";
import InfraGraph from "../components/dashboard/InfraGraph";

export default function ProjectsPage() {
    const navigate = useNavigate();

    const [projects, setProjects] = useState<AllProjects[]>([]);
    const [showModal, setShowModal] = useState(false);

    const getProjects = async () => {
        const res = await projectApi.getAll();
        setProjects(res.data);
    };

    const onNavigate = (id: string) => {
        navigate(`/dashboard/projects/${id}`);
    };

    const onMenuClick = (id: string) => {
        console.log("Menu for", id);
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
        <div className="flex flex-col" style={{ gap: 24 }}>
            {/* Plan usage slim bar */}
            <PlanUsageBanner
                used={projects.length}
                total={5}
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
                        onMenuClick={onMenuClick}
                    />
                ))}
                <CreateProjectCard onCreate={onCreateProject} />
            </section>

            {/* Global Infrastructure Graph */}
            <InfraGraph />

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
