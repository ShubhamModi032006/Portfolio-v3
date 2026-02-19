import ResumeComponent from "@/components/Resume";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Resume",
    description: "View and download my resume to see my full professional background.",
    alternates: {
        canonical: "https://www.shubhammodi.in/resume",
    },
};

export default function ResumePage() {
    return (
        <div className="w-full">
            <ResumeComponent />
        </div>
    );
}
