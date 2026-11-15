type Link = {
  label: string
  href: string
}

type Project = {
  id: string
  name: string
  category: string
  description: string
  contribution?: string
  links: readonly Link[]
}

type Profile = {
  name?: string
  tagline: string
  bio: string
  email?: string
  profiles: readonly Link[]
}

export const profile: Profile = {
  tagline: 'Je crée des outils pour l’écosystème Discord.',
  bio: 'Des projets autour des bots, de l’automatisation et des interfaces Discord.',
  profiles: [],
}

export const displayName = profile.name || 'Portfolio'
export const contactPlaceholder = 'Coordonnées à venir.'

export const projects: readonly Project[] = [
  {
    id: 'arcscord',
    name: 'Arcscord',
    category: 'Framework',
    description: 'Un framework TypeScript pour créer des bots Discord avec discord.js.',
    links: [
      { label: 'Documentation', href: 'https://arcscord.dev/' },
      { label: 'GitHub', href: 'https://github.com/arcscord/arcscord' },
    ],
  },
  {
    id: 'autothreads',
    name: 'AutoThreads',
    category: 'Projet Discord',
    description: 'Description à venir.',
    links: [],
  },
  {
    id: 'discord-ui',
    name: 'arcscord/discord-ui',
    category: 'Bibliothèque React',
    description: 'Des composants React pour afficher les messages, les embeds et les salons Discord sur le web.',
    links: [{ label: 'GitHub', href: 'https://github.com/arcscord/discord-ui' }],
  },
]
