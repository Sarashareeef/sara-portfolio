import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PreloaderPreview from "@/components/loader/PreloaderPreview";

export const metadata: Metadata = {
  title: "Preloader preview (development)",
  robots: { index: false, follow: false },
};

/**
 * Development-only: the first-visit loader on its own, with playback controls.
 * Production builds serve a 404 here, so none of this reaches the live site.
 */
export default function PreloaderPreviewPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <PreloaderPreview />;
}
