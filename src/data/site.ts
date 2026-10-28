/** The live site's address (confirmed by Sara): only here does the pushpin badge (SitePin) appear. */
export const PRODUCTION_HOST = "sarasuhadesign.vercel.app";

// Contact and profile links, used across the header, footer and landing page.
export const site = {
  name: "SARA SUHA",
  email: "mailto:sarasuhawork@gmail.com",
  linkedin: "https://www.linkedin.com/in/sara-suha-b6451725a",
  behance: "https://www.behance.net/sarasuha",
  resume: "/sarasuha_resume.pdf",
  aarambhaWork:
    "https://fluttering-helmet-05e.notion.site/1f6c5de3e0344696a40ad1f075bf22b2?v=8f2b2f4538d343899674b6cb864cd47d",
};

export const nav = [
  { label: "WORK", href: "/#work" },
  { label: "ABOUT", href: "/#about" },
  { label: "RESUME", href: site.resume, external: true },
  { label: "CONTACT", href: "/#contact" },
];
