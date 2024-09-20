import { TypedSupabaseClient } from '@/utils/types'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import {
  includes,
  Join,
  Recipe,
  recipeIncludes,
  RecipeIngredient,
  RecipeJoins,
  Response,
} from './types'
import { RecipeIngredients } from '@/app/cooking/cook/recipes/new/RecipeIngredients'

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

export const insertRecipe = (
  client: TypedSupabaseClient,
  recipe: {
    name: string
    description?: string
    inProgress?: boolean
    source?: number | null
    ingredient?: number | null
    procedure?: string
  },
) => {
  return client.from('culinary_recipe').insert(recipe).select().single()
}

export const getRecipeByIds = (client: TypedSupabaseClient, ids: number[]) => {
  return client.from('culinary_recipe').select().in('id', ids)
}

export const getRecipeById = (client: TypedSupabaseClient, id: number) => {
  return client.from('culinary_recipe').select().eq('id', id).single()
}

export const getRecipeWithIngredientsById = (
  client: TypedSupabaseClient,
  id: number,
) => {
  return client
    .from('culinary_recipe')
    .select(
      `
      *, 
      culinary_recipe_ingredient (
        ingredient:culinary_ingredient (
          name,
          recipe:culinary_recipe(id)
        ),
        unit:culinary_unit (name),
        quantity,
        display_name
      )
      `,
    )
    .eq('id', id)
    .maybeSingle()
}

export const getRecipeWithIngredientsByIds = (
  client: TypedSupabaseClient,
  ids: number[],
) => {
  return client
    .from('culinary_recipe')
    .select(
      `
      *, 
      culinary_recipe_ingredient (
        ingredient:culinary_ingredient (name),
        unit:culinary_unit (name),
        quantity,
        display_name
      )
      `,
    )
    .in('id', ids)
}

export const insertIngredient = (
  client: TypedSupabaseClient,
  ingredient: {
    name: string
  },
) => {
  return client.from('culinary_ingredient').insert(ingredient).select().single()
}

export const insertRecipeIngredient = (
  client: TypedSupabaseClient,
  recipeIngredient: {
    recipe: number
    ingredient: number
    quantity?: number
    unit?: number
    display_name?: string
  },
) => {
  return client
    .from('culinary_recipe_ingredient')
    .insert(recipeIngredient)
    .select()
    .single()
}

export const updateRecipe = (
  client: TypedSupabaseClient,
  recipeId: number,
  recipe: {
    in_progress: boolean
  },
) => {
  return client.from('culinary_recipe').update(recipe).eq('id', recipeId)
}

export const getRecipes = <Joins extends RecipeJoins = never>(
  client: TypedSupabaseClient,
  include: Joins[] = [],
) => {
  const includeIngredient = recipeIncludes(include, 'ingredient')
  const includeSource = recipeIncludes(include, 'source')
  const includeRecipeIngredients = recipeIncludes(
    include,
    'culinary_recipe_ingredient',
  )

  const qb = client
    .from('culinary_recipe')
    .select(
      `
      *
      ${includeIngredient ? ', ingredient ( * )' : ''}
      ${includeSource ? ', source ( * )' : ''}
      ${includeRecipeIngredients ? ', culinary_recipe_ingredient ( ingredient:culinary_ingredient (name), unit:culinary_unit (name), quantity, display_name )' : ''}
      `,
    )
    .returns<
      Join<
        Recipe,
        (typeof include)[number],
        {
          culinary_recipe_ingredient: Join<
            RecipeIngredient,
            'ingredient' | 'unit'
          >[]
        }
      >[]
    >()
  return qb
}

export const getRecipe = <Joins extends RecipeJoins = never>(
  client: TypedSupabaseClient,
  id: number,
  include: Joins[] = [],
) => {
  const includeIngredient = recipeIncludes(include, 'ingredient')
  const includeSource = recipeIncludes(include, 'source')
  const includeRecipeIngredients = recipeIncludes(
    include,
    'culinary_recipe_ingredient',
  )

  const qb = client
    .from('culinary_recipe')
    .select(
      `
      *
      ${includeIngredient ? ', ingredient ( * )' : ''}
      ${includeSource ? ', source ( * )' : ''}
      ${includeRecipeIngredients ? ', culinary_recipe_ingredient ( ingredient:culinary_ingredient (*), unit:culinary_unit (*), quantity, display_name )' : ''}
      `,
    )
    .eq('id', id)
    .returns<
      Join<
        Recipe,
        (typeof include)[number],
        {
          culinary_recipe_ingredient: Join<
            RecipeIngredient,
            'ingredient' | 'unit'
          >[]
        }
      >[]
    >()
    .maybeSingle()
  return qb
}
