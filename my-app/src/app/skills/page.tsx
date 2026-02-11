import SkillsComponent from "@/components/Skills";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Technical Skills",
    description: "A comprehensive list of my technical skills and technologies I work with.",
};

export default function SkillsPage() {
    return (
        <div className="w-full">
            <SkillsComponent />
        </div>
    );
}
