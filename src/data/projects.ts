type Pt = { x: number; y: number };

export type Project = {
  slug: string;
  number: string;
  title: string;
  tagline: string;
  year: string;
  primary: string;
  secondary?: string;
  tags: string;
  footnote?: string;
  preview: {
    title: string;
    image: string;
    url: string;
    bar: string;
    frame: { x: number; y: number; w: number; h: number };
  };
  card: {
    folder: string;
    height: number;
    tagline: Pt & { size: number };
    labels: Pt;
    column: Pt;
    open: Pt;
    paper: Pt;
    titleLeading: number;
    ruleGap: number;
  };
};

export const projects: Project[] = [
  {
    slug: "mello",
    number: "01",
    title: "MELLO",
    tagline: "AI × MENTAL HEALTH",
    year: "2025-26",
    primary: "AI-powered mental health companion",
    secondary: "Designing a more human way to understand and navigate mental health.",
    tags: "UI/UX · AI · Web + Mobile",
    footnote: "FINAL YEAR PROJECT",
    preview: {
      title: "A softer way to navigate mental health.",
      image: "/images/landing/preview-mello.webp",
      url: "mello.app",
      bar: "#fcf0f7",
      frame: { x: 14.24, y: 82.71, w: 194.745, h: 107.436 },
    },
    card: {
      folder: "/images/landing/folder-mello.webp",
      height: 423.036,
      tagline: { x: 115.84, y: 45.07, size: 16 },
      labels: { x: 105.84, y: 107.07 },
      column: { x: 103.84, y: 137.07 },
      open: { x: 483.84, y: 366.07 },
      paper: { x: 393.9, y: 48.4 },
      titleLeading: 72,
      ruleGap: 7,
    },
  },
  {
    slug: "google-maps-redesign",
    number: "02",
    title: "GOOGLE MAPS REDESIGN",
    tagline: "NAVIGATION × NIGHT SAFETY",
    year: "2025",
    primary: "A self-initiated redesign exploring safer, more readable navigation for driving at night.",
    tags: "UI/UX · Interaction Design · Research",
    preview: {
      title: "Rethinking navigation after dark.",
      image: "/images/landing/preview-gm.webp",
      url: "googlemaps.app",
      bar: "rgba(138, 139, 190, 0.46)",
      frame: { x: 17.27, y: 90.91, w: 184.544, h: 124.803 },
    },
    card: {
      folder: "/images/landing/folder-gm.webp",
      height: 423.036,
      tagline: { x: 94, y: 45, size: 14 },
      labels: { x: 105, y: 110 },
      column: { x: 93, y: 132 },
      open: { x: 478, y: 366 },
      paper: { x: 404.9, y: 59.4 },
      titleLeading: 65,
      ruleGap: 15,
    },
  },
  {
    slug: "voyaige",
    number: "03",
    title: "VOYAIGE",
    tagline: "TRAVEL × PLANNING",
    year: "2025",
    primary: "Explored how AI can turn fragmented travel research into an adaptable itinerary.",
    secondary: "A smart travel planner for realistic, time-aware itineraries.",
    tags: "UI/UX · Product Design · Research",
    preview: {
      title: "From “where should I go?” to “here’s your day.”",
      image: "/images/landing/preview-voyaige.webp",
      url: "voyaige.app",
      bar: "#eef4fb",
      frame: { x: 12.69, y: 86.74, w: 194, h: 124 },
    },
    card: {
      folder: "/images/landing/folder-voyaige.webp",
      height: 396,
      tagline: { x: 106, y: 25.79, size: 16 },
      labels: { x: 92, y: 96 },
      column: { x: 90, y: 126 },
      open: { x: 474, y: 354 },
      paper: { x: 402.9, y: 28.4 },
      titleLeading: 72,
      ruleGap: 7,
    },
  },
  {
    slug: "musemap",
    number: "04",
    title: "MUSEMAP",
    tagline: "CULTURE × DISCOVERY",
    year: "2025",
    primary: "Discovering art, one place at a time.",
    secondary: "A smarter way to discover galleries, exhibitions, and art spaces around you",
    tags: "UI/UX · Product Design · Research",
    preview: {
      title: "Discover. Explore. Experience.",
      image: "/images/landing/preview-musemap.webp",
      url: "musemap.app",
      bar: "rgba(255, 155, 89, 0.24)",
      frame: { x: 14.81, y: 65.69, w: 186.139, h: 114.161 },
    },
    card: {
      folder: "/images/landing/folder-musemap.webp",
      height: 423.036,
      tagline: { x: 89, y: 43, size: 16 },
      labels: { x: 106, y: 105 },
      column: { x: 104, y: 135 },
      open: { x: 488, y: 363 },
      paper: { x: 392.9, y: 51.4 },
      titleLeading: 72,
      ruleGap: 7,
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
