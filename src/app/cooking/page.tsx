import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'

export const metadata: Metadata = {
    title: 'Cooking',
    description: 'The quest for the perfect cup.',
}

export default function Page() {
    return (
        <SimpleLayout
            title="I like to make things that I can eat."
            intro=""
        >
            Content soon!
        </SimpleLayout>
    )
}

