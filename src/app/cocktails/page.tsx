import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'

export const metadata: Metadata = {
    title: 'Coffee',
    description: 'The quest for the perfect cup.',
}

export default function Page() {
    return (
        <SimpleLayout
            title="All about imbibing."
            intro=""
        >
            Nothing here yet :(
        </SimpleLayout>
    )
}

