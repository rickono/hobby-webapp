import { Grid, GridItem } from '@/components/Grid'
import { Typography } from '@/components/Typography'
import {
  getRecipe,
  getRecipes,
  getRecipeWithIngredientsById,
  getRecipeWithIngredientsByIds,
} from '@/queries/cooking'
import useSupabaseBrowser from '@/utils/supabase-browser'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { FC } from 'react'
import Markdown from 'react-markdown'
import remarkBreaks from 'remark-breaks'
import { IngredientsList } from './IngredientsList'
import { Divider } from '@/components'
import { Flex } from '@/components/Flex'
import { MarkdownWrapper } from '@/components/MarkdownWrapper'

interface SubrecipeProps {
  subrecipeId: number
  displayName?: string
}

const Subrecipe: FC<SubrecipeProps> = ({ subrecipeId, displayName }) => {
  const supabase = useSupabaseBrowser()
  const { data: subrecipe } = useQuery(
    getRecipe(supabase, subrecipeId, ['culinary_recipe_ingredient']),
  )

  if (!subrecipe) {
    return null
  }
  return (
    <div>
      <Typography variant="strong">{displayName || subrecipe.name}</Typography>
      <IngredientsList
        recipeIngredients={subrecipe.culinary_recipe_ingredient}
      />
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
  const { data: recipeNew } = useQuery(
    getRecipe(supabase, recipeId, [
      'culinary_recipe_ingredient',
      'ingredient',
      'source',
    ]),
  )
  console.log(recipeNew)
  console.log(recipeNew?.culinary_recipe_ingredient)

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
      <Grid gap={8}>
        <GridItem xs={4}>
          <Typography variant="h2">{recipe.name}</Typography>
          <Flex align="items-center" gap={2} className="text-gray-600">
            <Typography variant="strong">{recipeNew?.source.name}</Typography>
            <Typography variant="body1">{recipeNew?.source.author}</Typography>
          </Flex>
        </GridItem>
        <GridItem xs={8}>
          <MarkdownWrapper>{recipe.description}</MarkdownWrapper>
        </GridItem>
      </Grid>
      <Divider />
      <Grid gap={8} className="mt-6">
        <GridItem xs={4}>
          <Typography variant="strong">Ingredients</Typography>
          <IngredientsList
            recipeIngredients={recipeNew?.culinary_recipe_ingredient ?? []}
          />
        </GridItem>
        <GridItem xs={8}>
          <MarkdownWrapper>{recipe.procedure}</MarkdownWrapper>
        </GridItem>
      </Grid>
      <Divider />
      <Grid>
        {subrecipeIds.map(([subrecipeId, display_name]) => (
          <GridItem key={subrecipeId} xs={12}>
            <Subrecipe subrecipeId={subrecipeId} displayName={display_name} />
          </GridItem>
        ))}
      </Grid>
    </div>
  )
}
