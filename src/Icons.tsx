import type { ComponentProps } from 'react'

type IconName = 'down' | 'right' | 'left' | 'external' | 'hash' | 'chevron'

const paths: Record<IconName, string> = {
  down: 'M8 2.75v10.5m-4-4 4 4 4-4',
  right: 'M2.75 8h10.5m-4-4 4 4-4 4',
  left: 'M13.25 8H2.75m4-4-4 4 4 4',
  external: 'M4 12 12 4M6 4h6v6',
  hash: 'M6 2.5 4.5 13.5m7-11L10 13.5M2.75 6h11m-11 4h11',
  chevron: 'm4 6 4 4 4-4',
}

export function Icon({ name, ...props }: ComponentProps<'svg'> & { name: IconName }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path d={paths[name]} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
