import { FC } from 'react'
import { NewRecipeIngredient } from './RecipeForm'

interface Props {
  formIngredients: NewRecipeIngredient[]
}

export const RecipeIngredientsDisplay: FC<Props> = ({ formIngredients }) => {
  console.log(formIngredients)
  return (
    <div className="col-span-6">
      {formIngredients.map((formIngredient) => (
        <div key={formIngredient.ingredient.id}>
          <span>
            {formIngredient.quantity} {formIngredient.unit?.name}{' '}
            {formIngredient.ingredient.name}
          </span>
        </div>
      ))}
    </div>
  )
}
