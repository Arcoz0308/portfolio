export const channelIds = ['bienvenue', 'projets', 'contributions', 'contact'] as const
export type ChannelId = (typeof channelIds)[number]

export function discordHref(channel: ChannelId = 'bienvenue') {
  return `/?mode=discord&salon=${channel}`
}

export function readChannel(url: URL): ChannelId | undefined {
  if (url.searchParams.get('mode') !== 'discord') return undefined

  return channelIds.find((id) => id === url.searchParams.get('salon')) ?? 'bienvenue'
}
