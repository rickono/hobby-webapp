'use client'

import { SimpleLayout } from '@/components/SimpleLayout'
import { Card } from '@/components/Card'
import { Grid, GridItem } from '@/components/Grid'
import Input from '@/components/Input'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import {
  getIngredients,
  getIngredientsInCategory,
  getRootIngredients,
} from '@/lib/clientQueries'
import { useEffect, useState } from 'react'
import { Ingredient } from '@/lib/queries'

export default function Page() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [category, setCategory] = useState<Ingredient>()

  const handleSearch = async () => {
    let data: Ingredient[] | undefined
    if (category) {
      data = await getIngredientsInCategory(category.id)
    } else {
      data = await getRootIngredients()
    }
    setIngredients(data ?? [])
  }

  useEffect(() => {
    handleSearch()
  }, [])

  return (
    <SimpleLayout title="Ingredients" intro="Explore recipes or ingredients.">
      {/* <Input
        type="text"
        name="ingredient-search"
        label="Search all ingredients"
        leading={<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />}
        onChange={() => {
          handleSearch()
        }}
      /> */}
      <Grid className="mt-12">
        {ingredients.map((ingredient) => (
          <GridItem xs={6} key={ingredient.id}>
            <Card className="capitalize">
              <Card.Title href={`ingredients/${ingredient.id}`}>
                {ingredient.name}
              </Card.Title>
            </Card>
          </GridItem>
        ))}
      </Grid>
    </SimpleLayout>
  )
}
