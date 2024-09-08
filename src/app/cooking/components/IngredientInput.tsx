'use client'

import { getIngredientsFromSearch } from '@/queries/cooking'
import { Tables } from '@/types/supabase'
import useSupabaseBrowser from '@/utils/supabase-browser'
import { Combobox } from '@/components/Combobox'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { FC, useEffect, useState } from 'react'

interface Props {
  selected: Tables<'culinary_ingredient'> | null
  setSelected: (ingredient: Tables<'culinary_ingredient'> | null) => void
}

export const IngredientInput: FC<Props> = ({ selected, setSelected }) => {
  const supabase = useSupabaseBrowser()
  const [searchQuery, setSearchQuery] = useState('')

  const { data: ingredients } = useQuery(
    getIngredientsFromSearch(supabase, searchQuery),
  )

  return (
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
        setSelected(item)
        setSearchQuery('')
      }}
      selected={selected}
    />
  )
}
