import { Tables } from '@/types/supabase'
import { PostgrestError } from '@supabase/supabase-js'

export interface Response<T> {
  data?: T
  error?: PostgrestError
}

interface EntityMap {
  source: Source
  category: IngredientCategory
  ingredient: Ingredient
}

export type Join<Entity, Joins extends keyof EntityMap = never> = Omit<
  Entity,
  Joins
> & {
  [K in keyof Entity]: K extends Joins ? EntityMap[K] : Entity[K]
}

export const includes = <Joins extends keyof EntityMap>(
  include: string[],
  fk: Joins,
) => {
  return include.includes(fk)
}

export const recipeIncludes = includes<RecipeJoins>

/* Cooking base types */
export type Ingredient = Tables<'culinary_ingredient'>
export type IngredientCategory = Tables<'culinary_ingredient_category'>
export type Recipe = Tables<'culinary_recipe'>
export type Source = Tables<'culinary_recipe_source'>

/* Cooking joins */
export type RecipeJoins = 'source' | 'ingredient'
