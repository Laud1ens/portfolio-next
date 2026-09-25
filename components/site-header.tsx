/** Order mirrors the page, and every href has a section to land on.
 *
 *  "#about" was left here after the About section was folded into the hero,
 *  which is the quietest kind of broken: the link still works, it just scrolls
 *  to nothing and the reader assumes they missed it. */
const navLinks = [
  { href: "#writing", label: "Plain English" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#now", label: "Now" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-brown-deep/10 bg-paper/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-[1080px] items-center justify-between px-8 py-4">
        <div className="font-display text-xl font-bold text-brown-deep">
          Laud <span className="italic text-rust">Asante</span>
        </div>
        <div className="hidden gap-8 font-label text-sm font-medium uppercase tracking-wider text-brown md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-rust"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
