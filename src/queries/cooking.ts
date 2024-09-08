import { TypedSupabaseClient } from '@/utils/types'

export const getIngredientsByCategory = (
  client: TypedSupabaseClient,
  category: number,
) => {
  return client
    .from('culinary_ingredient_category')
    .select(
      `
      ingredient:culinary_ingredient!culinary_ingredient_category_ingredient_fkey (
        id,
        name
      )
    `,
    )
    .eq('category', category)
    .order('ingredient ( name )')
}

export const getIngredientNameById = (
  client: TypedSupabaseClient,
  ingredientId: number,
) => {
  return client
    .from('culinary_ingredient')
    .select('name')
    .eq('id', ingredientId)
    .single()
}

export const getIngredientNameByIds = (
  client: TypedSupabaseClient,
  ingredientIds: number[],
) => {
  return client
    .from('culinary_ingredient')
    .select('name, id')
    .in('id', ingredientIds)
}

export const getSources = (client: TypedSupabaseClient) => {
  return client.from('culinary_recipe_source').select()
}

export const getUnits = (client: TypedSupabaseClient) => {
  return client.from('culinary_unit').select()
}

export const getIngredientsFromSearch = (
  client: TypedSupabaseClient,
  searchText: string,
) => {
  const spacesHandled = searchText.split(' ').join('+')
  return client.rpc('search_ingredients_by_name', { prefix: spacesHandled })
}
