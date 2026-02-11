import ResumeComponent from "@/components/Resume";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Resume",
    description: "View and download my resume to see my full professional background.",
};

export default function ResumePage() {
    return (
        <div className="w-full">
            <ResumeComponent />
        </div>
    );
}
