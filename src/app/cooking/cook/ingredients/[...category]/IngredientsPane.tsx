'use client'

import React from 'react'
import { GridItem } from '@/components/Grid'
import { Card } from '@/components/Card'
import useSupabaseBrowser from '@/utils/supabase-browser'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { getIngredientsByCategory } from '@/queries/cooking'

interface Props {
  parentId: number
  path: string[]
}

export default function IngredientsPane({ parentId, path }: Props) {
  const supabase = useSupabaseBrowser()
  const { data: ingredients, error } = useQuery(
    getIngredientsByCategory(supabase, parentId),
  )
  const pathString = path.join('/')

  return (
    <React.Fragment>
      {ingredients &&
        ingredients?.map(
          ({ ingredient }) =>
            ingredient && (
              <GridItem xs={3} key={ingredient.id}>
                <Card className="">
                  <Card.Link
                    href={`/cooking/cook/ingredients/${pathString}/${ingredient.id}`}
                  >
                    {ingredient.name}
                  </Card.Link>
                </Card>
              </GridItem>
            ),
        )}
    </React.Fragment>
  )
}
