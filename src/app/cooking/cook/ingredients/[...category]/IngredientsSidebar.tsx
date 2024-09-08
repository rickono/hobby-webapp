'use client'

import React, { FC } from 'react'
import { GridItem } from '@/components/Grid'
import { Card } from '@/components/Card'
import useSupabaseBrowser from '@/utils/supabase-browser'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { getIngredientsByCategory } from '@/queries/cooking'
import { StackedList } from '@/components/StackedList'

interface Props {
  parentId: number
  path: string[]
}

export const IngredientsSidebar: FC<Props> = ({ parentId, path }: Props) => {
  const supabase = useSupabaseBrowser()
  const { data: ingredients, error } = useQuery(
    getIngredientsByCategory(supabase, parentId),
  )
  const pathString = path.join('/')
  const items =
    ingredients?.map(({ ingredient }) => ({
      title: ingredient?.name ?? '',
      href: `/cooking/cook/ingredients/${pathString}/${ingredient?.id}`,
    })) ?? []

  return (
    <React.Fragment>
      <StackedList items={items} emptyText="No ingredients in this category." />
    </React.Fragment>
  )
}
