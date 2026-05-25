import { projects } from "@/data/projects";
import ProjectDetails from "@/components/ProjectDetails";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for static building optimization
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Dynamic SEO metadata builder
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found in this portfolio.",
    };
  }

  return {
    title: `${project.title} | Projects`,
    description: project.description,
    alternates: {
      canonical: `https://www.shubhammodi.in/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} - Shubham Modi`,
      description: project.description,
      url: `https://www.shubhammodi.in/projects/${project.slug}`,
      images: [
        {
          url: project.image,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="w-full">
      <ProjectDetails project={project} />
    </div>
  );
}
