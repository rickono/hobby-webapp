import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database, Tables } from '@/types/supabase'
import {
  Award,
  BrewDetails,
  createClient,
  Ingredient,
  Restaurant,
  TableNames,
} from './queries'
import { PostgrestSingleResponse } from '@supabase/supabase-js'

export async function insertBrewDetails(brewDetails: Partial<BrewDetails>) {
  const supabase = createClientComponentClient<Database>()
  console.log(supabase)
  console.log('supabase created')
  if (typeof brewDetails.brewer !== 'number') {
    return
  }
  console.log('about to insert')
  const res = await supabase
    .from('coffee_log_brew_details')
    .insert({
      brewer: brewDetails.brewer,
      dose: brewDetails.dose,
    })
    .select('*')
  return res
}

export function getId<T extends number | undefined | { id: number }>(
  object: T,
): number | undefined {
  if (object === undefined) {
    return object
  }
  if (typeof object === 'number') {
    return object
  }
  return object.id
}

export function getIdString<T extends string | undefined | { id: string }>(
  object: T,
): string | undefined {
  if (object === undefined) {
    return object
  }
  if (typeof object === 'string') {
    return object
  }
  return object.id
}

export async function getDataClient<T>(
  from: TableNames,
  select: string,
  eq?: [string, string],
): Promise<T> {
  const supabase = createClientComponentClient()

  const response = supabase.from(from).select(select)
  if (eq) {
    response.eq(...eq)
  }

  const { data, error } = await response.returns<T>()

  if (error) {
    console.log(error)
    throw error
  }
  return data
}

export async function insertRestaurant(restaurant: Partial<Restaurant>) {
  const supabase = createClientComponentClient<Database>()
  const res = await supabase
    .from('dining_restaurants')
    .insert({
      ...restaurant,
      name: restaurant.name || '',
      city: getIdString(restaurant.city),
      neighborhood: getIdString(restaurant.neighborhood),
    })
    .select('*')
  return res
}

export async function insertAward(award: Partial<Award>) {
  const supabase = createClientComponentClient<Database>()
  const res = await supabase
    .from('dining_award')
    .insert({
      award_type: getId(award.award_type),
      restaurant: getId(award.restaurant),
      award: award.award,
    })
    .select('*')
  return res
}

export async function insertRestaurantCuisine(
  cuisine: number,
  restaurant: number,
) {
  const supabase = createClientComponentClient<Database>()
  const res = await supabase
    .from('dining_restaurant_cuisine')
    .insert({
      cuisine,
      restaurant,
    })
    .select('*')
  return res
}

export async function insertCity(cityId: string, name: string) {
  const supabase = createClientComponentClient<Database>()
  const res = await supabase
    .from('dining_city')
    .upsert({
      id: cityId,
      name,
    })
    .select('*')
  return res
}

export async function insertNeighborhood(
  neighborhoodId: string,
  cityId: string,
  name: string,
) {
  const supabase = createClientComponentClient<Database>()
  const res = await supabase
    .from('dining_neighborhood')
    .upsert({
      id: neighborhoodId,
      city: cityId,
      name,
    })
    .select('*')
  return res
}

export async function getIngredients() {
  const supabase = createClientComponentClient<Database>()
  const res = await supabase.from('culinary_ingredient').select()
  return res
}

export async function getRootIngredients() {
  const supabase = createClientComponentClient<Database>()
  const res = await supabase
    .from('culinary_ingredient_category')
    .select(`ingredient ( id, name )`)
    .is('category', null)
    .returns<{ ingredient: Ingredient }[]>()
  return res.data?.map(({ ingredient }) => ingredient)
}

export async function getIngredientsInCategory(category: number) {
  const supabase = createClientComponentClient<Database>()
  const res = await supabase
    .from('culinary_ingredient_category')
    .select(`ingredient ( id, name )`)
    .eq('category', category)
    .returns<{ ingredient: Ingredient }[]>()
  return res.data?.map(({ ingredient }) => ingredient)
}

const supabase = createClientComponentClient<Database>()
export const db = {
  coffee: {
    coffee: supabase.from('coffee_coffees'),
    roaster: supabase.from('coffee_roaster'),
    origin: supabase.from('coffee_origins'),
    process: supabase.from('coffee_process'),
    variety: supabase.from('coffee_variety'),
    coffee_variety: supabase.from('coffee_coffee_variety'),
  },
}
