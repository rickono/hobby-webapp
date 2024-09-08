import { FC } from 'react'

interface Props {
  variant:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
  children: React.ReactNode
}
export const Typography: FC<Props> = ({ variant, children }) => {
  switch (variant) {
    case 'h2':
      return (
        <h2 className="mb-4 mt-2 text-3xl font-bold capitalize tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl">
          {children}
        </h2>
      )
  }
}
