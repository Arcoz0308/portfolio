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
  history?: string
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

type Contribution = {
  id: string
  name: string
  repositories: readonly string[]
  period: string
  description: string
  stack: readonly string[]
  links: readonly Link[]
}

export const contributions: readonly Contribution[] = [
  {
    id: 'kotbo',
    name: 'Kotbo',
    repositories: ['Kotbo-Bot/Kotbo', 'Kotbo-Bot/Landing-Page'],
    period: '2026',
    description: 'Restructuration ciblée de certaines fonctionnalités du bot, corrections mineures et amélioration des aperçus Discord sur le site.',
    stack: ['TypeScript', 'Prisma', 'Svelte'],
    links: [
      { label: 'Mes PR sur le bot', href: 'https://github.com/Kotbo-Bot/Kotbo/pulls?q=is%3Apr+author%3AArcoz0308' },
      { label: 'PR de la landing page', href: 'https://github.com/Kotbo-Bot/Landing-Page/pull/14' },
    ],
  },
  {
    id: 'codelynx',
    name: 'Codelynx',
    repositories: ['Melvynx/codelynx-formation-discord-bot'],
    period: '2024',
    description: 'Développement de fonctionnalités pour le bot Codelynx de la communauté formation de Melvynx. Recherche de contenus X et YouTube, vérification des membres et outils communautaires.',
    stack: ['TypeScript', 'Prisma', 'OpenAI'],
    links: [
      { label: 'Mes PR', href: 'https://github.com/Melvynx/codelynx-formation-discord-bot/pulls?q=is%3Apr+author%3AArcoz0308' },
      { label: 'Thread technique', href: 'https://x.com/Arcozdev/status/1832826247334019248' },
    ],
  },
]

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
  {
    id: 'bse-discord-bot',
    name: 'BSE Discord Bot',
    iconUrl: '/images/bse.jpg',
    category: 'Bot Discord',
    description: 'Le bot Discord de BSE, avec niveaux, classements et annonces d’événements. Utilisé pendant environ deux ans.',
    history: 'Développé en 2023–2024 · Hors service',
    stack: ['Node.js', 'TypeScript', 'discord.js', 'Prisma'],
    links: [{ label: 'GitHub', href: 'https://github.com/BSEsportTeam/Discord-Bot' }],
  },
]
