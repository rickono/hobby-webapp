'use client'

import { Icon } from '@iconify/react'

export type MichelinAward = {
  year: number
  distinction: 'one_star' | 'two_star' | 'three_star' | 'bib_gourmand' | 'guide'
  greenStar: boolean
}

export function MichelinDistinction({
  distinction,
  greenStar,
}: {
  distinction: MichelinAward['distinction']
  greenStar: boolean
}) {
  let node: React.ReactNode = null
  if (distinction === 'one_star') {
    node = <MichelinStars amount={1} className="text-red-600"/>
  } else if (distinction === 'two_star') {
    node = <MichelinStars amount={2} className="text-red-600"/>
  } else if (distinction === 'three_star') {
    node = <MichelinStars amount={3} className="text-red-600"/>
  } else if (distinction === 'bib_gourmand') {
    node = <BibGourmand className="text-red-600"/>
  }
  return (
    <div className="flex text-xl items-center gap-1">
      {node}
      {greenStar && <GreenStar className="text-green-600"/>}
    </div>
  )
}

export function MichelinStars({
  amount,
  className = '',
}: {
  amount: 1 | 2 | 3
  className?: string
}) {
  return (
    <div className={`flex items-center ${className}`}>
      {new Array(amount).fill(1).map((_, i) => (
        <Icon key={i} icon="tabler:michelin-star" />
      ))}
    </div>
  )
}

export function BibGourmand({ className = ''}: { className?: string }) {
  return <Icon icon="tabler:michelin-bib-gourmand" className={className}/>
}

export function GreenStar({ className='' }: {className?: string }) {
  return <Icon icon="tabler:michelin-star-green" className={className}/>
}
