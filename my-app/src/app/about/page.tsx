import AboutComponent from "@/components/About";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "About Me",
    description: "Learn more about my background, skills, and journey as a developer.",
    alternates: {
        canonical: "https://www.shubhammodi.in/about",
    },
};

export default function AboutPage() {
    return (
        <div className="w-full">
            <AboutComponent />
        </div>
    );
}
