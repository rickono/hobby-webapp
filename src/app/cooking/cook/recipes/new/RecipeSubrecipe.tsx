'use client'

import FormLayout, { FormButtons, FormSection } from '@/components/FormLayout'
import Input from '@/components/Input'
import Select from '@/components/Select'
import TextArea from '@/components/TextArea'
import {
  Control,
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { UseFormRegister } from 'react-hook-form'
import { FC, FormEventHandler, useCallback } from 'react'
import useSupabaseBrowser from '@/utils/supabase-browser'
import {
  getRecipeByIds,
  getSources,
  insertIngredient,
  insertRecipe,
} from '@/queries/cooking'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Divider } from '@/components'
import { PlusIcon } from '@heroicons/react/20/solid'
import React from 'react'
import { Card } from '@/components/Card'
import { createQueryString } from '@/lib/util'

interface NewRecipeForm {
  name: string
  description: string
  inProgress: boolean
  source: number | null
  ingredient: number | null
}

interface Props {}

export const RecipeSubrecipe: FC<Props> = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<NewRecipeForm>()
  const supabase = useSupabaseBrowser()
  const { data: sourcesResponse } = useQuery(getSources(supabase))
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const sources = sourcesResponse ?? []
  const subrecipeIds = (searchParams.get('subrecipes')?.split(',') ?? [])
    .map((subrecipeId) => parseInt(subrecipeId))
    .filter((number) => !isNaN(number))

  const { data: subrecipes } = useQuery(getRecipeByIds(supabase, subrecipeIds))

  const onSubmit: SubmitHandler<NewRecipeForm> = async (data) => {
    const { data: recipeAsIngredient } = await insertIngredient(supabase, {
      name: data.name,
    })
    const { data: recipe } = await insertRecipe(supabase, {
      ...data,
      ingredient: recipeAsIngredient?.id,
    })
    const subrecipes = searchParams.get('subrecipes')?.split(',') ?? []
    if (recipe) {
      subrecipes.push(recipe.id.toString())
    }
    router.push(
      pathname +
        '?' +
        createQueryString(searchParams, [['subrecipes', subrecipes.join(',')]]),
    )
    reset()
  }

  const onNext = () => {
    router.push(
      pathname +
        '?' +
        createQueryString(searchParams, [['step', 'subrecipe-ingredients']]),
    )
  }

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <FormSection
            title="Required recipes"
            subtitle="Does this recipe require homemade ingredients?"
          >
            <div className="col-span-3">
              <Input
                register={register}
                name="name"
                label="Recipe name"
                type="text"
                registerOptions={{ required: 'Please include the recipe name' }}
                error={errors.name && errors.name.message}
              />
            </div>
            <div className="col-span-3">
              <Controller
                name="source"
                control={control}
                render={({ field }) => (
                  <Select
                    onChange={(e) => field.onChange(e.value)}
                    label="Source"
                    options={sources.map((source) => ({
                      label: source.name,
                      value: source.id,
                      helper: source.author ?? '',
                    }))}
                    value={
                      watch('source')
                        ? undefined
                        : { label: 'Please select an option', value: undefined }
                    }
                  />
                )}
              />
            </div>
            <div className="col-span-4">
              <TextArea
                register={register}
                name="description"
                label="Description"
              />
            </div>
            <div className="col-span-6">
              <Divider
                button={{
                  icon: (
                    <PlusIcon
                      aria-hidden="true"
                      className="-ml-1 -mr-0.5 h-5 w-5 text-gray-400"
                    />
                  ),
                  text: 'Save subrecipe',
                  type: 'submit',
                }}
              />
            </div>
            <div className="col-span-6 flex flex-col gap-2">
              {subrecipes?.map((subrecipe) => (
                <Card key={subrecipe.id}>{subrecipe.name}</Card>
              ))}
            </div>
          </FormSection>
        </div>
      </form>
      <FormButtons saveText="Next" type="button" onOk={onNext} />
    </React.Fragment>
  )
}
