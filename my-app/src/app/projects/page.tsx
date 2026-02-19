import ProjectsComponent from "@/components/Projects";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Projects & Work",
    description: "Showcasing my portfolio of projects, including web applications and more.",
    alternates: {
        canonical: "https://www.shubhammodi.in/projects",
    },
};

export default function ProjectsPage() {
    return (
        <div className="w-full">
            <ProjectsComponent />
        </div>
    );
}
