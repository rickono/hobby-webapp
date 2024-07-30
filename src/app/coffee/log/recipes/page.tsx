import { SimpleLayout } from '@/components/SimpleLayout'
import { getRecipes, Recipe } from '@/lib/queries'
import LinkCards from '@/components/LinkCards'


export default async function Page() {
    const recipes = await getRecipes()
    const display = recipes.map((recipe: Recipe) => ({
        title: recipe.name,
        subtitle: recipe.brew?.brew_method?.name,
        link: `/coffee/log/recipes/${recipe.id.toString()}`
    }))
    return (
        <SimpleLayout
            title="Brew Recipes"
            intro="A brew recipe is a template to quickly fill out your brews."
        >
            <LinkCards cards={display} />
        </SimpleLayout>
    )
}
