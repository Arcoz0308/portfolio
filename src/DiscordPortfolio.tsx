import { ChannelView, DiscordUI } from '@arcscord/discord-ui'
import type { ChannelViewModel, MessageAuthor, MessageView } from '@arcscord/discord-ui'
import { useEffect, useRef, useState } from 'react'
import { contactPlaceholder, displayName, profile, projects } from './content'
import { Icon } from './Icons'
import { channelIds, discordHref } from './navigation'
import type { ChannelId } from './navigation'
import '@arcscord/discord-ui/styles.css'
import './discord.css'

const accent = '#a78bfa'
const author: MessageAuthor = {
  id: 'arcoz',
  displayName,
  avatarUrl: profile.avatarUrl,
  avatarFallback: { background: '#c4b5fd', color: '#201b2c' },
}
const demoTimestamp = '2026-11-15T09:00:00Z'
const discordTokens = {
  background: '#262631',
  text: '#f4f2fa',
  strong: '#f4f2fa',
  muted: '#c3becf',
  accent,
  link: '#c4b5fd',
  containerSurface: '#32313e',
  containerOutline: '#494656',
  linkButtonBackground: '#3d3454',
  linkButtonText: '#f4f2fa',
}
const labels = {
  messages: 'Messages',
  emptyChannel: 'Aucun message pour le moment.',
  invalidTimestamp: 'Date indisponible',
  edited: '(modifié)',
  spoiler: 'Texte masqué',
  showSpoiler: 'Afficher le texte masqué',
  hideSpoiler: 'Masquer le texte',
}

function markdownLink({ label, href }: { label: string; href: string }) {
  return `[${label}](${href})`
}

const channels: Record<ChannelId, ChannelViewModel> = {
  bienvenue: {
    id: 'bienvenue',
    name: 'bienvenue',
    messages: [{
      id: 'accueil',
      author,
      timestamp: demoTimestamp,
      body: { kind: 'text', content: `Bienvenue sur mon portfolio !\n\n${profile.tagline}\n${profile.bio}` },
      components: [{
        id: 'navigation',
        kind: 'action-row',
        buttons: [{
          id: 'vers-projets',
          kind: 'link-button',
          label: 'Voir les projets',
          url: new URL(discordHref('projets'), window.location.href).href,
        }],
      }],
    }],
  },
  projets: {
    id: 'projets',
    name: 'projets',
    messages: projects.map((project): MessageView => ({
      id: project.id,
      author: { id: project.id, displayName: project.name, avatarUrl: project.iconUrl },
      timestamp: demoTimestamp,
      body: {
        kind: 'components-v2',
        components: [{
          id: `projet-${project.id}`,
          kind: 'container',
          accentColor: accent,
          components: [
            {
              id: 'description',
              kind: 'text-display',
              content: [project.description, project.contribution].filter(Boolean).join('\n\n'),
            },
            { id: 'stack', kind: 'text-display', content: `-# ${project.stack.join(' · ')}` },
            {
              id: 'liens',
              kind: 'action-row',
              buttons: project.links.map(({ label, href }) => ({
                id: href,
                kind: 'link-button',
                label,
                ariaLabel: `${label} – ${project.name}`,
                url: href,
              })),
            },
          ],
        }],
      },
    })),
  },
  contact: {
    id: 'contact',
    name: 'contact',
    messages: [{
      id: 'coordonnees',
      author,
      timestamp: demoTimestamp,
      body: {
        kind: 'markdown',
        content: [profile.email, ...profile.profiles.map(markdownLink)].filter(Boolean).join('\n') || contactPlaceholder,
      },
      components: profile.email ? [{
        id: 'contact-actions',
        kind: 'action-row',
        buttons: [{ id: 'email', kind: 'button', label: 'Écrire un e-mail', style: 'secondary' }],
      }] : undefined,
    }],
  },
}

function ChannelNavigation({ channelId }: { channelId: ChannelId }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="min-w-0 border-b border-discord-line bg-discord-rail md:border-r md:border-b-0 md:px-3 md:pt-6">
      <button
        type="button"
        aria-controls="salons"
        aria-expanded={expanded}
        onClick={() => setExpanded(!expanded)}
        className="flex min-h-11 w-full items-center justify-between gap-3 px-5 text-left text-sm font-semibold text-discord-muted hover:text-discord-text focus-visible:outline-offset-[-4px] md:hidden"
      >
        Salons <Icon name="chevron" className={expanded ? 'rotate-180' : undefined} />
      </button>
      <nav id="salons" aria-label="Salons textuels" className={`px-3 pb-3 md:block md:px-0 ${expanded ? 'block' : 'hidden'}`}>
        <p aria-hidden="true" className="mb-3 hidden px-2.5 text-xs font-semibold text-discord-muted md:block">Salons textuels</p>
        <ul className="space-y-1" role="list">
          {channelIds.map((id) => (
            <li key={id}>
              <a
                href={discordHref(id)}
                data-route
                aria-current={channelId === id ? 'page' : undefined}
                onClick={() => setExpanded(false)}
                className="flex min-h-10 items-center gap-2.5 rounded-md px-2.5 text-sm font-medium text-discord-muted motion-safe:transition-colors hover:bg-discord-line hover:text-discord-text aria-[current=page]:bg-[#38304f] aria-[current=page]:text-discord-accent"
              >
                <Icon name="hash" className="size-4.5" /> {id}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default function DiscordPortfolio({ channelId }: { channelId: ChannelId }) {
  const heading = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    window.scrollTo({ top: 0 })
    heading.current?.focus({ preventScroll: true })
  }, [channelId])

  return (
    <div className="portfolio-discord flex h-dvh min-h-[26rem] flex-col bg-discord-base text-discord-text">
      <header className="flex shrink-0 flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-discord-line px-5 py-2.5 md:px-7">
        <span className="py-1.5 text-xl font-semibold tracking-tight">Portfolio</span>
        <a href="/" data-route className="inline-flex min-h-10 items-center gap-2 rounded-sm text-sm font-medium text-discord-accent hover:underline hover:underline-offset-4">
          <Icon name="left" /> Retour au portfolio
        </a>
      </header>

      <div className="grid min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)] md:grid-cols-[13.5rem_minmax(0,1fr)] md:grid-rows-1">
        <ChannelNavigation key={channelId} channelId={channelId} />
        <main className="min-h-0 min-w-0">
          <DiscordUI theme="dark" tokens={discordTokens} locale="fr-FR" timeZone="Europe/Zurich" labels={labels} allowRemoteMedia={false} className="h-full">
            <ChannelView
              channel={channels[channelId]}
              composer={false}
              height="100%"
              autoScroll={false}
              showDateSeparators={false}
              onButtonClick={(id) => {
                if (id === 'email' && profile.email) window.location.href = `mailto:${profile.email}`
              }}
              header={(
                <div className="flex shrink-0 items-center border-b border-discord-line px-5 py-3.5 md:px-7">
                  <h1 ref={heading} tabIndex={-1} className="flex w-fit items-center gap-2.5 rounded-sm text-lg font-semibold tracking-tight">
                    <Icon name="hash" className="size-5 text-discord-muted" /> {channelId}
                  </h1>
                </div>
              )}
            />
          </DiscordUI>
        </main>
      </div>
    </div>
  )
}
