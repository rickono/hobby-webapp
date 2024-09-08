'use client'

import { FormSection } from '@/components/FormLayout'
import Input from '@/components/Input'
import Select from '@/components/Select'
import TextArea from '@/components/TextArea'
import { Control, Controller } from 'react-hook-form'
import { UseFormRegister } from 'react-hook-form'
import { FC } from 'react'
import { NewRecipeForm } from './RecipeForm'
import useSupabaseBrowser from '@/utils/supabase-browser'
import { getSources } from '@/queries/cooking'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'

interface Props {
  register: UseFormRegister<NewRecipeForm>
  control: Control<NewRecipeForm, any>
}

export const RecipeDetails: FC<Props> = ({ register, control }) => {
  const supabase = useSupabaseBrowser()
  const { data: sourcesResponse } = useQuery(getSources(supabase))
  const sources = sourcesResponse ?? []

  return (
    <FormSection title="Recipe details" subtitle="">
      <div className="col-span-3">
        <Input
          register={register}
          name="name"
          label="Recipe name"
          type="text"
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
      <div className="col-span-4">
        <TextArea register={register} name="description" label="Description" />
      </div>
    </FormSection>
  )
}
