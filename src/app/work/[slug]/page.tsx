import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { getProject, projects } from "@/data/projects";
import Mello from "@/components/case/mello/Mello";

const studies: Record<string, ComponentType> = {
  mello: Mello,
};

export function generateStaticParams() {
  return projects.filter((p) => studies[p.slug]).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const title = project.title.charAt(0) + project.title.slice(1).toLowerCase();
  return {
    title: `${title} — Sara Suha`,
    description: project.secondary ?? project.primary,
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const Study = studies[slug];
  if (!Study) notFound();
  return <Study />;
}
