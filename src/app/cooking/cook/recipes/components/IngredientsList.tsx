import { Flex } from '@/components/Flex'
import { Join, RecipeIngredient } from '@/queries/types'
import { FC } from 'react'

interface Props {
  recipeIngredients: Join<RecipeIngredient, 'ingredient' | 'unit'>[]
}

export const IngredientsList: FC<Props> = ({ recipeIngredients }) => {
  console.log(recipeIngredients)
  return (
    <Flex dir="col" gap={1}>
      {recipeIngredients.map((ingredient) => (
        <Flex key={ingredient.id} justify="justify-between">
          <div className="capitalize">{ingredient.ingredient.name}</div>
          <span>
            {ingredient.quantity} {ingredient.unit?.abbreviation}
          </span>
        </Flex>
      ))}
    </Flex>
  )
}
