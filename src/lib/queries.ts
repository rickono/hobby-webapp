import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

import { Database, Tables } from '@/types/supabase'
import { PostgrestError } from '@supabase/supabase-js'

export function getChildField<T>(value: any, field: string): T | undefined {
  if (value && typeof value === 'object') {
    return value[field]
  }
  return undefined
}

export type Insert<T> = Omit<T, 'id' | 'created_at'>

export type Coffee = Tables<'coffee_coffees'> & {
  origin: Tables<'coffee_origins'>
  process: Tables<'coffee_process'>
  roaster: Tables<'coffee_roaster'>
}

export type BrewStep = Tables<'coffee_log_brew_step'>
export type Brewer = Tables<'coffee_brewer'>

export type BrewDetails = Omit<Tables<'coffee_log_brew_details'>, 'brewer'> & {
  brewer: number | Brewer
  coffee_log_brew_step?: BrewStep[]
}

export type Brew = Omit<Tables<'coffee_log_brew'>, 'coffee' | 'details'> & {
  coffee?: number | LogCoffee
  details?: number | BrewDetails
}

export type Recipe = Tables<'coffee_log_recipe'> & {
  details?: BrewDetails
}

export type LogCoffee = Tables<'coffee_log_beans'> & {
  coffee: Coffee
}

export type Roaster = Tables<'coffee_roaster'>
export type Origin = Tables<'coffee_origins'>
export type Process = Tables<'coffee_process'>
export type Variety = Tables<'coffee_variety'>

export function createClient() {
  const cookieStore = cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  )
}

export async function getCoffee(id: string): Promise<Coffee | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('coffee_coffees')
    .select('*, roaster ( name ), origin ( name ), process ( name )')
    .eq('id', id)
    .returns<Coffee[]>()
  if (!data || error) return null
  if (data.length !== 1) return null

  return data[0]
}

export async function getCoffees(): Promise<Coffee[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('coffee_coffees')
    .select('*, roaster ( name, logo_url ), origin ( name ), process ( name )')
    .returns<Coffee[]>()
  if (!data || error) return []

  return data
}

export async function getBrewers(): Promise<Tables<'coffee_brewer'>[]> {
  const supabase = createClient()
  const { data, error } = await supabase.from('coffee_brewer').select()
  if (!data || error) return []
  return data
}

export async function getRecipes(): Promise<Recipe[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('coffee_log_recipe')
    .select(
      `
                id,
                name,
                details (
                    dose,
                    brewer (
                        name
                    ),
                    coffee_log_brew_step (
                        *
                    )
                )`,
    )
    .returns<Recipe[]>()

  if (!data || error) return []
  return data
}

export async function getRecipe(id: number): Promise<Recipe | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('coffee_log_recipe')
    .select('*, brew ( *, coffee_log_brew_step ( * ) )')
    .eq('id', id)
    .returns<Recipe[]>()

  if (!data || error) return null
  if (data.length !== 1) return null

  return data[0]
}

export async function getLogCoffees(): Promise<LogCoffee[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('coffee_log_beans')
    .select('*, coffee ( *, roaster ( name ) )')
    .returns<LogCoffee[]>()

  if (!data || error) return []
  return data
}

export type City = Tables<'dining_city'>
export type Neighborhood = Tables<'dining_neighborhood'>
export type Restaurant = Omit<
  Tables<'dining_restaurants'>,
  'neighborhood' | 'city'
> & {
  neighborhood: string | Neighborhood
  city: string | City
  dining_award?: Award[]
  dining_cuisine?: Cuisine[]
}
export type Cuisine = Tables<'dining_cuisine'>
export type AwardType = Tables<'dining_award_type'>
export type Award = Omit<
  Tables<'dining_award'>,
  'award_type' | 'restaurant'
> & {
  award_type: number | AwardType
  restaurant: number | Restaurant
}

export async function getRestaurants(options?: {
  fields: ('cuisine' | 'award')[]
}): Promise<Restaurant[]> {
  const supabase = createClient()
  let select = '*, city ( * ), neighborhood ( * )'
  if (options?.fields?.includes('cuisine')) {
    select += ', dining_cuisine ( * )'
  }
  if (options?.fields?.includes('award')) {
    select += ', dining_award ( * )'
  }

  const { data, error } = await supabase
    .from('dining_restaurants')
    .select(select)
    .returns<Restaurant[]>()

  if (!data || error) return []
  return data
}

export async function getCities(): Promise<City[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('dining_city')
    .select('*')
    .returns<City[]>()

  if (!data || error) return []
  return data
}

export async function getIngredients(): Promise<Ingredient[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('culinary_ingredient')
    .select()
    .returns<Ingredient[]>()

  if (!data || error) return []
  return data
}

export async function getRootIngredients() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('culinary_ingredient_category')
    .select(`ingredient ( id, name )`)
    .is('category', null)
    .returns<{ ingredient: Ingredient }[]>()
  if (!data || error) return []
  return data?.map(({ ingredient }) => ingredient)
}

export async function getIngredientsInCategory(category: number) {
  const supabase = createClient()
  const res = await supabase
    .from('culinary_ingredient_category')
    .select(`ingredient ( id, name )`)
    .eq('category', category)
    .returns<{ ingredient: Ingredient }[]>()
  return res.data?.map(({ ingredient }) => ingredient) ?? []
}

export async function getIngredientCategories() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('culinary_ingredient_category')
    .select('*')
    .returns<IngredientCategories[]>()
  if (!data || error) return []
  return data
}

export type Ingredient = Tables<'culinary_ingredient'>
export type IngredientCategories = Tables<'culinary_ingredient_category'>

export type TableNames = keyof Database['public']['Tables']

// const supabase = createClient()
// export const db = {
//     coffee: {
//         roaster: supabase.from('coffee_roaster')
//     }
// }
