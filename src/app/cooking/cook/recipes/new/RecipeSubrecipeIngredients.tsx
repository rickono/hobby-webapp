'use client'

import { IngredientInput } from '@/app/cooking/components/IngredientInput'
import { Divider } from '@/components'
import { Card } from '@/components/Card'
import FormLayout, {
  FormButtons,
  FormRow,
  FormSection,
} from '@/components/FormLayout'
import Input from '@/components/Input'
import Select from '@/components/Select'
import { createQueryString } from '@/lib/util'
import {
  getRecipeByIds,
  getRecipeWithIngredientsByIds,
  getUnits,
  insertRecipeIngredient,
} from '@/queries/cooking'
import { Tables } from '@/types/supabase'
import useSupabaseBrowser from '@/utils/supabase-browser'
import { PlusIcon } from '@heroicons/react/20/solid'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { RecipeIngredientForm } from './RecipeIngredients'

export const RecipeSubrecipeIngredients: FC = () => {
  const supabase = useSupabaseBrowser()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const [selectedIngredient, setIngredient] =
    useState<Tables<'culinary_ingredient'> | null>(null)

  const { setValue, control, handleSubmit, register, reset, watch } =
    useForm<RecipeIngredientForm>()

  const subrecipeIds =
    searchParams
      .get('subrecipes')
      ?.split(',')
      .map((subrecipe) => parseInt(subrecipe))
      .filter((id) => !isNaN(id)) ?? []

  const { data: dbSubrecipes } = useQuery(
    getRecipeWithIngredientsByIds(supabase, subrecipeIds),
  )
  const { data: units } = useQuery(getUnits(supabase))
  const [subrecipes, setSubrecipes] = useState(dbSubrecipes)

  useEffect(() => {
    if (dbSubrecipes) {
      setSubrecipes(dbSubrecipes)
    }
  }, [dbSubrecipes])

  const onSubmit: SubmitHandler<RecipeIngredientForm> = async (data) => {
    await insertRecipeIngredient(supabase, data)
    reset({
      ingredient: undefined,
      quantity: 0,
      display_name: '',
      unit: undefined,
    })
    setIngredient(null)
    const { data: dbSubrecipes } = await getRecipeWithIngredientsByIds(
      supabase,
      subrecipeIds,
    )
    setSubrecipes(dbSubrecipes)
  }

  return (
    <div className="space-y-12">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormSection
          subtitle="Fill in the ingredients for the subrecipes"
          title="Subrecipe ingredients"
        >
          <Controller
            name="recipe"
            control={control}
            render={({ field }) => (
              <Select
                label="Recipe"
                options={
                  subrecipes?.map((subrecipe) => ({
                    label: subrecipe.name,
                    value: subrecipe,
                  })) ?? []
                }
                onChange={(option) => field.onChange(option.value?.id)}
                span={3}
                value={
                  watch('recipe')
                    ? undefined
                    : { label: 'Please select an option', value: undefined }
                }
              />
            )}
          />
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
            step={0.01}
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
          {subrecipes?.map((subrecipe) => (
            <FormRow key={subrecipe.id}>
              <Card>
                <Card.Title>{subrecipe.name}</Card.Title>
                <ul>
                  {subrecipe.culinary_recipe_ingredient.map((ingredient) => (
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
          ))}
        </FormSection>
        <FormButtons
          saveText="Next"
          type="button"
          onOk={() => {
            router.push(
              pathname +
                '?' +
                createQueryString(searchParams, [['step', 'ingredients']]),
            )
          }}
        />
      </form>
    </div>
  )
}
