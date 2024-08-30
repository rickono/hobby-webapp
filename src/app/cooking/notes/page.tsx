import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'

export const metadata: Metadata = {
  title: 'Cooking',
  description: 'The quest for the perfect cup.',
}

const projects = [
  {
    name: 'Modernist Cuisine',
    description: 'The book that started a revolution.',
    href: 'notes/modernist-cuisine',
  },
]

export default function Page() {
  return (
    <SimpleLayout
      title="Cooking notes"
      intro="Notes from books, videos, and more."
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
