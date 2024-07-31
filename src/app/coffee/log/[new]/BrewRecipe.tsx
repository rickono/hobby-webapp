import Select from '@/components/Select'
import { FormSection } from '@/components/FormLayout'
import EditSteps from '../../components/EditSteps'
import { Recipe } from '@/lib/queries'
import {
    UseFormGetValues,
    UseFormSetValue,
    UseFormWatch,
    UseFormRegister,
    FieldErrors,
} from 'react-hook-form'
import { FormInfo } from './NewBrewForm'
import { BrewStep } from '@/lib/queries'
import Input from '@/components/Input'
import { useState } from 'react'
import { Button } from '@/components/Button'

type Props = {
    recipes: Recipe[]
    setValue: UseFormSetValue<FormInfo>
    getValues: UseFormGetValues<FormInfo>
    watch: UseFormWatch<FormInfo>
    register: UseFormRegister<FormInfo>
    errors: FieldErrors<FormInfo>
}

export default function BrewRecipe({
    recipes,
    setValue,
    getValues,
    watch,
    register,
    errors,
}: Props) {
    const [ratio, setRatio] = useState('')
    const [baseRecipe, setBaseRecipe] = useState<Recipe>()
    const [temperature, setTemperature] = useState('')
    return (
        <FormSection title="Brew Recipe" subtitle="What brew recipe did you use?">
            <div className="col-span-2">
                <Input
                    register={register}
                    registerOptions={{ required: true }}
                    name="details.dose"
                    type="number"
                    label="Coffee dose"
                    trailing="g"
                    error={errors.details?.dose && 'Please indicate your dose.'}
                />
            </div>
            <div className="col-span-2">
                <Input
                    name="dose"
                    type="number"
                    label="Ratio"
                    leading="1 :"
                    onChange={(e) => setRatio(e.target.value)}
                />
            </div>
            <div className="col-span-2">
                <Input
                    name="temperature"
                    type="number"
                    label="Water temperature"
                    onChange={(e) => setTemperature(e.target.value)}
                    trailing="°F"
                />
            </div>
            <div className="col-span-3">
                <Select
                    label="Start from a recipe"
                    options={recipes.map((recipe) => ({
                        value: recipe.id.toString(),
                        label: recipe.name,
                    }))}
                    onChange={(e) => {
                        const recipesFiltered = recipes.filter(
                            (recipe) => recipe.id.toString() === e.value,
                        )
                        if (recipesFiltered.length === 0) return

                        const recipe = recipesFiltered[0]
                        setBaseRecipe(recipe)
                    }}
                />
            </div>
            <div className="flex items-end">
                <Button
                    onClick={() => {
                        const steps = baseRecipe?.details.coffee_log_brew_step
                        if (!steps) return

                        const recipeTotalWater = steps.reduce(
                            (acc, cur) => (cur.water_grams || 0) + acc,
                            0,
                        )
                        const newTotalWater = parseFloat(getValues('details.dose')) * parseFloat(ratio)
                        setValue(
                            'details.steps',
                            steps?.map((step) => ({
                                type: step.type,
                                start: step.start,
                                duration: step.duration ?? undefined,
                                agitation_type: step.agitation_type ?? undefined,
                                agitation_times: step.agitation_times ?? undefined,
                                water_temp: temperature ? parseInt(temperature) : (step.water_temp ?? undefined),
                                water_grams:
                                    ((step.water_grams ?? 0) / recipeTotalWater) * newTotalWater,
                            })) || [],
                        )
                    }}
                >
                    Recalculate
                </Button>
            </div>
            <EditSteps
                steps={watch('details.steps')}
                addStep={(step: Partial<BrewStep>) => {
                    const steps = getValues('details.steps')
                    steps.push({
                        ...step,
                        type: step.type || 'agitation',
                        start: step.start ?? 0,
                        duration: step.duration ?? undefined,
                        water_temp: step.water_temp ?? undefined,
                        water_grams: step.water_grams ?? undefined,
                        agitation_times: step.agitation_times ?? undefined,
                        agitation_type: step.agitation_type ?? undefined,
                    })
                    steps.sort((a, b) => a.start - b.start)
                    setValue('details.steps', steps)
                }}
                deleteStep={(stepIdx: number) => {
                    const steps = getValues('details.steps')
                    setValue(
                        'details.steps',
                        steps.filter((_, idx) => idx !== stepIdx),
                    )
                }}
                setSteps={(steps: FormInfo['details']['steps']) => {
                    setValue('details.steps', steps)
                }}
                getSteps={() => getValues('details.steps')}
                register={register}
                getValues={getValues}
                setValue={setValue}
                watch={watch}
            />
            {/* <div className="col-span-3">
                    <Select
                        label="Or start from a recent brew"
                        options={[]}
                    />
                </div>*/}
        </FormSection>
    )
}
