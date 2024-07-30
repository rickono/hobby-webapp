'use client'

import { FormSection } from '@/components/FormLayout'
import TextArea from '@/components/TextArea'
import {
    Control,
    Controller,
    UseFormRegister,
    FieldErrors,
} from 'react-hook-form'
import { FormInfo } from './NewBrewForm'
import Rating from '@/components/Rating'

type Props = {
    register: UseFormRegister<FormInfo>
    control: Control<FormInfo, any>
    errors: FieldErrors<FormInfo>
}

export default function BrewNotes({ register, control }: Props) {
    return (
        <FormSection title="Brew Notes" subtitle="How was your coffee?">
            <div className="col-span-4 flex flex-col gap-6">
                <Controller
                    name="rating"
                    control={control}
                    render={({ field }) => (
                        <Rating
                            stars={7}
                            label="Overall rating"
                            onChange={(rating) => field.onChange(rating)}
                        />
                    )}
                />
                <TextArea
                    label="Notes"
                    register={register}
                    name="notes"
                />
            </div>
        </FormSection>
    )
}
