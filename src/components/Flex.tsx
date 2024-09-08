import { classNames } from '@/lib/util'
import { FC } from 'react'

interface Props {
  children: React.ReactNode
  dir: 'row' | 'col'
}

export const Flex: FC<Props> = ({ children, dir }) => {
  return (
    <div
      className={classNames('flex', dir === 'row' ? 'flex-row' : 'flex-col')}
    >
      {children}
    </div>
  )
}
