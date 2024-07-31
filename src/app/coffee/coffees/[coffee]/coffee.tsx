"use server"

const stats = [
    { label: 'Origin', value: 'Honduras' },
    { label: 'Region', value: 'Santa Bárbara' },
    { label: 'Producer', value: 'Nicolas Alvarado' },
    { label: 'Farm Name', value: 'El Pino' },
    { label: 'Farm Size', value: '4.25 hectares' },
    { label: 'Elevation', value: '1750m' },
    { label: 'Variety', value: 'Yellow and Red Pacas' },
    { label: 'Harvest Period', value: 'December - June' },
    { label: 'Process', value: 'Washed' },
]

export default function Page() {
    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                <div className="lg:pr-4">
                    <div className="relative overflow-hidden rounded-3xl bg-gray-900 px-6 pb-9 pt-64 shadow-2xl sm:px-12 lg:max-w-lg lg:px-8 lg:pb-8 xl:px-10 xl:pb-10">
                        <img
                            className="absolute inset-0 h-full w-full object-cover brightness-125 saturate-0"
                            src="https://images.unsplash.com/photo-1630569267625-157f8f9d1a7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80"
                            alt=""
                        />
                    </div>
                </div>
                <div>
                    <div className="text-base leading-7 text-gray-700 lg:max-w-lg">
                        <p className="text-base font-semibold leading-7 text-indigo-600">Parlor Coffee</p>
                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Honduras El Pino
                        </h1>
                        <div className="max-w-xl">
                            <p className="mt-6">
                                Nicolas Alvarado’s forty years of coffee farming experience, combined with pristine water piped from the rainforest above, ensures exceptionally processed coffees. Rich, rounded flavors of milk chocolate and hibiscus meld with a lingering cherry-toned sweetness in every sip of this season’s harvest.

                            </p>
                        </div>
                    </div>
                    <dl className="divide-y divide-gray-100 mt-8">
                        {
                            stats.map(stat => (
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
    )
}

