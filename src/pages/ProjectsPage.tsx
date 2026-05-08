import { useEffect, useState } from "react";
import { projectApi, type AllProjects } from "../api/projects.api";
import PlanUsageBanner from "../components/dashboard/PlanUsageBanner";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../components/dashboard/ProjectCard";
import CreateProjectCard from "../components/dashboard/CreateProjectCard";

// ─── Static mock data ───────────────────────────────────────────────────────

// ─── Component ────────────────────────────────────────────────────────────────
export default function ProjectsPage() {
    const navigate = useNavigate();

    const [projects, setProjects] = useState<AllProjects[]>([]);

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
        console.log("Create project");
    };

    useEffect(() => {
        getProjects();
    }, []);

    return (
        <div className="flex flex-col" style={{ gap: 24 }}>
            {/* Plan usage slim bar */}
            <PlanUsageBanner
                used={2}
                total={5}
                onUpgrade={() => navigate("/dashboard/billing")}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        onNavigate={onNavigate}
                        onMenuClick={onMenuClick}
                    />
                ))}
                <CreateProjectCard onCreate={onCreateProject} />
            </div>
        </div>
    );
}
