import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/sections/hero";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Writing } from "@/components/sections/writing";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";
import { CurrentlyWorkingOn } from "@/components/sections/currently-working-on";
import { ScrollReveal } from "@/components/scroll-reveal";

/**
 * Section order is a length budget, not a preference.
 *
 * This page measured 13,137px, about sixteen screens at 1280x800. A reader
 * deciding whether to open a CV gives it one or two. Everything here earns its
 * pixels or it is gone: the About section's argument now lives in the hero and
 * the plain-English band, and the Evolution timeline was a thousand pixels of
 * story told better by the work itself.
 *
 * `Writing` sits second on purpose. It is the exit for a non-technical reader,
 * and an exit placed after seven model comparisons is not an exit.
 */
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[1080px] px-8">
        <Hero />
        <ScrollReveal>
          <Writing />
        </ScrollReveal>
        <ScrollReveal>
          <Projects />
        </ScrollReveal>
        <ScrollReveal>
          <Experience />
        </ScrollReveal>
        <ScrollReveal>
          <CurrentlyWorkingOn />
        </ScrollReveal>
        <ScrollReveal>
          <Skills />
        </ScrollReveal>
      </main>
      <Contact />
    </>
  );
}
