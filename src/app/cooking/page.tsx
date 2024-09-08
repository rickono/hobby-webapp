import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'

export const metadata: Metadata = {
  title: 'Cooking',
  description: 'The quest for the perfect cup.',
}

const projects = [
  {
    name: 'Notes',
    description: 'Notes on everything culinary.',
    href: 'cooking/notes',
  },
  {
    name: 'Cooking',
    description: 'Browse recipes and ingredients to gather inspiration.',
    href: 'cooking/cook',
  },
]

export default function Page() {
  return (
    <SimpleLayout title="I like to make things that I can eat." intro="">
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
