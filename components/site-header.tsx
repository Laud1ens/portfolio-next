const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#now", label: "Now" },
  { href: "#writing", label: "Writing" },
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
