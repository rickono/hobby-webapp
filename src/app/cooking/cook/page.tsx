import { SimpleLayout } from '@/components/SimpleLayout'
import { Card } from '@/components/Card'
import { Grid, GridItem } from '@/components/Grid'

export default function Page() {
  return (
    <SimpleLayout title="Let's cook" intro="Explore recipes or ingredients.">
      <Grid>
        <GridItem xs={6}>
          <Card>
            <Card.Title>Recipes</Card.Title>
            <Card.Description>Explore recipes by category.</Card.Description>
          </Card>
        </GridItem>
        <GridItem xs={6}>
          <Card>
            <Card.Title href="/cooking/cook/ingredients">
              Ingredients
            </Card.Title>
            <Card.Description>
              Learn about ingredients and browse recipes including them.
            </Card.Description>
          </Card>
        </GridItem>
      </Grid>
    </SimpleLayout>
  )
}
