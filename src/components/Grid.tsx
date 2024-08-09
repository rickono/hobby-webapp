import clsx from 'clsx'
import { classNames } from '@/lib/util'

type Props = {
  children?: React.ReactNode
  className?: string
}

export function Grid({ children, className }: Props) {
  return (
    <div className={clsx('grid grid-cols-12 gap-4', className)}>{children}</div>
  )
}

type ColSpans = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

type GridItemProps = {
  children?: React.ReactNode
  xs?: ColSpans
  sm?: ColSpans
  md?: ColSpans
  lg?: ColSpans
  xl?: ColSpans
  xxl?: ColSpans
}

export function GridItem({ children, xs, sm, md, lg, xl, xxl }: GridItemProps) {
  return (
    <div
      className={clsx(
        xs && `col-span-${xs}`,
        sm && `sm:col-span-${sm}`,
        md && `md:col-span-${md}`,
        lg && `lg:col-span-${lg}`,
        xl && `xl:col-span-${xl}`,
        xxl && `2xl:col-span-${xxl}`,
      )}
    >
      {children}
    </div>
  )
}
