import LogoCards from '@/components/LogoCards'
import { Container } from '@/components/Container'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getCoffees } from '@/lib/queries'
import { Button } from '@/components/Button'
import NewCoffeeForm from '../components/NewCoffeeForm'

export default async function Page() {
  const coffees = await getCoffees()
  const cards = coffees.map((coffee) => ({
    id: coffee.id,
    title: coffee.name,
    subtitle: coffee.roaster?.name,
    imageUrl: coffee.roaster?.logo_url ?? undefined,
    link: `/coffee/coffees/${coffee.id}`,
    info: {
      origin: coffee.origin?.name ?? '',
      process: coffee.process?.name ?? '',
    },
  }))


  return (
    <SimpleLayout title="Coffees" intro="Some coffees I've been drinking.">
      <NewCoffeeForm />
      <Button className="mb-4">Add a new coffee</Button>
      <LogoCards cards={cards} />
    </SimpleLayout>
  )
}
