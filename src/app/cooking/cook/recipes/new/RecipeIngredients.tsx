'use client'

import { FormSection } from '@/components/FormLayout'
import Input from '@/components/Input'
import Select from '@/components/Select'
import TextArea from '@/components/TextArea'
import {
  Control,
  Controller,
  FieldValues,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'
import { UseFormRegister } from 'react-hook-form'
import { FC, useState } from 'react'
import { NewRecipeForm, NewRecipeIngredient } from './RecipeForm'
import useSupabaseBrowser from '@/utils/supabase-browser'
import { getSources, getUnits } from '@/queries/cooking'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { Combobox } from '@/components/Combobox'
import { IngredientInput } from '@/app/cooking/components/IngredientInput'
import { Tables } from '@/types/supabase'
import Toggle from '@/components/Toggle'
import { Flex } from '@/components/Flex'
import { Button } from '@/components/Button'
import { RecipeIngredientsDisplay } from './RecipeIngredientsDisplay'

interface Props {
  register: UseFormRegister<NewRecipeForm>
  control: Control<NewRecipeForm, any>
  getValues: UseFormGetValues<NewRecipeForm>
  setValue: UseFormSetValue<NewRecipeForm>
  watch: UseFormWatch<NewRecipeForm>
}

const DEFAULT_INGREDIENT = {
  displayString: '',
  optional: false,
  quantity: '',
}

export const RecipeIngredients: FC<Props> = ({
  setValue,
  getValues,
  watch,
}) => {
  const supabase = useSupabaseBrowser()
  const { data: sourcesResponse } = useQuery(getSources(supabase))
  const { data: unitsResponse } = useQuery(getUnits(supabase))
  const sources = sourcesResponse ?? []
  const units = unitsResponse ?? []

  const [currentRecipeIngredient, setCurrentRecipeIngredient] = useState<{
    ingredient?: Tables<'culinary_ingredient'>
    displayString: string
    optional: boolean
    quantity: string
    unit?: Tables<'culinary_unit'>
  }>(DEFAULT_INGREDIENT)
  const [currentIngredient, setCurrentIngredient] =
    useState<Tables<'culinary_ingredient'> | null>(null)

  const formIngredients = watch('ingredients') ?? []

  return (
    <FormSection title="Ingredients" subtitle="">
      <IngredientInput
        selected={currentIngredient}
        setSelected={(ingredient) => {
          setCurrentIngredient(ingredient)
          if (ingredient) {
            setCurrentRecipeIngredient({
              ...currentRecipeIngredient,
              ingredient,
            })
          }
        }}
      />
      <Input
        type="number"
        name="ingredient"
        label="Quantity"
        span={1}
        value={currentRecipeIngredient.quantity ?? 0}
        onChange={(e) =>
          setCurrentRecipeIngredient({
            ...currentRecipeIngredient,
            quantity: e.target.value,
          })
        }
      />
      <Select
        label="Unit"
        onChange={({ value }) => {
          setCurrentRecipeIngredient({
            ...currentRecipeIngredient,
            unit: value,
          })
        }}
        options={units.map((unit) => ({
          label: unit.name,
          value: unit,
        }))}
        value={{
          label: currentRecipeIngredient.unit?.name,
          value: currentRecipeIngredient.unit,
        }}
      />
      <Input span={3} type="text" name="displayName" label="Display as" />
      <div className="relative h-full">
        <Button
          variant="primary"
          className="absolute bottom-0"
          onClick={() => {
            const { ingredient, quantity } = currentRecipeIngredient
            if (ingredient) {
              setValue('ingredients', [
                ...formIngredients,
                {
                  ...currentRecipeIngredient,
                  ingredient,
                  quantity: parseFloat(quantity),
                },
              ])
              setCurrentRecipeIngredient(DEFAULT_INGREDIENT)
              setCurrentIngredient(null)
            }
          }}
        >
          Add
        </Button>
      </div>
      <RecipeIngredientsDisplay formIngredients={formIngredients} />
    </FormSection>
  )
}
