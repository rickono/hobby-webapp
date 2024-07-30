'use client'

import { FormSection } from "@/components/FormLayout"
import { Controller, Control, FieldErrors } from "react-hook-form"
import Select from "@/components/Select"
import { FormInfo } from "./NewBrewForm"
import { Brewer, LogCoffee } from "@/lib/queries"

type Props = {
    control: Control<FormInfo, any>
    coffees: LogCoffee[]
    brewers: Brewer[]
    errors: FieldErrors<FormInfo>
}

export default function BrewLogDetails({ control, coffees, brewers, errors} : Props) {
    return (
        <FormSection title="Brew Details" subtitle="What did you brew today?">
            <div className="col-span-4 flex flex-col gap-6">
                <Controller
                    name="coffee"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Select
                            onChange={(e) => {
                                field.onChange(e.value)
                            }}
                            label="Coffee"
                            options={coffees.map((coffee) => ({
                                value: coffee.id.toString(),
                                label: coffee.coffee.name,
                                helper: coffee.coffee.roaster.name,
                            }))}
                            error={errors.coffee && 'Please select a coffee.'}
                        />
                    )}
                />
                <Controller
                    name="details.brewer"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Select
                            onChange={(e) => {
                                field.onChange(e.value)
                            }}
                            label="Brewer"
                            options={brewers.map((brewer) => ({
                                value: brewer.id.toString(),
                                label: brewer.name,
                            }))}
                            error={errors.details?.brewer && 'Please select a brewer.'}
                        />
                    )}
                />
            </div>
        </FormSection>
    )
}
