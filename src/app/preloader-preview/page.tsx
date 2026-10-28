import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PreloaderPreview from "@/components/loader/PreloaderPreview";

export const metadata: Metadata = {
  title: "Preloader preview (development)",
  robots: { index: false, follow: false },
};

/**
 * Temporary, development-only: the first-visit loader replayed with simulated
 * timing, over the real homepage. Production builds serve a 404 here.
 * Remove this folder (and PreloaderPreview) once the loader is approved.
 */
export default function PreloaderPreviewPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <PreloaderPreview />;
}
