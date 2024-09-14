import { SimpleLayout } from '@/components/SimpleLayout'
import { Card } from '@/components/Card'
import { Grid, GridItem } from '@/components/Grid'

export default function Page() {
  return (
    <SimpleLayout title="Let's cook" intro="Explore recipes or ingredients.">
      <Grid>
        <GridItem xs={6}>
          <Card>
            <Card.Title href="/cooking/cook/recipes">Recipes</Card.Title>
            <Card.Description>Browse for your next recipe.</Card.Description>
          </Card>
        </GridItem>
        <GridItem xs={6}>
          <Card>
            <Card.Title href="/cooking/cook/ingredients">
              Ingredients
            </Card.Title>
            <Card.Description>
              Learn about ingredients and get inspired.
            </Card.Description>
          </Card>
        </GridItem>
      </Grid>
    </SimpleLayout>
  )
}
