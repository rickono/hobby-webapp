import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { BrewStep } from '@/lib/queries'
import { Database, Enums } from '@/types/supabase'
import { agitationTypeString } from '../lib/util'
import { DisplayStep } from './BrewSteps'
import { IconButton } from '@/components/Button'
import { useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import Select from '@/components/Select'
import Radio from '@/components/Radio'
import Input from '@/components/Input'
import { TrashIcon } from '@heroicons/react/24/outline'
import {
    FieldValues,
    UseFormGetValues,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
} from 'react-hook-form'
import { FormInfo } from '../log/[new]/NewBrewForm'
import SimpleCards from '@/components/SimpleCards'
import { classNames } from '@/lib/util'

function durationString(seconds: number): string {
    return new Date(1000 * seconds).toISOString().substr(14, 5)
}

type EditStepProps = {
    step: Partial<BrewStep>
    setStep: (brewStep: Partial<BrewStep> | undefined) => void
    addStep: (brewStep: Partial<BrewStep>) => void
}

function PourInputs({
    step,
    setStep,
}: Pick<EditStepProps, 'step' | 'setStep'>) {
    return (
        <>
            <div className="col-span-2 col-start-1">
                <Input
                    name="grams"
                    label="Pour weight (g)"
                    type="number"
                    value={step.water_grams?.toString() ?? '0'}
                    onChange={(e) =>
                        setStep({ ...step, water_grams: parseInt(e.target.value) })
                    }
                />
            </div>
            <div className="col-span-2">
                <Input
                    name="temp"
                    label="Water temperature (°F)"
                    type="number"
                    value={step.water_temp?.toString() ?? '0'}
                    onChange={(e) =>
                        setStep({ ...step, water_temp: parseInt(e.target.value) })
                    }
                />
            </div>
        </>
    )
}

function AgitationInputs({
    step,
    setStep,
}: Pick<EditStepProps, 'step' | 'setStep'>) {
    const agitationOptions: {
        label: string
        value: Enums<'coffee_agitation_type'>
    }[] = [
            { label: 'Swirl', value: 'swirl' },
            { label: 'Wet WDT', value: 'wet_wdt' },
            { label: 'Stir', value: 'stir' },
        ]
    return (
        <>
            <div className="col-span-2 col-start-1">
                <Select<Enums<'coffee_agitation_type'>>
                    label="Agitation type"
                    options={agitationOptions}
                    onChange={(o) => setStep({ ...step, agitation_type: o.value })}
                />
            </div>
            <div className="col-span-2">
                <Input
                    name="agitation_times"
                    id="temp"
                    label="How many times?"
                    type="number"
                    onChange={(e) =>
                        setStep({ ...step, agitation_times: parseInt(e.target.value) })
                    }
                />
            </div>
        </>
    )
}
function EditStep({ step, setStep, addStep }: EditStepProps) {
    return (
        <>
            <div className="col-span-6 mt-6">
                <h4 className="text-sm font-semibold">New step</h4>
                <Radio
                    name=""
                    title=""
                    description=""
                    options={[
                        { id: 'pour', option: 'Pour' },
                        { id: 'agitation', option: 'Agitate' },
                        { id: 'finish', option: 'Finish' },
                    ]}
                    checked={step.type ?? 'pour'}
                    setChecked={(newSelected) =>
                        setStep({
                            ...step,
                            type: newSelected as 'pour' | 'agitation' | 'finish',
                        })
                    }
                />
            </div>
            <div className="col-span-4">
                <Input
                    name="start"
                    label="Time"
                    type="number"
                    trailing={step.start ? durationString(step.start) : undefined}
                    onChange={(e) =>
                        setStep({ ...step, start: parseInt(e.target.value) })
                    }
                />
            </div>
            {step.type === 'pour' && <PourInputs step={step} setStep={setStep} />}
            {step.type === 'agitation' && (
                <AgitationInputs step={step} setStep={setStep} />
            )}
            <div className="col-span-6">
                <div className="bottom-0 flex justify-between pt-4">
                    <button
                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={() => {
                            addStep(step)
                            setStep(undefined)
                        }}
                    >
                        Save step
                    </button>
                </div>
            </div>
        </>
    )
}

type Props = {
    steps: Array<Partial<BrewStep>>
    addStep: (step: Partial<BrewStep>) => void
    deleteStep: (idx: number) => void
    setSteps: (steps: FormInfo['details']['steps']) => void
    getSteps: () => FormInfo['details']['steps']
    register: UseFormRegister<FormInfo>
    getValues: UseFormGetValues<FormInfo>
    setValue: UseFormSetValue<FormInfo>
    watch: UseFormWatch<FormInfo>
}

export default function EditSteps({
    steps,
    addStep,
    deleteStep,
    register,
    setSteps,
    getSteps,
    getValues,
    setValue,
    watch,
}: Props) {
    const [newStep, setNewStep] = useState<Partial<BrewStep>>()
    const [ratio, setRatio] = useState(1)
    useEffect(() => {
        setRatio(
            steps?.reduce((acc, cur) => acc + (cur.water_grams ?? 0), 0) /
            parseFloat(getValues('details.dose')),
        )
    }, [steps, getValues])

    return (
        <>
            {steps && <div className="col-span-6">
                <ul role="list" className="mt-6 max-w-xs space-y-6">
                    {steps.map((step, stepIdx) => (
                        <li key={stepIdx} className="relative flex gap-x-4">
                            <div
                                className={classNames(
                                    stepIdx === steps.length - 1 ? 'h-6' : '-bottom-6',
                                    'absolute left-0 top-0 flex w-6 justify-center',
                                )}
                            >
                                <div className="w-px bg-gray-200" />
                            </div>
                            <>
                                <div className="relative flex h-6 w-6 flex-none items-center justify-center">
                                    {stepIdx === steps.length - 1 ? (
                                        <CheckCircleIcon
                                            className="h-6 w-6 text-indigo-600"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <div className="h-1.5 w-1.5 rounded-full bg-gray-200 ring-1 ring-gray-400" />
                                    )}
                                </div>
                                <p className="flex-auto py-0.5 text-xs leading-5 text-gray-500">
                                    <DisplayStep step={step} />
                                </p>
                                <time
                                    dateTime={step.start?.toString()}
                                    className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                                >
                                    {durationString(step.start ?? 0)}
                                </time>
                                <IconButton
                                    variant="secondary"
                                    className="text-gray-300 hover:bg-red-100 hover:text-red-300"
                                    onClick={(e) => {
                                        deleteStep(stepIdx)
                                    }}
                                >
                                    <TrashIcon className=" h-4 w-4 " />
                                </IconButton>
                            </>
                        </li>
                    ))}
                </ul>
            </div>}
            {newStep && (
                <EditStep step={newStep} setStep={setNewStep} addStep={addStep} />
            )}
            <div className="col-span-6 ml-0.5 mt-2 flex items-center">
                <IconButton onClick={() => setNewStep({ type: 'pour' })} />
                <p className="ml-4 flex-auto py-0.5 text-xs leading-5 text-gray-500">
                    Add a new step
                </p>
            </div>
        </>
    )
}
