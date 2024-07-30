import { Button } from '@/components/Button'
import FormLayout, { FormSection } from '@/components/FormLayout'
import { SimpleLayout } from '@/components/SimpleLayout'
import Select from '@/components/Select'
import { getBrewers, getRecipes, getLogCoffees } from '@/lib/queries'
import NewBrewForm from './NewBrewForm'

export default async function Page() {
  const coffees = await getLogCoffees()
  const brewers = await getBrewers()
  const recipes = await getRecipes()
  return (
    <SimpleLayout title="New brew" intro="Log your most recent brew">
      <NewBrewForm coffees={coffees} brewers={brewers} recipes={recipes} />
    </SimpleLayout>
  )
}
