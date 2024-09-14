'use client'

import { getIngredientsFromSearch } from '@/queries/cooking'
import { Tables } from '@/types/supabase'
import useSupabaseBrowser from '@/utils/supabase-browser'
import { Combobox } from '@/components/Combobox'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { FC, useEffect, useState } from 'react'
import { getSpan } from '@/components/util'

interface Props {
  selected: Tables<'culinary_ingredient'> | null
  onChange: (ingredient: Tables<'culinary_ingredient'> | null) => void
  span?: number
}

export const IngredientInput: FC<Props> = ({
  selected,
  onChange,
  span = 2,
}) => {
  const supabase = useSupabaseBrowser()
  const [searchQuery, setSearchQuery] = useState('')

  const { data: ingredients } = useQuery(
    getIngredientsFromSearch(supabase, searchQuery),
  )

  return (
    <div className={getSpan(span)}>
      <Combobox<Tables<'culinary_ingredient'>>
        label="Ingredient"
        query={searchQuery}
        setQuery={setSearchQuery}
        options={
          ingredients?.map((ingredient) => ({
            label: ingredient.name,
            value: ingredient,
            searchString: ingredient.name,
          })) ?? []
        }
        displayValue={(ingredient) => ingredient?.name ?? ''}
        onChange={(item) => {
          onChange(item)
          setSearchQuery('')
        }}
        selected={selected}
      />
    </div>
  )
}
