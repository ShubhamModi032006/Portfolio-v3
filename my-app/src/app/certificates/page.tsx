import CertificatesComponent from "@/components/Certificates";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Certifications & Achievements",
    description: "View my professional certifications and achievements in the field of software development.",
    alternates: {
        canonical: "https://www.shubhammodi.in/certificates",
    },
};

export default function CertificatesPage() {
    return (
        <div className="w-full">
            <CertificatesComponent />
        </div>
    );
}
