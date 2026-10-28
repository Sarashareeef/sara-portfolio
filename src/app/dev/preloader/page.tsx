import { notFound, redirect } from "next/navigation";

/**
 * Development-only: the loader preview moved to /preloader-preview.
 * Production builds serve a 404 here. Remove with the preview.
 */
export default function PreloaderPreviewRedirect() {
  if (process.env.NODE_ENV === "production") notFound();
  redirect("/preloader-preview");
}
