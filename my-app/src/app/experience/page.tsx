import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Professional Experience",
    description: "Explore my professional work history and career milestones.",
    alternates: {
        canonical: "https://www.shubhammodi.in/experience",
    },
};

export default function ExperiencePage() {
    return (
        <div className="px-6 py-24 lg:px-12 lg:py-24">
            <div className="max-w-xl">
                {/* <ExperienceComponent /> */}
            </div>
        </div>
    );
}
