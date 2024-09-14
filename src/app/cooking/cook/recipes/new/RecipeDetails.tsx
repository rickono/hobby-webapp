'use client'

import FormLayout, { FormSection } from '@/components/FormLayout'
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
import { getSources, insertRecipe } from '@/queries/cooking'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface NewRecipeForm {
  name: string
  description?: string
  procedure?: string
  inProgress: boolean
  source: number | null
  ingredient: number | null
}

interface Props {}

export const RecipeDetails: FC<Props> = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewRecipeForm>()
  const supabase = useSupabaseBrowser()
  const { data: sourcesResponse } = useQuery(getSources(supabase))
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const sources = sourcesResponse ?? []

  const createQueryString = useCallback(
    (parameters: [string, string][]) => {
      const params = new URLSearchParams(searchParams.toString())
      for (const [name, value] of parameters) {
        params.set(name, value)
      }

      return params.toString()
    },
    [searchParams],
  )

  const onSubmit: SubmitHandler<NewRecipeForm> = async (data) => {
    const { data: recipe } = await insertRecipe(supabase, data)
    router.push(
      pathname +
        '?' +
        createQueryString([
          ['recipe', recipe?.id.toString() ?? ''],
          ['step', 'subrecipe'],
        ]),
    )
  }

  const onInvalid: SubmitErrorHandler<NewRecipeForm> = (error) => {
    console.log(error)
  }

  return (
    <FormLayout onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <FormSection title="Recipe details" subtitle="">
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
              />
            )}
          />
        </div>
        <TextArea
          register={register}
          name="description"
          label="Description"
          span={6}
        />
        <TextArea
          register={register}
          name="procedure"
          label="Procedure"
          span={6}
        />
      </FormSection>
    </FormLayout>
  )
}
