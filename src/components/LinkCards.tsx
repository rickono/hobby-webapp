import Image from "next/image"

type Props = {
    cards: Array<{
        title: string
        link: string
        image?: string
        subtitle?: string
    }>
}

export default function LinkCards({ cards }: Props) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {cards.map((card) => (
                <div
                    key={card.title}
                    className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
                >
                    {card.image &&
                        <div className="flex-shrink-0">
                            <Image src={card.image} height={40} width={40} alt={card.title} />
                        </div>
                    }
                    <div className="min-w-0 flex-1">
                        <a href={card.link} className="focus:outline-none">
                            <span className="absolute inset-0" aria-hidden="true" />
                            <p className="text-sm font-medium text-gray-900">{card.title}</p>
                            <p className="truncate text-sm text-gray-500">{card.subtitle}</p>
                        </a>
                    </div>
                </div>
            ))}
        </div>
    )
}

