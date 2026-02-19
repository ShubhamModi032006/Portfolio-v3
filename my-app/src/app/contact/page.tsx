import ContactComponent from "@/components/Contact";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Contact Me",
    description: "Get in touch with me for collaboration, freelance work, or any inquiries.",
    alternates: {
        canonical: "https://www.shubhammodi.in/contact",
    },
};

export default function ContactPage() {
    return (
        <div className="w-full max-w-full min-w-0 overflow-x-hidden">
            <ContactComponent />
        </div>
    );
}
