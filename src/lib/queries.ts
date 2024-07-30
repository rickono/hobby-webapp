import {
  createClientComponentClient,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs'
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

export async function getCoffee(id: string): Promise<Coffee | null> {
  const supabase = createServerComponentClient<Database>({ cookies })
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
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data, error } = await supabase
    .from('coffee_coffees')
    .select('*, roaster ( name, logo_url ), origin ( name ), process ( name )')
    .returns<Coffee[]>()
  if (!data || error) return []

  return data
}

export async function getBrewers(): Promise<Tables<'coffee_brewer'>[]> {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data, error } = await supabase.from('coffee_brewer').select()
  if (!data || error) return []
  return data
}

export async function getRecipes(): Promise<Recipe[]> {
  const supabase = createServerComponentClient<Database>({ cookies })
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
  const supabase = createServerComponentClient<Database>({ cookies })
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
  const supabase = createServerComponentClient<Database>({ cookies })
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
  const supabase = createServerComponentClient<Database>({ cookies })
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
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data, error } = await supabase
    .from('dining_city')
    .select('*')
    .returns<City[]>()

  if (!data || error) return []
  return data
}

export type TableNames = keyof Database['public']['Tables']

const supabase = createServerComponentClient<Database>({ cookies })
export const db = {
    coffee: {
        roaster: supabase.from('coffee_roaster')
    }
}

