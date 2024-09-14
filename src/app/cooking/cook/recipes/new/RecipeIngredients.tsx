'use client'

import { FormButtons, FormRow, FormSection } from '@/components/FormLayout'
import Input from '@/components/Input'
import Select from '@/components/Select'
import TextArea from '@/components/TextArea'
import {
  Control,
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'
import { UseFormRegister } from 'react-hook-form'
import { FC, useEffect, useState } from 'react'
import useSupabaseBrowser from '@/utils/supabase-browser'
import {
  getRecipeById,
  getRecipeWithIngredientsById,
  getSources,
  getUnits,
  insertRecipeIngredient,
} from '@/queries/cooking'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { Combobox } from '@/components/Combobox'
import { IngredientInput } from '@/app/cooking/components/IngredientInput'
import { Tables } from '@/types/supabase'
import Toggle from '@/components/Toggle'
import { Flex } from '@/components/Flex'
import { Button } from '@/components/Button'
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation'
import { Divider } from '@/components'
import { PlusIcon } from '@heroicons/react/20/solid'
import { Card } from '@/components/Card'
import { createQueryString } from '@/lib/util'

interface Props {}

const DEFAULT_INGREDIENT = {
  displayString: '',
  optional: false,
  quantity: '',
}

export interface RecipeIngredientForm {
  recipe: number
  ingredient: number
  display_name?: string
  optional?: boolean
  unit?: number
  quantity?: number
}

export const RecipeIngredients: FC<Props> = ({}) => {
  const supabase = useSupabaseBrowser()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const { data: sourcesResponse } = useQuery(getSources(supabase))
  const { data: unitsResponse } = useQuery(getUnits(supabase))
  const units = unitsResponse ?? []

  const { control, register, reset, watch, handleSubmit, setValue } =
    useForm<RecipeIngredientForm>()

  const recipeId = parseInt(searchParams.get('recipe') ?? '')
  const [selectedIngredient, setIngredient] =
    useState<Tables<'culinary_ingredient'> | null>(null)
  const { data: dbRecipe } = useQuery(
    getRecipeWithIngredientsById(supabase, recipeId),
  )

  const [recipe, setRecipe] = useState(dbRecipe)
  useEffect(() => {
    if (dbRecipe) {
      setRecipe(dbRecipe)
    }
  }, [dbRecipe])

  const onSubmit: SubmitHandler<RecipeIngredientForm> = async (data) => {
    await insertRecipeIngredient(supabase, { ...data, recipe: recipeId })
    reset()
    setIngredient(null)
    const { data: dbRecipe } = await getRecipeWithIngredientsById(
      supabase,
      recipeId,
    )
    setRecipe(dbRecipe)
  }

  const onNext = () => {
    router.push(
      pathname + '?' + createQueryString(searchParams, [['step', 'review']]),
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormSection title="Ingredients" subtitle="">
          <IngredientInput
            selected={selectedIngredient}
            onChange={(ingredient) => {
              setIngredient(ingredient)
              if (ingredient) {
                setValue('ingredient', ingredient?.id)
              }
            }}
            span={3}
          />
          <Input
            name="quantity"
            label="Quantity"
            type="number"
            step={0.1}
            register={register}
          />
          <Controller
            control={control}
            name="unit"
            render={({ field }) => (
              <Select
                label="Unit"
                options={
                  units?.map((unit) => ({
                    label: unit.name,
                    value: unit,
                  })) ?? []
                }
                onChange={(option) => field.onChange(option.value?.id)}
                value={
                  watch('unit')
                    ? undefined
                    : { label: 'Please select an option', value: undefined }
                }
              />
            )}
          />
          <Input
            name="display_name"
            label="Display as"
            type="text"
            placeholder="Ex: 2 tbsp garlic (about 4 cloves)"
            span={3}
            register={register}
          />
          <FormRow>
            <Divider
              button={{
                text: 'Add',
                icon: (
                  <PlusIcon
                    aria-hidden="true"
                    className="-ml-1 -mr-0.5 h-5 w-5 text-gray-400"
                  />
                ),
                type: 'submit',
              }}
            />
          </FormRow>
          {recipe && (
            <FormRow key={recipe.id}>
              <Card>
                <Card.Title>{recipe.name}</Card.Title>
                <ul>
                  {recipe.culinary_recipe_ingredient.map((ingredient) => (
                    <li key={ingredient.ingredient?.name}>
                      <span>
                        {ingredient.display_name ||
                          `${ingredient.quantity} ${ingredient.unit?.name} ${ingredient.ingredient?.name}`}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </FormRow>
          )}
        </FormSection>
      </form>
      <FormButtons saveText="Next" onOk={onNext} />
    </div>
  )
}
