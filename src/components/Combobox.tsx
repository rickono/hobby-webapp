/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
'use client'

import {
  Combobox as HCombobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Label,
} from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { FC, useState } from 'react'
import { SelectOption } from './Select'

const people = [
  { id: 1, name: 'Leslie Alexander' },
  // More users...
]

interface ComboboxOption<T> {
  label: string
  value: T
  searchString: string
}

interface Props<T> {
  label: string
  query: string
  setQuery: (query: string) => void
  options: ComboboxOption<T>[]
  displayValue: (item: T | null) => string
  selected: T | null
  onChange: (item: T | null) => void
}

export const Combobox = <T extends {}>({
  label,
  query,
  setQuery,
  options,
  displayValue,
  selected,
  onChange,
}: Props<T>): React.ReactNode => {
  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) => {
          return option.searchString.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <HCombobox
      as="div"
      value={selected}
      onChange={onChange}
      className="col-span-2"
    >
      <Label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </Label>
      <div className="relative mt-2">
        <ComboboxInput
          className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={(event) => setQuery(event.target.value)}
          onBlur={() => setQuery('')}
          displayValue={displayValue}
        />
        <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </ComboboxButton>

        {filteredOptions.length > 0 && (
          <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredOptions.map((option, i) => (
              <ComboboxOption
                key={`${option.label}${i}`}
                value={option.value}
                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
              >
                <span className="block truncate group-data-[selected]:font-semibold">
                  {option.label}
                </span>

                <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                </span>
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        )}
      </div>
    </HCombobox>
  )
}
