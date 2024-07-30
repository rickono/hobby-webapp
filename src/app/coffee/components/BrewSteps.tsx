'use client'

import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { BrewStep } from '@/lib/queries'
import { agitationTypeString } from '../lib/util'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

function durationString(seconds: number): string {
    return new Date(1000 * seconds).toISOString().substr(14, 5)
}

type Props = {
    steps: Array<BrewStep>
}

export function DisplayStep({ step }: { step: Partial<BrewStep>}): React.ReactNode {
    let bold = ''
    let rest = ''
    switch (step.type) {
        case 'pour':
            bold = 'Pour'
            rest = `${step.water_grams}g of ${step.water_temp}°F water.`
            break
        case 'agitation':
            bold = agitationTypeString(step.agitation_type || null)
            const counter = step.agitation_times=== 1 ? 'time' : 'times'
            rest = `${step.agitation_times} ${counter}.`
            break
        case 'release':
            bold = 'Release'
            break
        case 'immersion':
            bold = 'Immerse'
            break
        case 'finish':
            bold = 'Finish'
            break
    }
    return (
        <><span className="font-medium text-gray-900 capitalize">
            {bold}
        </span> {rest}
        </>
    )
}

export default function BrewSteps({ steps }: Props) {
    return (
        <>
            <ul role="list" className="space-y-6 max-w-xs">
                {steps.map((step, stepIdx) => (
                    <li key={stepIdx} className="relative flex gap-x-4">
                        <div
                            className={classNames(
                                stepIdx === steps.length - 1 ? 'h-6' : '-bottom-6',
                                'absolute left-0 top-0 flex w-6 justify-center'
                            )}
                        >
                            <div className="w-px bg-gray-200" />
                        </div>
                        <>
                            <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                                {stepIdx === steps.length - 1 ? (
                                    <CheckCircleIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                                ) : (
                                    <div className="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
                                )}
                            </div>
                            <p className="flex-auto py-0.5 text-xs leading-5 text-gray-500">
                                <DisplayStep step={step} />
                            </p>
                            <time dateTime={step.start.toString()} className="flex-none py-0.5 text-xs leading-5 text-gray-500">
                                {durationString(step.start)}
                            </time>
                        </>
                    </li>
                ))}
            </ul>
        </>
    )
}

