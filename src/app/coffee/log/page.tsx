import { Button } from '@/components/Button'
import { SimpleLayout } from '@/components/SimpleLayout'
import StackedList from '@/components/StackedList'
import ActionCardsGrid from '@/components/ActionCardsGrid'
import Link from 'next/link'
import { formatDate } from '@/lib/formatDate'
import { getCoffees, getLogCoffees } from '@/lib/queries'

type DashboardItemProps = {
    header: string
    children: React.ReactNode
}
function DashboardItem({ children, header }: DashboardItemProps) {
    return (
        <div>
            <div className="flex items-start justify-between">
                <h2 className="mx-auto max-w-2xl text-base font-semibold leading-6 text-gray-900 lg:mx-0 lg:max-w-none">
                    {header}
                </h2>
                <Button>
                    <Link href="/coffee/log/new">Log a Brew</Link>
                </Button>
            </div>
            <div className="relative py-3">
                <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                >
                    <div className="w-full border-t border-gray-300" />
                </div>
            </div>
            {children}
        </div>
    )
}

export default async function Page() {
    const coffees = await getLogCoffees()
    return (
        <SimpleLayout
            title="Brew Log"
            intro="Keep track of your brews to dial in your cup."
        >
            <div className="flex flex-col w-full gap-12">
                <DashboardItem header="Recent Brews">
                    <StackedList />
                </DashboardItem>
                <DashboardItem header="Your coffees">
                    <ActionCardsGrid
                        cards={coffees.map(coffee => ({
                            id: coffee.id.toString(),
                            title: coffee.coffee.name,
                            subtitle: coffee.roast_date ? `Roasted on ${formatDate(coffee.roast_date, { day: 'numeric', month: 'long' })}` : '',
                            actionLeft: {
                                text: 'Brew',
                                action: '/coffee/log/new'
                            },
                            actionRight: {
                                text: 'Finished',
                                action: ''
                            }
                        }))}
                    />
                </DashboardItem>
            </div>
        </SimpleLayout>
    )
}
