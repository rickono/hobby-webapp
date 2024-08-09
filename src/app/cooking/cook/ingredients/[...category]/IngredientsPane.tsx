import React from 'react'
import { GridItem } from '@/components/Grid'
import { Card } from '@/components/Card'
import { Ingredient } from '@/lib/queries'

export default function IngredientsPane({
  ingredients,
}: {
  ingredients: Ingredient[]
}) {
  return (
    <React.Fragment>
      {ingredients.map((ingredient) => (
        <GridItem xs={6} key={ingredient.id}>
          <Card className="capitalize">
            <Card.Title href="/">{ingredient.name}</Card.Title>
          </Card>
        </GridItem>
      ))}
    </React.Fragment>
  )
}
