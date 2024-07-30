import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'

const people = [
    {
        name: 'Jane Cooper',
        title: 'Regional Paradigm Technician',
        role: 'Admin',
        email: 'janecooper@example.com',
        telephone: '+1-202-555-0170',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    // More people...
]

type Props = {
    cards: Array<{
        id: string,
        title: string,
        subtitle?: string,
        actionLeft?: {
            text: string
            action: string | (() => void)
        }
        actionRight?: {
            text: string
            action: string | (() => void)
        }
    }>
}

export default function ActionCardsGrid({ cards }: Props) {
    return (
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
                <li key={card.id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                    <div className="flex w-full items-center justify-between space-x-6 p-6">
                        <div className="flex-1 truncate">
                            <div className="flex items-center space-x-3">
                                <h3 className="truncate text-sm font-medium text-gray-900">{card.title}</h3>
                            </div>
                            <p className="mt-1 truncate text-sm text-gray-500">{card.subtitle}</p>
                        </div>
                    </div>
                    <div>
                        <div className="-mt-px flex divide-x divide-gray-200">
                            {card.actionLeft && <div className="flex w-0 flex-1">
                                <a
                                    href={`mailto:${card.title}`}
                                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                >
                                    <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    {card.actionLeft.text}
                                </a>
                            </div>}
                            {card.actionRight && <div className="-ml-px flex w-0 flex-1">
                                <a
                                    href={`tel:${card.title}`}
                                    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                >
                                    <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    {card.actionRight.text}
                                </a>
                            </div>}
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}

