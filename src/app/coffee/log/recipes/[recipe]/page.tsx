import { SimpleLayout } from "@/components/SimpleLayout"
import { getRecipe } from '@/lib/queries'
import RecipeSteps from "./RecipeSteps"

type Props = {
    params: { recipe: string }
}

export default async function Page({ params }: Props) {
    const recipe = await getRecipe(parseInt(params.recipe))
    if (!recipe) return null
    return (
        <SimpleLayout title={recipe.name} intro="This recipe is good">
            {recipe.details.coffee_log_brew_step && <RecipeSteps steps={recipe.details.coffee_log_brew_step} />}
        </SimpleLayout>
    )
}
