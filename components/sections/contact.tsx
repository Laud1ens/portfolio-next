import { contact } from "@/lib/content";

export function Contact() {
  return (
    <footer id="contact" className="bg-brown-deep py-20 text-paper">
      <div className="mx-auto max-w-[1080px] px-8">
        <h2 className="font-display text-3xl font-semibold md:text-4xl">{contact.heading}</h2>
        <p className="mt-3 max-w-xl text-beige">{contact.blurb}</p>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {contact.items.map((item) => (
            <div key={item.label}>
              <div className="font-label text-xs uppercase tracking-wide text-taupe">
                {item.label}
              </div>
              {item.href ? (
                <a href={item.href} className="mt-1 block font-mono text-sm hover:text-rust">
                  {item.value}
                </a>
              ) : (
                <div className="mt-1 font-mono text-sm">{item.value}</div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-paper/10 pt-6 font-label text-sm">
          {contact.footerLinks.map((link) => (
            <span key={link.href} className="inline-flex items-center gap-1.5">
              <a href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-rust">
                {link.label}
              </a>
              {link.status === "in-progress" && (
                <span className="rounded-full border border-taupe/40 px-2 py-0.5 text-[10px] uppercase tracking-wide text-taupe">
                  Updating
                </span>
              )}
            </span>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap justify-between gap-2 font-mono text-xs text-taupe">
          <span>© 2026 Laud Asante</span>
          <span>Built by hand · Hull, UK</span>
        </div>
      </div>
    </footer>
  );
}
