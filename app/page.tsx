import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Writing } from "@/components/sections/writing";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";
import { ScrollReveal } from "@/components/scroll-reveal";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[1080px] px-8">
        <Hero />
        <ScrollReveal>
          <About />
        </ScrollReveal>
        <ScrollReveal>
          <Experience />
        </ScrollReveal>
        <ScrollReveal>
          <Projects />
        </ScrollReveal>
        <ScrollReveal>
          <Writing />
        </ScrollReveal>
        <ScrollReveal>
          <Skills />
        </ScrollReveal>
      </main>
      <Contact />
    </>
  );
}
