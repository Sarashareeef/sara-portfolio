import Hero from "@/components/home/Hero";
import Work from "@/components/home/Work";
import About from "@/components/home/About";
import Capabilities from "@/components/home/Capabilities";
import Contact from "@/components/home/Contact";
import ScrollReveal, { RevealScript } from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      {/* Before any content parses, so revealed sections start hidden without a flash. */}
      <RevealScript />
      <Hero />
      <Work />
      <About />
      <Capabilities />
      <Contact />
      <ScrollReveal />
    </>
  );
}
