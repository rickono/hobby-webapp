import { Grid, GridItem } from '@/components/Grid'
import { Typography } from '@/components/Typography'
import {
  getRecipeWithIngredientsById,
  getRecipeWithIngredientsByIds,
} from '@/queries/cooking'
import useSupabaseBrowser from '@/utils/supabase-browser'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { FC } from 'react'
import Markdown from 'react-markdown'
import remarkBreaks from 'remark-breaks'

interface SubrecipeProps {
  subrecipeId: number
  displayName?: string
}

const Subrecipe: FC<SubrecipeProps> = ({ subrecipeId, displayName }) => {
  const supabase = useSupabaseBrowser()
  const { data: subrecipe } = useQuery(
    getRecipeWithIngredientsById(supabase, subrecipeId),
  )

  if (!subrecipe) {
    return null
  }
  return (
    <div>
      <Typography variant="h3">{displayName}</Typography>
      <ul className="list-disc pl-4">
        {subrecipe.culinary_recipe_ingredient.map((ingredient, i) => (
          <li key={i}>
            {ingredient.display_name ||
              `${ingredient.quantity} ${ingredient.unit?.name} ${ingredient.ingredient?.name}`}
          </li>
        ))}
      </ul>
      <Markdown className="prose">{subrecipe.procedure}</Markdown>
    </div>
  )
}

interface Props {
  recipeId: number
}

export const Recipe: FC<Props> = ({ recipeId }) => {
  const supabase = useSupabaseBrowser()
  const { data: recipe } = useQuery(
    getRecipeWithIngredientsById(supabase, recipeId),
  )

  if (!recipe) {
    return null
  }
  const subrecipeIds = recipe.culinary_recipe_ingredient
    .map(({ ingredient, display_name }) =>
      ingredient?.recipe.map((recipe) => [recipe.id, display_name]).at(0),
    )
    .filter((recipeId): recipeId is [number, string] => !!recipeId)

  return (
    <div>
      <Typography variant="h2">{recipe.name}</Typography>
      <Markdown className="prose" remarkPlugins={[remarkBreaks]}>
        {recipe.description}
      </Markdown>
      <Typography variant="strong">Ingredients</Typography>
      <ul className="list-disc pl-4">
        {recipe.culinary_recipe_ingredient.map((ingredient, i) => (
          <li key={i}>
            {ingredient.display_name ||
              `${ingredient.quantity} ${ingredient.unit?.name} ${ingredient.ingredient?.name}`}
          </li>
        ))}
      </ul>
      <Grid>
        {subrecipeIds.map(([subrecipeId, display_name]) => (
          <GridItem key={subrecipeId} xs={12}>
            <Subrecipe subrecipeId={subrecipeId} displayName={display_name} />
          </GridItem>
        ))}
      </Grid>
      <Markdown className="prose">{recipe.procedure}</Markdown>
    </div>
  )
}
