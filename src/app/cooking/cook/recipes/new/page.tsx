import { SimpleLayout } from '@/components/SimpleLayout'
import { Card } from '@/components/Card'
import { Grid, GridItem } from '@/components/Grid'
import { Controller, Form, useForm } from 'react-hook-form'
import { FormSection } from '@/components/FormLayout'
import Input from '@/components/Input'
import TextArea from '@/components/TextArea'
import Select from '@/components/Select'
import { RecipeDetails } from './RecipeDetails'
import { RecipeForm } from './RecipeForm'
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query'
import useSupabaseServer from '@/utils/supabase-server'
import { cookies } from 'next/headers'
import { getSources, getUnits } from '@/queries/cooking'
import { QueryClient } from '@tanstack/react-query'

export default async function Page() {
  const cookieStore = cookies()
  const queryClient = new QueryClient()
  const supabase = useSupabaseServer(cookieStore)

  await prefetchQuery(queryClient, getSources(supabase))
  await prefetchQuery(queryClient, getUnits(supabase))

  return (
    <SimpleLayout title="New recipe" intro="Save a recipe for later.">
      <RecipeForm />
    </SimpleLayout>
  )
}
