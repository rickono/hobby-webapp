import clsx from 'clsx'
import { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react'
import {
    FieldValues,
    Path,
    RegisterOptions,
    UseFormRegister,
} from 'react-hook-form'

type InputProps<T extends FieldValues> =
    InputHTMLAttributes<HTMLInputElement> & {
        type: HTMLInputTypeAttribute
        name: Path<T>
        placeholder?: string
        register?: UseFormRegister<T>
        label: string
        trailing?: string
        leading?: string
        registerOptions?: RegisterOptions<T>
        error?: string
    }

export default function Input<T extends FieldValues>({
    type,
    name,
    register,
    label,
    trailing,
    leading,
    className,
    registerOptions,
    error,
    ...rest
}: InputProps<T>) {
    const divClassName = leading
        ? 'flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md bg-white mt-2'
        : 'relative mt-2'

    const inputClassName = clsx(
        leading
            ? 'block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full'
            : 'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
        error ? 'ring-red-300 placeholder:text-red-300 focus:ring-red-500' : ''
    )
    return (
        <div>
            <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                {label}
            </label>
            <div className={divClassName}>
                {leading && (
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                        {leading}
                    </span>
                )}
                <input
                    {...(register ? register(name, registerOptions) : [])}
                    {...rest}
                    name={name}
                    type={type}
                    className={inputClassName}
                />
                {trailing && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <span className="text-gray-500 sm:text-sm" id={`${name}_trail`}>
                            {trailing}
                        </span>
                    </div>
                )}
            </div>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
    )
}
