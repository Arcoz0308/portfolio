import { useEffect } from 'react'
import { contactPlaceholder, displayName, profile, projects } from './content'
import { Icon } from './Icons'
import { discordHref } from './navigation'

export function Portfolio({ url, shouldFocus }: { url: URL; shouldFocus: boolean }) {
  useEffect(() => {
    const { hash } = url
    const sectionId = hash === '#projets' || hash === '#contact' ? hash.slice(1) : undefined
    if (!sectionId && !shouldFocus) return

    const heading = document.getElementById(sectionId ?? 'accueil')
    heading?.focus({ preventScroll: true })
    if (sectionId) heading?.scrollIntoView({ block: 'start' })
    else window.scrollTo({ top: 0 })
  }, [url, shouldFocus])

  const contactLinks = profile.email
    ? [{ label: profile.email, href: `mailto:${profile.email}` }, ...profile.profiles]
    : profile.profiles

  return (
    <div className="min-h-dvh">
      <header className="site-shell">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-1 border-b border-line py-3 sm:py-3.5">
          <a href="/" data-route className="py-2 text-xl font-semibold tracking-tight wrap-anywhere hover:text-accent">{displayName}</a>
          <nav aria-label="Navigation principale" className="flex flex-wrap items-center gap-x-5 gap-y-0.5 text-sm sm:gap-x-7">
            <a href="/#projets" data-route className="text-link">Projets</a>
            <a href="/#contact" data-route className="text-link">Contact</a>
            <a href={discordHref()} data-route className="text-link">Mode Discord</a>
          </nav>
        </div>
      </header>

      <main className="site-shell">
        <section aria-labelledby="accueil" className="pt-14 pb-15 sm:pt-18 sm:pb-16">
          <div className="flex items-center gap-4 sm:gap-6">
            <img src={profile.avatarUrl} alt="" width="80" height="80" className="size-15 shrink-0 rounded-full object-cover ring-1 ring-line sm:size-20" />
            <h1 id="accueil" tabIndex={-1} className="w-fit max-w-full text-[clamp(3rem,8vw,5.5rem)] leading-[1.02] font-bold tracking-[-0.06em] wrap-anywhere">
              {displayName}
            </h1>
          </div>
          <p className="mt-5 max-w-2xl text-xl leading-snug font-semibold tracking-[-0.025em] text-balance sm:text-[1.65rem]">{profile.tagline}</p>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{profile.bio}</p>
          <a
            href="/#projets"
            data-route
            className="mt-6 inline-flex min-h-11 items-center gap-2.5 rounded-lg bg-accent px-4.5 py-2.5 text-sm font-semibold text-white motion-safe:transition-colors hover:bg-accent-strong"
          >
            Voir mes projets <Icon name="down" />
          </a>
        </section>

        <section aria-labelledby="projets">
          <h2 id="projets" tabIndex={-1} className="w-fit scroll-mt-6 text-[2rem] leading-tight font-bold tracking-[-0.045em] sm:text-4xl">Projets</h2>
          <ol className="mt-5 grid list-none gap-4 lg:grid-cols-3" role="list">
            {projects.map((project) => (
              <li key={project.id} className="min-w-0">
                <article className="flex h-full flex-col rounded-xl border border-line bg-white p-5 sm:p-6 lg:min-h-48">
                  <div className="flex items-center gap-3.5">
                    <img src={project.iconUrl} alt="" width="48" height="48" className="size-12 shrink-0 rounded-xl border border-line object-cover" />
                    <span className="rounded-md bg-lilac px-2 py-1 text-xs leading-tight font-semibold text-accent">{project.category}</span>
                  </div>
                  <h3 className="mt-3.5 text-xl leading-tight font-bold tracking-[-0.035em] wrap-anywhere sm:text-[1.35rem]">{project.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{project.description}</p>
                  {project.contribution && <p className="mt-2 text-sm leading-relaxed text-muted">{project.contribution}</p>}
                  <ul aria-label={`Technologies – ${project.name}`} className="mt-4 mb-2 flex flex-wrap gap-1.5" role="list">
                    {project.stack.map((technology) => (
                      <li key={technology} className="rounded-md bg-paper px-2 py-1 text-xs font-medium text-muted">{technology}</li>
                    ))}
                  </ul>
                  {(project.links.length > 0 || project.id === 'discord-ui') && (
                    <div className="mt-auto flex flex-wrap items-center gap-x-4 pt-2 text-sm">
                      {project.id === 'discord-ui' && (
                        <a className="text-link" href={discordHref('projets')} data-route>
                          Voir en action <Icon name="right" className="size-3.5" />
                        </a>
                      )}
                      {project.links.map((link) => (
                        <a className="text-link" key={link.href} href={link.href} aria-label={`${link.label} – ${project.name}`}>
                          {link.label} <Icon name="external" className="size-3.5" />
                        </a>
                      ))}
                    </div>
                  )}
                </article>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="contact" className="mt-12 border-t border-line pt-6 pb-12 sm:mt-14 sm:pb-16">
          <h2 id="contact" tabIndex={-1} className="w-fit scroll-mt-6 text-[2rem] leading-tight font-bold tracking-[-0.045em] sm:text-4xl">Contact</h2>
          {contactLinks.length > 0 ? (
            <ul className="mt-2 flex list-none flex-wrap gap-x-6" role="list">
              {contactLinks.map((link) => (
                <li key={link.href} className="min-w-0">
                  <a className="text-link wrap-anywhere" href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          ) : <p className="mt-2 text-base leading-relaxed text-muted">{contactPlaceholder}</p>}
        </section>
      </main>
    </div>
  )
}
