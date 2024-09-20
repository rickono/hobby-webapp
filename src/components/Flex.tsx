import { classNames } from '@/lib/util'
import { FC } from 'react'

interface Props {
  children: React.ReactNode
  dir?: 'row' | 'col'
  gap?: number
  justify?:
    | 'justify-start'
    | 'justify-end'
    | 'justify-between'
    | 'justify-center'
  align?: 'items-start' | 'items-end' | 'items-center'
  className?: string | string[]
}

export const Flex: FC<Props> = ({
  children,
  dir,
  gap,
  justify,
  className = [],
}) => {
  return (
    <div
      className={classNames(
        'flex',
        dir === 'col' ? 'flex-col' : 'flex-row',
        `gap-${gap}`,
        justify,
        ...(Array.isArray(className) ? className : [className]),
      )}
    >
      {children}
    </div>
  )
}
