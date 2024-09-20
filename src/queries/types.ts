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
  culinary_recipe_ingredient: RecipeIngredient
  unit: Unit
}

export type Join<
  Entity,
  Joins extends keyof EntityMap = never,
  OverrideTypes extends Partial<Record<keyof Entity, any>> = {},
> = Omit<Entity, Joins> & {
  [K in keyof Entity]: K extends Joins
    ? K extends keyof OverrideTypes
      ? OverrideTypes[K]
      : EntityMap[K]
    : Entity[K]
}

export const includes = <Joins extends keyof EntityMap>(
  include: string[],
  fk: Joins,
) => {
  return include.includes(fk)
}

export const recipeIncludes = includes<RecipeJoins>

/* Cooking base types
    include join table ids for typing
*/
export type Ingredient = Tables<'culinary_ingredient'>
export type IngredientCategory = Tables<'culinary_ingredient_category'>
export type Recipe = Tables<'culinary_recipe'> & {
  culinary_recipe_ingredient: number
}
export type RecipeIngredient = Tables<'culinary_recipe_ingredient'>
export type Source = Tables<'culinary_recipe_source'>
export type Unit = Tables<'culinary_unit'>

/* Cooking joins */
export type IngredientCategoryJoins = 'category' | 'ingredient'
export type RecipeJoins = 'source' | 'ingredient' | 'culinary_recipe_ingredient'
export type RecipeIngredientJoins = 'recipe' | 'ingredient' | 'unit'
