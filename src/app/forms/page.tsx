'use client'
import FormLayout, { FormSection } from '@/components/FormLayout'
import Select from '@/components/Select'
import { SimpleLayout } from '@/components/SimpleLayout'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import Input from '@/components/Input'

type FormInputs = {
    select: '1' | '2'
    input: string
}

const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data)
}

export default function Page() {
    const { register, handleSubmit, control } = useForm<FormInputs>()

    return (
        <SimpleLayout title="Forms" intro="Text">
            <FormLayout onSubmit={handleSubmit(onSubmit)}>
                <FormSection title="Section 1" subtitle="This is a test">
                    <div className="col-span-4">
                        <Controller
                            name="select"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    onChange={(e) => {
                                        field.onChange(e.value)
                                    }}
                                    label="Select"
                                    options={[
                                        { value: '1', label: 'Test' },
                                        { value: '2', label: 'Test 2' },
                                    ]}
                                />
                            )}
                        />
                        <Input register={register} label="Input" type="text" name="input" />
                    </div>
                </FormSection>
                <input type="submit" />
            </FormLayout>
        </SimpleLayout>
    )
}
