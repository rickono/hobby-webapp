import { SimpleLayout } from '@/components/SimpleLayout'
import { Grid, GridItem } from '@/components/Grid'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQuery,
} from '@tanstack/react-query'
import { cookies } from 'next/headers'
import useSupabaseServer from '@/utils/supabase-server'
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query'
import {
  getIngredientNameById,
  getIngredientNameByIds,
  getIngredientsByCategory,
} from '@/queries/cooking'
import IngredientsPane from './IngredientsPane'
import { IngredientsBreadcrumbs } from './IngredientsBreadcrumbs'
import { Flex } from '@/components/Flex'
import { StackedList } from '@/components/StackedList'
import { IngredientsSidebar } from './IngredientsSidebar'
import { Typography } from '@/components/Typography'

export default async function Page({
  params: { category },
}: {
  params: { category: string[] }
}) {
  const queryClient = new QueryClient()
  const cookieStore = cookies()
  const supabase = useSupabaseServer(cookieStore)
  const parent = category.at(-1)
  const parentId = parent ? parseInt(parent) : 1

  if (parent) {
    await prefetchQuery(
      queryClient,
      getIngredientsByCategory(supabase, parentId),
    )
  }
  const categoryIds = category.map((id) => parseInt(id))
  await prefetchQuery(
    queryClient,
    getIngredientNameByIds(supabase, categoryIds),
  )
  const { data: parentCategory } = await getIngredientNameById(
    supabase,
    parentId,
  )

  return (
    <SimpleLayout title="Ingredients" intro="Explore recipes or ingredients.">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Flex dir="col">
          <IngredientsBreadcrumbs categoryIds={categoryIds} />
          <Typography variant="h2">{parentCategory?.name}</Typography>
          <Grid>
            <GridItem xs={3}>
              <IngredientsSidebar parentId={parentId} path={category} />
            </GridItem>
          </Grid>
        </Flex>
      </HydrationBoundary>
    </SimpleLayout>
  )
}
