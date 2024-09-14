import { FC } from 'react'

interface Props {
  variant:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    // | 'subtitle1'
    // | 'subtitle2'
    // | 'body1'
    // | 'body2'
    | 'strong'
    | 'prose'
  children: React.ReactNode
}
export const Typography: FC<Props> = ({ variant, children }) => {
  switch (variant) {
    case 'h1':
      return (
        <h1 className="mb-4 mt-2 text-4xl font-bold capitalize tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          {children}
        </h1>
      )
    case 'h2':
      return (
        <h2 className="mb-4 mt-2 text-3xl font-bold capitalize tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl">
          {children}
        </h2>
      )
    case 'h3':
      return (
        <h2 className="mb-4 mt-2 text-xl font-bold capitalize tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-2xl">
          {children}
        </h2>
      )
    case 'strong':
      return <strong className="font-bold">{children}</strong>
    case 'prose':
      return <p className="prose">{children}</p>
  }
}
