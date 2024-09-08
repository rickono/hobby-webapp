'use client'

import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { RecipeDetails } from './RecipeDetails'
import FormLayout from '@/components/FormLayout'
import { RecipeIngredients } from './RecipeIngredients'
import { Tables } from '@/types/supabase'

export interface NewRecipeIngredient {
  ingredient: Tables<'culinary_ingredient'>
  displayString: string
  optional: boolean
  quantity?: number
  unit?: Tables<'culinary_unit'>
  ingredientRecipe?: Tables<'culinary_recipe'>
}

export interface NewRecipeForm {
  name: string
  description: string
  source: string
  ingredients: NewRecipeIngredient[]
}

interface Props {}

export const RecipeForm: FC<Props> = ({}: Props) => {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<NewRecipeForm>()

  return (
    <FormLayout onSubmit={() => {}}>
      <RecipeDetails control={control} register={register} />
      <RecipeIngredients
        control={control}
        register={register}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
      />
    </FormLayout>
  )
}
