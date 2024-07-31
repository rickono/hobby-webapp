"use server"

import { getCoffee, Coffee } from "@/lib/queries"

import Image from "next/image"
import { Container } from '@/components/Container'

const getCoffeeStats = (coffee: Coffee): Array<{ label: string, value: string }> => {
    return [
        { label: 'Origin', value: coffee.origin?.name },
        { label: 'Region', value: coffee.region },
        { label: 'Producer', value: coffee.producer },
        { label: 'Farm Name', value: coffee.farm_name },
        { label: 'Farm Size', value: coffee.farm_size },
        { label: 'Elevation', value: coffee.elevation },
        { label: 'Variety', value: coffee.variety },
        { label: 'Harvest Period', value: coffee.harvest_period },
        { label: 'Process', value: coffee.process?.name },
    ].filter(stat => stat.value)
        .map(({ label, value }) => {
            switch (label) {
                case 'Farm Size':
                    return { label, value: `${value} acres` }
                case 'Elevation':
                    return { label, value: `${value}m` }
                default:
                    return { label, value: value!.toString() }
            }
        })
}

type Props = {
    params: { coffee: string }
}

export default async function Page({ params }: Props) {
    const coffee = await getCoffee(params.coffee)
    if (coffee === null) return null
    const coffeeStats = getCoffeeStats(coffee)
    const containerClass = `mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none ${coffee.image_url && 'lg:grid-cols-2'}`

    return (
        <Container className="mt-16 sm:mt-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className={containerClass}>
                    {coffee.image_url && <div className="relative overflow-hidden rounded-3xl shadow-2xl max-w-xs">
                        <Image
                            src={coffee.image_url ?? ''}
                            alt={coffee.name}
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="w-full h-auto"
                        />
                    </div>}
                    <div>
                        <div className="text-base leading-7 text-gray-700">
                            <p className="text-base font-semibold leading-7 text-indigo-600">{coffee.roaster.name}</p>
                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{coffee.name}</h1>
                            <div>
                                <p className="mt-6">{coffee.description}</p>
                            </div>
                        </div>
                        <dl className="divide-y divide-gray-100 mt-8">
                            {
                                coffeeStats.map(stat => (
                                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0" key={stat.label}>
                                        <dt className="text-sm font-medium leading-6 text-gray-900">{stat.label}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{stat.value}</dd>
                                    </div>
                                ))
                            }
                        </dl>
                        <div className="mt-10 flex">
                            <a href="#" className="text-base font-semibold leading-7 text-indigo-600">
                                Learn more about our company <span aria-hidden="true">&rarr;</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}
