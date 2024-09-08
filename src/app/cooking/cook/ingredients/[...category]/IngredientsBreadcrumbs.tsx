'use client'

import Breadcrumbs from '@/components/Breadcrumbs'
import {
  getIngredientNameById,
  getIngredientNameByIds,
  getIngredientsByCategory,
} from '@/queries/cooking'
import useSupabaseBrowser from '@/utils/supabase-browser'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { FC } from 'react'

interface Props {
  categoryIds: number[]
}

export const IngredientsBreadcrumbs: FC<Props> = ({ categoryIds }: Props) => {
  const supabase = useSupabaseBrowser()
  const { data: categories } = useQuery(
    getIngredientNameByIds(supabase, categoryIds),
  )
  const orderedCategories = categoryIds
    .map(
      (categoryId) =>
        categories?.find((category) => category.id === categoryId),
    )
    .filter(
      (category): category is { name: string; id: number } =>
        category !== undefined,
    )

  const pages =
    orderedCategories.map(({ name, id }, index) => ({
      name,
      href: `/cooking/cook/ingredients/${orderedCategories
        .slice(0, index + 1)
        .map((category) => category.id)
        .join('/')}`,
      current: false,
    })) ?? []
  return <Breadcrumbs pages={pages} home="/cooking/cook/ingredients" />
}
