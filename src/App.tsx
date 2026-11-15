import { lazy, Suspense, useEffect, useState } from 'react'
import type { MouseEvent } from 'react'
import { Portfolio } from './Portfolio'
import { displayName } from './content'
import { readChannel } from './navigation'

const DiscordPortfolio = lazy(() => import('./DiscordPortfolio'))

export function App() {
  const [location, setLocation] = useState(() => ({ url: new URL(window.location.href), changed: false }))
  const channel = readChannel(location.url)

  useEffect(() => {
    function syncLocation() {
      const url = new URL(window.location.href)
      setLocation((current) => current.url.href === url.href ? current : { url, changed: true })
    }

    window.addEventListener('popstate', syncLocation)
    window.addEventListener('hashchange', syncLocation)
    return () => {
      window.removeEventListener('popstate', syncLocation)
      window.removeEventListener('hashchange', syncLocation)
    }
  }, [])

  useEffect(() => {
    document.title = channel ? `#${channel} · ${displayName}` : `${displayName} · Projets Discord`
  }, [channel])

  function handleLink(event: MouseEvent<HTMLDivElement>) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

    if (!(event.target instanceof Element)) return

    const link = event.target.closest<HTMLAnchorElement>('a[href]')
    if (!link) return
    const url = new URL(link.href)
    const isLocalDiscordLink = url.origin === window.location.origin && url.pathname === '/' && readChannel(url)
    if (!link.hasAttribute('data-route') && !isLocalDiscordLink) return

    event.preventDefault()
    if (url.href !== window.location.href) window.history.pushState(null, '', url)
    setLocation({ url, changed: true })
  }

  return (
    <div onClick={handleLink}>
      {channel ? (
        <Suspense fallback={(
          <main className="grid min-h-dvh place-content-center gap-4 bg-discord-base px-6 text-center text-white">
            <p role="status">Chargement du mode Discord…</p>
            <a className="font-medium text-discord-accent hover:underline" href="/" data-route>Retour au portfolio</a>
          </main>
        )}>
          <DiscordPortfolio channelId={channel} />
        </Suspense>
      ) : (
        <Portfolio url={location.url} shouldFocus={location.changed} />
      )}
    </div>
  )
}
