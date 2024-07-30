'use card'

import Image from 'next/image'
import Link from 'next/link'

function classNames(...classes: Array<string>) {
    return classes.filter(Boolean).join(' ')
}

type Props = {
    cards: Array<{
        id: number,
        title: string,
        subtitle?: string,
        imageUrl?: string,
        link?: string,
        info: { [key: string]: string }
    }>
}

function ConditionalLink({ href, children }: { href?: string, children: React.ReactNode }) {
    return href ? <Link href={href}>{children}</Link> : children
}

export default function LogoCards({ cards }: Props) {
    return (
        <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
            {cards.map((card) => (
                <ConditionalLink key={card.id} href={card.link}>
                    <li className="overflow-hidden rounded-xl border border-gray-200">
                        <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                            {card.imageUrl && <Image
                                src={card.imageUrl}
                                alt={card.title}
                                width={48}
                                height={48}
                                className="flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
                            />}
                            <div>
                                <div className="text-sm font-medium leading-6 text-gray-900">{card.title}</div>
                                <div className="text-sm leading-6 text-gray-900">{card.subtitle}</div>
                            </div>
                        </div>
                        <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                            {
                                Object.entries(card.info).map(([property, value]) => (
                                    <div className="flex justify-between gap-x-4 py-3" key={`${card.id}_${property}`}>
                                        <dt className="text-gray-500 capitalize">{property}</dt>
                                        <dd className="text-gray-700">
                                            {value}
                                        </dd>
                                    </div>
                                ))
                            }
                        </dl>
                    </li>
                </ConditionalLink>
            ))}
        </ul>
    )
}

