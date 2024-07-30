'use client'

import FormLayout from '@/components/FormLayout'
import {
    Brewer,
    LogCoffee,
    Recipe,
    BrewStep,
    BrewDetails,
    Brew,
} from '@/lib/queries'
import { insertBrewDetails } from '@/lib/clientQueries'
import { useForm } from 'react-hook-form'
import { Database } from '@/types/supabase'
import BrewLogDetails from './BrewDetails'
import BrewRecipe from './BrewRecipe'
import BrewNotes from './BrewNotes'

type Props = {
    coffees: Array<LogCoffee>
    brewers: Array<Brewer>
    recipes: Array<Recipe>
}

export type FormInfo = {
    coffee: string
    notes: string
    rating: number
    details: {
        dose: string
        brewer: string
        steps: Array<{
            type: Database['public']['Enums']['coffee_brew_step_type']
            start: number
            duration?: number
            agitation_times?: number
            water_temp?: number
            water_grams?: number
            agitation_type?: Database['public']['Enums']['coffee_agitation_type']
        }>
    }
}

export default function NewBrewForm({ coffees, brewers, recipes }: Props) {
    const {
        register,
        handleSubmit,
        control,
        getValues,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FormInfo>()

    const onSubmit = async (data: FormInfo) => {
        console.log(data)
        const brewDetails: Partial<BrewDetails> = {
            dose: parseFloat(data.details.dose),
            brewer: parseInt(data.details.brewer),
        }
        const res = await insertBrewDetails(brewDetails)
        const insertedDetailsId= res?.data?.[0].id
        
        const coffeeBrew: Partial<Brew> = {
            coffee: parseInt(data.coffee),
            details: insertedDetailsId,
            notes: data.notes,
            rating: data.rating,
        }
    }

    return (
        <FormLayout onSubmit={handleSubmit(onSubmit)}>
            <BrewLogDetails
                control={control}
                coffees={coffees}
                brewers={brewers}
                errors={errors}
            />
            <BrewRecipe
                recipes={recipes}
                setValue={setValue}
                getValues={getValues}
                watch={watch}
                register={register}
                errors={errors}
            />
            <BrewNotes register={register} control={control} errors={errors} />
        </FormLayout>
    )
}
