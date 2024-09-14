import { Typography } from '@/components/Typography'
import { getRecipeWithIngredientsById, updateRecipe } from '@/queries/cooking'
import useSupabaseBrowser from '@/utils/supabase-browser'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { FC } from 'react'
import { Recipe } from '../components/Recipe'
import { FormButtons } from '@/components/FormLayout'

interface Props {}
export const RecipeReview: FC<Props> = () => {
  const searchParams = useSearchParams()
  const supabase = useSupabaseBrowser()
  const router = useRouter()
  const recipeId = parseInt(searchParams.get('recipe') ?? '')
  const subrecipeIds =
    searchParams
      .get('subrecipes')
      ?.split(',')
      .filter((id): id is string => !!id)
      .map((id) => parseInt(id)) ?? []

  const { data: recipe } = useQuery(
    getRecipeWithIngredientsById(supabase, recipeId),
  )

  const onSave = async () => {
    await updateRecipe(supabase, recipeId, { in_progress: false })
    for (const subrecipeId of subrecipeIds) {
      await updateRecipe(supabase, subrecipeId, { in_progress: false })
    }
    router.push('/cooking/cook')
  }

  if (!recipe) {
    return null
  }
  return (
    <div className="space-y-12">
      <Recipe recipeId={recipeId} />
      <FormButtons onOk={onSave} />
    </div>
  )
}
