import { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react'
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form'
import { getSpan } from './util'

type Props<T extends FieldValues> = InputHTMLAttributes<HTMLTextAreaElement> & {
  name: Path<T>
  register?: UseFormRegister<T>
  label: string
  registerOptions?: RegisterOptions<T>
  span?: number
}

export default function TextArea<T extends FieldValues>({
  name,
  register,
  label,
  registerOptions,
  span = 2,
  ...rest
}: Props<T>) {
  return (
    <div className={getSpan(span)}>
      <label
        htmlFor="comment"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <textarea
          {...rest}
          {...(register ? register(name, registerOptions) : [])}
          name={name}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue={''}
        />
      </div>
    </div>
  )
}
