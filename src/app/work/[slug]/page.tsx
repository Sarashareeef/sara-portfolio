import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { getProject, projects } from "@/data/projects";
import GoogleMaps from "@/components/case/google-maps/GoogleMaps";
import Mello from "@/components/case/mello/Mello";
import Voyaige from "@/components/case/voyaige/Voyaige";

const studies: Record<string, ComponentType> = {
  mello: Mello,
  "google-maps-redesign": GoogleMaps,
  voyaige: Voyaige,
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
