'use client'

import { SimpleLayout } from '@/components/SimpleLayout'
import Table from '@/components/Table'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import useSupabaseBrowser from '@/utils/supabase-browser'
import { getRecipes, getRecipeWithIngredientsById } from '@/queries/cooking'
import { useParams } from 'next/navigation'
import NotFound from '@/app/not-found'
import { Recipe } from '../components/Recipe'
import Loading from '@/app/loading'

export default function Page() {
  const supabase = useSupabaseBrowser()
  const { recipeId } = useParams()
  const { data: recipe, isLoading } = useQuery(
    getRecipeWithIngredientsById(supabase, parseInt(recipeId.toString())),
  )

  if (isLoading) {
    return <Loading />
  }

  if (!recipe) {
    return <NotFound />
  }

  return (
    <SimpleLayout title="Recipes" intro="Explore recipes or ingredients.">
      <Recipe recipeId={parseInt(recipeId.toString())} />
    </SimpleLayout>
  )
}
