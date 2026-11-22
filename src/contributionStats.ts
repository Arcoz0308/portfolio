import { useEffect, useState } from 'react'
import { contributions } from './content'

type ContributionStats = { commits: number; pullRequests: number; updatedAt: number }
type StatsByContribution = Record<string, ContributionStats | null>
const author = 'Arcoz0308'
const cacheDuration = 6 * 60 * 60 * 1000
let pendingStats: Promise<StatsByContribution> | undefined

async function repositoryStats(repository: string) {
  const query = new URLSearchParams({ q: `repo:${repository} author:${author} is:pr is:merged`, per_page: '1' })
  const [commitsResponse, prsResponse] = await Promise.all([
    fetch(`https://api.github.com/repos/${repository}/commits?author=${author}&per_page=1`, { signal: AbortSignal.timeout(10000) }),
    fetch(`https://api.github.com/search/issues?${query}`, { signal: AbortSignal.timeout(10000) }),
  ])
  if (!commitsResponse.ok || !prsResponse.ok) throw new Error('GitHub unavailable')

  const [commits, prs] = await Promise.all([commitsResponse.json(), prsResponse.json()])
  const lastPage = commitsResponse.headers.get('link')?.match(/<([^>]+)>; rel="last"/)
  const commitCount = lastPage ? Number(new URL(lastPage[1]).searchParams.get('page')) : commits.length
  if (!Array.isArray(commits) || !Number.isSafeInteger(commitCount) || commitCount < 0
    || prs.incomplete_results !== false || !Number.isSafeInteger(prs.total_count) || prs.total_count < 0) {
    throw new Error('Invalid GitHub statistics')
  }
  return { commits: commitCount, pullRequests: prs.total_count as number }
}

async function loadContributionStats(contribution: (typeof contributions)[number]): Promise<ContributionStats | null> {
  const cacheKey = `github-stats:v1:${author}:${contribution.repositories.join(',')}`
  let cached: ContributionStats | undefined
  try {
    const value = JSON.parse(localStorage.getItem(cacheKey) ?? 'null')
    if (value && Number.isSafeInteger(value.commits) && value.commits >= 0
      && Number.isSafeInteger(value.pullRequests) && value.pullRequests >= 0
      && Number.isSafeInteger(value.updatedAt) && value.updatedAt > 0 && value.updatedAt <= Date.now()) {
      cached = value
    }
  } catch {
    // Storage can be blocked or contain an outdated value.
  }
  if (cached && Date.now() - cached.updatedAt < cacheDuration) return cached

  try {
    const repositories = await Promise.all(contribution.repositories.map(repositoryStats))
    const stats = {
      commits: repositories.reduce((total, repository) => total + repository.commits, 0),
      pullRequests: repositories.reduce((total, repository) => total + repository.pullRequests, 0),
      updatedAt: Date.now(),
    }
    try {
      localStorage.setItem(cacheKey, JSON.stringify(stats))
    } catch {
      // Fresh statistics remain usable when storage is unavailable.
    }
    return stats
  } catch {
    return cached ?? null
  }
}

export function useContributionStats() {
  const [stats, setStats] = useState<StatsByContribution>({})
  useEffect(() => {
    let active = true
    pendingStats ??= Promise.all(contributions.map(async (contribution) => [
      contribution.id, await loadContributionStats(contribution),
    ] as const)).then(Object.fromEntries)
    void pendingStats.then((values) => {
      if (active) setStats(values)
    })
    return () => { active = false }
  }, [])
  return stats
}

export function contributionStatsText(stats: ContributionStats | null | undefined) {
  if (stats === undefined) return 'Chargement des statistiques GitHub…'
  if (stats === null) return 'Statistiques GitHub indisponibles'
  return `${stats.commits} commit${stats.commits === 1 ? '' : 's'} · ${stats.pullRequests} PR fusionnée${stats.pullRequests === 1 ? '' : 's'}`
}

export function contributionStatsTitle(stats: ContributionStats | null | undefined, repositories: readonly string[]) {
  const scope = `Commits de ${author} sur les branches par défaut et PR fusionnées dans ${repositories.join(', ')}.`
  return stats ? `${scope} Données du ${new Date(stats.updatedAt).toLocaleString('fr-CH')}.` : scope
}
