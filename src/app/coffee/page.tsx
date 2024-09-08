import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'

const projects = [
  {
    name: 'Accurate extraction calculator',
    description: "A calculator for Jonathan Gagne's extraction equations.",
    href: 'coffee/extraction-calculator',
  },
  {
    name: 'Coffee Log',
    description: 'A coffee log to dial in the perfect brew.',
    href: 'coffee/log',
  },
]

export const metadata: Metadata = {
  title: 'Coffee',
  description: 'The quest for the perfect cup.',
}

export default function Page() {
  return (
    <SimpleLayout
      title="My quest for the perfect cup."
      intro="A collection of notes and tools for my coffee journey."
    >
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <Card as="li" key={project.name}>
            <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
              <Card.Link href={project.href}>{project.name}</Card.Link>
            </h2>
            <Card.Description>{project.description}</Card.Description>
          </Card>
        ))}
      </ul>
    </SimpleLayout>
  )
}
