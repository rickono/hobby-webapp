import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

type Props = {
    name: string
    title: string
    options: Array<{ id: string, title: string, description: string }>
    checked: string
    setChecked: (newChecked: string) => void
}


export default function RadioCards({ title, options, checked, setChecked }: Props) {
    return (
        <RadioGroup value={checked} onChange={setChecked}>
            <RadioGroup.Label className="text-base font-semibold leading-6 text-gray-900">
                {title}
            </RadioGroup.Label>

            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                {options.map((option) => (
                    <RadioGroup.Option
                        key={option.id}
                        value={option.id}
                        className={({ active }) =>
                            classNames(
                                active ? 'border-indigo-600 ring-2 ring-indigo-600' : 'border-gray-300',
                                'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                            )
                        }
                    >
                        {({ checked, active }) => (
                            <>
                                <span className="flex flex-1">
                                    <span className="flex flex-col">
                                        <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900">
                                            {option.title}
                                        </RadioGroup.Label>
                                        <RadioGroup.Description as="span" className="mt-1 flex items-center text-sm text-gray-500">
                                            {option.description}
                                        </RadioGroup.Description>
                                    </span>
                                </span>
                                <CheckCircleIcon
                                    className={classNames(!checked ? 'invisible' : '', 'h-5 w-5 text-indigo-600')}
                                    aria-hidden="true"
                                />
                                <span
                                    className={classNames(
                                        active ? 'border' : 'border-2',
                                        checked ? 'border-indigo-600' : 'border-transparent',
                                        'pointer-events-none absolute -inset-px rounded-lg'
                                    )}
                                    aria-hidden="true"
                                />
                            </>
                        )}
                    </RadioGroup.Option>
                ))}
            </div>
        </RadioGroup>
    )
}

