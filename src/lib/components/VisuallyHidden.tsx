import type { ReactNode } from 'react'

type VisuallyHiddenProps = {
  children: ReactNode
}

export function VisuallyHidden({ children }: VisuallyHiddenProps) {
  return <span className="sr-only">{children}</span>
}
