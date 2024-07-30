import { Fragment, InputHTMLAttributes, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { classNames } from '@/lib/util'
import clsx from 'clsx'

const people = [
  { name: 'Wade Cooper', username: '@wadecooper' },
  { name: 'Arlene Mccoy', username: '@arlenemccoy' },
  { name: 'Devon Webb', username: '@devonwebb' },
  { name: 'Tom Cook', username: '@tomcook' },
  { name: 'Tanya Fox', username: '@tanyafox' },
  { name: 'Hellen Schmidt', username: '@hellenschmidt' },
  { name: 'Caroline Schultz', username: '@carolineschultz' },
  { name: 'Mason Heaney', username: '@masonheaney' },
  { name: 'Claudie Smitham', username: '@claudiesmitham' },
  { name: 'Emil Schaefer', username: '@emilschaefer' },
]

export type SelectOption<T> = {
  label: React.ReactNode
  value: T
  helper?: string
}

type DefaultSelect = { label: string; value: ''; helper: '' }

type Props<T> = {
  label: string
  options: SelectOption<T>[]
  onChange: (value: SelectOption<T> | DefaultSelect) => void
  defaultValue?: SelectOption<T>
  error?: string
  value?: SelectOption<T>
  placeholder?: string
}

export default function Select<T = string>({
  options,
  label,
  onChange,
  defaultValue,
  error,
  value,
  placeholder = 'Please select an option',
}: Props<T>) {
  const [selected, setSelected] = useState<
    SelectOption<T> | DefaultSelect | undefined
  >(defaultValue || { label: placeholder, value: '', helper: '' })

  useEffect(() => {
    if (value) {
      setSelected(value)
    }
  }, [value])

  const listboxButtonClassName = clsx(
    'relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset focus:outline-none focus:ring-2 sm:text-sm sm:leading-6',
    error
      ? 'focus:ring-red-500 ring-red-300'
      : 'focus:ring-indigo-500 ring-gray-300',
  )

  return (
    <div>
      <Listbox
        value={selected}
        onChange={(newValue) => {
          onChange(newValue)
          setSelected(newValue)
        }}
      >
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
              {label}
            </Listbox.Label>
            <div className="relative mt-2">
              <Listbox.Button className={listboxButtonClassName}>
                <span className="inline-flex w-full truncate">
                  <span
                    className={classNames(
                      'truncate',
                      !selected?.value && 'text-gray-500',
                    )}
                  >
                    {selected?.label}
                  </span>
                  <span className="ml-2 truncate text-gray-500">
                    {selected?.helper}
                  </span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {options.map((option, i) => (
                    <Listbox.Option
                      key={i}
                      className={({ active }) =>
                        classNames(
                          active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-3 pr-9',
                        )
                      }
                      value={option}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex">
                            <span
                              className={classNames(
                                selected ? 'font-semibold' : 'font-normal',
                                'truncate',
                              )}
                            >
                              {option.label}
                            </span>
                            <span
                              className={classNames(
                                active ? 'text-indigo-200' : 'text-gray-500',
                                'ml-2 truncate',
                              )}
                            >
                              {option.helper}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? 'text-white' : 'text-indigo-600',
                                'absolute inset-y-0 right-0 flex items-center pr-4',
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
      {error && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {error}
        </p>
      )}
    </div>
  )
}

type MultiSelectProps<T> = {
  label: string
  options: SelectOption<T>[]
  onChange: (value: SelectOption<T>[]) => void
  defaultValue?: SelectOption<T>[]
  error?: string
  value?: SelectOption<T>[]
}

export function MultiSelect<T = string>({
  options,
  label,
  onChange,
  defaultValue = [],
  error,
  value,
}: MultiSelectProps<T>) {
  const [selected, setSelected] = useState(defaultValue)
  const listboxButtonClassName = clsx(
    'relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset focus:outline-none focus:ring-2 sm:text-sm sm:leading-6',
    error
      ? 'focus:ring-red-500 ring-red-300'
      : 'focus:ring-indigo-500 ring-gray-300',
  )
  useEffect(() => {
    setSelected(value ?? [])
  }, [value])

  return (
    <div className="z-5">
      <Listbox
        value={selected}
        onChange={(newValue) => {
          onChange(newValue)
          setSelected(newValue)
        }}
        multiple
        by="value"
      >
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
              {label}
            </Listbox.Label>
            <div className="relative mt-2">
              <Listbox.Button className={listboxButtonClassName}>
                <span className="inline-flex w-full items-center gap-2 truncate">
                  {selected.map((option, i) => (
                    <span
                      key={i}
                      className="py-0.25 inline-flex items-center rounded-md bg-indigo-50 px-1.5 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10"
                    >
                      {option.label}
                    </span>
                  ))}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {options.map((option, i) => (
                    <Listbox.Option
                      key={i}
                      className={({ active }) =>
                        classNames(
                          active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-3 pr-9',
                        )
                      }
                      value={option}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex">
                            <span
                              className={classNames(
                                selected ? 'font-semibold' : 'font-normal',
                                'truncate',
                              )}
                            >
                              {option.label}
                            </span>
                            <span
                              className={classNames(
                                active ? 'text-indigo-200' : 'text-gray-500',
                                'ml-2 truncate',
                              )}
                            >
                              {option.helper}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? 'text-white' : 'text-indigo-600',
                                'absolute inset-y-0 right-0 flex items-center pr-4',
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
      {error && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {error}
        </p>
      )}
    </div>
  )
}
