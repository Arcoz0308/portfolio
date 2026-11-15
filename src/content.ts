type Link = {
  label: string
  href: string
}

type Project = {
  id: string
  name: string
  iconUrl: string
  category: string
  description: string
  contribution?: string
  stack: readonly string[]
  links: readonly Link[]
}

type Profile = {
  name?: string
  avatarUrl: string
  tagline: string
  bio: string
  email?: string
  profiles: readonly Link[]
}

export const profile: Profile = {
  name: 'Arcoz',
  avatarUrl: '/images/arcoz.webp',
  tagline: 'Je crée des outils pour l’écosystème Discord.',
  bio: 'Développeur amateur et autodidacte depuis 2020, je m’intéresse surtout aux outils liés à Discord.',
  email: 'contact@arcoz.dev',
  profiles: [{ label: 'GitHub', href: 'https://github.com/Arcoz0308' }],
}

export const displayName = profile.name || 'Portfolio'
export const contactPlaceholder = 'Coordonnées à venir.'

export const projects: readonly Project[] = [
  {
    id: 'arcscord',
    name: 'Arcscord',
    iconUrl: '/images/arcscord.jpg',
    category: 'Framework',
    description: 'Un framework pour tirer pleinement parti de TypeScript dans le développement de bots Discord.',
    stack: ['Node.js', 'TypeScript', 'React'],
    links: [
      { label: 'Site', href: 'https://arcscord.dev' },
      { label: 'GitHub', href: 'https://github.com/arcscord/arcscord' },
    ],
  },
  {
    id: 'autothreads',
    name: 'AutoThreads',
    iconUrl: '/images/autothreads.png',
    category: 'Bot Discord',
    description: 'Un bot Discord qui crée automatiquement des fils et propose d’autres outils pour les serveurs communautaires.',
    stack: ['Node.js', 'Prisma', 'TypeScript', 'Next.js'],
    links: [{ label: 'Site', href: 'https://autothreads.arcoz.dev' }],
  },
  {
    id: 'discord-ui',
    name: 'arcscord/discord-ui',
    iconUrl: '/images/arcscord.jpg',
    category: 'Bibliothèque UI',
    description: 'Des composants web pour recréer des éléments de l’interface Discord sur des sites et des dashboards.',
    stack: ['Node.js', 'React', 'Vue', 'TypeScript'],
    links: [
      { label: 'Site', href: 'https://ui.arcscord.dev' },
      { label: 'GitHub', href: 'https://github.com/arcscord/discord-ui' },
    ],
  },
]
