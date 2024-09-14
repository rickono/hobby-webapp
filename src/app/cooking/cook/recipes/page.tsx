'use client'
import { SimpleLayout } from '@/components/SimpleLayout'
import Table from '@/components/Table'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import useSupabaseBrowser from '@/utils/supabase-browser'
import { getRecipes } from '@/queries/cooking'

export default function Page() {
  const supabase = useSupabaseBrowser()
  const { data: recipes } = useQuery(getRecipes(supabase, ['source']))

  return (
    <SimpleLayout title="Recipes" intro="Explore recipes or ingredients.">
      <Table
        title="Recipes"
        rows={recipes ?? []}
        columns={[
          {
            field: 'name',
            headerName: 'Name',
            valueGetter: (row) => row.name,
            href: (row) => `recipes/${row.id}`,
          },
          {
            field: 'source',
            headerName: 'Source',
            valueGetter: (row) => `${row.source.name}, ${row.source.author}`,
          },
        ]}
      />
    </SimpleLayout>
  )
}
