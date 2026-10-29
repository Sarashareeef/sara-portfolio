type Pt = { x: number; y: number };
type Box = Pt & { w: number; h: number };

export type Project = {
  slug: string;
  number: string;
  title: string;
  tagline: string;
  /** Shown on the project's folder card; only Mello's file carries a year. */
  year?: string;
  primary: string;
  secondary?: string;
  tags: string;
  footnote?: string;
  preview: {
    title: string;
    image: string;
    url: string;
    bar: string;
    /** Browser-bar scale relative to Mello's (each frame draws its bar at a different size). */
    barScale: number;
    frame: Box;
    /** Screenshot placement inside the frame, below the bar; omitted = cover, centred. */
    img?: Box;
  };
  card: {
    folder: string;
    height: number;
    /** Top-left corner of the front folder's tab, measured from the artwork (design px). */
    tab: Pt;
    labels: Pt;
    column: Pt;
    open: Pt;
    paper: Pt;
    titleLeading: number;
    ruleGap: number;
    /** Primary description line: size / leading / tracking in design px. */
    desc: { size: number; leading: number; tracking: number; medium?: boolean };
    /** Gap above the tags (defaults to the 31px column gap). */
    tagsGap?: number;
  };
};

export const projects: Project[] = [
  {
    slug: "mello",
    number: "01",
    title: "MELLO",
    tagline: "AI × MENTAL HEALTH",
    year: "2025–26",
    primary: "Mental-health screening, made conversational.",
    secondary: "Structured assessments flow into AI-guided conversation in one connected journey.",
    tags: "UI/UX · Conversational AI · Web + Mobile",
    footnote: "FINAL YEAR PROJECT",
    preview: {
      title: "A softer way to navigate mental health.",
      image: "/images/landing/preview-mello.webp",
      url: "mello.app",
      bar: "#fcf0f7",
      barScale: 1,
      frame: { x: 14.24, y: 82.71, w: 194.745, h: 107.436 },
    },
    card: {
      folder: "/images/landing/folder-mello.webp",
      height: 423.036,
      tab: { x: 74.65, y: 19.29 },
      labels: { x: 105.84, y: 107.07 },
      column: { x: 103.84, y: 137.07 },
      open: { x: 483.84, y: 366.07 },
      paper: { x: 393.9, y: 48.4 },
      titleLeading: 72,
      ruleGap: 7,
      desc: { size: 13, leading: 13, tracking: 1, medium: true },
    },
  },
  {
    slug: "google-maps-redesign",
    number: "02",
    title: "GOOGLE MAPS REDESIGN",
    tagline: "MAPS × NIGHT SAFETY",
    primary: "Surfacing safety context alongside familiar directions, for better route choices after dark.",
    tags: "UI/UX · Interaction Design · Research",
    footnote: "INDEPENDENT CONCEPT",
    preview: {
      title: "Rethinking navigation after dark.",
      image: "/images/landing/preview-gm.webp",
      url: "googlemaps.app",
      bar: "rgba(138, 139, 190, 0.46)",
      barScale: 0.635,
      frame: { x: 17.27, y: 90.91, w: 184.544, h: 124.803 },
      img: { x: -0.11, y: -5.86, w: 186.457, h: 124.305 },
    },
    card: {
      folder: "/images/landing/folder-gm.webp",
      height: 423.036,
      tab: { x: 75.73, y: 20.37 },
      labels: { x: 105, y: 110 },
      column: { x: 99, y: 132 },
      open: { x: 478, y: 366 },
      paper: { x: 404.9, y: 59.4 },
      titleLeading: 65,
      ruleGap: 15,
      desc: { size: 12, leading: 13, tracking: 0.96 },
      tagsGap: 15,
    },
  },
  {
    slug: "voyaige",
    number: "03",
    title: "VOYAIGE",
    tagline: "AI × TRAVEL",
    primary: "Realistic itineraries, planned in one place.",
    secondary: "Day-by-day plans shaped by interests, commute times and opening hours.",
    tags: "UI/UX · Product Design · Mobile",
    footnote: "SOLO PROJECT",
    preview: {
      title: "From “where should I go?” to “here’s your day.”",
      image: "/images/landing/preview-voyaige.webp",
      url: "voyaige.app",
      bar: "#eef4fb",
      barScale: 0.793,
      frame: { x: 12.69, y: 86.74, w: 194, h: 124 },
    },
    card: {
      folder: "/images/landing/folder-voyaige.webp",
      height: 396,
      tab: { x: 77.13, y: 1.35 }, // artwork is cropped 13.52 at the top (396-high card)
      labels: { x: 92, y: 96 },
      column: { x: 94, y: 126 },
      open: { x: 474, y: 354 },
      paper: { x: 402.9, y: 28.4 },
      titleLeading: 72,
      ruleGap: 7,
      desc: { size: 14, leading: 17, tracking: 1 },
    },
  },
  {
    slug: "musemap",
    number: "04",
    title: "MUSEMAP",
    tagline: "ART × DISCOVERY",
    primary: "Discover the art around you.",
    secondary: "A visual, map-led way to find galleries, exhibitions and creative spaces.",
    tags: "UI/UX · Visual Design · Research",
    preview: {
      title: "Discover. Explore. Experience.",
      image: "/images/landing/preview-musemap.webp",
      url: "musemap.app",
      bar: "rgba(255, 155, 89, 0.24)",
      barScale: 0.64,
      frame: { x: 14.81, y: 65.69, w: 186.139, h: 114.161 },
      img: { x: -0.19, y: -7.27, w: 186.1, h: 124.009 },
    },
    card: {
      folder: "/images/landing/folder-musemap.webp",
      height: 423.036,
      tab: { x: 73.25, y: 17.23 },
      labels: { x: 106, y: 105 },
      column: { x: 104, y: 135 },
      open: { x: 488, y: 363 },
      paper: { x: 392.9, y: 51.4 },
      titleLeading: 72,
      ruleGap: 7,
      desc: { size: 13, leading: 13, tracking: 0.96 },
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
